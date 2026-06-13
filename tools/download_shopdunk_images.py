#!/usr/bin/env python3

import argparse
import html
import json
import os
import re
import subprocess
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


BASE_URL = "https://shopdunk.com"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/126.0.0.0 Safari/537.36"
)


def normalize_text(value):
    value = (value or "").replace("Đ", "D").replace("đ", "d")
    normalized = unicodedata.normalize("NFD", value or "")
    stripped = "".join(char for char in normalized if unicodedata.category(char) != "Mn")
    return re.sub(r"\s+", " ", stripped).strip().lower()


def slugify(value):
    normalized = normalize_text(value)
    normalized = re.sub(r"[^a-z0-9]+", "-", normalized)
    return normalized.strip("-")


class ShopDunkClient:
    def __init__(self, cookie_header=""):
        self.cookie_header = cookie_header.strip()

    def request(self, path_or_url, data=None, referer=None, content_type=None):
        url = path_or_url if path_or_url.startswith("http") else f"{BASE_URL}{path_or_url}"
        headers = {"User-Agent": USER_AGENT}

        if self.cookie_header:
            headers["Cookie"] = self.cookie_header

        if referer:
            headers["Referer"] = referer

        if data is not None:
            headers["X-Requested-With"] = "XMLHttpRequest"
            headers["Content-Type"] = content_type or "application/x-www-form-urlencoded; charset=UTF-8"
            data = data.encode("utf-8")

        request = urllib.request.Request(url, headers=headers, data=data)
        with urllib.request.urlopen(request, timeout=20) as response:
            body = response.read()
            return body.decode("utf-8", errors="replace")

    def download(self, url, output_path):
        command = [
            "curl",
            "-L",
            "--fail",
            "--silent",
            "--show-error",
            "--max-time",
            "20",
            "-A",
            USER_AGENT,
            url,
            "-o",
            str(output_path),
        ]

        if self.cookie_header:
            command.extend(["-H", f"Cookie: {self.cookie_header}"])

        try:
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError:
            if output_path.exists():
                output_path.unlink()
            raise


def load_targets(manifest_path):
    with open(manifest_path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def fetch_autocomplete_products(client, term):
    query = urllib.parse.urlencode({"term": term})
    raw = client.request(f"/catalog/searchtermautocomplete?{query}")
    payload = json.loads(raw)
    return payload.get("products", [])


def choose_product(products, target):
    if not products:
        return None

    target_name = target["name"] if isinstance(target, dict) else target
    normalized_target = normalize_text(target_name)
    required_terms = [normalize_text(term) for term in target.get("required_terms", [])] if isinstance(target, dict) else []
    reject_terms = [normalize_text(term) for term in target.get("reject_terms", [])] if isinstance(target, dict) else []
    scored = []

    for product in products:
        label = product.get("label", "")
        normalized_label = normalize_text(label)
        normalized_url = normalize_text(product.get("producturl", ""))
        searchable = f"{normalized_label} {normalized_url}"

        if required_terms and not all(term in searchable for term in required_terms):
            continue
        if reject_terms and any(term in searchable for term in reject_terms):
            continue

        score = 0
        if normalized_label == normalized_target:
            score += 100
        if normalized_target in normalized_label:
            score += 50
        if normalized_url in normalized_target:
            score += 5
        if any(term in searchable for term in ["troi bh", "cu dep", "tbh", "pitaka"]):
            score -= 100

        scored.append((score, len(label), product))

    if not scored:
        return None

    scored.sort(key=lambda item: (-item[0], item[1]))
    return scored[0][2] if scored[0][0] > -50 else None


def extract_main_image(html_text):
    patterns = [
        r'<meta property="og:image" content="([^"]+)"',
        r'<meta itemprop="image" content="([^"]+)"',
    ]
    for pattern in patterns:
        match = re.search(pattern, html_text, flags=re.IGNORECASE)
        if match:
            return html.unescape(match.group(1))
    return ""


def extract_form_token(html_text):
    match = re.search(
        r'name="__RequestVerificationToken"\s+type="hidden"\s+value="([^"]+)"',
        html_text,
        flags=re.IGNORECASE,
    )
    return html.unescape(match.group(1)) if match else ""


def extract_product_id(html_text):
    match = re.search(r"productdetails_attributechange\?productId=(\d+)", html_text)
    return match.group(1) if match else ""


def extract_default_attributes(html_text):
    defaults = {}

    for match in re.finditer(
        r'<input[^>]+name="(product_attribute_\d+)"[^>]+value="([^"]+)"[^>]*checked="checked"',
        html_text,
        flags=re.IGNORECASE,
    ):
        defaults[match.group(1)] = match.group(2)

    for select_match in re.finditer(
        r'<select[^>]+name="(product_attribute_\d+)"[^>]*>(.*?)</select>',
        html_text,
        flags=re.IGNORECASE | re.DOTALL,
    ):
        option_match = re.search(
            r'<option[^>]+value="([^"]+)"[^>]*selected="selected"',
            select_match.group(2),
            flags=re.IGNORECASE,
        )
        if option_match:
            defaults[select_match.group(1)] = option_match.group(1)

    return defaults


def extract_color_options(html_text):
    color_block_match = re.search(
        r'<ul[^>]+class="option-list attribute-squares color-squares"[^>]*>(.*?)</ul>',
        html_text,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if not color_block_match:
        return []

    color_block = color_block_match.group(1)
    options = []

    for match in re.finditer(
        r'<input[^>]+id="(product_attribute_(\d+)_(\d+))"[^>]+name="(product_attribute_\d+)"[^>]+value="([^"]+)"[^>]+showHideRadioQuantity\(null,\'([^\']+)\'\)',
        color_block,
        flags=re.IGNORECASE,
    ):
        options.append(
            {
                "input_id": match.group(1),
                "mapping_id": match.group(2),
                "value_id": match.group(3),
                "field_name": match.group(4),
                "value": match.group(5),
                "label": html.unescape(match.group(6)).strip(),
            }
        )

    return options


def build_color_search_terms(product_name, color_label):
    clean_product_name = re.sub(r"\s+", " ", product_name).strip()
    clean_color = re.sub(r"\s+", " ", color_label).strip()
    base_terms = [
        f"{clean_product_name} - {clean_color}",
        f"{clean_product_name} {clean_color}",
    ]

    normalized_color = normalize_text(clean_color)
    if normalized_color != clean_color.lower():
        base_terms.append(f"{clean_product_name} - {normalize_text(clean_color)}")

    return base_terms


def extract_json_urls(payload):
    urls = []

    def walk(node):
        if isinstance(node, dict):
            for key, value in node.items():
                key_normalized = key.lower()
                if isinstance(value, str) and value.startswith("http") and (
                    "image" in key_normalized or "picture" in key_normalized or key_normalized.endswith("url")
                ):
                    parsed = urllib.parse.urlparse(value)
                    hostname = (parsed.hostname or "").lower()
                    lower_path = parsed.path.lower()
                    if hostname.endswith("shopdunk.com") and "/images/thumbs/" in lower_path and lower_path.endswith((".png", ".jpg", ".jpeg", ".webp")):
                        urls.append(value)
                walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(payload)
    return dedupe_image_urls(urls)


def thumb_image_key(url):
    parsed = urllib.parse.urlparse(url)
    filename = Path(parsed.path).name.lower()
    stem = Path(filename).stem
    suffix = Path(filename).suffix
    stem = re.sub(r"_(?:\d{2,4}|small|large|thumb)$", "", stem)
    return f"{parsed.hostname or ''}{Path(parsed.path).parent}/{stem}{suffix}"


def dedupe_image_urls(urls):
    deduped = []
    seen = set()
    for url in urls:
        key = thumb_image_key(url)
        if key not in seen:
            seen.add(key)
            deduped.append(url)
    return deduped


def file_extension_from_url(url):
    parsed = urllib.parse.urlparse(url)
    suffix = Path(parsed.path).suffix.lower()
    return suffix if suffix else ".jpg"


def download_image(client, url, output_path, dry_run=False):
    if dry_run:
        return

    output_path.parent.mkdir(parents=True, exist_ok=True)
    if output_path.exists() and output_path.stat().st_size > 0:
        return
    client.download(url, output_path)


def save_metadata(folder_path, metadata):
    output_path = folder_path / "metadata.json"
    output_path.write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8")


def try_fetch_color_gallery(client, product_url, html_text, color_option):
    product_id = extract_product_id(html_text)
    token = extract_form_token(html_text)
    defaults = extract_default_attributes(html_text)

    if not product_id or not token or not color_option:
        return []

    defaults[color_option["field_name"]] = color_option["value"]
    form_fields = {"__RequestVerificationToken": token, **defaults}
    body = urllib.parse.urlencode(form_fields)

    try:
        raw = client.request(
            f"/shoppingcart/productdetails_attributechange?productId={product_id}&validateAttributeConditions=False&loadPicture=True",
            data=body,
            referer=product_url,
        )
    except urllib.error.HTTPError as error:
        return [f"HTTP {error.code}"]
    except Exception as error:  # noqa: BLE001
        return [f"ERROR {error}"]

    if "Cloudflare" in raw or "Sorry, you have been blocked" in raw:
        return ["CLOUDFLARE_BLOCKED"]

    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        return ["INVALID_JSON"]

    return extract_json_urls(payload)


def process_target(client, target, output_root, dry_run=False, delay=0.25):
    ref = target["ref"]
    name = target["name"]
    product = None

    if target.get("product_url"):
        product = {
            "label": name,
            "producturl": urllib.parse.urlparse(target["product_url"]).path,
            "productpictureurl": "",
        }
    else:
        for term in target.get("search_terms", [name]):
            try:
                products = fetch_autocomplete_products(client, term)
            except Exception as error:  # noqa: BLE001
                return {
                    "ref": ref,
                    "name": name,
                    "status": "error",
                    "message": f"Autocomplete failed: {error}",
                }

            product = choose_product(products, target)
            if product:
                break

    if not product:
        return {
            "ref": ref,
            "name": name,
            "status": "missing",
            "message": "Khong tim thay URL san pham tren ShopDunk.",
        }

    product_url = urllib.parse.urljoin(BASE_URL, product["producturl"])
    folder_path = output_root / ref
    folder_path.mkdir(parents=True, exist_ok=True)

    metadata = {
        "ref": ref,
        "name": name,
        "product_url": product_url,
        "search_terms": target.get("search_terms", [name]),
        "downloaded_at": int(time.time()),
        "main_image": "",
        "colors": [],
        "notes": [],
    }

    try:
        page_html = client.request(product_url)
    except Exception as error:  # noqa: BLE001
        return {
            "ref": ref,
            "name": name,
            "status": "error",
            "message": f"Khong mo duoc trang san pham: {error}",
        }

    main_image = extract_main_image(page_html) or product.get("productpictureurl", "")
    if main_image:
        main_ext = file_extension_from_url(main_image)
        main_output = folder_path / f"{slugify(name)}--main{main_ext}"
        try:
            download_image(client, main_image, main_output, dry_run=dry_run)
            metadata["main_image"] = {
                "source_url": main_image,
                "local_path": str(main_output.relative_to(output_root.parent)),
            }
        except Exception as error:  # noqa: BLE001
            metadata["notes"].append(f"Main image download failed: {error}")

    color_options = extract_color_options(page_html)
    seen_color_files = set()

    for color_option in color_options:
        color_name = color_option["label"]
        color_slug = slugify(color_name)
        color_record = {
            "name": color_name,
            "search_hits": [],
            "gallery_images": [],
        }

        if not client.cookie_header:
            for search_term in build_color_search_terms(name, color_name):
                try:
                    products = fetch_autocomplete_products(client, search_term)
                except Exception as error:  # noqa: BLE001
                    color_record["search_hits"].append({"term": search_term, "error": str(error)})
                    continue

                for candidate in products:
                    image_url = candidate.get("productpictureurl", "")
                    image_key = thumb_image_key(image_url) if image_url else ""
                    if not image_url or image_key in seen_color_files:
                        continue

                    if candidate.get("producturl") != product["producturl"]:
                        continue

                    ext = file_extension_from_url(image_url)
                    output_path = folder_path / f"{slugify(name)}--{color_slug}--01{ext}"
                    try:
                        download_image(client, image_url, output_path, dry_run=dry_run)
                        seen_color_files.add(image_key)
                        color_record["search_hits"].append(
                            {
                                "term": search_term,
                                "source_url": image_url,
                                "local_path": str(output_path.relative_to(output_root.parent)),
                            }
                        )
                    except Exception as error:  # noqa: BLE001
                        color_record["search_hits"].append({"term": search_term, "error": str(error)})
                    break

                if color_record["search_hits"]:
                    break

        if client.cookie_header:
            gallery_urls = try_fetch_color_gallery(client, product_url, page_html, color_option)
            if gallery_urls:
                if isinstance(gallery_urls[0], str) and gallery_urls[0] in {
                    "CLOUDFLARE_BLOCKED",
                    "INVALID_JSON",
                }:
                    color_record["gallery_status"] = gallery_urls[0]
                elif isinstance(gallery_urls[0], str) and gallery_urls[0].startswith(("HTTP ", "ERROR ")):
                    color_record["gallery_status"] = gallery_urls[0]
                else:
                    for index, image_url in enumerate(gallery_urls, start=1):
                        ext = file_extension_from_url(image_url)
                        output_path = folder_path / f"{slugify(name)}--{color_slug}--{index:02d}{ext}"
                        try:
                            download_image(client, image_url, output_path, dry_run=dry_run)
                            color_record["gallery_images"].append(
                                {
                                    "source_url": image_url,
                                    "local_path": str(output_path.relative_to(output_root.parent)),
                                }
                            )
                        except Exception as error:  # noqa: BLE001
                            color_record.setdefault("errors", []).append(str(error))
        else:
            color_record["gallery_status"] = "SKIPPED_NO_COOKIE"

        metadata["colors"].append(color_record)
        time.sleep(delay)

    save_metadata(folder_path, metadata)

    return {
        "ref": ref,
        "name": name,
        "status": "ok",
        "product_url": product_url,
        "colors_found": len(color_options),
        "folder": str(folder_path),
    }


def main():
    parser = argparse.ArgumentParser(
        description="Download ShopDunk product images into image/products with consistent names."
    )
    parser.add_argument(
        "--manifest",
        default="data/shopdunk_targets.json",
        help="Path to the target manifest JSON file.",
    )
    parser.add_argument(
        "--output",
        default="image/products",
        help="Destination folder for downloaded images.",
    )
    parser.add_argument(
        "--cookie-header",
        default=os.environ.get("SHOPDUNK_COOKIE", ""),
        help="Optional raw Cookie header. Useful when Cloudflare blocks color-gallery requests.",
    )
    parser.add_argument(
        "--refs",
        nargs="*",
        default=[],
        help="Optional list of product refs to process.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse and report without saving files.",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.25,
        help="Delay between products to avoid hammering the site.",
    )
    args = parser.parse_args()

    output_root = Path(args.output).resolve()
    output_root.mkdir(parents=True, exist_ok=True)

    targets = load_targets(args.manifest)
    if args.refs:
        ref_filter = set(args.refs)
        targets = [target for target in targets if target["ref"] in ref_filter]

    client = ShopDunkClient(cookie_header=args.cookie_header)
    results = []

    for target in targets:
        result = process_target(client, target, output_root, dry_run=args.dry_run, delay=args.delay)
        results.append(result)
        print(json.dumps(result, ensure_ascii=False))

    summary_path = output_root / "shopdunk-download-report.json"
    summary_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()

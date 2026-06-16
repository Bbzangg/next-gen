// State Management
let products = [];
let combos = [];
let cart = [];
let orders = [];
let manufacturingOrders = [];
let purchaseOrders = [];

// Odoo ERP Specific Simulation Logs
let odooSalesLogs = [];
const CRM_STORAGE_KEY = "nextgen_odoo_crm_logs";

function loadCrmLogs() {
    try {
        const raw = localStorage.getItem(CRM_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.map(log => ({
            ...log,
            date: log.date ? new Date(log.date) : new Date()
        }));
    } catch (error) {
        console.warn("Unable to load CRM logs", error);
        return [];
    }
}

function saveCrmLogs() {
    try {
        localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(odooCrmLogs));
    } catch (error) {
        console.warn("Unable to save CRM logs", error);
    }
}

let odooCrmLogs = loadCrmLogs();

function getContactLogs() {
    return odooCrmLogs.filter(log => log.type === "contact");
}

function normalizeContactLog(log) {
    return {
        ...log,
        date: log.date instanceof Date ? log.date : new Date(log.date)
    };
}

function setAdminTab(tabId) {
    activeAdminTab = tabId;
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    document.querySelectorAll(".admin-tab-content").forEach(tab => {
        tab.style.display = tab.id === tabId ? "block" : "none";
    });

    if (tabId === "contact-logs-tab") {
        renderContactLogs();
    }
}

function openContactLogsInERP() {
    window.location.hash = "#admin-odoo";
    setTimeout(() => setAdminTab("contact-logs-tab"), 0);
}

// Active Routing state
let activePage = "home";
let activeCategoryParam = "all";
let activeProductRef = "";
let searchQuery = "";
let activeAdminTab = "products-tab";

// Promotional slider state
let currentSlide = 0;
let slideInterval;

const CATEGORY_ROUTE_ALIASES = {
    iPhone: "Điện thoại",
    Macbook: "Laptop",
    iPad: "Tablet"
};

const CATEGORY_PAGE_GROUPS = {
    "Phụ kiện": ["Phụ kiện", "Tai nghe", "Đồng hồ", "Dịch vụ"]
};

const PAGE_VIEW_IDS = {
    home: "home-page",
    category: "catalog-page",
    product: "detail-page",
    cart: "cart-page",
    checkout: "checkout-page",
    contact: "contact-page",
    admin: "admin-page"
};

const CAMPAIGN_CONTENT = {
    "macbook-m5": {
        kicker: "MacBook Campaign",
        title: "MacBook Pro 14 M5 cho giai đoạn tăng tốc công việc",
        summary: "Chiến dịch này dành cho người cần một chiếc máy mạnh, ổn định và có thể đi cùng cường độ làm việc cao trong thời gian dài. NextGen gom ưu đãi theo hướng thực dụng để khách chốt nhanh, dùng ngay và không phải mua lắt nhắt thêm quá nhiều phụ kiện ban đầu.",
        period: "15/06/2026 - 31/07/2026",
        audience: "Nhân sự văn phòng, freelancer, designer, creator",
        benefits: [
            "Hỗ trợ trả góp 0% đến 24 tháng khi thanh toán qua thẻ tín dụng đối tác.",
            "Tặng túi chống sốc cao cấp, adapter dự phòng và 2 cáp Type-C cho bộ làm việc di động.",
            "Ưu tiên giao nhanh trong ngày tại nội thành cho các đơn xác nhận trước 15:00.",
            "Miễn phí cấu hình đồng bộ giữa MacBook, iPhone và iPad trước khi bàn giao máy."
        ],
        terms: [
            "Áp dụng cho MacBook Pro 14 inch M5 còn hàng tại hệ thống NextGen.",
            "Quà tặng không quy đổi thành tiền mặt và có thể thay bằng phụ kiện tương đương nếu hết mẫu.",
            "Ưu đãi trả góp phụ thuộc kết quả xét duyệt từ ngân hàng hoặc tổ chức tài chính liên kết."
        ],
        target: "#product/MB_APL_PROM5_16_512",
        cta: "Mở sản phẩm MacBook"
    },
    "iphone-upgrade": {
        kicker: "Trade-in Highlight",
        title: "Thu cũ đổi mới lên iPhone 17 Pro Max theo gói nâng cấp nhanh",
        summary: "Đây là chiến dịch cho khách đang dùng máy 2 năm trở lên và muốn lên đời flagship mới nhưng vẫn giữ ngân sách dễ chịu. Cửa hàng ưu tiên rút ngắn thời gian định giá, cộng thêm quyền lợi thu cũ và ghép sẵn combo phù hợp để đổi máy một lần cho gọn.",
        period: "18/06/2026 - 15/08/2026",
        audience: "Khách đang dùng iPhone 13, 14, 15 hoặc máy cũ cần đổi nhanh",
        benefits: [
            "Định giá thu cũ trong vòng 15 phút tại cửa hàng hoặc qua video kiểm tra từ xa.",
            "Cộng thêm đến 3.000.000đ cho máy đủ điều kiện ngoại hình đẹp, pin ổn và chưa sửa main.",
            "Ưu tiên chọn serial đẹp và hỗ trợ sao lưu, chuyển dữ liệu miễn phí sang máy mới.",
            "Kết hợp sẵn combo iPhone 17 Pro Max cùng AirPods Pro 3 để tối ưu giá mua trọn bộ."
        ],
        terms: [
            "Máy cũ cần đăng xuất iCloud, không dính báo mất và vượt qua bước kiểm tra chức năng cơ bản.",
            "Mức trợ giá cuối cùng phụ thuộc tình trạng thực tế của máy khi kỹ thuật xác nhận.",
            "Ưu đãi serial đẹp áp dụng theo tồn kho tại thời điểm chốt đơn."
        ],
        target: "#product/BOM-001",
        cta: "Xem combo nâng cấp"
    },
    "back-to-school": {
        kicker: "Back To School",
        title: "Back to School 2026 cho iPad Air M4 và hệ sinh thái học tập",
        summary: "Chiến dịch này hướng đến học sinh, sinh viên và phụ huynh muốn chuẩn bị một bộ thiết bị học tập đủ dùng cho cả năm học. Mục tiêu là mua một lần nhưng nhận được một cấu hình gọn, dễ dùng và hạn chế các chi phí phát sinh ngay đầu năm.",
        period: "20/06/2026 - 05/09/2026",
        audience: "Học sinh, sinh viên, phụ huynh mua đầu năm học",
        benefits: [
            "Tặng gói thiết lập học tập ban đầu gồm Apple ID, note template và app học tập dùng trong 1 năm.",
            "Hỗ trợ trả góp 0% trong 12 tháng cho đơn đủ điều kiện.",
            "Miễn phí dán màn hình và cấu hình Apple Pencil để có thể dùng ngay sau khi nhận máy.",
            "Ưu tiên tư vấn combo gọn cho ghi chú, học online và làm bài thuyết trình trên cùng một thiết bị."
        ],
        terms: [
            "Áp dụng cho khách mua iPad Air M4 cùng phụ kiện nằm trong danh sách chiến dịch.",
            "Một số app tặng kèm là bản ưu đãi giáo dục hoặc tài khoản dùng theo gói do cửa hàng cấu hình.",
            "Số lượng quà và lịch cài đặt miễn phí có thể giới hạn theo từng đợt cao điểm nhập học."
        ],
        target: "#product/BOM-003",
        cta: "Xem combo học tập"
    }
};

const selectedProductOptions = {};
const APPLE_BASE_URL = "https://www.apple.com";
const DETAIL_THUMBNAIL_WINDOW_SIZE = 5;

function colorOption(name, swatch, border = "") {
    return { name, swatch, border };
}

function galleryImage(src, options = {}) {
    return {
        src,
        fit: options.fit || "contain",
        position: options.position || "center center",
        background: options.background || ""
    };
}

function appleAsset(path) {
    return `${APPLE_BASE_URL}${path}`;
}

const LOCAL_COLOR_ALIASES = {
    IP_APL_IP17_256: {
        "xanh nuoc": "xanh lam khoi",
        "xanh la": "xanh la xo thom",
        "tim": "tim oai huong"
    },
    IP_APL_IP17E_256: {
        "hong nhat": "pink",
        "trang": "white",
        "den": "black"
    },
    IP_APL_IPAIR_256: {
        "light gold": "vang nhat"
    },
    MB_APL_PROM5_16_512: {
        "den khong gian": "space black",
        "bac": "silver"
    },
    IPD_APL_A16_128_WIFI: {
        "xanh duong": "blue",
        "hong": "pink",
        "bac": "silver",
        "vang": "yellow"
    },
    IPD_APL_AIRM4_11_128: {
        "xam khong gian": "space gray",
        "xanh duong": "blue",
        "tim": "puprple",
        "anh sao": "starlight"
    },
    AW_APL_SE3_40_GPS: {
        "nua dem": "midnight",
        "anh sao": "starlight"
    }
};

function normalizeColorLabel(value = "") {
    return value
        .replace(/Đ/g, "D")
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function resolveLocalImagePath(path) {
    if (!path || /^(https?:|data:|image\/)/.test(path)) return path;
    return `image/${String(path).replace(/^\/+/, "")}`;
}

function getLocalProductImageData(ref) {
    return window.APP_DATA?.localProductImages?.[ref] || null;
}

function getLocalProductMainImage(ref) {
    const localData = getLocalProductImageData(ref);
    return resolveLocalImagePath(localData?.main || "");
}

function getLocalProductGallery(ref) {
    const localData = getLocalProductImageData(ref);
    return Array.isArray(localData?.gallery)
        ? localData.gallery.map(resolveLocalImagePath).filter(Boolean)
        : [];
}

function getLocalProductColorImages(ref, colorName) {
    const localData = getLocalProductImageData(ref);
    const colorMap = localData?.colors || {};
    const entries = Object.entries(colorMap);
    if (!colorName || entries.length === 0) return [];

    const requested = normalizeColorLabel(colorName);
    const alias = LOCAL_COLOR_ALIASES[ref]?.[requested] || requested;
    const normalizedAlias = normalizeColorLabel(alias);

    const exactMatch = entries.find(([name]) => normalizeColorLabel(name) === requested);
    const aliasMatch = entries.find(([name]) => normalizeColorLabel(name) === normalizedAlias);
    const softMatch = entries.find(([name]) => {
        const normalizedName = normalizeColorLabel(name);
        return normalizedName.includes(requested) || requested.includes(normalizedName);
    });
    const match = exactMatch || aliasMatch || softMatch;

    return Array.isArray(match?.[1])
        ? match[1].map(resolveLocalImagePath).filter(Boolean)
        : [];
}

const PRODUCT_COLOR_OPTIONS = {
    IP_APL_IP15_128: [
        colorOption("Hồng", "#f6d6df"),
        colorOption("Vàng", "#f1e38a"),
        colorOption("Xanh lá", "#d7e8cf"),
        colorOption("Xanh dương", "#c9dcf2"),
        colorOption("Đen", "#2f2f31")
    ],
    IP_APL_IP16PRO_1TB: [
        colorOption("Titan Đen", "#3b3b3d"),
        colorOption("Titan Tự nhiên", "linear-gradient(135deg, #d0c5b5 0%, #8f8475 100%)"),
        colorOption("Titan Trắng", "#f5f5f0", "1px solid rgba(24, 24, 24, 0.16)"),
        colorOption("Titan Sa mạc", "#caa17b")
    ],
    IP_APL_IP17_256: [
        colorOption("Xanh nước", "#bcdcf4"),
        colorOption("Xanh lá", "#bfd6a8"),
        colorOption("Tím", "#cbc3f5"),
        colorOption("Trắng", "#f5f5f7", "1px solid rgba(24, 24, 24, 0.16)"),
        colorOption("Đen", "#252527")
    ],
    IP_APL_IP17PM_256: [
        colorOption("Cam vũ trụ", "#ca7957"),
        colorOption("Xanh đậm", "#2f4f79"),
        colorOption("Bạc", "#e4e5e7", "1px solid rgba(24, 24, 24, 0.16)")
    ],
    IP_APL_IP17E_256: [
        colorOption("Hồng nhạt", "#f5d1da"),
        colorOption("Trắng", "#f5f5f7", "1px solid rgba(24, 24, 24, 0.16)"),
        colorOption("Đen", "#2b2b2d")
    ],
    IP_APL_IPAIR_256: [
        colorOption("Xanh da trời", "#c4e4fb"),
        colorOption("Light Gold", "#eadab7"),
        colorOption("Trắng mây", "#f2f3f5", "1px solid rgba(24, 24, 24, 0.16)"),
        colorOption("Đen không gian", "#27272a")
    ],
    MB_APL_AIRM5_16_512: [
        colorOption("Xanh da trời", "#c6d9f0"),
        colorOption("Bạc", "#d8dade", "1px solid rgba(24, 24, 24, 0.12)"),
        colorOption("Ánh sao", "#e9ddc7"),
        colorOption("Nửa đêm", "#333a48")
    ],
    MB_APL_NEO13_8_256: [
        colorOption("Bạc", "#d6d8dc", "1px solid rgba(24, 24, 24, 0.12)"),
        colorOption("Hồng phấn", "#efc4cd"),
        colorOption("Citrus", "#d9e55b"),
        colorOption("Indigo", "#4e597f")
    ],
    MB_APL_PROM5_16_512: [
        colorOption("Đen không gian", "#26282d"),
        colorOption("Bạc", "#d8dade", "1px solid rgba(24, 24, 24, 0.12)")
    ],
    IPD_APL_A16_128_WIFI: [
        colorOption("Xanh dương", "#a8d3ff"),
        colorOption("Hồng", "#f6cad8"),
        colorOption("Vàng", "#f1dd73"),
        colorOption("Bạc", "#d9dadf", "1px solid rgba(24, 24, 24, 0.12)")
    ],
    IPD_APL_AIRM4_11_128: [
        colorOption("Xám không gian", "#62676f"),
        colorOption("Xanh dương", "#9ec8f3"),
        colorOption("Tím", "#c6b9eb"),
        colorOption("Ánh sao", "#eadfca")
    ],
    AP_APL_APMAX2: [
        colorOption("Nửa đêm", "#303848"),
        colorOption("Ánh sao", "#e9dfce"),
        colorOption("Xanh dương", "#92abd1"),
        colorOption("Tím", "#b2a2dd"),
        colorOption("Cam", "#ef8c52")
    ],
    AW_APL_SE3_40_GPS: [
        colorOption("Ánh sao", "#e4dbc7"),
        colorOption("Nửa đêm", "#313744")
    ],
    AW_APL_S11_42_GPS: [
        colorOption("Rose Gold nhôm", "#d6a190"),
        colorOption("Silver nhôm", "#dbdde1", "1px solid rgba(24, 24, 24, 0.12)"),
        colorOption("Jet Black nhôm", "#1f2024"),
        colorOption("Space Gray nhôm", "#5e6269"),
        colorOption("Titan Tự nhiên", "#bdb5a6"),
        colorOption("Titan Vàng", "#c9a065"),
        colorOption("Titan Slate", "#55575e")
    ],
    AP_APL_AP4: [
        colorOption("Trắng", "#f7f7f7", "1px solid rgba(24, 24, 24, 0.14)")
    ],
    AP_APL_APPRO3: [
        colorOption("Trắng", "#f7f7f7", "1px solid rgba(24, 24, 24, 0.14)")
    ],
    SAC_APL_USBC20W: [
        colorOption("Trắng", "#fafafa", "1px solid rgba(24, 24, 24, 0.14)")
    ],
    CAP_APL_TC1M: [
        colorOption("Trắng", "#f2f2f2", "1px solid rgba(24, 24, 24, 0.14)")
    ],
    AT_APL_AIRTAG: [
        colorOption("Trắng / Bạc", "linear-gradient(135deg, #f8f8f8 0%, #d7d7d9 100%)", "1px solid rgba(24, 24, 24, 0.12)")
    ],
    PEN_APL_APPRO: [
        colorOption("Trắng", "#f8f8f8", "1px solid rgba(24, 24, 24, 0.14)")
    ],
    OP_APL_IP17PM_MAG: [
        colorOption("Xanh đậm", "#415b84")
    ]
};

const PRODUCT_COLOR_IMAGES = {
    IP_APL_IP15_128: {
        "Hồng": [
            galleryImage("https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg", { fit: "cover", position: "87% center", background: "#f7eef2" }),
            "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_inline.jpg.large.jpg"
        ],
        "Vàng": [
            galleryImage("https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg", { fit: "cover", position: "69% center", background: "#faf7e8" }),
            "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg"
        ],
        "Xanh lá": [
            galleryImage("https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg", { fit: "cover", position: "50% center", background: "#eef4e7" }),
            "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg"
        ],
        "Xanh dương": [
            galleryImage("https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-design-230912_big.jpg.large.jpg", { fit: "cover", position: "center center", background: "#edf4fa" }),
            galleryImage("https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg", { fit: "cover", position: "31% center", background: "#edf4fa" })
        ],
        "Đen": [
            galleryImage("https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg", { fit: "cover", position: "13% center", background: "#eef0f2" }),
            "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_inline.jpg.large.jpg"
        ]
    },
    IP_APL_IP16PRO_1TB: {
        "Titan Đen": [
            galleryImage("https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg", { fit: "cover", position: "13% center", background: "#0f0f10" }),
            "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg"
        ],
        "Titan Tự nhiên": [
            galleryImage("https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg", { fit: "cover", position: "39% center", background: "#161616" }),
            "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-camera-system-240909_inline.jpg.large.jpg"
        ],
        "Titan Trắng": [
            galleryImage("https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg", { fit: "cover", position: "62% center", background: "#111214" }),
            "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-Camera-Control-ChatGPT-240909_inline.jpg.large.jpg"
        ],
        "Titan Sa mạc": [
            galleryImage("https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg", { fit: "cover", position: "87% center", background: "#140f0d" }),
            "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg"
        ]
    },
    IP_APL_IP17_256: {
        "Xanh nước": [appleAsset("/v/iphone-17/f/images/overview/product-viewer/colors_mist_blue__700uff6zu2qa_large.jpg")],
        "Xanh lá": [appleAsset("/v/iphone-17/f/images/overview/product-viewer/colors_sage__cr1jt90v1yoi_large.jpg")],
        "Tím": [
            appleAsset("/v/iphone-17/f/images/overview/product-viewer/colors_lavender__bcaie9a8npj6_large.jpg"),
            appleAsset("/v/iphone-17/f/images/overview/highlights/ceramic-shield/highlights_ceramic_shield_endframe__cbyipzki5iwi_large.jpg")
        ],
        "Trắng": [
            appleAsset("/v/iphone-17/f/images/overview/product-viewer/colors_white__979ypubjzdum_large.jpg"),
            appleAsset("/v/iphone-17/f/images/overview/highlights/cameras/cameras__bp927f4j5vqu_large.png")
        ],
        "Đen": [appleAsset("/v/iphone-17/f/images/overview/product-viewer/colors_black__fzuhc3kqvmq2_large.jpg")]
    },
    IP_APL_IP17PM_256: {
        "Cam vũ trụ": [appleAsset("/v/iphone-17-pro/f/images/overview/product-viewer/colors_orange__cr2oq3n1dwk2_large.jpg")],
        "Xanh đậm": [appleAsset("/v/iphone-17-pro/f/images/overview/product-viewer/colors_blue__li170wg4gkae_large.jpg")],
        "Bạc": [appleAsset("/v/iphone-17-pro/f/images/overview/product-viewer/colors_silver__eb8fu7zfvwmu_large.jpg")]
    },
    IP_APL_IP17E_256: {
        "Hồng nhạt": [
            appleAsset("/v/iphone-17e/b/images/overview/contrast/iphone_17e__cxpcy8m950ae_large.jpg"),
            appleAsset("/v/iphone-17e/b/images/overview/value/value__629ylhdri2q6_large.png")
        ],
        "Trắng": [
            appleAsset("/v/iphone-17e/b/images/overview/durability/design__glhll70c152e_large.jpg"),
            appleAsset("/v/iphone-17e/b/images/overview/accessories/wallet__9jpgv5iue9u6_large.jpg")
        ],
        "Đen": [
            appleAsset("/v/iphone-17e/b/images/overview/highlights/highlights_magsafe_endframe__ec0sz2qsgt4y_large.jpg"),
            appleAsset("/v/iphone-17e/b/images/overview/accessories/crossbody__b2d53eud9maa_large.jpg")
        ]
    },
    IP_APL_IPAIR_256: {
        "Xanh da trời": [
            appleAsset("/v/iphone-air/f/images/overview/product-viewer/color_static_ultramarine__cgfuoct82biu_large.jpg"),
            appleAsset("/v/iphone-air/f/images/overview/contrast/iphone_air__bpnodv7do9ua_large.jpg"),
            appleAsset("/v/iphone-air/f/images/overview/camera/camera__gl56mvovq6qi_large.jpg")
        ],
        "Light Gold": [
            appleAsset("/v/iphone-air/f/images/overview/product-viewer/color_static_gold__d1p7qgdkczo2_large.jpg"),
            appleAsset("/v/iphone-air/f/images/overview/accessories/magsafe__d4e1c0l9u48y_large.jpg")
        ],
        "Trắng mây": [appleAsset("/v/iphone-air/f/images/overview/product-viewer/color_static_white__bsqapwl67oj6_large.jpg")],
        "Đen không gian": [
            appleAsset("/v/iphone-air/f/images/overview/product-viewer/color_static_black__bavqefsedg82_large.jpg"),
            appleAsset("/v/iphone-air/f/images/overview/highlights/highlights_rear_camera__fwea7ndmxeq2_large.jpg")
        ]
    },
    MB_APL_AIRM5_16_512: {
        "Xanh da trời": [
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_side_skyblue__dtyt9gw4nfiq_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_magsafe_skyblue__gii6y9jn1yai_large.jpg")
        ],
        "Bạc": [
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_top_silver__dcf8hwixw2uu_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_side_silver__bdptx3rkr9ua_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_magsafe_silver__cs8q03j5sve6_large.jpg")
        ],
        "Ánh sao": [
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_top_starlight__dtojfd6ibywm_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_side_starlight__b5hvw5hkpjau_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_magsafe_starlight__zdcyiyigbpue_large.jpg")
        ],
        "Nửa đêm": [
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_top_midnight__fvf2p6124tqq_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_side_midnight__flnancj2vlme_large.jpg"),
            appleAsset("/v/macbook-air/z/images/overview/design/color/design_magsafe_midnight__d7pgfcooswmu_large.jpg")
        ]
    },
    MB_APL_NEO13_8_256: {
        "Bạc": [appleAsset("/v/macbook-neo/b/images/overview/product-viewer/pv_colors_silver__bhbd7o8mxxzm_large.jpg")],
        "Hồng phấn": [appleAsset("/v/macbook-neo/b/images/overview/product-viewer/pv_colors_blush__fji4uke74w2m_large.jpg")],
        "Citrus": [appleAsset("/v/macbook-neo/b/images/overview/product-viewer/pv_colors_citrus__flplef60bpim_large.jpg")],
        "Indigo": [appleAsset("/v/macbook-neo/b/images/overview/product-viewer/pv_colors_indigo__ee1m3vsakryq_large.jpg")]
    },
    MB_APL_PROM5_16_512: {
        "Đen không gian": [appleAsset("/v/macbook-pro/ax/images/overview/product-viewer/pv_colors_spaceblack__dwfpyrbaf4cy_large.jpg")],
        "Bạc": [appleAsset("/v/macbook-pro/ax/images/overview/product-viewer/pv_colors_silver__doa20s4tupaq_large.jpg")]
    },
    IPD_APL_A16_128_WIFI: {
        "Xanh dương": [appleAsset("/v/ipad-11/d/images/overview/ar/ar_ipad_blue__d92pgjt4vnee_large.jpg")],
        "Hồng": [appleAsset("/v/ipad-11/d/images/overview/ar/ar_ipad_pink__b2aojrg2kbsi_large.jpg")],
        "Vàng": [appleAsset("/v/ipad-11/d/images/overview/ar/ar_ipad_yellow__fvf57b0nm526_large.jpg")],
        "Bạc": [appleAsset("/v/ipad-11/d/images/overview/ar/ar_ipad_silver__fdoed3gunyqa_large.jpg")]
    },
    IPD_APL_AIRM4_11_128: {
        "Xám không gian": [
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/space-gray/slide_1A__u8zw91uc6iaq_large.jpg"),
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/space-gray/slide_2A__p74br7miwoiq_large.jpg")
        ],
        "Xanh dương": [
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/blue/slide_1A__u8zw91uc6iaq_large.jpg"),
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/blue/slide_2A__p74br7miwoiq_large.jpg")
        ],
        "Tím": [
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/purple/slide_1A__u8zw91uc6iaq_large.jpg"),
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/purple/slide_2A__p74br7miwoiq_large.jpg")
        ],
        "Ánh sao": [
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/starlight/slide_1A__u8zw91uc6iaq_large.jpg"),
            appleAsset("/v/ipad-air/ah/images/overview/closer-look/starlight/slide_2A__p74br7miwoiq_large.jpg")
        ]
    },
    AP_APL_APMAX2: {
        "Nửa đêm": [
            appleAsset("/v/airpods-max/k/images/overview/bento/midnight/bento_1_airpod_max_midnight__4jy1tkqh9qay_xlarge.jpg"),
            appleAsset("/v/airpods-max/k/images/overview/bento/midnight/bento_5_airpod_max_midnight__fhwni7pkavma_xlarge.jpg")
        ],
        "Ánh sao": [
            appleAsset("/v/airpods-max/k/images/overview/bento/starlight/bento_1_airpod_max_starlight__f7v0k5blkzqm_xlarge.jpg"),
            appleAsset("/v/airpods-max/k/images/overview/bento/starlight/bento_5_airpod_max_starlight__ehkae276i342_xlarge.jpg")
        ],
        "Xanh dương": [
            appleAsset("/v/airpods-max/k/images/overview/bento/blue/bento_1_airpod_max_blue__blqgkfdancya_xlarge.jpg"),
            appleAsset("/v/airpods-max/k/images/overview/bento/blue/bento_5_airpod_max_blue__galot3dk9nyq_xlarge.jpg")
        ],
        "Tím": [
            appleAsset("/v/airpods-max/k/images/overview/bento/purple/bento_1_airpod_max_purple__2udwesqoiyq2_xlarge.jpg"),
            appleAsset("/v/airpods-max/k/images/overview/bento/purple/bento_5_airpod_max_purple__fzyi8qccv7e6_xlarge.jpg")
        ],
        "Cam": [
            appleAsset("/v/airpods-max/k/images/overview/bento/orange/bento_1_airpod_max_orange__btmsk5kl9q3m_xlarge.jpg"),
            appleAsset("/v/airpods-max/k/images/overview/bento/orange/bento_5_airpod_max_orange__sr8wgkrex7uy_xlarge.jpg")
        ]
    }
};

const PRODUCT_GALLERY_IMAGES = {
    IP_APL_IP15_128: [
        "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_inline.jpg.large.jpg",
        "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg",
        "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-design-230912_big.jpg.large.jpg",
        "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-48MP-01-230912_big.jpg.large.jpg"
    ],
    IP_APL_IP16PRO_1TB: [
        "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg",
        "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg",
        "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-camera-system-240909_inline.jpg.large.jpg",
        "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-Camera-Control-ChatGPT-240909_inline.jpg.large.jpg"
    ],
    IP_APL_IP17_256: [
        appleAsset("/v/iphone-17/f/images/overview/welcome/hero_startframe__e9e7pcnguyqi_xlarge.jpg"),
        appleAsset("/v/iphone-17/f/images/overview/highlights/ceramic-shield/highlights_ceramic_shield_endframe__cbyipzki5iwi_large.jpg"),
        appleAsset("/v/iphone-17/f/images/overview/highlights/cameras/cameras__bp927f4j5vqu_large.png"),
        appleAsset("/v/iphone-17/f/images/overview/product-viewer/dynamic_island__ea23sqco06c2_large.jpg"),
        appleAsset("/v/iphone-17/f/images/overview/product-viewer/camera_control__hatvco31d8a6_large.jpg")
    ],
    IP_APL_IP17PM_256: [
        appleAsset("/v/iphone-17-pro/f/images/overview/welcome/hero__bsveixlwbms2_xlarge.jpg"),
        appleAsset("/v/iphone-17-pro/f/images/overview/welcome/hero_endframe__gb7f6nb06rau_xlarge.jpg"),
        appleAsset("/v/iphone-17-pro/f/images/overview/welcome/hero_startframe__fd0s9s949fu6_xlarge.jpg"),
        appleAsset("/v/iphone-17-pro/f/images/overview/highlights/highlights_design_endframe__eu8gj0kqlmoi_large.jpg")
    ],
    IP_APL_IP17E_256: [
        appleAsset("/v/iphone-17e/b/images/overview/welcome/hero_endframe__eafizd06t6qa_large.jpg"),
        appleAsset("/v/iphone-17e/b/images/overview/welcome/hero_startframe__fwhfsnmmpb6m_large.jpg"),
        appleAsset("/v/iphone-17e/b/images/overview/highlights/highlights_design_endframe__crx8inqsi8k2_large.jpg"),
        appleAsset("/v/iphone-17e/b/images/overview/highlights/highlights_magsafe_endframe__ec0sz2qsgt4y_large.jpg"),
        appleAsset("/v/iphone-17e/b/images/overview/value/value__629ylhdri2q6_large.png")
    ],
    IP_APL_IPAIR_256: [
        appleAsset("/v/iphone-air/f/images/overview/welcome/hero__c8vidxwr9imq_xlarge.jpg"),
        appleAsset("/v/iphone-air/f/images/overview/welcome/hero_endframe__fjhlsvwr03ma_xlarge.jpg"),
        appleAsset("/v/iphone-air/f/images/overview/highlights/highlights_design_endframe__1cnkq098iuqu_large.jpg"),
        appleAsset("/v/iphone-air/f/images/overview/contrast/iphone_air__bpnodv7do9ua_large.jpg"),
        appleAsset("/v/iphone-air/f/images/overview/camera/camera__gl56mvovq6qi_large.jpg")
    ],
    MB_APL_AIRM5_16_512: [
        appleAsset("/v/macbook-air/z/images/overview/hero/hero_static__c9sislzzicq6_large.png")
    ],
    MB_APL_NEO13_8_256: [
        appleAsset("/v/macbook-neo/b/images/overview/welcome/hero_endframe__c62q483im5si_xlarge.jpg"),
        appleAsset("/v/macbook-neo/b/images/overview/welcome/hero_startframe__c5mna9ib91ea_xlarge.jpg"),
        appleAsset("/v/macbook-neo/b/images/overview/welcome/hero_static__c07b68h6ap2e_xlarge.jpg"),
        appleAsset("/v/macbook-neo/b/images/overview/highlights/highlights_colors_endframe__c5rr2wp9mp0m_large.jpg"),
        appleAsset("/v/macbook-neo/b/images/overview/highlights/highlights_display_endframe__c0qk6ggqxdw2_large.jpg")
    ],
    MB_APL_PROM5_16_512: [
        appleAsset("/v/macbook-pro/ax/images/overview/welcome/hero_endframe__fwev9ebh42mq_xlarge.jpg"),
        appleAsset("/v/macbook-pro/ax/images/overview/welcome/hero_startframe__ek0dqbh61vau_xlarge.jpg"),
        appleAsset("/v/macbook-pro/ax/images/overview/product-viewer/pv_display__fv0jzlzaak2u_large.jpg"),
        appleAsset("/v/macbook-pro/ax/images/overview/security/security_hero__f5ly2jycveq2_large.jpg")
    ],
    IPD_APL_A16_128_WIFI: [
        appleAsset("/v/ipad-11/d/images/overview/hero/hero__crzh9misvcuq_large.jpg"),
        appleAsset("/v/ipad-11/d/images/overview/design/fan__vnl85mt3xzm6_large.jpg"),
        appleAsset("/v/ipad-11/d/images/overview/design/fan_snipe2__f0q2la4piu6i_large.png"),
        appleAsset("/v/ipad-11/d/images/overview/create/camera__c3ssw0atzvyq_large.jpg")
    ],
    IPD_APL_AIRM4_11_128: [
        appleAsset("/v/ipad-air/ah/images/overview/hero/hero_endframe__6gl84bccyaqi_large.png"),
        appleAsset("/v/ipad-air/ah/images/overview/closer-look/all-colors/slide_1A__u8zw91uc6iaq_large.jpg"),
        appleAsset("/v/ipad-air/ah/images/overview/closer-look/all-colors/slide_2A__p74br7miwoiq_large.jpg"),
        appleAsset("/v/ipad-air/ah/images/overview/contrast/product-tile/ipad_air__bbsxw9xstope_large.png")
    ]
};

function getCatalogItemByRef(ref) {
    return ref.startsWith("BOM-")
        ? combos.find(combo => combo.ref === ref)
        : products.find(product => product.ref === ref);
}

function getDefaultColorName(itemObj) {
    return itemObj && Array.isArray(itemObj.colors) && itemObj.colors.length > 0
        ? itemObj.colors[0].name
        : null;
}

function getSelectedColorName(ref) {
    const itemObj = getCatalogItemByRef(ref);
    if (!itemObj) return null;

    if (!selectedProductOptions[ref]) {
        selectedProductOptions[ref] = {};
    }

    if (!selectedProductOptions[ref].color) {
        selectedProductOptions[ref].color = getDefaultColorName(itemObj);
    }

    return selectedProductOptions[ref].color || null;
}

function normalizeGalleryEntry(entry) {
    if (typeof entry === "string") {
        return {
            src: entry,
            fit: "contain",
            position: "center center",
            background: ""
        };
    }

    return {
        src: entry.src,
        fit: entry.fit || "contain",
        position: entry.position || "center center",
        background: entry.background || ""
    };
}

function getGalleryEntryKey(entry) {
    const normalized = normalizeGalleryEntry(entry);
    return [normalized.src, normalized.fit, normalized.position, normalized.background].join("|");
}

function getGalleryEntrySrc(entry) {
    return normalizeGalleryEntry(entry).src;
}

function applyGalleryEntry(imgEl, entry) {
    if (!imgEl || !entry) return;

    const normalized = normalizeGalleryEntry(entry);
    imgEl.src = normalized.src;
    imgEl.style.objectFit = normalized.fit;
    imgEl.style.objectPosition = normalized.position;
    imgEl.style.background = normalized.background || "";
}

function openCampaignModal(campaignKey, clickedBanner = null) {
    const campaign = CAMPAIGN_CONTENT[campaignKey];
    const modal = document.getElementById("campaign-modal");
    if (!campaign || !modal) return;

    const imageEl = document.getElementById("campaign-modal-image");
    const kickerEl = document.getElementById("campaign-modal-kicker");
    const titleEl = document.getElementById("campaign-modal-title");
    const summaryEl = document.getElementById("campaign-modal-summary");
    const periodEl = document.getElementById("campaign-modal-period");
    const audienceEl = document.getElementById("campaign-modal-audience");
    const benefitsEl = document.getElementById("campaign-modal-benefits");
    const termsEl = document.getElementById("campaign-modal-terms");
    const targetEl = document.getElementById("campaign-modal-target");

    const bannerImage = clickedBanner?.querySelector("img");
    if (imageEl && bannerImage) {
        imageEl.src = bannerImage.getAttribute("src") || "";
        imageEl.alt = bannerImage.getAttribute("alt") || campaign.title;
    }

    if (kickerEl) kickerEl.textContent = campaign.kicker;
    if (titleEl) titleEl.textContent = campaign.title;
    if (summaryEl) summaryEl.textContent = campaign.summary;
    if (periodEl) periodEl.textContent = campaign.period;
    if (audienceEl) audienceEl.textContent = campaign.audience;

    if (benefitsEl) {
        benefitsEl.innerHTML = campaign.benefits.map(item => `<li>${item}</li>`).join("");
    }

    if (termsEl) {
        termsEl.innerHTML = campaign.terms.map(item => `<li>${item}</li>`).join("");
    }

    if (targetEl) {
        targetEl.textContent = campaign.cta;
        targetEl.setAttribute("href", campaign.target);
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeCampaignModal() {
    const modal = document.getElementById("campaign-modal");
    if (!modal) return;

    modal.classList.remove("open");
    document.body.style.overflow = "";
}

function bindCampaignBanners() {
    document.querySelectorAll(".promo-banner-card[data-campaign]").forEach(card => {
        if (card.dataset.campaignBound === "true") return;

        card.addEventListener("click", event => {
            event.preventDefault();
            openCampaignModal(card.dataset.campaign, card);
        });

        card.dataset.campaignBound = "true";
    });
}

function setSelectedColorName(ref, colorName) {
    if (!selectedProductOptions[ref]) {
        selectedProductOptions[ref] = {};
    }
    selectedProductOptions[ref].color = colorName;
}

function getColorImageSet(itemObj, colorName = null) {
    if (!itemObj) return [];

    const selectedColor = colorName || getSelectedColorName(itemObj.ref);
    const localImageSet = selectedColor ? getLocalProductColorImages(itemObj.ref, selectedColor) : [];
    const localProductGallery = getLocalProductGallery(itemObj.ref);
    const colorImageMap = PRODUCT_COLOR_IMAGES[itemObj.ref] || {};
    const imageSet = selectedColor ? colorImageMap[selectedColor] : null;
    const productGallery = PRODUCT_GALLERY_IMAGES[itemObj.ref] || [];
    const mergedGallery = [
        ...localImageSet,
        ...localProductGallery,
        ...(Array.isArray(imageSet) ? imageSet : []),
        ...productGallery,
        itemObj.image
    ].filter(Boolean);

    const seen = new Set();
    return mergedGallery.filter(entry => {
        const key = getGalleryEntryKey(entry);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function getPrimaryDisplayImage(itemObj, colorName = null) {
    const images = getColorImageSet(itemObj, colorName);
    return images[0] ? getGalleryEntrySrc(images[0]) : itemObj.image;
}

// Format Currency to VNĐ
function formatVND(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

// Generate IMEI serial lists
function generateImeis(prefix, count) {
    let list = [];
    for (let i = 1; i <= count; i++) {
        list.push(`${prefix}-${String(i).padStart(4, '0')}`);
    }
    return list;
}

// Initializing master data
function initMasterData() {
    const rawProducts = window.APP_DATA?.rawProducts || [];
    const rawCombos = window.APP_DATA?.combos || [];

    products = rawProducts.map(p => {
        const imeis = p.hasImei && p.imeiPrefix
            ? generateImeis(p.imeiPrefix, p.initialStock)
            : [];

        return {
            ...p,
            image: getLocalProductMainImage(p.ref) || p.image,
            stock: p.initialStock,
            imeis,
            allocatedImeis: [],
            colors: PRODUCT_COLOR_OPTIONS[p.ref] || []
        };
    });

    combos = rawCombos.map(combo => ({
        ...combo,
        image: getLocalProductMainImage(combo.components?.[0]?.ref) || combo.image,
        stock: typeof combo.stock === "number" ? combo.stock : (combo.initialStock || 0),
        imeis: Array.isArray(combo.imeis) ? [...combo.imeis] : [],
        allocatedImeis: Array.isArray(combo.allocatedImeis) ? [...combo.allocatedImeis] : [],
        components: Array.isArray(combo.components) ? combo.components.map(component => ({ ...component })) : []
    }));
}

// Helper to get combo capacity from components
function getComboOnDemandCapacity(combo) {
    let capacities = [];
    combo.components.forEach(comp => {
        const prod = products.find(p => p.ref === comp.ref);
        if (prod) {
            capacities.push(Math.floor(prod.stock / comp.qty));
        } else {
            capacities.push(0);
        }
    });
    return Math.min(...capacities);
}

// ---------------- JS Hash Routing System ----------------
function handleRouter() {
    const hash = window.location.hash || "#home";
    
    // De-activate all menu nav items
    document.querySelectorAll(".nav-link-item").forEach(link => link.classList.remove("active"));
    
    // Parse hashes
    if (hash === "#home" || hash === "") {
        activePage = "home";
        activateNavMenuItem("home");
    } else if (hash.startsWith("#category/")) {
        activePage = "category";
        activeCategoryParam = decodeURIComponent(hash.substring(10));
        activateNavMenuItem("category", activeCategoryParam);
    } else if (hash.startsWith("#product/")) {
        activePage = "product";
        activeProductRef = hash.substring(9);
    } else if (hash === "#cart") {
        activePage = "cart";
    } else if (hash === "#checkout") {
        activePage = "checkout";
    } else if (hash === "#contact") {
        activePage = "contact";
        activateNavMenuItem("contact");
    } else if (hash === "#admin-odoo") {
        activePage = "admin";
    }

    // Toggle Visibility of page-view containers
    document.querySelectorAll(".page-view").forEach(view => {
        view.style.display = "none";
    });
    
    const targetPageEl = document.getElementById(PAGE_VIEW_IDS[activePage] || `${activePage}-page`);
    if (targetPageEl) {
        targetPageEl.style.display = "block";
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger render logic based on active page
    triggerPageRenders();
}

function activateNavMenuItem(page, catValue = "") {
    document.querySelectorAll(".nav-link-item").forEach(link => {
        const linkPage = link.getAttribute("data-page");
        if (linkPage === page) {
            if (page === "category" && catValue) {
                const linkCat = link.getAttribute("data-cat");
                const normalizedCat = CATEGORY_ROUTE_ALIASES[catValue] || catValue;
                if (linkCat === catValue || linkCat === normalizedCat) {
                    link.classList.add("active");
                }
            } else {
                link.classList.add("active");
            }
        }
    });
}

function triggerPageRenders() {
    if (activePage === "home") {
        renderHomepageBestSellers();
    } else if (activePage === "category") {
        renderCatalogPage();
    } else if (activePage === "product") {
        renderDetailPage();
    } else if (activePage === "cart") {
        renderCartPage();
    } else if (activePage === "checkout") {
        renderCheckoutPage();
    } else if (activePage === "admin") {
        updateAdminStats();
        initBomFormDropdown();
        renderBomAccordion();
        setAdminTab(activeAdminTab);
    } else if (activePage === "contact") {
        renderContactRecentList();
    }
}

// ---------------- Page Renders ----------------

// Page 1: Homepage Best Sellers
function renderHomepageBestSellers() {
    const homepageBestSellersContainer = document.getElementById("homepage-best-sellers");
    if (!homepageBestSellersContainer) return;
    
    homepageBestSellersContainer.innerHTML = "";
    
    // Display 4 selected items: iPhone 17 Pro Max, iPhone 17, iPhone Air, AirPods Pro 3
    const bestSellerRefs = ["IP_APL_IP17PM_256", "IP_APL_IP17_256", "IP_APL_IPAIR_256", "AP_APL_APPRO3"];
    const filtered = products.filter(p => bestSellerRefs.includes(p.ref));
    
    filtered.forEach(item => {
        const isOutOfStock = item.stock <= 0;
        const card = document.createElement("div");
        card.className = "product-card active";
        card.innerHTML = `
            ${isOutOfStock ? '<span class="badge badge-danger product-badge">Hết hàng</span>' : `<span class="badge badge-success product-badge">Còn ${item.stock} c</span>`}
            <div class="product-image-box">
                <img src="${getPrimaryDisplayImage(item)}" alt="${item.name}" class="product-img">
            </div>
            <div class="product-info">
                <span class="product-category">${item.category}</span>
                <h3 class="product-name">${item.name}</h3>
                <span class="product-ref">SKU: ${item.ref}</span>
                <div class="product-footer">
                    <div class="product-price-box">
                        <span class="product-price">${formatVND(item.price)}</span>
                    </div>
                    <div class="product-actions">
                        <a href="#product/${item.ref}" class="btn-icon" title="Xem chi tiết">Xem</a>
                        <button class="btn-icon btn-cart-add-quick" data-ref="${item.ref}" ${isOutOfStock ? 'disabled style="background-color: var(--text-tertiary);"' : ''} title="Thêm vào giỏ">Thêm</button>
                    </div>
                </div>
            </div>
        `;
        
        card.querySelector(".btn-cart-add-quick")?.addEventListener("click", () => {
            addToCart(item.ref);
            alert(`Đã thêm ${item.name} vào giỏ hàng!`);
        });
        
        homepageBestSellersContainer.appendChild(card);
    });
}

// Page 2: Catalog Page with Left Filters Sidebar
let currentPriceFilters = [];
let currentStorageFilters = [];

function renderCatalogPage() {
    const grid = document.getElementById("catalog-products-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    // Title
    const titleEl = document.getElementById("catalog-title");
    const displayCategoryTitle = activeCategoryParam === "iPhone"
        ? "iPhone"
        : (activeCategoryParam === "Macbook"
            ? "MacBook"
            : (activeCategoryParam === "iPad" ? "iPad" : activeCategoryParam));
    titleEl.textContent = activeCategoryParam === "all" ? "Tất cả sản phẩm Apple" : `${displayCategoryTitle} chính hãng`;

    // Filter elements
    const sortVal = document.getElementById("catalog-sort-select").value;

    const allItems = [...products, ...combos];
    const normalizedCategory = CATEGORY_ROUTE_ALIASES[activeCategoryParam] || activeCategoryParam;
    const groupedCategories = CATEGORY_PAGE_GROUPS[activeCategoryParam] || [activeCategoryParam];

    // Main Filter Logic
    let filtered = allItems.filter(item => {
        const matchesCategory = activeCategoryParam === "all" ||
            item.category === activeCategoryParam ||
            item.category === normalizedCategory ||
            groupedCategories.includes(item.category);
        
        // Search bar
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Price Filter
        let matchesPrice = true;
        if (currentPriceFilters.length > 0) {
            matchesPrice = false;
            if (currentPriceFilters.includes("under20") && item.price < 20000000) matchesPrice = true;
            if (currentPriceFilters.includes("20to30") && item.price >= 20000000 && item.price <= 30000000) matchesPrice = true;
            if (currentPriceFilters.includes("30to40") && item.price >= 30000000 && item.price <= 40000000) matchesPrice = true;
            if (currentPriceFilters.includes("over40") && item.price > 40000000) matchesPrice = true;
        }

        // Storage capacity filter (parsing text)
        let matchesStorage = true;
        if (currentStorageFilters.length > 0) {
            matchesStorage = false;
            currentStorageFilters.forEach(cap => {
                if (item.name.includes(cap) || (item.specs && item.specs.storage && item.specs.storage.includes(cap))) {
                    matchesStorage = true;
                }
            });
        }

        return matchesCategory && matchesSearch && matchesPrice && matchesStorage;
    });

    // Sorting Logic
    if (sortVal === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    }

    // Render Grid items
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Vui lòng điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(item => {
        let isOutOfStock = false;
        let stockBadge = "";
        
        if (item.category === "Combo bán lẻ") {
            const prepacked = item.stock;
            const onDemand = getComboOnDemandCapacity(item);
            isOutOfStock = (prepacked + onDemand) <= 0;
            stockBadge = isOutOfStock
                ? `<span class="badge badge-danger product-badge">Hết hàng</span>`
                : `<span class="badge badge-success product-badge" style="background: rgba(175, 82, 222, 0.15); color: var(--accent-purple);">Combo sẵn: ${prepacked} • Lắp ráp: ${onDemand}</span>`;
        } else {
            isOutOfStock = item.stock <= 0 && item.ref !== "DV_BAOHANH";
            stockBadge = isOutOfStock 
                ? `<span class="badge badge-danger product-badge">Hết hàng</span>`
                : (item.ref === "DV_BAOHANH" 
                    ? `<span class="badge badge-info product-badge">Dịch vụ</span>`
                    : `<span class="badge badge-success product-badge">Còn ${item.stock} c</span>`);
        }

        const card = document.createElement("div");
        card.className = "product-card active";
        card.innerHTML = `
            ${stockBadge}
            <div class="product-image-box">
                <img src="${getPrimaryDisplayImage(item)}" alt="${item.name}" class="product-img">
            </div>
            <div class="product-info">
                <span class="product-category">${item.category}</span>
                <h3 class="product-name">${item.name}</h3>
                <span class="product-ref">SKU: ${item.ref}</span>
                <div class="product-footer">
                    <div class="product-price-box">
                        <span class="product-price">${formatVND(item.price)}</span>
                    </div>
                    <div class="product-actions">
                        <a href="#product/${item.ref}" class="btn-icon" title="Xem chi tiết">Xem</a>
                        <button class="btn-icon btn-cart-add-quick" data-ref="${item.ref}" ${isOutOfStock ? 'disabled style="background-color: var(--text-tertiary);"' : ''} title="Thêm vào giỏ">Thêm</button>
                    </div>
                </div>
            </div>
        `;

        card.querySelector(".btn-cart-add-quick")?.addEventListener("click", () => {
            addToCart(item.ref);
            alert(`Đã thêm ${item.name} vào giỏ hàng!`);
        });

        grid.appendChild(card);
    });
}

// Page 3: Product Detail View (ShopDunk layout)
function renderDetailPage() {
    const isCombo = activeProductRef.startsWith("BOM-");
    const itemObj = isCombo ? combos.find(c => c.ref === activeProductRef) : products.find(p => p.ref === activeProductRef);
    if (!itemObj) return;

    // Elements
    const mainImg = document.getElementById("detail-main-image");
    const itemName = document.getElementById("detail-item-name");
    const itemPrice = document.getElementById("detail-item-price");
    const itemStock = document.getElementById("detail-item-stock");
    const itemRef = document.getElementById("detail-item-ref");
    const itemCategory = document.getElementById("detail-item-category");
    const thumbnailCarousel = document.getElementById("detail-thumbnail-carousel");
    const thumbnailsRow = document.getElementById("detail-thumbnails-row");
    const thumbnailsPrevBtn = document.getElementById("detail-thumbnails-prev");
    const thumbnailsNextBtn = document.getElementById("detail-thumbnails-next");
    const specsBody = document.getElementById("detail-specs-table-body");
    const crosssellContainer = document.getElementById("detail-crosssell-list");
    const optionBox = document.querySelector(".detail-options-box");
    const colorGroup = document.getElementById("color-option-group");
    const colorOptionsRow = document.getElementById("color-options-row");
    const colorLabel = document.getElementById("selected-color-label");
    const capacityGroup = document.getElementById("capacity-option-group");
    const capacityOptionsRow = document.getElementById("capacity-options-row");
    const colorOptions = Array.isArray(itemObj.colors) ? itemObj.colors : [];
    let selectedColorName = !isCombo ? getSelectedColorName(itemObj.ref) : null;

    if (!isCombo && colorOptions.length > 0 && !colorOptions.some(option => option.name === selectedColorName)) {
        selectedColorName = colorOptions[0].name;
        setSelectedColorName(itemObj.ref, selectedColorName);
    }
    
    const galleryImages = getColorImageSet(itemObj, selectedColorName);

    // Set text
    applyGalleryEntry(mainImg, galleryImages[0] || itemObj.image);
    itemName.textContent = itemObj.name;
    itemPrice.textContent = formatVND(itemObj.price);
    itemRef.textContent = itemObj.ref;
    itemCategory.textContent = itemObj.category;
    
    // Stock status check
    let isOutOfStock = false;
    if (isCombo) {
        const prepacked = itemObj.stock;
        const onDemand = getComboOnDemandCapacity(itemObj);
        isOutOfStock = (prepacked + onDemand) <= 0;
        itemStock.innerHTML = isOutOfStock
            ? `<span class="badge badge-danger">Hết hàng</span>`
            : `<span class="badge badge-success" style="background: rgba(175, 82, 222, 0.15); color: var(--accent-purple);">Sẵn đóng gói: ${prepacked} c • Có thể lắp ráp: ${onDemand} c</span>`;
    } else {
        isOutOfStock = itemObj.stock <= 0 && itemObj.ref !== "DV_BAOHANH";
        itemStock.innerHTML = isOutOfStock
            ? `<span class="badge badge-danger">Tạm hết hàng</span>`
            : (itemObj.ref === "DV_BAOHANH" 
                ? `<span class="badge badge-info">Dịch vụ</span>` 
                : `<span class="badge badge-success">Sẵn sàng: còn ${itemObj.stock} máy</span>`);
    }

    // Disable CTA buttons if out of stock
    const buyNowBtn = document.getElementById("detail-buy-now-btn");
    const addCartBtn = document.getElementById("detail-add-cart-btn");
    if (isOutOfStock) {
        buyNowBtn.disabled = true;
        addCartBtn.disabled = true;
    } else {
        buyNowBtn.disabled = false;
        addCartBtn.disabled = false;
    }

    // Set Thumbnails Gallery
    let activeGalleryIndex = 0;
    let thumbnailWindowStart = 0;

    const syncThumbnailWindow = () => {
        const maxStart = Math.max(0, galleryImages.length - DETAIL_THUMBNAIL_WINDOW_SIZE);

        if (activeGalleryIndex < thumbnailWindowStart) {
            thumbnailWindowStart = activeGalleryIndex;
        } else if (activeGalleryIndex >= thumbnailWindowStart + DETAIL_THUMBNAIL_WINDOW_SIZE) {
            thumbnailWindowStart = activeGalleryIndex - DETAIL_THUMBNAIL_WINDOW_SIZE + 1;
        }

        thumbnailWindowStart = Math.min(Math.max(0, thumbnailWindowStart), maxStart);
    };

    const renderThumbnailWindow = () => {
        if (!thumbnailsRow) return;

        syncThumbnailWindow();
        thumbnailsRow.innerHTML = "";

        const hasOverflow = galleryImages.length > DETAIL_THUMBNAIL_WINDOW_SIZE;
        thumbnailCarousel?.classList.toggle("is-compact", !hasOverflow);

        galleryImages
            .slice(thumbnailWindowStart, thumbnailWindowStart + DETAIL_THUMBNAIL_WINDOW_SIZE)
            .forEach((entry, offset) => {
                const index = thumbnailWindowStart + offset;
                const img = document.createElement("img");
                applyGalleryEntry(img, entry);
                img.alt = `Ảnh ${index + 1} của ${itemObj.name}`;
                img.className = index === activeGalleryIndex ? "active" : "";
                img.addEventListener("click", () => {
                    activeGalleryIndex = index;
                    applyGalleryEntry(mainImg, galleryImages[activeGalleryIndex] || itemObj.image);
                    renderThumbnailWindow();
                });
                thumbnailsRow.appendChild(img);
            });

        if (thumbnailsPrevBtn) {
            thumbnailsPrevBtn.disabled = !hasOverflow || activeGalleryIndex <= 0;
        }

        if (thumbnailsNextBtn) {
            thumbnailsNextBtn.disabled = !hasOverflow || activeGalleryIndex >= galleryImages.length - 1;
        }
    };

    if (thumbnailsPrevBtn) {
        thumbnailsPrevBtn.onclick = () => {
            if (activeGalleryIndex <= 0) return;
            activeGalleryIndex -= 1;
            applyGalleryEntry(mainImg, galleryImages[activeGalleryIndex] || itemObj.image);
            renderThumbnailWindow();
        };
    }

    if (thumbnailsNextBtn) {
        thumbnailsNextBtn.onclick = () => {
            if (activeGalleryIndex >= galleryImages.length - 1) return;
            activeGalleryIndex += 1;
            applyGalleryEntry(mainImg, galleryImages[activeGalleryIndex] || itemObj.image);
            renderThumbnailWindow();
        };
    }

    renderThumbnailWindow();

    // Show/hide option groups depending on category
    if (optionBox) {
        const hasColorOptions = !isCombo && itemObj.category !== "Dịch vụ" && colorOptions.length > 0;
        const hasCapacityOptions = !isCombo && ["Điện thoại", "Laptop", "Tablet", "Đồng hồ"].includes(itemObj.category);

        optionBox.style.display = hasColorOptions || hasCapacityOptions ? "flex" : "none";

        if (colorGroup && colorOptionsRow) {
            colorGroup.style.display = hasColorOptions ? "block" : "none";
            colorOptionsRow.innerHTML = "";

            if (hasColorOptions) {
                const activeColorName = selectedColorName;

                if (colorLabel) {
                    colorLabel.textContent = activeColorName;
                }

                colorOptions.forEach(option => {
                    const btn = document.createElement("button");
                    btn.className = `color-btn${option.name === activeColorName ? " active" : ""}`;
                    btn.setAttribute("data-color", option.name);
                    btn.innerHTML = `<span style="background:${option.swatch};${option.border ? `border:${option.border};` : ""}"></span>${option.name}`;
                    btn.addEventListener("click", () => {
                        setSelectedColorName(itemObj.ref, option.name);
                        renderDetailPage();
                    });
                    colorOptionsRow.appendChild(btn);
                });
            } else if (colorLabel) {
                colorLabel.textContent = "";
            }
        }

        if (capacityGroup && capacityOptionsRow) {
            capacityGroup.style.display = hasCapacityOptions ? "block" : "none";
            capacityOptionsRow.innerHTML = "";

            if (hasCapacityOptions) {
                const storageSpec = itemObj.specs && itemObj.specs.storage ? itemObj.specs.storage : "Tiêu chuẩn";

                const capPill1 = document.createElement("button");
                capPill1.className = "capacity-pill active";
                capPill1.textContent = storageSpec;
                capacityOptionsRow.appendChild(capPill1);

                if (itemObj.category === "Điện thoại" && !storageSpec.includes("1 TB")) {
                    const capPill2 = document.createElement("button");
                    capPill2.className = "capacity-pill";
                    capPill2.textContent = storageSpec.includes("256") ? "512 GB" : "256 GB";
                    capPill2.onclick = () => alert("Tùy chọn dung lượng này hiện đang hết hàng. Vui lòng chọn bản tiêu chuẩn.");
                    capacityOptionsRow.appendChild(capPill2);
                }
            }
        }
    }

    // Set specs table
    specsBody.innerHTML = "";
    const specsMap = itemObj.specs || { display: "Chuẩn retina", storage: "N/A", camera: "-", battery: "Tiêu chuẩn", os: "Tương thích hệ sinh thái Apple" };
    const specFields = [
        { label: "Màn hình hiển thị", value: specsMap.display },
        { label: "Dung lượng bộ nhớ", value: specsMap.storage },
        { label: "Cấu hình Camera", value: specsMap.camera },
        { label: "Thời lượng Pin", value: specsMap.battery },
        { label: "Hệ điều hành", value: specsMap.os }
    ];
    specFields.forEach(field => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${field.label}</strong></td>
            <td>${field.value}</td>
        `;
        specsBody.appendChild(tr);
    });

    // Cross-sell list (AirPods, Adapter USB-C, Ốp MagSafe, Bảo hành)
    crosssellContainer.innerHTML = "";
    const crosssellRefs = ["AP_APL_APPRO3", "SAC_APL_USBC20W", "OP_APL_IP17PM_MAG", "DV_BAOHANH"];
    const crosssellItems = products.filter(p => crosssellRefs.includes(p.ref) && p.ref !== itemObj.ref);
    
    crosssellItems.forEach(cs => {
        const itemEl = document.createElement("div");
        itemEl.className = "crosssell-item";
        itemEl.style.display = "flex";
        itemEl.style.justifyContent = "space-between";
        itemEl.style.alignItems = "center";
        itemEl.style.padding = "0.75rem";
        itemEl.style.border = "1px solid var(--border-color)";
        itemEl.style.borderRadius = "8px";
        itemEl.style.marginBottom = "0.5rem";
        itemEl.style.backgroundColor = "var(--bg-secondary)";
        
        itemEl.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <img src="${cs.image}" alt="${cs.name}" style="width:40px; height:40px; object-fit:contain; background:#eee; padding:2px; border-radius:4px;">
                <div>
                    <div style="font-size:0.8rem; font-weight:600;">${cs.name}</div>
                    <div style="font-size:0.75rem; color:var(--price-color); font-weight:700;">+${formatVND(cs.price)}</div>
                </div>
            </div>
            <button class="btn btn-secondary btn-add-crosssell" style="padding:0.4rem 0.8rem; font-size:0.75rem; border-radius:15px;">Thêm</button>
        `;
        
        itemEl.querySelector(".btn-add-crosssell").addEventListener("click", () => {
            addToCart(cs.ref);
            alert(`Đã thêm phụ kiện ${cs.name} vào giỏ hàng!`);
        });
        
        crosssellContainer.appendChild(itemEl);
    });
}

// Binds Product details CTA buttons
document.getElementById("detail-buy-now-btn")?.addEventListener("click", () => {
    addToCart(activeProductRef, { color: getSelectedColorName(activeProductRef) });
    window.location.hash = "#cart";
});
document.getElementById("detail-add-cart-btn")?.addEventListener("click", () => {
    addToCart(activeProductRef, { color: getSelectedColorName(activeProductRef) });
    alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
});

// Page 4: Cart Page View
function renderCartPage() {
    const body = document.getElementById("cart-page-items-body");
    const emptyMsg = document.getElementById("cart-page-empty-msg");
    const subtotalEl = document.getElementById("cart-page-subtotal");
    const vatEl = document.getElementById("cart-page-vat");
    const grandtotalEl = document.getElementById("cart-page-grandtotal");
    const cartSummaryCard = document.querySelector(".cart-summary-card");

    if (!body) return;
    body.innerHTML = "";

    if (cart.length === 0) {
        body.parentElement.style.display = "none";
        emptyMsg.style.display = "block";
        cartSummaryCard.style.display = "none";
        return;
    }

    body.parentElement.style.display = "table";
    emptyMsg.style.display = "none";
    cartSummaryCard.style.display = "block";

    let subtotalVal = 0;

    cart.forEach((item, index) => {
        const isCombo = item.productRef.startsWith("BOM-");
        const itemObj = isCombo ? combos.find(c => c.ref === item.productRef) : products.find(p => p.ref === item.productRef);
        if (!itemObj) return;

        const rowPrice = itemObj.price * item.quantity;
        subtotalVal += rowPrice;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <img src="${getPrimaryDisplayImage(itemObj, item.color)}" alt="${itemObj.name}" style="width:60px; height:60px; object-fit:contain; background:#fff; padding:4px; border-radius:6px; border:1px solid var(--border-color);">
            </td>
            <td>
                <div style="font-weight:600; font-size:0.95rem;">${itemObj.name}</div>
                <div style="font-size:0.75rem; color:var(--text-tertiary); font-family:monospace; margin-top:2px;">SKU: ${itemObj.ref}</div>
                ${item.color ? `<div style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">Màu: ${item.color}</div>` : ""}
                ${isCombo ? '<span class="badge" style="background-color:rgba(175, 82, 222, 0.15); color:var(--accent-purple); padding:2px 6px; font-size:0.7rem; border-radius:4px; font-weight:600; display:inline-block; margin-top:4px;">Combo định mức BOM</span>' : ''}
            </td>
            <td class="text-center">
                <div class="quantity-control" style="margin: 0 auto;">
                    <button class="quantity-btn dec-qty-cart" data-index="${index}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn inc-qty-cart" data-index="${index}">+</button>
                </div>
            </td>
            <td class="text-right" style="font-weight:500;">${formatVND(itemObj.price)}</td>
            <td class="text-right" style="font-weight:700; color:var(--price-color);">${formatVND(rowPrice)}</td>
            <td class="text-center">
                <button class="remove-cart-item-btn" data-index="${index}" style="background:none; border:none; color:var(--text-tertiary); cursor:pointer; font-size:1.2rem;">&times;</button>
            </td>
        `;

        tr.querySelector(".dec-qty-cart").addEventListener("click", () => updateCartQtyByIndex(index, -1));
        tr.querySelector(".inc-qty-cart").addEventListener("click", () => updateCartQtyByIndex(index, 1));
        tr.querySelector(".remove-cart-item-btn").addEventListener("click", () => removeCartItemByIndex(index));

        body.appendChild(tr);
    });

    const vatVal = Math.round(subtotalVal * 0.1);
    const grandtotalVal = subtotalVal + vatVal;

    subtotalEl.textContent = formatVND(subtotalVal);
    vatEl.textContent = formatVND(vatVal);
    grandtotalEl.textContent = formatVND(grandtotalVal);
}

function updateCartQtyByIndex(index, diff) {
    const item = cart[index];
    if (!item) return;

    const isCombo = item.productRef.startsWith("BOM-");
    const itemObj = isCombo ? combos.find(c => c.ref === item.productRef) : products.find(p => p.ref === item.productRef);
    if (!itemObj) return;

    const newQty = item.quantity + diff;
    if (newQty <= 0) {
        removeCartItemByIndex(index);
    } else {
        let maxAvailable = isCombo ? (itemObj.stock + getComboOnDemandCapacity(itemObj)) : (itemObj.ref === "DV_BAOHANH" ? 9999 : itemObj.stock);
        const qtyOfSameProductOnOtherLines = cart.reduce((sum, cartItem, cartIndex) => {
            if (cartIndex === index) return sum;
            return cartItem.productRef === item.productRef ? sum + cartItem.quantity : sum;
        }, 0);

        if ((newQty + qtyOfSameProductOnOtherLines) <= maxAvailable) {
            item.quantity = newQty;
            renderCartPage();
            updateCartIconBadge();
        } else {
            alert(`Kho chỉ còn tối đa ${maxAvailable - qtyOfSameProductOnOtherLines} sản phẩm cho mẫu này.`);
        }
    }
}

function removeCartItemByIndex(index) {
    cart.splice(index, 1);
    renderCartPage();
    updateCartIconBadge();
}

function updateCartIconBadge() {
    let totalQty = 0;
    cart.forEach(item => totalQty += item.quantity);
    document.getElementById("cart-item-count").textContent = totalQty;
}

// Page 5: Checkout Page View
function renderCheckoutPage() {
    const listEl = document.getElementById("checkout-summary-items-list");
    const subtotalEl = document.getElementById("checkout-subtotal");
    const vatEl = document.getElementById("checkout-vat");
    const grandtotalEl = document.getElementById("checkout-grandtotal");

    if (!listEl) return;
    listEl.innerHTML = "";

    if (cart.length === 0) {
        window.location.hash = "#cart";
        return;
    }

    let subtotalVal = 0;
    cart.forEach(item => {
        const isCombo = item.productRef.startsWith("BOM-");
        const itemObj = isCombo ? combos.find(c => c.ref === item.productRef) : products.find(p => p.ref === item.productRef);
        if (!itemObj) return;

        const rowPrice = itemObj.price * item.quantity;
        subtotalVal += rowPrice;

        const el = document.createElement("div");
        el.className = "checkout-summary-item";
        el.style.display = "flex";
        el.style.justifyContent = "space-between";
        el.style.fontSize = "0.85rem";
        el.style.marginBottom = "8px";
        
        el.innerHTML = `
            <span>${itemObj.name}${item.color ? ` - ${item.color}` : ""} <strong>x${item.quantity}</strong></span>
            <strong>${formatVND(rowPrice)}</strong>
        `;
        listEl.appendChild(el);
    });

    const vatVal = Math.round(subtotalVal * 0.1);
    const grandtotalVal = subtotalVal + vatVal;

    subtotalEl.textContent = formatVND(subtotalVal);
    vatEl.textContent = formatVND(vatVal);
    grandtotalEl.textContent = formatVND(grandtotalVal);
}

// Submit payment order from checkout screen
document.getElementById("checkout-page-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Validate stocks
    const requestedQtyByRef = {};
    cart.forEach(item => {
        requestedQtyByRef[item.productRef] = (requestedQtyByRef[item.productRef] || 0) + item.quantity;
    });

    for (const [productRef, requestedQty] of Object.entries(requestedQtyByRef)) {
        const isCombo = productRef.startsWith("BOM-");
        const itemObj = isCombo ? combos.find(c => c.ref === productRef) : products.find(p => p.ref === productRef);
        let maxAvailable = isCombo ? (itemObj.stock + getComboOnDemandCapacity(itemObj)) : (itemObj.ref === "DV_BAOHANH" ? 9999 : itemObj.stock);
        if (requestedQty > maxAvailable) {
            alert(`Sản phẩm ${itemObj.name} hiện không đủ tồn kho để đáp ứng.`);
            return;
        }
    }

    const name = document.getElementById("checkout-page-name").value;
    const phone = document.getElementById("checkout-page-phone").value;
    const email = document.getElementById("checkout-page-email").value;
    const address = document.getElementById("checkout-page-address").value;
    const payment = document.querySelector('input[name="payment-method"]:checked').value;

    const orderId = `SO-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date();

    let orderItems = [];
    let subtotalVal = 0;

    cart.forEach(item => {
        const isCombo = item.productRef.startsWith("BOM-");
        
        if (isCombo) {
            const combo = combos.find(c => c.ref === item.productRef);
            subtotalVal += combo.price * item.quantity;
            
            let quantityToDeduct = item.quantity;
            let usedPrepackedImeis = [];
            let componentAllocations = [];

            // Direct pack check
            if (combo.stock > 0) {
                const fromPrepacked = Math.min(combo.stock, quantityToDeduct);
                combo.stock -= fromPrepacked;
                quantityToDeduct -= fromPrepacked;
                
                if (combo.imeis && combo.imeis.length > 0) {
                    usedPrepackedImeis = combo.imeis.slice(0, fromPrepacked);
                    combo.imeis = combo.imeis.filter(im => !usedPrepackedImeis.includes(im));
                    usedPrepackedImeis.forEach(im => {
                        combo.allocatedImeis.push({
                            imei: im,
                            orderId: orderId,
                            date: timestamp,
                            customerName: name
                        });
                    });
                }
            }

            // On-demand deduct
            if (quantityToDeduct > 0) {
                combo.components.forEach(comp => {
                    const prod = products.find(p => p.ref === comp.ref);
                    if (prod) {
                        const neededQty = comp.qty * quantityToDeduct;
                        let compImeis = [];
                        
                        if (prod.hasImei && prod.imeis.length >= neededQty) {
                            compImeis = prod.imeis.slice(0, neededQty);
                            prod.imeis = prod.imeis.filter(im => !compImeis.includes(im));
                            compImeis.forEach(im => {
                                prod.allocatedImeis.push({ imei: im, orderId: orderId, date: timestamp, customerName: name });
                            });
                        }
                        
                        prod.stock -= neededQty;
                        componentAllocations.push({
                            componentRef: prod.ref,
                            componentName: prod.name,
                            quantity: neededQty,
                            imeis: compImeis
                        });
                    }
                });
            }

            orderItems.push({
                productRef: combo.ref,
                name: combo.name,
                price: combo.price,
                quantity: item.quantity,
                color: item.color || null,
                isCombo: true,
                imeis: usedPrepackedImeis,
                componentAllocations: componentAllocations,
                warrantySelected: false,
                warrantyCost: 0
            });

        } else {
            const product = products.find(p => p.ref === item.productRef);
            subtotalVal += product.price * item.quantity;
            
            let allocatedImeis = [];
            if (product.hasImei && product.imeis.length >= item.quantity) {
                allocatedImeis = product.imeis.slice(0, item.quantity);
                product.imeis = product.imeis.filter(im => !allocatedImeis.includes(im));
                
                allocatedImeis.forEach(im => {
                    product.allocatedImeis.push({
                        imei: im,
                        orderId: orderId,
                        date: timestamp,
                        customerName: name
                    });
                });
            }
            
            if (product.ref !== "DV_BAOHANH") {
                product.stock -= item.quantity;
            }
            
            orderItems.push({
                productRef: product.ref,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                color: item.color || null,
                isCombo: false,
                imeis: allocatedImeis,
                warrantySelected: false,
                warrantyCost: 0
            });
        }
    });

    const vatVal = Math.round(subtotalVal * 0.1);
    const grandtotalVal = subtotalVal + vatVal;

    const newOrder = {
        orderId: orderId,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerAddress: address,
        paymentMethod: payment,
        paymentConfirmed: false,
        timestamp: timestamp,
        items: orderItems,
        subtotal: subtotalVal,
        warrantyTotal: 0,
        gst: vatVal,
        total: grandtotalVal
    };

    orders.push(newOrder);

    // ---------------- Synchronizing Odoo ERP simulation logs ----------------
    // Odoo CRM Customer Sync
    odooCrmLogs.push({
        name: name,
        email: email,
        phone: phone,
        date: timestamp
    });
    saveCrmLogs();

    // Odoo Sales Order Sync
    odooSalesLogs.push({
        soId: orderId,
        customer: name,
        amount: grandtotalVal,
        date: timestamp,
        status: "Đã xác nhận (SO Confirmed)"
    });

    // Reset Cart & inputs
    document.getElementById("checkout-page-form").reset();
    cart = [];
    updateCartIconBadge();

    // Trigger printed invoice modal
    openInvoiceModal(newOrder);

    // Switch view back to home
    window.location.hash = "#home";
});

// Reuse openInvoiceModal from previous iteration
function openInvoiceModal(order) {
    const invoiceReceiptContent = document.getElementById("invoice-receipt-content");
    const invoiceModal = document.getElementById("invoice-modal");
    if (!invoiceReceiptContent) return;

    invoiceReceiptContent.innerHTML = "";
    
    let itemsHtml = "";
    order.items.forEach(item => {
        let imeiDetailsHtml = "";
        
        if (item.isCombo) {
            let compsHtml = "";
            item.componentAllocations.forEach(alloc => {
                const imeiStr = alloc.imeis.length > 0 ? ` (IMEI: ${alloc.imeis.join(", ")})` : "";
                compsHtml += `<div style="font-size: 0.72rem; color: #666; padding-left: 10px;">+ ${alloc.componentName} x${alloc.quantity}${imeiStr}</div>`;
            });
            imeiDetailsHtml = `<div style="margin-top: 4px;">${compsHtml}</div>`;
        } else {
            imeiDetailsHtml = item.imeis.length > 0 
                ? `<div class="invoice-item-imeis">IMEI: ${item.imeis.join(", ")}</div>` 
                : "";
        }

        itemsHtml += `
            <tr>
                <td>
                    <span class="invoice-item-name">${item.name}</span>
                    ${item.color ? `<div style="font-size: 0.74rem; color: #666; margin-top: 2px;">Màu: ${item.color}</div>` : ""}
                    ${imeiDetailsHtml}
                </td>
                <td class="text-center">${item.quantity}</td>
                <td style="text-align: right;">${formatVND(item.price * item.quantity)}</td>
            </tr>
        `;
    });

    invoiceReceiptContent.innerHTML = `
        <div class="invoice-header">
            <h3 class="invoice-title">HÓA ĐƠN ODOO ERP</h3>
            <div class="invoice-status status-pending" id="invoice-status-badge">Chờ thanh toán</div>
            <p style="font-size: 0.8rem; color: #86868b; margin-top: 4px;">NextGen Apple Integration Store</p>
            <div class="invoice-meta">
                <span>Mã Sales Order: <strong>#${order.orderId}</strong></span>
                <span style="text-align: right;">Ngày xuất: <strong>${order.timestamp.toLocaleString('vi-VN')}</strong></span>
            </div>
        </div>
        <div class="invoice-lock-panel" id="invoice-lock-panel">
            <div class="invoice-lock-message">
                Hóa đơn đang ở trạng thái <strong>Chờ thanh toán</strong>.
                Tick xác nhận bên dưới để hiện đầy đủ hóa đơn.
            </div>
            <label class="payment-confirmation-box invoice-confirmation-box" for="invoice-payment-confirmed-checkbox">
                <input type="checkbox" id="invoice-payment-confirmed-checkbox">
                <span>
                    <strong>Tôi xác nhận đã thanh toán</strong>
                    <small>Chỉ tick khi tiền đã được xác nhận, sau đó hóa đơn sẽ hiển thị.</small>
                </span>
            </label>
        </div>

        <div class="invoice-details-panel is-hidden" id="invoice-details-panel">
            <div class="invoice-section-title">Khách hàng CRM</div>
            <div class="invoice-customer">
                <strong>Họ tên:</strong> ${order.customerName}<br>
                <strong>Điện thoại:</strong> ${order.customerPhone}<br>
                <strong>Email:</strong> ${order.customerEmail}<br>
                <strong>Địa chỉ:</strong> ${order.customerAddress}
            </div>

            <div class="invoice-section-title">Chi tiết mặt hàng</div>
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th style="width: 65%;">Sản phẩm / Combo</th>
                        <th class="text-center" style="width: 10%;">SL</th>
                        <th style="width: 25%; text-align: right;">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>

            <div class="invoice-summary">
                <div class="invoice-summary-row">
                    <span>Tạm tính hàng:</span>
                    <span>${formatVND(order.subtotal)}</span>
                </div>
                <div class="invoice-summary-row">
                    <span>Thuế hàng hóa GTGT / VAT (10%):</span>
                    <span>${formatVND(order.gst)}</span>
                </div>
                <div class="invoice-summary-row total">
                    <span>Thanh toán (${order.paymentMethod}):</span>
                    <span>${formatVND(order.total)}</span>
                </div>
            </div>

            <div class="invoice-footer">
                <p>Hệ thống Odoo v17 đã kết chuyển đơn hàng thành công!</p>
                <button class="btn btn-secondary" style="margin-top: 1.5rem; padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="window.print();">
                    In biên nhận
                </button>
            </div>
        </div>
    `;

    const invoiceConfirmCheckbox = document.getElementById("invoice-payment-confirmed-checkbox");
    const invoiceStatusBadge = document.getElementById("invoice-status-badge");
    const invoiceLockPanel = document.getElementById("invoice-lock-panel");
    const invoiceDetailsPanel = document.getElementById("invoice-details-panel");

    const syncInvoiceVisibility = () => {
        const confirmed = invoiceConfirmCheckbox?.checked || false;
        order.paymentConfirmed = confirmed;

        if (invoiceStatusBadge) {
            invoiceStatusBadge.textContent = confirmed ? "Đã thanh toán" : "Chờ thanh toán";
            invoiceStatusBadge.classList.toggle("status-paid", confirmed);
            invoiceStatusBadge.classList.toggle("status-pending", !confirmed);
        }

        invoiceLockPanel?.classList.toggle("is-hidden", confirmed);
        invoiceDetailsPanel?.classList.toggle("is-hidden", !confirmed);
    };

    invoiceConfirmCheckbox?.addEventListener("change", syncInvoiceVisibility);
    syncInvoiceVisibility();

    invoiceModal.classList.add("open");
}

document.getElementById("invoice-modal-close")?.addEventListener("click", () => {
    document.getElementById("invoice-modal").classList.remove("open");
});
document.getElementById("campaign-modal-close")?.addEventListener("click", closeCampaignModal);
document.getElementById("campaign-modal-dismiss")?.addEventListener("click", closeCampaignModal);
document.getElementById("campaign-modal-target")?.addEventListener("click", () => {
    closeCampaignModal();
});
document.getElementById("campaign-modal")?.addEventListener("click", event => {
    if (event.target.id === "campaign-modal") {
        closeCampaignModal();
    }
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCampaignModal();
    }
});

// Add listeners to reset checkboxes in filters
document.querySelector(".reset-filters-btn")?.addEventListener("click", () => {
    document.querySelectorAll(".price-filter-cb, .storage-filter-cb").forEach(cb => cb.checked = false);
    currentPriceFilters = [];
    currentStorageFilters = [];
    renderCatalogPage();
});

// Bind check boxes events on sidebar filters
document.addEventListener("change", (e) => {
    if (e.target.classList.contains("price-filter-cb")) {
        currentPriceFilters = Array.from(document.querySelectorAll(".price-filter-cb:checked")).map(cb => cb.value);
        renderCatalogPage();
    }
    if (e.target.classList.contains("storage-filter-cb")) {
        currentStorageFilters = Array.from(document.querySelectorAll(".storage-filter-cb:checked")).map(cb => cb.value);
        renderCatalogPage();
    }
});

// Sort select
document.getElementById("catalog-sort-select")?.addEventListener("change", renderCatalogPage);

// ---------------- Admin/Odoo Business Dashboard Logic ----------------
function updateAdminStats() {
    let totalRevenue = 0;
    let totalCostOfGoodsSold = 0;
    let totalCurrentStock = 0;

    orders.forEach(order => {
        totalRevenue += order.total;

        order.items.forEach(item => {
            if (item.isCombo) {
                const combo = combos.find(c => c.ref === item.productRef);
                if (combo) totalCostOfGoodsSold += combo.cost * item.quantity;
            } else {
                const prod = products.find(p => p.ref === item.productRef);
                if (prod) {
                    const itemCost = prod.cost * item.quantity;
                    totalCostOfGoodsSold += itemCost;
                }
            }
        });
    });

    products.forEach(p => {
        if (p.ref !== "DV_BAOHANH") {
            totalCurrentStock += p.stock;
        }
    });

    // Profit
    let grossSalesNoGst = 0;
    orders.forEach(order => {
        grossSalesNoGst += order.subtotal;
    });
    const totalProfit = grossSalesNoGst - totalCostOfGoodsSold;

    document.getElementById("stat-revenue").textContent = formatVND(totalRevenue);
    document.getElementById("stat-profit").textContent = formatVND(totalProfit >= 0 ? totalProfit : 0);
    document.getElementById("stat-total-stock").textContent = totalCurrentStock;
    document.getElementById("stat-orders-count").textContent = orders.length;

    renderAdminProductsTable();
    renderAdminImeisTable();
    renderHistoryLogs();
    renderOdooSyncLogs();
    renderContactLogs();
}

function renderAdminProductsTable() {
    const body = document.getElementById("admin-products-table-body");
    if (!body) return;
    body.innerHTML = "";
    
    products.forEach(prod => {
        const isLowStock = prod.stock < prod.minStock && prod.ref !== "DV_BAOHANH";
        const statusBadge = isLowStock
            ? `<span class="badge badge-danger">Dưới định mức</span>`
            : (prod.ref === "DV_BAOHANH" 
                ? `<span class="badge badge-info">Không giới hạn</span>`
                : `<span class="badge badge-success">An toàn</span>`);

        const actionBtn = isLowStock
            ? `<button class="btn-po-action" data-ref="${prod.ref}">Nhập PO</button>`
            : `<button class="btn-po-action disabled" disabled>Nhập PO</button>`;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="product-ref-code">${prod.ref}</span></td>
            <td><strong>${prod.name}</strong></td>
            <td>${prod.warehouse}</td>
            <td><span style="font-family: monospace; font-size:0.8rem;">${prod.location}</span></td>
            <td style="font-weight:700; color:${isLowStock ? 'var(--accent-red)' : 'inherit'}; text-align:center;">${prod.ref === "DV_BAOHANH" ? "∞" : prod.stock + " c"}</td>
            <td class="text-center">${prod.ref === "DV_BAOHANH" ? "-" : prod.minStock + " c"}</td>
            <td class="text-center">${prod.ref === "DV_BAOHANH" ? "-" : prod.maxStock + " c"}</td>
            <td>${statusBadge}</td>
            <td>${prod.ref === "DV_BAOHANH" ? "-" : actionBtn}</td>
        `;

        if (isLowStock) {
            tr.querySelector(".btn-po-action").addEventListener("click", () => triggerManualPO(prod.ref));
        }
        
        body.appendChild(tr);
    });
}

function triggerManualPO(ref) {
    const prod = products.find(p => p.ref === ref);
    if (!prod) return;

    const poQty = prod.maxStock - prod.stock;
    const totalCostVal = prod.cost * poQty;
    const timestamp = new Date();

    prod.stock = prod.maxStock;

    if (prod.hasImei && prod.imeiPrefix) {
        const indexStart = prod.allocatedImeis.length + prod.imeis.length + 1;
        for (let i = 0; i < poQty; i++) {
            prod.imeis.push(`${prod.imeiPrefix}-${String(indexStart + i).padStart(4, '0')}`);
        }
    }

    const poId = `PO-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    purchaseOrders.push({
        poId: poId,
        ref: prod.ref,
        name: prod.name,
        qty: poQty,
        totalCost: totalCostVal,
        date: timestamp
    });

    alert(`Đã lập đơn mua hàng Odoo PO ${poId} thành công cho ${prod.name}!`);
    updateAdminStats();
}

// Auto PO restock button
document.getElementById("auto-po-btn")?.addEventListener("click", () => {
    let createdCount = 0;
    let totalPOAmount = 0;
    const timestamp = new Date();

    products.forEach(prod => {
        if (prod.ref !== "DV_BAOHANH" && prod.stock < prod.minStock) {
            const poQty = prod.maxStock - prod.stock;
            const costAmount = prod.cost * poQty;
            
            prod.stock = prod.maxStock;
            
            if (prod.hasImei && prod.imeiPrefix) {
                const nextIndexStart = prod.allocatedImeis.length + prod.imeis.length + 1;
                for (let i = 0; i < poQty; i++) {
                    prod.imeis.push(`${prod.imeiPrefix}-${String(nextIndexStart + i).padStart(4, '0')}`);
                }
            }
            
            const poId = `PO-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
            purchaseOrders.push({
                poId: poId,
                ref: prod.ref,
                name: prod.name,
                qty: poQty,
                totalCost: costAmount,
                date: timestamp
            });

            createdCount++;
            totalPOAmount += costAmount;
        }
    });

    if (createdCount > 0) {
        alert(`Odoo Purchase Module: Đã hoàn tất lập ${createdCount} đơn mua hàng (PO) tự động. Tổng chi phí mua hàng: ${formatVND(totalPOAmount)}.`);
        updateAdminStats();
    } else {
        alert("Mức tồn kho ổn định, không cần đặt đơn PO.");
    }
});

// Admin Combo dropdown options
function initBomFormDropdown() {
    const select = document.getElementById("mo-combo-select");
    if (!select) return;
    
    select.innerHTML = '<option value="" disabled selected>-- Chọn Combo sản xuất --</option>';
    combos.forEach(combo => {
        const opt = document.createElement("option");
        opt.value = combo.ref;
        opt.textContent = `${combo.name} (${combo.ref})`;
        select.appendChild(opt);
    });
}

const moComboSelect = document.getElementById("mo-combo-select");
const moQtyInput = document.getElementById("mo-qty-input");
const moPreviewBox = document.getElementById("mo-preview-box");

moComboSelect?.addEventListener("change", updateMoFormPreview);
moQtyInput?.addEventListener("input", updateMoFormPreview);

function updateMoFormPreview() {
    const comboRef = moComboSelect.value;
    const qty = parseInt(moQtyInput.value) || 0;
    
    if (!comboRef || qty <= 0) {
        moPreviewBox.style.display = "none";
        return;
    }

    const combo = combos.find(c => c.ref === comboRef);
    if (!combo) return;

    let previewHtml = `<div class="mo-preview-title">Nhu cầu linh kiện (SL: ${qty} Combo)</div>`;
    let allSufficient = true;

    combo.components.forEach(comp => {
        const prod = products.find(p => p.ref === comp.ref);
        const neededTotal = comp.qty * qty;
        const currentStock = prod ? prod.stock : 0;
        const isSufficient = currentStock >= neededTotal;
        if (!isSufficient) allSufficient = false;

        previewHtml += `
            <div class="mo-preview-item ${isSufficient ? 'sufficient' : 'insufficient'}">
                <span>${comp.name} (${comp.ref})</span>
                <span class="comp-qty">Cần: ${neededTotal} | Kho: ${currentStock} (${isSufficient ? 'Đủ' : 'Thiếu'})</span>
            </div>
        `;
    });

    moPreviewBox.innerHTML = previewHtml;
    moPreviewBox.style.display = "block";
}

// Submit MO Form
document.getElementById("mo-creation-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const comboRef = moComboSelect.value;
    const qty = parseInt(moQtyInput.value);

    if (!comboRef || qty <= 0) return;

    const combo = combos.find(c => c.ref === comboRef);
    if (!combo) return;

    let canAssemble = true;
    combo.components.forEach(comp => {
        const prod = products.find(p => p.ref === comp.ref);
        if (!prod || prod.stock < (comp.qty * qty)) {
            canAssemble = false;
        }
    });

    if (!canAssemble) {
        alert("Odoo Manufacturing: Lệnh sản xuất thất bại! Linh kiện trong kho không đủ để đóng gói.");
        return;
    }

    // Deduct components
    const timestamp = new Date();
    combo.components.forEach(comp => {
        const prod = products.find(p => p.ref === comp.ref);
        if (prod) {
            const neededQty = comp.qty * qty;
            if (prod.hasImei && prod.imeis.length >= neededQty) {
                const extractedImeis = prod.imeis.slice(0, neededQty);
                prod.imeis = prod.imeis.filter(im => !extractedImeis.includes(im));
                
                extractedImeis.forEach(im => {
                    prod.allocatedImeis.push({
                        imei: im,
                        orderId: `MO-${combo.ref}-${timestamp.getTime().toString().slice(-4)}`,
                        date: timestamp,
                        customerName: "Lắp ráp đóng gói MO"
                    });
                    combo.imeis.push(`${im} (Linh kiện)`);
                });
            }
            prod.stock -= neededQty;
        }
    });

    combo.stock += qty;
    
    const moId = `MO-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    manufacturingOrders.push({
        moId: moId,
        comboRef: combo.ref,
        comboName: combo.name,
        qty: qty,
        date: timestamp
    });

    alert(`Odoo Manufacturing: Lập Lệnh MO ${moId} thành công! Đã đóng gói thêm ${qty} Combo.`);
    
    moComboSelect.value = "";
    moQtyInput.value = "1";
    moPreviewBox.style.display = "none";

    updateAdminStats();
    renderBomAccordion();
});

// Render BOM list
function renderBomAccordion() {
    const bomAccordionList = document.getElementById("bom-accordion-list");
    if (!bomAccordionList) return;
    
    bomAccordionList.innerHTML = "";
    combos.forEach(combo => {
        const acc = document.createElement("div");
        acc.className = "bom-accordion-item";
        
        let compRows = "";
        combo.components.forEach(comp => {
            const compObj = products.find(p => p.ref === comp.ref);
            const currentStock = compObj ? compObj.stock : 0;
            compRows += `
                <tr>
                    <td><strong>${comp.name}</strong></td>
                    <td><span class="product-ref-code">${comp.ref}</span></td>
                    <td class="text-center">${comp.qty}</td>
                    <td class="text-center">Cái</td>
                    <td style="color:${currentStock >= comp.qty ? 'var(--accent-green)' : 'var(--accent-red)'}; font-weight:600; text-align:center;">${currentStock} c</td>
                </tr>
            `;
        });

        acc.innerHTML = `
            <div class="bom-accordion-header">
                <div class="bom-title-info">
                    <strong>${combo.name}</strong>
                    <span class="bom-code">Mã Combo: ${combo.ref}</span>
                </div>
                <span class="bom-arrow">▼</span>
            </div>
            <div class="bom-accordion-body">
                <div style="font-size:0.8rem; margin-bottom:8px; color:var(--text-secondary);">
                    Giá vốn tổng: <strong>${formatVND(combo.cost)}</strong> | Bán đề xuất: <strong>${formatVND(combo.price)}</strong>
                </div>
                <table class="bom-comp-table">
                    <thead>
                        <tr>
                            <th>Thành phần</th>
                            <th>Mã SP</th>
                            <th class="text-center">SL định mức</th>
                            <th class="text-center">ĐVT</th>
                            <th class="text-center">Tồn kho khả dụng</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${compRows}
                    </tbody>
                </table>
            </div>
        `;

        acc.querySelector(".bom-accordion-header").addEventListener("click", () => {
            acc.classList.toggle("active");
        });

        bomAccordionList.appendChild(acc);
    });
}

function renderAdminImeisTable() {
    const body = document.getElementById("admin-imei-table-body");
    if (!body) return;
    body.innerHTML = "";
    
    let count = 0;
    products.forEach(prod => {
        if (!prod.hasImei) return;

        prod.imeis.forEach(imei => {
            count++;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${imei}</strong></td>
                <td>${prod.name}</td>
                <td><span class="product-ref-code">${prod.ref}</span></td>
                <td><span class="badge badge-success">Sẵn có</span></td>
                <td>Sẵn sàng bán ra tại <strong>${prod.warehouse}</strong> (${prod.location})</td>
            `;
            body.appendChild(tr);
        });

        prod.allocatedImeis.forEach(alloc => {
            count++;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${alloc.imei}</strong></td>
                <td>${prod.name}</td>
                <td><span class="product-ref-code">${prod.ref}</span></td>
                <td><span class="badge badge-danger">Đã bán</span></td>
                <td>
                    Mã đơn SO: <strong>#${alloc.orderId}</strong><br>
                    Khách: ${alloc.customerName}<br>
                    Thời gian: ${alloc.date.toLocaleDateString('vi-VN')}
                </td>
            `;
            body.appendChild(tr);
        });
    });

    if (count === 0) {
        body.innerHTML = '<tr><td colspan="5" class="text-center">Không có IMEI nào khả dụng.</td></tr>';
    }
}

function renderHistoryLogs() {
    const bodyMO = document.getElementById("admin-mo-history-table-body");
    const bodyPO = document.getElementById("admin-po-history-table-body");

    if (bodyMO) {
        bodyMO.innerHTML = "";
        if (manufacturingOrders.length === 0) {
            bodyMO.innerHTML = '<tr><td colspan="4" class="text-center">Chưa có lệnh sản xuất.</td></tr>';
        } else {
            [...manufacturingOrders].reverse().forEach(mo => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>${mo.moId}</strong></td>
                    <td>${mo.comboName}</td>
                    <td class="text-center"><strong>${mo.qty}</strong></td>
                    <td>${mo.date.toLocaleString('vi-VN')}</td>
                `;
                bodyMO.appendChild(tr);
            });
        }
    }

    if (bodyPO) {
        bodyPO.innerHTML = "";
        if (purchaseOrders.length === 0) {
            bodyPO.innerHTML = '<tr><td colspan="5" class="text-center">Chưa có đơn mua hàng.</td></tr>';
        } else {
            [...purchaseOrders].reverse().forEach(po => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>${po.poId}</strong></td>
                    <td>${po.name}</td>
                    <td class="text-center"><strong>+${po.qty}</strong></td>
                    <td>${formatVND(po.totalCost)}</td>
                    <td>${po.date.toLocaleString('vi-VN')}</td>
                `;
                bodyPO.appendChild(tr);
            });
        }
    }
}

// Render Odoo Sync sales/contacts database logs
function renderOdooSyncLogs() {
    const salesLog = document.getElementById("odoo-sales-log");
    const crmLog = document.getElementById("odoo-crm-log");

    if (salesLog) {
        salesLog.innerHTML = "";
        if (odooSalesLogs.length === 0) {
            salesLog.innerHTML = '<div style="color:var(--text-tertiary);">Chưa có Sales Order nào đồng bộ.</div>';
        } else {
            [...odooSalesLogs].reverse().forEach(log => {
                const el = document.createElement("div");
                el.style.padding = "8px";
                el.style.borderBottom = "1px solid var(--border-color)";
                el.style.backgroundColor = "var(--bg-secondary)";
                el.style.borderRadius = "6px";
                el.innerHTML = `
                    <strong>${log.soId}</strong> - Khách: ${log.customer}<br>
                    Trị giá: <strong style="color:var(--accent-blue);">${formatVND(log.amount)}</strong> | <span style="color:var(--accent-green); font-weight:600;">${log.status}</span><br>
                    <span style="font-size:0.7rem; color:var(--text-tertiary);">Đồng bộ: ${log.date.toLocaleTimeString('vi-VN')}</span>
                `;
                salesLog.appendChild(el);
            });
        }
    }

    if (crmLog) {
        crmLog.innerHTML = "";
        if (odooCrmLogs.length === 0) {
            crmLog.innerHTML = '<div style="color:var(--text-tertiary);">Chưa có thông tin khách hàng CRM.</div>';
        } else {
            [...odooCrmLogs].reverse().forEach(log => {
                const el = document.createElement("div");
                el.style.padding = "8px";
                el.style.borderBottom = "1px solid var(--border-color)";
                el.style.backgroundColor = "var(--bg-secondary)";
                el.style.borderRadius = "6px";
                if (log.type === "contact") {
                    el.innerHTML = `
                        <strong>${log.name}</strong> - ${log.email}<br>
                        <span style="color:var(--accent-purple); font-weight:600;">Liên hệ hỗ trợ</span> | Chủ đề: ${log.subject}<br>
                        <div style="margin-top:4px; color:var(--text-secondary); white-space:pre-wrap;">${log.message}</div>
                        <span style="font-size:0.7rem; color:var(--text-tertiary);">Đã gửi: ${log.date.toLocaleString('vi-VN')}</span>
                    `;
                } else {
                    el.innerHTML = `
                        <strong>${log.name}</strong> - ${log.email}<br>
                        SĐT: ${log.phone} | <span style="color:var(--accent-purple); font-weight:600;">Đồng bộ Odoo Contacts</span><br>
                        <span style="font-size:0.7rem; color:var(--text-tertiary);">Đồng bộ: ${log.date.toLocaleTimeString('vi-VN')}</span>
                    `;
                }
                crmLog.appendChild(el);
            });
        }
    }
}

function renderContactLogs() {
    const list = document.getElementById("contact-logs-list");
    if (!list) return;

    const contactLogs = getContactLogs().map(normalizeContactLog).reverse();
    list.innerHTML = "";

    if (contactLogs.length === 0) {
        list.innerHTML = '<div style="color:var(--text-tertiary);">Chưa có yêu cầu liên hệ nào.</div>';
        return;
    }

    contactLogs.forEach(log => {
        const card = document.createElement("div");
        card.style.padding = "1rem";
        card.style.border = "1px solid var(--border-color)";
        card.style.borderRadius = "12px";
        card.style.background = "var(--bg-tertiary)";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap; margin-bottom:0.5rem;">
                <strong>${log.name}</strong>
                <span style="font-size:0.75rem; color:var(--text-tertiary);">${log.date.toLocaleString('vi-VN')}</span>
            </div>
            <div style="font-size:0.85rem; line-height:1.6;">
                <div><strong>Email:</strong> ${log.email}</div>
                <div><strong>Chủ đề:</strong> ${log.subject}</div>
                <div style="margin-top:0.5rem; white-space:pre-wrap; color:var(--text-secondary);">${log.message}</div>
            </div>
        `;
        list.appendChild(card);
    });
}

function renderContactRecentList() {
    const list = document.getElementById("contact-recent-list");
    if (!list) return;

    const contactLogs = getContactLogs().map(normalizeContactLog).reverse().slice(0, 3);
    list.innerHTML = "";

    if (contactLogs.length === 0) {
        list.innerHTML = '<div style="color:var(--text-tertiary);">Chưa có yêu cầu nào được gửi.</div>';
        return;
    }

    contactLogs.forEach(log => {
        const row = document.createElement("div");
        row.style.padding = "0.9rem 1rem";
        row.style.border = "1px solid var(--border-color)";
        row.style.borderRadius = "10px";
        row.style.background = "var(--bg-secondary)";
        row.innerHTML = `
            <div style="display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap;">
                <strong>${log.name}</strong>
                <span style="font-size:0.72rem; color:var(--text-tertiary);">${log.date.toLocaleString('vi-VN')}</span>
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.35rem;">
                <div><strong>Chủ đề:</strong> ${log.subject}</div>
                <div style="white-space:pre-wrap; margin-top:0.35rem;">${log.message}</div>
            </div>
        `;
        list.appendChild(row);
    });
}

// ---------------- Navigation Actions Binds ----------------

// Bind click on Admin Dashboard link toggle
document.getElementById("admin-toggle-btn")?.addEventListener("click", () => {
    window.location.hash = "#admin-odoo";
});

document.addEventListener("click", (e) => {
    const tabBtn = e.target.closest?.(".admin-tab-btn");
    if (!tabBtn) return;
    setAdminTab(tabBtn.dataset.tab);
});

document.getElementById("open-contact-logs-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    openContactLogsInERP();
});

document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name")?.value.trim();
    const email = document.getElementById("contact-email")?.value.trim();
    const subject = document.getElementById("contact-subject")?.value.trim();
    const message = document.getElementById("contact-msg")?.value.trim();

    if (!name || !email || !subject || !message) return;

    odooCrmLogs.push({
        type: "contact",
        name,
        email,
        subject,
        message,
        phone: "",
        date: new Date(),
        source: "contact-form"
    });

    saveCrmLogs();
    renderOdooSyncLogs();
    renderContactLogs();
    renderContactRecentList();

    alert("Cảm ơn bạn! Yêu cầu của bạn đã được lưu vào CRM.");
    e.target.reset();

    openContactLogsInERP();
});

document.getElementById("export-contact-logs-btn")?.addEventListener("click", () => {
    const contactLogs = getContactLogs();
    const blob = new Blob([JSON.stringify(contactLogs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nextgen-contact-logs-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
});

document.getElementById("clear-contact-logs-btn")?.addEventListener("click", () => {
    if (!confirm("Xóa toàn bộ danh sách liên hệ đã lưu?")) return;
    odooCrmLogs = odooCrmLogs.filter(log => log.type !== "contact");
    saveCrmLogs();
    renderOdooSyncLogs();
    renderContactLogs();
    renderContactRecentList();
});

// Search input triggers
const navSearchInput = document.getElementById("nav-search-input");
navSearchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    if (activePage !== "category") {
        window.location.hash = "#category/all";
    } else {
        renderCatalogPage();
    }
});

// ---------------- Initialize Application ----------------
function initApp() {
    initMasterData();
    
    // Hash Routing listen
    window.addEventListener("hashchange", handleRouter);
    
    // Initial router execute
    handleRouter();
    
    // Setup initial dots and elements
    updateCartIconBadge();
    bindCampaignBanners();

    // Slider Initialization
    const sliderContainer = document.getElementById("slider-container");
    const sliderPrevBtn = document.getElementById("slider-prev-btn");
    const sliderNextBtn = document.getElementById("slider-next-btn");
    const sliderDotsContainer = document.getElementById("slider-dots-container");
    const slides = document.querySelectorAll(".slide");
    
    if (sliderContainer && sliderDotsContainer && slides.length > 0) {
        sliderDotsContainer.innerHTML = "";
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("slider-dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => showSlide(index));
            sliderDotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll(".slider-dot");

        function showSlide(index) {
            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;
            
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[currentSlide]) dots[currentSlide].classList.add("active");
        }

        function startSliderAutoPlay() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 6000);
        }
        
        sliderNextBtn?.addEventListener("click", () => {
            showSlide(currentSlide + 1);
            startSliderAutoPlay();
        });
        
        sliderPrevBtn?.addEventListener("click", () => {
            showSlide(currentSlide - 1);
            startSliderAutoPlay();
        });
        
        startSliderAutoPlay();
    }
}

// Global checkout item adder helper
function addToCart(ref, options = {}) {
    if (ref === "DV_BAOHANH") {
        const existing = cart.find(item => item.productRef === ref);
        if (existing) return;
    }
    
    const isCombo = ref.startsWith("BOM-");
    const itemObj = isCombo ? combos.find(c => c.ref === ref) : products.find(p => p.ref === ref);
    if (!itemObj) return;

    let availableStock = isCombo ? (itemObj.stock + getComboOnDemandCapacity(itemObj)) : (itemObj.ref === "DV_BAOHANH" ? 9999 : itemObj.stock);
    if (availableStock <= 0) return;

    const selectedColor = options.color || getSelectedColorName(ref);
    const qtyAlreadyInCart = cart.reduce((sum, item) => item.productRef === ref ? sum + item.quantity : sum, 0);
    const cartItem = ref === "DV_BAOHANH"
        ? cart.find(item => item.productRef === ref)
        : cart.find(item => item.productRef === ref && item.color === selectedColor);

    if (cartItem) {
        if (qtyAlreadyInCart < availableStock) {
            cartItem.quantity++;
        }
    } else {
        if (qtyAlreadyInCart >= availableStock) return;
        cart.push({
            productRef: ref,
            color: selectedColor || null,
            quantity: 1,
            warrantySelected: false
        });
    }
    updateCartIconBadge();
}

// Run app
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", initApp) : initApp();

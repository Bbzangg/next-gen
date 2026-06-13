const APP_DATA = {
    rawProducts: [
        {
            name: "iPhone 15 128GB",
            category: "Điện thoại",
            brand: "Apple",
            ref: "IP_APL_IP15_128",
            price: 17990000,
            cost: 15500000,
            initialStock: 5,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IP15",
            specs: { display: "6.1\" Super Retina XDR OLED", storage: "128 GB", camera: "Dual 48MP + 12MP", battery: "Lên đến 20 giờ", os: "iOS 17" },
            image: "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-color-lineup-230912_big.jpg.large.jpg"
        },
        {
            name: "iPhone 16 Pro 1TB",
            category: "Điện thoại",
            brand: "Apple",
            ref: "IP_APL_IP16PRO_1TB",
            price: 39490000,
            cost: 34000000,
            initialStock: 5,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IP16P",
            specs: { display: "6.3\" ProMotion OLED 120Hz", storage: "1 TB", camera: "Triple 48MP + 48MP + 12MP Tele", battery: "Lên đến 23 giờ", os: "iOS 18" },
            image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg"
        },
        {
            name: "iPhone 17 256GB",
            category: "Điện thoại",
            brand: "Apple",
            ref: "IP_APL_IP17_256",
            price: 24990000,
            cost: 21500000,
            initialStock: 6,
            minStock: 3,
            maxStock: 53,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IP17",
            specs: { display: "6.3\" Super Retina OLED 120Hz", storage: "256 GB", camera: "Dual Fusion 48MP + 24MP", battery: "Lên đến 24 giờ", os: "iOS 19" },
            image: "https://www.apple.com/v/iphone-17/f/images/overview/welcome/hero_startframe__e9e7pcnguyqi_xlarge.jpg"
        },
        {
            name: "iPhone 17 Pro Max 256GB",
            category: "Điện thoại",
            brand: "Apple",
            ref: "IP_APL_IP17PM_256",
            price: 36990000,
            cost: 32000000,
            initialStock: 4,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IP17PM",
            specs: { display: "6.9\" ProMotion OLED Super Thin", storage: "256 GB", camera: "Triple Pro Fusion 48MP + 48MP + 48MP", battery: "Lên đến 29 giờ", os: "iOS 19" },
            image: "https://www.apple.com/v/iphone-17-pro/f/images/overview/welcome/hero__bsveixlwbms2_xlarge.jpg"
        },
        {
            name: "iPhone 17e 256GB",
            category: "Điện thoại",
            brand: "Apple",
            ref: "IP_APL_IP17E_256",
            price: 17590000,
            cost: 15000000,
            initialStock: 8,
            minStock: 3,
            maxStock: 53,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IP17E",
            specs: { display: "6.1\" OLED Liquid Retina", storage: "256 GB", camera: "Dual 48MP + 12MP Portrait", battery: "Lên đến 21 giờ", os: "iOS 19" },
            image: "https://www.apple.com/v/iphone-17e/b/images/overview/welcome/hero_endframe__eafizd06t6qa_large.jpg"
        },
        {
            name: "iPhone Air 256GB",
            category: "Điện thoại",
            brand: "Apple",
            ref: "IP_APL_IPAIR_256",
            price: 22990000,
            cost: 19500000,
            initialStock: 3,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IPAIR",
            specs: { display: "6.6\" Ultra Slim OLED Display", storage: "256 GB", camera: "Single Fusion Pro 48MP", battery: "Lên đến 22 giờ", os: "iOS 19" },
            image: "https://www.apple.com/v/iphone-air/f/images/overview/welcome/hero__c8vidxwr9imq_xlarge.jpg"
        },
        {
            name: "MacBook Air 13 inch M5 16GB/512GB",
            category: "Laptop",
            brand: "Apple",
            ref: "MB_APL_AIRM5_16_512",
            price: 29490000,
            cost: 25500000,
            initialStock: 3,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-MBAIRM5",
            specs: { display: "13.6\" Liquid Retina Display", storage: "512 GB SSD (16GB RAM)", camera: "1080p FaceTime HD", battery: "Lên đến 18 giờ", os: "macOS Sequoia" },
            image: "https://www.apple.com/v/macbook-air/z/images/overview/hero/hero_static__c9sislzzicq6_large.png"
        },
        {
            name: "MacBook Neo 13 inch A18 Pro 8GB/256GB",
            category: "Laptop",
            brand: "Apple",
            ref: "MB_APL_NEO13_8_256",
            price: 15990000,
            cost: 13800000,
            initialStock: 2,
            minStock: 3,
            maxStock: 53,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-MBNEO13",
            specs: { display: "13.3\" LED-backlit IPS Display", storage: "256 GB SSD (8GB RAM)", camera: "720p FaceTime HD", battery: "Lên đến 15 giờ", os: "macOS Sonoma" },
            image: "https://www.apple.com/v/macbook-neo/b/images/overview/welcome/hero_endframe__c62q483im5si_xlarge.jpg"
        },
        {
            name: "MacBook Pro 14 inch M5 16GB/512GB/10GPU",
            category: "Laptop",
            brand: "Apple",
            ref: "MB_APL_PROM5_16_512",
            price: 41490000,
            cost: 36000000,
            initialStock: 2,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-MBPROM5",
            specs: { display: "14.2\" Liquid Retina XDR Mini-LED", storage: "512 GB SSD (16GB RAM)", camera: "1080p FaceTime HD Pro", battery: "Lên đến 22 giờ", os: "macOS Sequoia" },
            image: "https://www.apple.com/v/macbook-pro/ax/images/overview/welcome/hero_endframe__fwev9ebh42mq_xlarge.jpg"
        },
        {
            name: "iPad A16 WiFi 128 GB",
            category: "Tablet",
            brand: "Apple",
            ref: "IPD_APL_A16_128_WIFI",
            price: 9290000,
            cost: 8000000,
            initialStock: 4,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IPDA16",
            specs: { display: "10.9\" Liquid Retina Display", storage: "128 GB", camera: "12MP Wide Camera", battery: "Lên đến 10 giờ", os: "iPadOS 17" },
            image: "https://www.apple.com/v/ipad-11/d/images/overview/hero/hero__crzh9misvcuq_large.jpg"
        },
        {
            name: "iPad Air M4 11 inch WiFi 128GB",
            category: "Tablet",
            brand: "Apple",
            ref: "IPD_APL_AIRM4_11_128",
            price: 16390000,
            cost: 14200000,
            initialStock: 3,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-IPDAIRM4",
            specs: { display: "11\" Liquid Retina M4 Display", storage: "128 GB (M4 Apple Chip)", camera: "12MP Wide Back, 12MP Ultra Wide Front", battery: "Lên đến 10 giờ", os: "iPadOS 18" },
            image: "https://www.apple.com/v/ipad-air/ah/images/overview/hero/hero_endframe__6gl84bccyaqi_large.png"
        },
        {
            name: "AirPods Max 2",
            category: "Tai nghe",
            brand: "Apple",
            ref: "AP_APL_APMAX2",
            price: 14990000,
            cost: 13000000,
            initialStock: 4,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-APMAX2",
            specs: { display: "Tai nghe Chụp tai Over-ear", storage: "Hộp sạc Smart Case", camera: "- Không có -", battery: "Lên đến 20 giờ", os: "Tương thích Apple/Android" },
            image: "https://www.apple.com/v/airpods-max/k/images/overview/welcome/max-loop_startframe__c0vn1ukmh7ma_xlarge.jpg"
        },
        {
            name: "Apple Watch SE 3 GPS",
            category: "Đồng hồ",
            brand: "Apple",
            ref: "AW_APL_SE3_40_GPS",
            price: 8390000,
            cost: 7200000,
            initialStock: 2,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-AWSE3",
            specs: { display: "40mm Retina LTPO OLED", storage: "32 GB", camera: "- Không có -", battery: "Lên đến 18 giờ", os: "watchOS 11" },
            image: "https://www.apple.com/v/apple-watch-se-3/b/images/overview/highlights/highlights_sleep_score__gg1jx7w3zfee_large.jpg"
        },
        {
            name: "Apple Watch Series 11 GPS",
            category: "Đồng hồ",
            brand: "Apple",
            ref: "AW_APL_S11_42_GPS",
            price: 11190000,
            cost: 9600000,
            initialStock: 4,
            minStock: 2,
            maxStock: 52,
            warehouse: "Kho Trung Tâm",
            location: "WH/Stock",
            hasImei: true,
            imeiPrefix: "IMEI-AWS11",
            specs: { display: "42mm Always-on Retina Display", storage: "64 GB", camera: "- Không có -", battery: "Lên đến 36 giờ (Chế độ nguồn thấp)", os: "watchOS 12" },
            image: "https://www.apple.com/v/apple-watch-series-11/c/images/overview/highlights/highlights_sleep_score__dl1y2j6kkouq_large.jpg"
        },
        {
            name: "AirPods 4",
            category: "Tai nghe",
            brand: "Apple",
            ref: "AP_APL_AP4",
            price: 3490000,
            cost: 2950000,
            initialStock: 10,
            minStock: 5,
            maxStock: 55,
            warehouse: "Kho Đóng Gói",
            location: "CW/Tồn kho",
            hasImei: true,
            imeiPrefix: "IMEI-AP4",
            specs: { display: "Tai nghe nhét tai Semi-open", storage: "Hộp sạc Type-C", camera: "- Không có -", battery: "Lên đến 30 giờ (Kèm hộp sạc)", os: "Chip H2 Apple" },
            image: "https://www.apple.com/v/airpods-4/g/images/overview/bento-gallery/bento_case_open__63kccmu775u6_xlarge.jpg"
        },
        {
            name: "AirPods Pro 3",
            category: "Tai nghe",
            brand: "Apple",
            ref: "AP_APL_APPRO3",
            price: 6590000,
            cost: 5700000,
            initialStock: 8,
            minStock: 5,
            maxStock: 55,
            warehouse: "Kho Đóng Gói",
            location: "CW/Tồn kho",
            hasImei: true,
            imeiPrefix: "IMEI-APPRO3",
            specs: { display: "Tai nghe đệm cao su ANC 2.0", storage: "Hộp sạc MagSafe (USB-C)", camera: "- Không có -", battery: "Lên đến 6 giờ nghe (Chống ồn)", os: "Chip H2 nâng cấp" },
            image: "https://www.apple.com/v/airpods-pro/s/images/overview/welcome/hero__b0eal3mn03ua_large.jpg"
        },
        {
            name: "Adapter USB-C 20W",
            category: "Phụ kiện",
            brand: "Apple",
            ref: "SAC_APL_USBC20W",
            price: 540000,
            cost: 450000,
            initialStock: 20,
            minStock: 10,
            maxStock: 60,
            warehouse: "Kho Đóng Gói",
            location: "CW/Tồn kho",
            hasImei: true,
            imeiPrefix: "IMEI-SAC",
            specs: { display: "Củ sạc nhanh 20W", storage: "Cổng ra USB-C", camera: "- Không có -", battery: "Đầu ra PD 3.0", os: "Tương thích iPhone/iPad" },
            image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWVV3?.v=ZGMwamVQM3NMNFF3dllBOFdrb0RHV2orYzFkTG5HaE9wejd5WUxYZjRMK0xZRW05UENvR2I1ditwQTlTUkJwZHVBYVpQODZ2VDA1a1lBSm83UHYrTWc&fmt=jpeg&hei=2000&qlt=90&wid=2000"
        },
        {
            name: "Cáp sạc type C 1m",
            category: "Phụ kiện",
            brand: "Apple",
            ref: "CAP_APL_TC1M",
            price: 540000,
            cost: 450000,
            initialStock: 25,
            minStock: 15,
            maxStock: 65,
            warehouse: "Kho Đóng Gói",
            location: "CW/Tồn kho",
            hasImei: false,
            specs: { display: "Cáp sạc bọc dù bền bỉ", storage: "Độ dài 1 mét", camera: "- Không có -", battery: "Tải điện tối đa 60W", os: "Kết nối Type-C sang Type-C" },
            image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU2G3?.v=VDR6aHRWaDFmcExoSmNtMlQ5c0hoUUhqc0NvK2RZTVd5TWVhUDFuQlo0MWxsQUIyWU0zbSt0MzZmM0dGczBmWTBRdVRwV25xV1pnRHIzRlMzQnRJVlE&fmt=png-alpha&hei=582&wid=532"
        },
        {
            name: "AirTag",
            category: "Phụ kiện",
            brand: "Apple",
            ref: "AT_APL_AIRTAG",
            price: 790000,
            cost: 660000,
            initialStock: 20,
            minStock: 10,
            maxStock: 60,
            warehouse: "Kho Đóng Gói",
            location: "CW/Tồn kho",
            hasImei: true,
            imeiPrefix: "IMEI-AIRTAG",
            specs: { display: "Thiết bị định vị tí hon", storage: "Pin CR2032 (Thay thế được)", camera: "- Không có -", battery: "Lên đến 1 năm sử dụng", os: "Tích hợp ứng dụng Tìm (Find My)" },
            image: "https://www.apple.com/newsroom/images/product/accessories/standard/Apple_airtag-front-and-back-emoji-2up_042021_big.jpg.large.jpg"
        },
        {
            name: "Apple Pencil Pro",
            category: "Phụ kiện",
            brand: "Apple",
            ref: "PEN_APL_APPRO",
            price: 3290000,
            cost: 2590000,
            initialStock: 6,
            minStock: 3,
            maxStock: 53,
            warehouse: "Kho Đóng Gói",
            location: "CW/Tồn kho",
            hasImei: true,
            imeiPrefix: "IMEI-PENCIL",
            specs: { display: "Bút cảm ứng nâng cấp Pro", storage: "Kết nối Từ tính sạc không dây", camera: "- Không có -", battery: "Sạc không dây tự động", os: "Hỗ trợ iPad Pro/Air M4" },
            image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MX2D3?.v=WDY3dTduUFdPR3ZjMDl4NGwxNzAyV2orYzFkTG5HaE9wejd5WUxYZjRML2tyK21QQVlqVGgrcGQ5Uy9BWWRGOUU5TjEzNDVxWGZyenF5K251RnVTZXc&fmt=jpeg&hei=2000&qlt=90&wid=2000"
        },
        {
            name: "Ốp lưng MagSafe iPhone 17 Pro Max TechWoven Apple",
            category: "Phụ kiện",
            brand: "Apple",
            ref: "OP_APL_IP17PM_MAG",
            price: 1690000,
            cost: 1200000,
            initialStock: 20,
            minStock: 10,
            maxStock: 60,
            warehouse: "Kho Đóng Gói",
            location: "CW/Tồn kho",
            hasImei: false,
            specs: { display: "Chất liệu TechWoven dệt mịn", storage: "Vòng nam châm MagSafe", camera: "- Không có -", battery: "- Không có -", os: "Dành riêng cho iPhone 17 Pro Max" },
            image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF94?.v=RlJGbzFMZlh1OFEyWGhlaVNpUTRzMmorYzFkTG5HaE9wejd5WUxYZjRMOHJTRTZ5Yi94UDBnUUhiU2ZvQ2ZITjkxR0pjRk9DZEtEVWM2WWdpYy9DMkE&fmt=jpeg&hei=2000&qlt=90&wid=2000"
        },
        {
            name: "Gói bảo hành",
            category: "Dịch vụ",
            brand: "Apple",
            ref: "DV_BAOHANH",
            price: 500000,
            cost: 150000,
            initialStock: 0,
            minStock: 0,
            maxStock: 0,
            warehouse: "-",
            location: "-",
            hasImei: false,
            specs: { display: "Dịch vụ mở rộng Apple Care", storage: "Bảo hành 12 tháng tại cửa hàng", camera: "- Không có -", battery: "- Không có -", os: "Áp dụng cho mọi thiết bị Apple" },
            image: "https://www.apple.com/v/applecare/d/images/overview/hero/hero__d4bput78wzu6_xlarge.jpg"
        }
    ],

    // Retail combos definition
    combos: [
        {
            ref: "BOM-001",
            name: "Combo iPhone 17 Pro Max + AirPods Pro 3",
            category: "Combo bán lẻ",
            brand: "Apple",
            price: 43990000,
            cost: 37150000,
            stock: 0,
            initialStock: 0,
            hasImei: false,
            imeis: [],
            allocatedImeis: [],
            components: [
            { ref: "IP_APL_IP17PM_256", name: "iPhone 17 Pro Max 256GB", qty: 1 },
            { ref: "AP_APL_APPRO3", name: "AirPods Pro 3", qty: 1 },
            { ref: "CAP_APL_TC1M", name: "Cáp sạc type C 1m", qty: 1 }
            ],
            specs: { display: "Combo trọn gói", storage: "iPhone 256GB + AirPods Pro", camera: "Pro Triple", battery: "Sử dụng cả ngày", os: "Hệ sinh thái Apple" },
            image: "https://www.apple.com/v/iphone-17-pro/f/images/overview/welcome/hero__bsveixlwbms2_xlarge.jpg",
            note: "Combo cao cấp"
        },
        {
            ref: "BOM-002",
            name: "Combo MacBook Pro 14 M5 + Phụ kiện",
            category: "Combo bán lẻ",
            brand: "Apple",
            price: 43990000,
            cost: 37350000,
            stock: 0,
            initialStock: 0,
            hasImei: false,
            imeis: [],
            allocatedImeis: [],
            components: [
                { ref: "MB_APL_PROM5_16_512", name: "MacBook Pro 14 inch M5 16GB/512GB/10GPU", qty: 1 },
                { ref: "SAC_APL_USBC20W", name: "Adapter USB-C 20W", qty: 1 },
                { ref: "CAP_APL_TC1M", name: "Cáp sạc type C 1m", qty: 2 }
            ],
            specs: { display: "Combo MacBook & Phụ kiện", storage: "512 GB SSD (16GB RAM)", camera: "FaceTime HD 1080p", battery: "Pin khủng", os: "macOS Sequoia" },
            image: "https://www.apple.com/v/macbook-pro/ax/images/overview/welcome/hero_endframe__fwev9ebh42mq_xlarge.jpg",
            note: "Combo làm việc"
        },
        {
            ref: "BOM-003",
            name: "Combo iPad Air M4 + Bảo hành",
            category: "Combo bán lẻ",
            brand: "Apple",
            price: 20990000,
            cost: 17450000,
            stock: 0,
            initialStock: 0,
            hasImei: false,
            imeis: [],
            allocatedImeis: [],
            components: [
                { ref: "IPD_APL_AIRM4_11_128", name: "iPad Air M4 11 inch WiFi 128GB", qty: 1 },
                { ref: "SAC_APL_USBC20W", name: "Adapter USB-C 20W", qty: 1 },
                { ref: "PEN_APL_APPRO", name: "Apple Pencil Pro", qty: 1 }
            ],
            specs: { display: "Combo máy tính bảng", storage: "128 GB (M4 Apple Chip)", camera: "Pro Ultra Wide", battery: "Cả ngày", os: "iPadOS 18" },
            image: "https://www.apple.com/v/ipad-air/ah/images/overview/hero/hero_endframe__6gl84bccyaqi_large.png",
            note: "Combo học tập"
        },
        {
            ref: "BOM-004",
            name: "Combo Apple Watch S11 + AirTag",
            category: "Combo bán lẻ",
            brand: "Apple",
            price: 12990000,
            cost: 10460000,
            stock: 0,
            initialStock: 0,
            hasImei: false,
            imeis: [],
            allocatedImeis: [],
            components: [
                { ref: "AW_APL_S11_42_GPS", name: "Apple Watch Series 11 GPS", qty: 1 },
                { ref: "AT_APL_AIRTAG", name: "AirTag", qty: 1 }
            ],
            specs: { display: "Combo thời trang & Định vị", storage: "Apple Watch + 1 AirTag", camera: "-", battery: "36 giờ", os: "watchOS / Find My" },
            image: "https://www.apple.com/v/apple-watch-series-11/c/images/overview/highlights/highlights_sleep_score__dl1y2j6kkouq_large.jpg",
            note: "Combo thời trang"
        },
        {
            ref: "BOM-005",
            name: "Combo iPhone 17e + Ốp lưng MagSafe",
            category: "Combo bán lẻ",
            brand: "Apple",
            price: 19990000,
            cost: 16650000,
            stock: 0,
            initialStock: 0,
            hasImei: false,
            imeis: [],
            allocatedImeis: [],
            components: [
                { ref: "IP_APL_IP17E_256", name: "iPhone 17e 256GB", qty: 1 },
                { ref: "OP_APL_IP17PM_MAG", name: "Ốp lưng MagSafe iPhone 17 Pro Max TechWoven Apple", qty: 1 },
                { ref: "CAP_APL_TC1M", name: "Cáp sạc type C 1m", qty: 1 }
            ],
            specs: { display: "Combo an toàn", storage: "256 GB", camera: "Dual 48MP", battery: "Cả ngày", os: "iOS 19" },
            image: "https://www.apple.com/v/iphone-17e/b/images/overview/welcome/hero_endframe__eafizd06t6qa_large.jpg",
            note: "Combo tầm trung"
        },
        {
            ref: "BOM-006",
            name: "Combo AirPods Max 2 + AirTag",
            category: "Combo bán lẻ",
            brand: "Apple",
            price: 16490000,
            cost: 13660000,
            stock: 0,
            initialStock: 0,
            hasImei: false,
            imeis: [],
            allocatedImeis: [],
            components: [
                { ref: "AP_APL_APMAX2", name: "AirPods Max 2", qty: 1 },
                { ref: "AT_APL_AIRTAG", name: "AirTag", qty: 1 }
            ],
            specs: { display: "Combo âm thanh & Định vị", storage: "Tai nghe + AirTag", camera: "-", battery: "20 giờ nghe", os: "Hỗ trợ Find My" },
            image: "https://www.apple.com/v/airpods-max/k/images/overview/welcome/max-loop_startframe__c0vn1ukmh7ma_xlarge.jpg",
            note: "Combo âm thanh"
        }
    ],

    localProductImages: {
            "AP_APL_APMAX2": {
                    "main": "products/AP_APL_APMAX2/airpods-max-2--main.jpeg",
                    "gallery": [
                            "products/AP_APL_APMAX2/airpods-max-2--main.jpeg"
                    ],
                    "colors": {}
            },
            "AT_APL_AIRTAG": {
                    "main": "products/AT_APL_AIRTAG/airtag--main.png",
                    "gallery": [
                            "products/AT_APL_AIRTAG/airtag--main.png"
                    ],
                    "colors": {}
            },
            "AW_APL_S11_42_GPS": {
                    "main": "products/AW_APL_S11_42_GPS/apple-watch-series-11-gps--main.png",
                    "gallery": [
                            "products/AW_APL_S11_42_GPS/apple-watch-series-11-gps--main.png"
                    ],
                    "colors": {}
            },
            "AW_APL_SE3_40_GPS": {
                    "main": "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--main.jpeg",
                    "gallery": [
                            "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--main.jpeg"
                    ],
                    "colors": {
                            "Midnight": [
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--01.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--02.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--03.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--04.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--05.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--06.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--07.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--midnight--08.jpeg"
                            ],
                            "Starlight": [
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--01.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--02.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--03.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--04.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--05.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--06.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--07.jpeg",
                                    "products/AW_APL_SE3_40_GPS/apple-watch-se-3-gps--starlight--08.jpeg"
                            ]
                    }
            },
            "CAP_APL_TC1M": {
                    "main": "products/CAP_APL_TC1M/cap-sac-type-c-1m--main.jpeg",
                    "gallery": [
                            "products/CAP_APL_TC1M/cap-sac-type-c-1m--main.jpeg"
                    ],
                    "colors": {}
            },
            "DV_BAOHANH": {
                    "main": "products/DV_BAOHANH/goi-bao-hanh--main.png",
                    "gallery": [
                            "products/DV_BAOHANH/goi-bao-hanh--main.png"
                    ],
                    "colors": {}
            },
            "IPD_APL_A16_128_WIFI": {
                    "main": "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--main.png",
                    "gallery": [
                            "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--main.png"
                    ],
                    "colors": {
                            "Blue": [
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--01.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--02.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--03.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--04.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--05.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--06.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--07.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--blue--08.jpeg"
                            ],
                            "Pink": [
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--01.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--02.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--03.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--04.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--05.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--06.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--07.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--pink--08.jpeg"
                            ],
                            "Silver": [
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--01.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--02.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--03.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--04.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--05.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--06.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--07.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--silver--08.jpeg"
                            ],
                            "Yellow": [
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--01.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--02.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--03.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--04.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--05.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--06.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--07.jpeg",
                                    "products/IPD_APL_A16_128_WIFI/ipad-a16-wifi-128-gb--yellow--08.jpeg"
                            ]
                    }
            },
            "IPD_APL_AIRM4_11_128": {
                    "main": "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--main.jpeg",
                    "gallery": [
                            "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--main.jpeg"
                    ],
                    "colors": {
                            "Space Gray": [
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--01.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--02.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--03.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--04.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--05.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--06.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--07.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--08.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--09.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--space-gray--10.jpeg"
                            ],
                            "Blue": [
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--01.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--02.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--03.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--04.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--05.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--06.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--07.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--08.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--09.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--blue--10.jpeg"
                            ],
                            "Starlight": [
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--01.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--02.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--03.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--04.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--05.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--06.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--07.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--08.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--09.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--starlight--10.jpeg"
                            ],
                            "Puprple": [
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--01.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--02.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--03.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--04.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--05.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--06.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--07.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--08.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--09.jpeg",
                                    "products/IPD_APL_AIRM4_11_128/ipad-air-m4-11-inch-wifi-128gb--puprple--10.jpeg"
                            ]
                    }
            },
            "IP_APL_IP15_128": {
                    "main": "products/IP_APL_IP15_128/iphone-15-128gb--main.jpeg",
                    "gallery": [
                            "products/IP_APL_IP15_128/iphone-15-128gb--main.jpeg"
                    ],
                    "colors": {
                            "Đen": [
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--01.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--02.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--03.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--04.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--05.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--06.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--07.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--08.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--09.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--den--10.jpeg"
                            ],
                            "Hồng": [
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--01.png",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--02.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--03.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--04.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--05.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--06.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--07.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--08.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--09.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--hong--10.jpeg"
                            ],
                            "Vàng": [
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--01.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--02.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--03.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--04.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--05.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--06.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--07.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--08.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--09.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--vang--10.jpeg"
                            ],
                            "Xanh Lá": [
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--01.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--02.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--03.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--04.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--05.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--06.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--07.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--08.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--09.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-la--10.jpeg"
                            ],
                            "Xanh Dương": [
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--01.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--02.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--03.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--04.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--05.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--06.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--07.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--08.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--09.jpeg",
                                    "products/IP_APL_IP15_128/iphone-15-128gb--xanh-duong--10.jpeg"
                            ]
                    }
            },
            "IP_APL_IP17E_256": {
                    "main": "products/IP_APL_IP17E_256/iphone-17e-256gb--main.jpeg",
                    "gallery": [
                            "products/IP_APL_IP17E_256/iphone-17e-256gb--main.jpeg"
                    ],
                    "colors": {
                            "Pink": [
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--pink--01.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--pink--02.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--pink--03.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--pink--04.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--pink--05.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--pink--06.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--pink--07.jpeg"
                            ],
                            "Black": [
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--01.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--02.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--03.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--04.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--05.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--06.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--07.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--black--08.jpeg"
                            ],
                            "White": [
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--white--01.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--white--02.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--white--03.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--white--04.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--white--05.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--white--06.jpeg",
                                    "products/IP_APL_IP17E_256/iphone-17e-256gb--white--07.jpeg"
                            ]
                    }
            },
            "IP_APL_IP17PM_256": {
                    "main": "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--main.png",
                    "gallery": [
                            "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--main.png"
                    ],
                    "colors": {
                            "Bạc": [
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--01.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--02.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--03.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--04.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--05.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--06.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--07.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--08.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--09.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--10.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--bac--11.jpeg"
                            ],
                            "Cam Vũ Trụ": [
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--01.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--02.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--03.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--04.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--05.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--06.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--07.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--08.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--09.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--10.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--cam-vu-tru--11.jpeg"
                            ],
                            "Xanh Đậm": [
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--01.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--02.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--03.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--04.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--05.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--06.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--07.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--08.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--09.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--10.jpeg",
                                    "products/IP_APL_IP17PM_256/iphone-17-pro-max-256gb--xanh-dam--11.jpeg"
                            ]
                    }
            },
            "IP_APL_IP17_256": {
                    "main": "products/IP_APL_IP17_256/iphone-17-256gb--main.png",
                    "gallery": [
                            "products/IP_APL_IP17_256/iphone-17-256gb--main.png"
                    ],
                    "colors": {
                            "Đen": [
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--01.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--02.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--03.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--04.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--05.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--06.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--07.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--08.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--09.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--den--10.jpeg"
                            ],
                            "Trắng": [
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--01.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--02.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--03.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--04.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--05.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--06.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--07.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--08.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--09.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--10.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--trang--11.jpeg"
                            ],
                            "Xanh Lam Khói": [
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--01.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--02.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--03.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--04.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--05.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--06.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--07.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--08.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--09.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--10.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-lam-khoi--11.jpeg"
                            ],
                            "Tím Oải Hương": [
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--01.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--02.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--03.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--04.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--05.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--06.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--07.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--08.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--09.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--10.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--tim-oai-huong--11.jpeg"
                            ],
                            "Xanh Lá Xô Thơm": [
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--01.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--02.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--03.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--04.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--05.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--06.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--07.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--08.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--09.jpeg",
                                    "products/IP_APL_IP17_256/iphone-17-256gb--xanh-la-xo-thom--10.jpeg"
                            ]
                    }
            },
            "IP_APL_IPAIR_256": {
                    "main": "products/IP_APL_IPAIR_256/iphone-air-256gb--main.png",
                    "gallery": [
                            "products/IP_APL_IPAIR_256/iphone-air-256gb--main.png"
                    ],
                    "colors": {
                            "Đen Không Gian": [
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--01.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--02.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--03.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--04.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--05.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--06.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--07.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--08.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--09.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--10.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--den-khong-gian--11.jpeg"
                            ],
                            "Trắng Mây": [
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--01.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--02.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--03.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--04.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--05.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--06.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--07.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--08.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--09.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--10.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--trang-may--11.jpeg"
                            ],
                            "Vàng Nhạt": [
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--01.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--02.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--03.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--04.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--05.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--06.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--07.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--08.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--09.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--10.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--vang-nhat--11.jpeg"
                            ],
                            "Xanh Da Trời": [
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--01.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--02.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--03.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--04.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--05.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--06.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--07.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--08.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--09.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--10.jpeg",
                                    "products/IP_APL_IPAIR_256/iphone-air-256gb--xanh-da-troi--11.jpeg"
                            ]
                    }
            },
            "MB_APL_PROM5_16_512": {
                    "main": "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--main.png",
                    "gallery": [
                            "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--main.png"
                    ],
                    "colors": {
                            "Silver": [
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--01.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--02.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--03.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--04.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--05.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--06.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--07.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--08.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--silver--09.jpeg"
                            ],
                            "Space Black": [
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--01.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--02.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--03.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--04.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--05.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--06.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--07.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--08.jpeg",
                                    "products/MB_APL_PROM5_16_512/macbook-pro-14-inch-m5-16gb-512gb-10gpu--space-black--09.jpeg"
                            ]
                    }
            },
            "OP_APL_IP17PM_MAG": {
                    "main": "products/OP_APL_IP17PM_MAG/op-lung-magsafe-iphone-17-pro-max-techwoven-apple--main.jpeg",
                    "gallery": [
                            "products/OP_APL_IP17PM_MAG/op-lung-magsafe-iphone-17-pro-max-techwoven-apple--main.jpeg"
                    ],
                    "colors": {}
            }
    }
};

window.APP_DATA = APP_DATA;

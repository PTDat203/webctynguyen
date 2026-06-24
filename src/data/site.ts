// Thông tin doanh nghiệp & nội dung site — chỉnh sửa tập trung tại đây.

export const company = {
  name: 'CÔNG TY TNHH KINH DOANH DỊCH VỤ QUỐC TẾ IBS',
  shortName: 'IBS Holdings',
  legalEn: 'IBS Holdings – International Business Services Co., Ltd.',
  brand: 'IBS',
  oneStop: 'ONE STOP SERVICES',
  tagline: 'Triển lãm thương hiệu',
  slogan: 'HỆ SINH THÁI TRIỂN LÃM TOÀN DIỆN — CHI PHÍ TỐI THIỂU · HIỆU QUẢ TỐI ĐA',
  sloganParts: ['HỆ SINH THÁI TRIỂN LÃM TOÀN DIỆN', 'CHI PHÍ TỐI THIỂU · HIỆU QUẢ TỐI ĐA'],
  address: '41A Lý Thái Tổ, phường Hoàn Kiếm, TP. Hà Nội',
  hotline: '+84 833 588 169',
  hotlineHref: 'tel:+84833588169',
  hotlineNote: 'Phòng Thương hiệu',
  email: '', // CẦN: email công ty (chưa có trong hồ sơ)
  website: 'ibsmaster.com',
  url: 'https://ibsmaster.com',
  facebook: 'https://www.facebook.com/profile.php?id=61573475996497',
} as const;

export const nav = [
  { label: 'Trang chủ', href: '#home' },
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Dịch vụ', href: '#dich-vu' },
  { label: 'Dự án', href: '#du-an' },
  { label: 'Liên hệ', href: '#lien-he' },
] as const;

export const values = [
  {
    key: 'tam-nhin',
    title: 'Tầm nhìn',
    body: 'Xây dựng hệ sinh thái triển lãm quốc tế hàng đầu Đông Nam Á, định hình xu hướng thương mại khu vực.',
    icon: 'eye',
  },
  {
    key: 'su-menh',
    title: 'Sứ mệnh',
    body: 'Là cầu nối chuyên nghiệp đưa doanh nghiệp Việt vươn tầm quốc tế thông qua các nền tảng xúc tiến thương mại bền vững.',
    icon: 'compass',
  },
  {
    key: 'gia-tri',
    title: 'Giá trị cốt lõi',
    body: 'Tận tâm · Chuyên nghiệp · Bền vững — tối ưu hóa chi phí và mang lại hiệu quả kinh doanh thực tiễn nhất.',
    icon: 'diamond',
  },
] as const;

export const stats = [
  { value: 10, suffix: '+', label: 'Năm kinh nghiệm' },
  { value: 200, suffix: '+', label: 'Dự án triển lãm & sự kiện' },
  { value: 50000, suffix: '+', label: 'm² gian hàng đã thi công' },
  { value: 300, suffix: '+', label: 'Đối tác & khách hàng' },
];
// LƯU Ý: số liệu trên là tạm tính — cập nhật theo số thật của IBS.

export type Service = {
  id: string;
  no: string;
  icon: string;
  title: string;
  tagline: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: 'thi-cong-gian-hang',
    no: '01',
    icon: 'booth',
    title: 'Thiết kế & Thi công gian hàng triển lãm',
    tagline: 'Gian tiêu chuẩn · cụm Pavilion · gian đặc biệt',
    points: [
      'Báo giá nhanh chóng, cạnh tranh; chính sách giá đặc biệt cho Hội viên IBS',
      'Miễn phí thiết kế theo yêu cầu — từ gian tiêu chuẩn, cụm Pavilion đến gian đặc biệt',
      'Tư vấn phương án tối ưu ngân sách, thi công trọn gói mọi triển lãm, mọi địa điểm',
      'Tiết kiệm tối đa thời gian và nguồn lực cho khách hàng',
    ],
  },
  {
    id: 'dan-dung-su-kien',
    no: '02',
    icon: 'stage',
    title: 'Thi công & Dàn dựng hội nghị, giải trí, hòa nhạc',
    tagline: 'Hội nghị cao cấp · liveshow · concert · truyền hình trực tiếp',
    points: [
      'Hội nghị, hội thảo cao cấp trong nhà / ngoài trời, khách sạn 5–6 sao tại Việt Nam',
      'Linh hoạt xử lý mọi địa hình ngoài trời (bãi biển, sân golf...) an toàn & thẩm mỹ cao',
      'Dàn dựng sân khấu liveshow / concert quy mô hàng chục nghìn khán giả',
      'Các chương trình truyền hình trực tiếp đòi hỏi độ chính xác tuyệt đối',
    ],
  },
  {
    id: 'truyen-thong',
    no: '03',
    icon: 'megaphone',
    title: 'Truyền thông sự kiện',
    tagline: 'Giải pháp truyền thông tích hợp, tạo dấu ấn trên thị trường',
    points: [
      'Booking Hot Social Media',
      'Booking KOLs, KOCs',
      'Truyền thông đa nền tảng',
      'Quảng cáo ngoài trời (OOH)',
    ],
  },
  {
    id: 'to-chuc-tron-goi',
    no: '04',
    icon: 'flag',
    title: 'Tổ chức triển lãm, sự kiện trọn gói theo yêu cầu',
    tagline: 'Quy trình 5 bước — chuẩn quốc tế, từ ý tưởng đến vận hành',
    points: [
      'Phân tích & định vị triển lãm: bối cảnh thị trường, mục tiêu, chủ đề & thông điệp',
      'Lập kế hoạch & quản lý vận hành: mặt bằng, phân vùng, tiến độ, rủi ro & an toàn',
      'Chiến lược truyền thông 3 giai đoạn: Trước – Trong – Sau, đa kênh, đo lường hiệu quả',
      'Hợp tác đơn vị trưng bày trong & ngoài nước, thu hút khách tham quan và người mua',
      'Chương trình chuyên nghiệp & kết nối B2B (business matching, hội thảo, diễn đàn)',
    ],
  },
  {
    id: 'b2b',
    no: '05',
    icon: 'handshake',
    title: 'Hội nghị, Hội thảo & Kết nối B2B',
    tagline: 'Đặc quyền kết nối kinh doanh 1:1, đồng hành toàn diện',
    points: [
      'Sàng lọc & phát triển khách hàng mục tiêu',
      'Đặc quyền kết nối kinh doanh 1:1',
      'Đồng hành toàn diện: Trước – Trong – Sau triển lãm',
      'Nhận kết nối B2B cho cả triển lãm / hội chợ do đối tác khác tổ chức',
    ],
  },
];

export const whyIbs = [
  { title: 'Chi phí tối thiểu', body: 'Tối ưu ngân sách trên từng hạng mục, báo giá minh bạch & cạnh tranh.', icon: 'coin' },
  { title: 'Hiệu quả tối đa', body: 'Quy trình bài bản, đo lường kết quả thực tiễn cho mỗi sự kiện.', icon: 'chart' },
  { title: 'Trọn gói một điểm dừng', body: 'One Stop Services — từ thiết kế, thi công đến vận hành & truyền thông.', icon: 'box' },
  { title: 'Phủ sóng Đông Nam Á', body: 'Cầu nối đưa doanh nghiệp Việt vươn tầm khu vực và quốc tế.', icon: 'globe' },
];

export const processSteps = [
  'Tư vấn',
  'Thiết kế',
  'Thi công',
  'Vận hành',
  'Truyền thông & đo lường',
];

export type Project = {
  title: string;
  category: 'Concert' | 'Hội nghị' | 'Triển lãm' | 'B2B';
  desc: string;
};

export const projects: Project[] = [
  { title: 'Đông Fest', category: 'Concert', desc: 'Dàn dựng sân khấu đại nhạc hội quy mô lớn.' },
  { title: 'Những thành phố mơ màng', category: 'Concert', desc: 'Liveshow âm nhạc — thi công & dàn dựng trọn gói.' },
  { title: 'Concert "Sao nhập ngũ"', category: 'Concert', desc: 'Chương trình truyền hình trực tiếp quy mô hàng chục nghìn khán giả.' },
  { title: 'Diễn đàn doanh nghiệp', category: 'Hội nghị', desc: 'Tổ chức diễn đàn kết nối cộng đồng doanh nghiệp.' },
  { title: 'Hội thảo chuyên biệt', category: 'Hội nghị', desc: 'Hội thảo chuyên ngành theo tiêu chuẩn quốc tế.' },
  { title: 'Hội nghị xúc tiến thương mại', category: 'B2B', desc: 'Nền tảng xúc tiến thương mại & kết nối giao thương.' },
  { title: 'Lễ ra mắt sản phẩm', category: 'Hội nghị', desc: 'Sự kiện ra mắt sản phẩm đẳng cấp, dấu ấn thương hiệu.' },
  { title: 'Gian hàng triển lãm tiêu chuẩn & đặc biệt', category: 'Triển lãm', desc: 'Thiết kế & thi công gian hàng cho nhiều triển lãm.' },
];

export const projectFilters = ['Tất cả', 'Triển lãm', 'Hội nghị', 'Concert', 'B2B'] as const;

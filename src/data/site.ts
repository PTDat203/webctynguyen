// Thông tin doanh nghiệp & nội dung site — song ngữ (vi/en). Chỉnh sửa tập trung tại đây.

export type Bi = { vi: string; en: string };

export const company = {
  name: 'CÔNG TY TNHH KINH DOANH DỊCH VỤ QUỐC TẾ IBS',
  shortName: 'IBS Holdings',
  legalEn: 'IBS Holdings – International Business Services Co., Ltd.',
  brand: 'IBS',
  oneStop: 'ONE STOP SERVICES',
  tagline: { vi: 'Triển lãm thương hiệu', en: 'Brand Exhibitions' } as Bi,
  address: {
    vi: '41A Lý Thái Tổ, phường Hoàn Kiếm, TP. Hà Nội',
    en: '41A Ly Thai To, Hoan Kiem Ward, Hanoi',
  } as Bi,
  hotline: '+84 833 588 169',
  hotlineHref: 'tel:+84833588169',
  hotlineNote: { vi: 'Phòng Thương hiệu', en: 'Brand Department' } as Bi,
  email: '', // CẦN: email công ty (chưa có trong hồ sơ)
  website: 'ibsmaster.com',
  url: 'https://ibsmaster.com',
  facebook: 'https://www.facebook.com/profile.php?id=61573475996497',
  messenger: 'https://m.me/61573475996497',
  zalo: 'https://zalo.me/84833588169',
  smsHref: 'sms:+84833588169',
} as const;

// Chuỗi giao diện dùng chung (nút, nhãn, tiêu đề khu vực...).
export const ui = {
  nav: [
    { label: { vi: 'Trang chủ', en: 'Home' }, href: '#home' },
    { label: { vi: 'Giới thiệu', en: 'About' }, href: '#gioi-thieu' },
    { label: { vi: 'Dịch vụ', en: 'Services' }, href: '#dich-vu' },
    { label: { vi: 'Dự án', en: 'Projects' }, href: '#du-an' },
    { label: { vi: 'Liên hệ', en: 'Contact' }, href: '#lien-he' },
  ] as { label: Bi; href: string }[],

  cta: {
    consult: { vi: 'Nhận tư vấn', en: 'Get a consultation' } as Bi,
    consultBooth: { vi: 'Nhận tư vấn gian hàng', en: 'Get booth consultation' } as Bi,
    viewProjects: { vi: 'Xem dự án', en: 'View projects' } as Bi,
    exploreServices: { vi: 'Khám phá dịch vụ', en: 'Explore services' } as Bi,
    learnMore: { vi: 'Tìm hiểu thêm', en: 'Learn more' } as Bi,
    followFacebook: { vi: 'Theo dõi trên Facebook', en: 'Follow on Facebook' } as Bi,
    scrollDown: { vi: 'Cuộn xuống', en: 'Scroll down' } as Bi,
    home: { vi: 'IBS — Trang chủ', en: 'IBS — Home' } as Bi,
    openMenu: { vi: 'Mở menu', en: 'Open menu' } as Bi,
    closeMenu: { vi: 'Đóng menu', en: 'Close menu' } as Bi,
    backToTop: { vi: 'Lên đầu trang', en: 'Back to top' } as Bi,
    chatMessenger: { vi: 'Chat với chúng tôi qua Messenger', en: 'Chat with us on Messenger' } as Bi,
    chatZalo: { vi: 'Nhắn tin qua Zalo', en: 'Chat on Zalo' } as Bi,
    sendSms: { vi: 'Gửi tin nhắn SMS', en: 'Send an SMS' } as Bi,
    callHotline: { vi: 'Gọi hotline', en: 'Call hotline' } as Bi,
    moreContact: { vi: 'Thêm cách liên hệ', en: 'More contact options' } as Bi,
    skipToContent: { vi: 'Bỏ qua tới nội dung', en: 'Skip to content' } as Bi,
  },

  hero: {
    titlePre: { vi: 'Hệ sinh thái ', en: 'A complete ' } as Bi,
    titleHighlight: { vi: 'TRIỂN LÃM', en: 'EXHIBITION' } as Bi,
    titlePost: { vi: ' toàn diện', en: ' ecosystem' } as Bi,
    subline: {
      vi: 'Một điểm dừng cho thiết kế & thi công gian hàng, tổ chức sự kiện và kết nối kinh doanh B2B.',
      en: 'One stop for booth design & construction, event organization and B2B business matching.',
    } as Bi,
  },

  ribbon: {
    left: { vi: 'CHI PHÍ TỐI THIỂU', en: 'MINIMUM COST' } as Bi,
    right: { vi: 'HIỆU QUẢ TỐI ĐA', en: 'MAXIMUM IMPACT' } as Bi,
  },

  about: {
    overline: { vi: 'Về IBS', en: 'About IBS' } as Bi,
    title: {
      vi: 'Sức mạnh từ sự thấu hiểu và làm chủ',
      en: 'Strength from deep understanding and mastery',
    } as Bi,
    body: {
      vi: 'IBS lập kế hoạch và điều hành triển lãm, hội chợ thương mại và sự kiện chuyên ngành theo tiêu chuẩn quốc tế — giải pháp toàn diện từ thiết kế, thi công đến vận hành và kết nối B2B.',
      en: 'IBS plans and operates exhibitions, trade fairs and specialized events to international standards — a complete solution from design and construction to operations and B2B matching.',
    } as Bi,
    badgeTop: { vi: 'ONE STOP', en: 'ONE STOP' } as Bi,
    badgeBottom: { vi: 'Services', en: 'Services' } as Bi,
  },

  services: {
    overline: { vi: 'Dịch vụ', en: 'Services' } as Bi,
    title: {
      vi: 'Giải pháp trọn gói cho mọi sự kiện',
      en: 'Turnkey solutions for every event',
    } as Bi,
    intro: {
      vi: 'Một điểm dừng cho mọi sự kiện: từ ý tưởng, thiết kế, thi công đến vận hành và truyền thông',
      en: 'One stop for every event: from concept and design to construction, operations and communications',
    } as Bi,
    flagshipBadge: { vi: 'Dịch vụ chủ lực', en: 'Flagship service' } as Bi,
    signature: { vi: 'IBS Signature', en: 'IBS Signature' } as Bi,
  },

  whyIbs: {
    overline: { vi: 'Vì sao chọn IBS', en: 'Why choose IBS' } as Bi,
    title: {
      vi: 'Chi phí tối thiểu — Hiệu quả tối đa',
      en: 'Minimum Cost — Maximum Impact',
    } as Bi,
  },

  projects: {
    overline: { vi: 'Dự án tiêu biểu', en: 'Featured projects' } as Bi,
    title: { vi: 'Những dấu ấn IBS đã kiến tạo', en: 'Milestones IBS has created' } as Bi,
    empty: { vi: 'Chưa có dự án trong nhóm này.', en: 'No projects in this category yet.' } as Bi,
    detail: { vi: 'Chi tiết dự án', en: 'Project detail' } as Bi,
    close: { vi: 'Đóng', en: 'Close' } as Bi,
    scrollHint: { vi: 'Cuộn để khám phá', en: 'Scroll to explore' } as Bi,
    moreOverline: { vi: 'Còn nhiều hơn thế', en: 'And much more' } as Bi,
    moreTitle: { vi: 'Bạn quan tâm đến các dự án khác?', en: 'Interested in our other projects?' } as Bi,
    moreDesc: {
      vi: 'IBS còn hàng trăm dự án triển lãm, sự kiện và hội nghị khác. Liên hệ để nhận hồ sơ năng lực phù hợp với bạn.',
      en: 'IBS has hundreds more exhibition, event and conference projects. Contact us for a capability profile tailored to you.',
    } as Bi,
    moreCard: { vi: 'Xem thêm dự án', en: 'See more projects' } as Bi,
    viewAll: { vi: 'Xem tất cả dự án', en: 'View all projects' } as Bi,
  },

  contact: {
    title: { vi: 'Sẵn sàng nâng tầm triển lãm của bạn?', en: 'Ready to elevate your exhibition?' } as Bi,
    sub: {
      vi: 'Để lại thông tin — đội ngũ IBS sẽ tư vấn & báo giá nhanh chóng, miễn phí.',
      en: 'Leave your details — the IBS team will advise & quote quickly, free of charge.',
    } as Bi,
    addressLabel: { vi: 'Địa chỉ', en: 'Address' } as Bi,
    hotlineLabel: { vi: 'Hotline', en: 'Hotline' } as Bi,
    mapTitle: {
      vi: 'Bản đồ IBS — 41A Lý Thái Tổ, Hoàn Kiếm, Hà Nội',
      en: 'IBS map — 41A Ly Thai To, Hoan Kiem, Hanoi',
    } as Bi,
    formName: { vi: 'Họ và tên *', en: 'Full name *' } as Bi,
    formCompany: { vi: 'Công ty', en: 'Company' } as Bi,
    formEmail: { vi: 'Email *', en: 'Email *' } as Bi,
    formPhone: { vi: 'Số điện thoại *', en: 'Phone *' } as Bi,
    formService: { vi: 'Dịch vụ quan tâm', en: 'Service of interest' } as Bi,
    formServicePlaceholder: { vi: '— Chọn dịch vụ —', en: '— Select a service —' } as Bi,
    formServiceOther: { vi: 'Khác', en: 'Other' } as Bi,
    formMessage: { vi: 'Nội dung', en: 'Message' } as Bi,
    submit: { vi: 'Gửi yêu cầu tư vấn', en: 'Send request' } as Bi,
    orCall: { vi: 'Hoặc gọi ngay', en: 'Or call now' } as Bi,
    phName: { vi: 'Nguyễn Văn A', en: 'John Doe' } as Bi,
    phCompany: { vi: 'Tên doanh nghiệp', en: 'Company name' } as Bi,
    phEmail: { vi: 'email@congty.com', en: 'email@company.com' } as Bi,
    phPhone: { vi: '09xx xxx xxx', en: '09xx xxx xxx' } as Bi,
    phMessage: { vi: 'Mô tả ngắn về nhu cầu của bạn...', en: 'Briefly describe your needs...' } as Bi,
  },

  footer: {
    blurb: {
      vi: 'Hệ sinh thái triển lãm toàn diện, đồng hành cùng doanh nghiệp Việt vươn tầm quốc tế.',
      en: 'A complete exhibition ecosystem, accompanying Vietnamese businesses to reach the world.',
    } as Bi,
    services: { vi: 'Dịch vụ', en: 'Services' } as Bi,
    links: { vi: 'Liên kết', en: 'Links' } as Bi,
    contact: { vi: 'Liên hệ', en: 'Contact' } as Bi,
    rights: { vi: 'Bảo lưu mọi quyền.', en: 'All rights reserved.' } as Bi,
  },

  seo: {
    title: {
      vi: 'IBS Holdings | Hệ sinh thái triển lãm toàn diện – Thi công gian hàng & Tổ chức sự kiện',
      en: 'IBS Holdings | A complete exhibition ecosystem – Booth construction & Event organization',
    } as Bi,
    description: {
      vi: 'IBS – Công ty TNHH Kinh doanh Dịch vụ Quốc tế: thiết kế & thi công gian hàng triển lãm, tổ chức sự kiện trọn gói, dàn dựng concert, kết nối B2B. Chi phí tối thiểu – Hiệu quả tối đa. Hotline +84 833 588 169.',
      en: 'IBS – International Business Services: exhibition booth design & construction, turnkey event organization, concert staging, B2B matching. Minimum cost – Maximum impact. Hotline +84 833 588 169.',
    } as Bi,
  },
} as const;

export const values = [
  {
    key: 'tam-nhin',
    title: { vi: 'Tầm nhìn', en: 'Vision' } as Bi,
    body: {
      vi: 'Xây dựng hệ sinh thái triển lãm quốc tế hàng đầu Đông Nam Á, định hình xu hướng thương mại khu vực.',
      en: "Build Southeast Asia's leading international exhibition ecosystem, shaping regional trade trends.",
    } as Bi,
    icon: 'eye',
  },
  {
    key: 'su-menh',
    title: { vi: 'Sứ mệnh', en: 'Mission' } as Bi,
    body: {
      vi: 'Là cầu nối chuyên nghiệp đưa doanh nghiệp Việt vươn tầm quốc tế thông qua các nền tảng xúc tiến thương mại bền vững.',
      en: 'A professional bridge bringing Vietnamese businesses to the world through sustainable trade-promotion platforms.',
    } as Bi,
    icon: 'compass',
  },
  {
    key: 'gia-tri',
    title: { vi: 'Giá trị cốt lõi', en: 'Core Values' } as Bi,
    body: {
      vi: 'Tận tâm · Chuyên nghiệp · Bền vững — tối ưu hóa chi phí và mang lại hiệu quả kinh doanh thực tiễn nhất.',
      en: 'Dedication · Professionalism · Sustainability — optimizing costs and delivering the most practical business results.',
    } as Bi,
    icon: 'diamond',
  },
] as const;

export const stats = [
  { value: 10, suffix: '+', label: { vi: 'Năm kinh nghiệm', en: 'Years of experience' } as Bi },
  { value: 200, suffix: '+', label: { vi: 'Dự án triển lãm & sự kiện', en: 'Exhibition & event projects' } as Bi },
  { value: 50000, suffix: '+', label: { vi: 'm² gian hàng đã thi công', en: 'm² of booths built' } as Bi },
  { value: 300, suffix: '+', label: { vi: 'Đối tác & khách hàng', en: 'Partners & clients' } as Bi },
];
// LƯU Ý: số liệu trên là tạm tính — cập nhật theo số thật của IBS.

export type Service = {
  id: string;
  no: string;
  icon: string;
  title: Bi;
  tagline: Bi;
  points: Bi[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: 'thi-cong-gian-hang',
    no: '01',
    icon: 'booth',
    title: { vi: 'Thiết kế & Thi công gian hàng triển lãm', en: 'Exhibition Booth Design & Construction' },
    tagline: {
      vi: 'Gian tiêu chuẩn · cụm Pavilion · gian đặc biệt',
      en: 'Standard booths · Pavilion clusters · custom booths',
    },
    points: [
      {
        vi: 'Báo giá nhanh chóng, cạnh tranh; chính sách giá đặc biệt cho Hội viên IBS',
        en: 'Fast, competitive quotes; special pricing for IBS Members',
      },
      {
        vi: 'Miễn phí thiết kế theo yêu cầu — từ gian tiêu chuẩn, cụm Pavilion đến gian đặc biệt',
        en: 'Free custom design — from standard booths and Pavilion clusters to custom booths',
      },
      {
        vi: 'Tư vấn phương án tối ưu ngân sách, thi công trọn gói mọi triển lãm, mọi địa điểm',
        en: 'Budget-optimized solutions and turnkey construction for any exhibition, any venue',
      },
      {
        vi: 'Tiết kiệm tối đa thời gian và nguồn lực cho khách hàng',
        en: 'Maximum time and resource savings for clients',
      },
    ],
  },
  {
    id: 'dan-dung-su-kien',
    no: '02',
    icon: 'stage',
    title: { vi: 'Tổ chức sự kiện', en: 'Event Organization' },
    tagline: {
      vi: 'Hội nghị · liveshow · concert · truyền hình trực tiếp',
      en: 'Conferences · liveshows · concerts · live broadcasts',
    },
    points: [
      {
        vi: 'Hội nghị, hội thảo cao cấp trong nhà / ngoài trời, khách sạn 5–6 sao tại Việt Nam',
        en: 'Premium indoor/outdoor conferences and seminars at 5–6 star hotels in Vietnam',
      },
      {
        vi: 'Linh hoạt xử lý mọi địa hình ngoài trời (bãi biển, sân golf...) an toàn & thẩm mỹ cao',
        en: 'Flexible handling of any outdoor terrain (beaches, golf courses...) with safety and high aesthetics',
      },
      {
        vi: 'Dàn dựng sân khấu liveshow / concert quy mô hàng chục nghìn khán giả',
        en: 'Liveshow/concert stage production for tens of thousands of audience',
      },
      {
        vi: 'Các chương trình truyền hình trực tiếp đòi hỏi độ chính xác tuyệt đối',
        en: 'Live broadcast programs requiring absolute precision',
      },
    ],
  },
  {
    id: 'truyen-thong',
    no: '03',
    icon: 'megaphone',
    title: { vi: 'Truyền thông sự kiện', en: 'Event Communications' },
    tagline: {
      vi: 'Giải pháp truyền thông tích hợp, tạo dấu ấn trên thị trường',
      en: 'Integrated communications that make a market impact',
    },
    points: [
      { vi: 'Booking Hot Social Media', en: 'Booking Hot Social Media' },
      { vi: 'Booking KOLs, KOCs', en: 'Booking KOLs, KOCs' },
      { vi: 'Truyền thông đa nền tảng', en: 'Multi-platform communications' },
      { vi: 'Quảng cáo ngoài trời (OOH)', en: 'Out-of-home advertising (OOH)' },
    ],
  },
  {
    id: 'to-chuc-tron-goi',
    no: '04',
    icon: 'flag',
    title: {
      vi: 'Tổ chức triển lãm trọn gói theo yêu cầu',
      en: 'Turnkey Exhibition Organization',
    },
    tagline: {
      vi: 'Quy trình 5 bước chuẩn quốc tế, từ ý tưởng đến vận hành',
      en: 'A 5-step international process, from concept to operation',
    },
    featured: true,
    points: [
      {
        vi: 'Phân tích & định vị triển lãm: bối cảnh thị trường, mục tiêu, chủ đề & thông điệp',
        en: 'Exhibition analysis & positioning: market context, objectives, theme & message',
      },
      {
        vi: 'Lập kế hoạch & quản lý vận hành: mặt bằng, phân vùng, tiến độ, rủi ro & an toàn',
        en: 'Planning & operations management: layout, zoning, scheduling, risk & safety',
      },
      {
        vi: 'Chiến lược truyền thông 3 giai đoạn: Trước – Trong – Sau, đa kênh, đo lường hiệu quả',
        en: '3-phase communications strategy: Before – During – After, multi-channel, measurable',
      },
      {
        vi: 'Hợp tác đơn vị trưng bày trong & ngoài nước, thu hút khách tham quan và người mua',
        en: 'Partnering with domestic & international exhibitors to attract visitors and buyers',
      },
      {
        vi: 'Chương trình chuyên nghiệp & kết nối B2B (business matching, hội thảo, diễn đàn)',
        en: 'Professional programs & B2B matching (business matching, seminars, forums)',
      },
    ],
  },
  {
    id: 'b2b',
    no: '05',
    icon: 'handshake',
    title: { vi: 'Hội nghị, Hội thảo & Kết nối B2B', en: 'Conferences, Seminars & B2B Matching' },
    tagline: {
      vi: 'Đặc quyền kết nối kinh doanh 1:1, đồng hành toàn diện',
      en: 'Exclusive 1:1 business matching with end-to-end support',
    },
    points: [
      { vi: 'Sàng lọc & phát triển khách hàng mục tiêu', en: 'Screening & developing target customers' },
      { vi: 'Đặc quyền kết nối kinh doanh 1:1', en: 'Exclusive 1:1 business matching' },
      {
        vi: 'Đồng hành toàn diện: Trước – Trong – Sau triển lãm',
        en: 'End-to-end support: Before – During – After the exhibition',
      },
      {
        vi: 'Nhận kết nối B2B cho cả triển lãm / hội chợ do đối tác khác tổ chức',
        en: 'B2B matching for exhibitions/fairs organized by other partners too',
      },
    ],
  },
];

export const whyIbs = [
  {
    title: { vi: 'Chi phí tối thiểu', en: 'Minimum Cost' } as Bi,
    body: {
      vi: 'Tối ưu ngân sách trên từng hạng mục, báo giá minh bạch & cạnh tranh.',
      en: 'Budget optimized for every item, with transparent and competitive quotes.',
    } as Bi,
    icon: 'coin',
  },
  {
    title: { vi: 'Hiệu quả tối đa', en: 'Maximum Impact' } as Bi,
    body: {
      vi: 'Quy trình bài bản, đo lường kết quả thực tiễn cho mỗi sự kiện.',
      en: 'A methodical process with measurable, practical results for every event.',
    } as Bi,
    icon: 'chart',
  },
  {
    title: { vi: 'Trọn gói một điểm dừng', en: 'One-Stop Service' } as Bi,
    body: {
      vi: 'One Stop Services — từ thiết kế, thi công đến vận hành & truyền thông.',
      en: 'One Stop Services — from design and construction to operations and communications.',
    } as Bi,
    icon: 'box',
  },
  {
    title: { vi: 'Phủ sóng Đông Nam Á', en: 'Southeast Asia Reach' } as Bi,
    body: {
      vi: 'Cầu nối đưa doanh nghiệp Việt vươn tầm khu vực và quốc tế.',
      en: 'A bridge taking Vietnamese businesses to regional and international levels.',
    } as Bi,
    icon: 'globe',
  },
];

export type Project = {
  title: Bi;
  categoryKey: 'concert' | 'conference' | 'exhibition' | 'b2b';
  category: Bi;
  desc: Bi;
};

export const projects: Project[] = [
  {
    title: { vi: 'Đông Fest', en: 'Đông Fest' },
    categoryKey: 'concert',
    category: { vi: 'Concert', en: 'Concert' },
    desc: { vi: 'Dàn dựng sân khấu đại nhạc hội quy mô lớn.', en: 'Large-scale music festival stage production.' },
  },
  {
    title: { vi: 'Những thành phố mơ màng', en: 'Dreamy Cities' },
    categoryKey: 'concert',
    category: { vi: 'Concert', en: 'Concert' },
    desc: {
      vi: 'Liveshow âm nhạc — thi công & dàn dựng trọn gói.',
      en: 'Music liveshow — turnkey construction & staging.',
    },
  },
  {
    title: { vi: 'Concert "Sao nhập ngũ"', en: 'Concert "Sao nhập ngũ"' },
    categoryKey: 'concert',
    category: { vi: 'Concert', en: 'Concert' },
    desc: {
      vi: 'Chương trình truyền hình trực tiếp quy mô hàng chục nghìn khán giả.',
      en: 'A live broadcast for tens of thousands of viewers.',
    },
  },
  {
    title: { vi: 'Diễn đàn doanh nghiệp', en: 'Business Forum' },
    categoryKey: 'conference',
    category: { vi: 'Hội nghị', en: 'Conference' },
    desc: {
      vi: 'Tổ chức diễn đàn kết nối cộng đồng doanh nghiệp.',
      en: 'Organizing a forum connecting the business community.',
    },
  },
  {
    title: { vi: 'Hội thảo chuyên biệt', en: 'Specialized Seminar' },
    categoryKey: 'conference',
    category: { vi: 'Hội nghị', en: 'Conference' },
    desc: { vi: 'Hội thảo chuyên ngành theo tiêu chuẩn quốc tế.', en: 'Industry seminar to international standards.' },
  },
  {
    title: { vi: 'Hội nghị xúc tiến thương mại', en: 'Trade Promotion Conference' },
    categoryKey: 'b2b',
    category: { vi: 'B2B', en: 'B2B' },
    desc: {
      vi: 'Nền tảng xúc tiến thương mại & kết nối giao thương.',
      en: 'A platform for trade promotion & business matching.',
    },
  },
  {
    title: { vi: 'Lễ ra mắt sản phẩm', en: 'Product Launch' },
    categoryKey: 'conference',
    category: { vi: 'Hội nghị', en: 'Conference' },
    desc: {
      vi: 'Sự kiện ra mắt sản phẩm đẳng cấp, dấu ấn thương hiệu.',
      en: 'A premium product launch that leaves a brand mark.',
    },
  },
  {
    title: { vi: 'Gian hàng triển lãm tiêu chuẩn & đặc biệt', en: 'Standard & Custom Exhibition Booths' },
    categoryKey: 'exhibition',
    category: { vi: 'Triển lãm', en: 'Exhibition' },
    desc: { vi: 'Thiết kế & thi công gian hàng cho nhiều triển lãm.', en: 'Booth design & construction for many exhibitions.' },
  },
];

export const projectFilters = [
  { key: 'all', label: { vi: 'Tất cả', en: 'All' } as Bi },
  { key: 'exhibition', label: { vi: 'Triển lãm', en: 'Exhibition' } as Bi },
  { key: 'conference', label: { vi: 'Hội nghị', en: 'Conference' } as Bi },
  { key: 'concert', label: { vi: 'Concert', en: 'Concert' } as Bi },
  { key: 'b2b', label: { vi: 'B2B', en: 'B2B' } as Bi },
] as const;

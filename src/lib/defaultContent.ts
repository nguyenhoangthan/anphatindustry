// Default content for all page sections.
// Used as fallback when no DB entry exists, and as initial seed values.

export const defaultHeroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1920&q=80',
    badge: 'Chuyên Nghiệp – Uy Tín',
    title: 'Bảo Dưỡng & Sửa Chữa Ô Tô',
    subtitle: 'Tiêu Chuẩn Kỹ Thuật Cao',
    description: 'Đội ngũ kỹ thuật viên tay nghề cao, thiết bị hiện đại, cam kết chất lượng dịch vụ tốt nhất cho xe của quý khách.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1920&q=80',
    badge: 'Nhanh – Chính Xác',
    title: 'Chăm Sóc Toàn Diện',
    subtitle: 'Nội Thất & Ngoại Thất',
    description: 'Dịch vụ chăm sóc xe chuyên nghiệp từ nội thất đến ngoại thất, bảo vệ xe luôn bền đẹp như mới.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1920&q=80',
    badge: 'Đồng Sơn Điêu Luyện',
    title: 'Phục Hồi Thân Vỏ Xe',
    subtitle: 'Sau Tai Nạn – Trầy Xước',
    description: 'Xưởng đồng sơn hiện đại với hệ thống buồng sơn chuẩn châu Âu, pha màu bằng máy quang học chính xác tuyệt đối.',
  },
]

export const defaultAboutSection = {
  badge: 'Về Chúng Tôi',
  title: 'Công Ty TNHH An Phát Industry',
  subtitle: 'Trung tâm bảo dưỡng – sửa chữa ô tô chuyên nghiệp hàng đầu tại TP. Hồ Chí Minh.',
  body: 'An Phát Industry được thành lập với sứ mệnh cung cấp dịch vụ bảo dưỡng và sửa chữa ô tô đạt chuẩn quốc tế tại Việt Nam. Chúng tôi quy tụ đội ngũ kỹ sư, kỹ thuật viên giàu kinh nghiệm, được đào tạo bài bản, luôn cập nhật công nghệ mới nhất để phục vụ quý khách ngày một tốt hơn.',
  image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
  highlights: [
    'Thành lập năm 2015 với hơn 9 năm kinh nghiệm trong ngành',
    'Đội ngũ kỹ sư và kỹ thuật viên được đào tạo bài bản',
    'Thiết bị chẩn đoán và sửa chữa hiện đại, chuẩn châu Âu',
    'Sử dụng phụ tùng chính hãng, có nguồn gốc rõ ràng',
    'Quy trình dịch vụ 12 bước minh bạch, rõ ràng',
    'Cam kết bảo hành dịch vụ, hoàn tiền nếu không hài lòng',
  ],
  stat1Value: '9+',
  stat1Label: 'Năm kinh nghiệm',
  stat2Value: '5K+',
  stat2Label: 'Khách hàng tin tưởng',
}

export const defaultWhyChooseUs = {
  badge: 'Tại Sao Chọn Chúng Tôi',
  title: 'Trung Thực – Tận Tâm – Trách Nhiệm – Chia Sẻ',
  subtitle: '4 giá trị cốt lõi định hướng mọi hoạt động của An Phát Industry, giúp chúng tôi xây dựng niềm tin bền vững với khách hàng.',
  values: [
    {
      title: 'Trung Thực',
      description: 'Trung thực là giá trị cốt lõi hàng đầu. Chúng tôi cam kết minh bạch từ khâu tư vấn, báo giá đến thực hiện – không phát sinh chi phí ngoài thỏa thuận.',
    },
    {
      title: 'Tận Tâm',
      description: 'Mỗi chiếc xe đến với chúng tôi đều được chăm sóc như xe của chính mình. Sự tận tâm được thể hiện ngay từ những công việc nhỏ nhất.',
    },
    {
      title: 'Trách Nhiệm',
      description: 'Chúng tôi chịu trách nhiệm hoàn toàn với mọi dịch vụ đã thực hiện. Cam kết bảo hành rõ ràng và hỗ trợ sau dịch vụ chu đáo.',
    },
    {
      title: 'Chia Sẻ',
      description: 'Chúng tôi sẵn sàng chia sẻ kiến thức, kinh nghiệm và hỗ trợ kỹ thuật giúp quý khách hiểu rõ hơn về xe của mình.',
    },
  ],
}

export const defaultProcessSteps = {
  badge: 'Quy Trình Dịch Vụ',
  title: '6 Bước Dịch Vụ Chuẩn Tại An Phát Industry',
  subtitle: 'Quy trình rõ ràng, minh bạch từ A đến Z đảm bảo quý khách luôn được thông báo và hài lòng với kết quả.',
  steps: [
    { step: 1, title: 'Tiếp Nhận Xe', description: 'Kỹ thuật viên đón tiếp và lắng nghe yêu cầu của quý khách. Ghi nhận thông tin xe và tình trạng ban đầu.' },
    { step: 2, title: 'Kiểm Tra Tổng Quát', description: 'Kiểm tra toàn diện 30+ hạng mục, chẩn đoán bằng thiết bị scan OBD2 chuyên dụng hoàn toàn miễn phí.' },
    { step: 3, title: 'Báo Giá Chi Tiết', description: 'Lập bảng báo giá rõ ràng, minh bạch. Tư vấn phương án tối ưu nhất. Không làm gì khi chưa được đồng ý.' },
    { step: 4, title: 'Lên Lịch Sửa Chữa', description: 'Lên kế hoạch thực hiện theo thứ tự ưu tiên, thông báo tiến độ cụ thể và thời gian hoàn thành.' },
    { step: 5, title: 'Thực Hiện Dịch Vụ', description: 'Kỹ thuật viên có tay nghề cao thực hiện sửa chữa/bảo dưỡng đúng quy trình, sử dụng phụ tùng chính hãng.' },
    { step: 6, title: 'Kiểm Tra & Bàn Giao', description: 'Kiểm tra lại toàn bộ công việc đã thực hiện. Vệ sinh xe sạch sẽ và bàn giao xe đúng hẹn với đầy đủ chứng từ.' },
  ],
}

export const defaultPartnersSection = {
  badge: 'Đối Tác',
  title: 'Các Thương Hiệu Chúng Tôi Phục Vụ',
  subtitle: 'An Phát Industry có đội ngũ kỹ thuật viên chuyên biệt cho từng dòng xe của các thương hiệu uy tín.',
  stats: [
    { value: '9+', label: 'Năm kinh nghiệm' },
    { value: '5.000+', label: 'Khách hàng' },
    { value: '20.000+', label: 'Xe đã phục vụ' },
    { value: '98%', label: 'Khách hài lòng' },
  ],
  partners: [
    { id: 1, name: 'Toyota', abbr: 'TYT' },
    { id: 2, name: 'Honda', abbr: 'HND' },
    { id: 3, name: 'Mazda', abbr: 'MZD' },
    { id: 4, name: 'Mercedes-Benz', abbr: 'MB' },
    { id: 5, name: 'BMW', abbr: 'BMW' },
    { id: 6, name: 'Hyundai', abbr: 'HYD' },
    { id: 7, name: 'Kia', abbr: 'KIA' },
    { id: 8, name: 'VinFast', abbr: 'VFS' },
  ],
  footnote: '*Và nhiều thương hiệu khác: Mitsubishi, Ford, Nissan, Audi, Lexus, Volvo, Subaru...',
}

export const defaultContactCTA = {
  headline: 'CAM KẾT VÀNG TẠI AN PHÁT',
  quote: '"Không sửa xong – Không thu phí – Hoàn tiền 100% nếu khách không hài lòng!"',
  body: 'Đặt lịch ngay hôm nay để được kiểm tra xe miễn phí và nhận tư vấn từ đội ngũ chuyên gia của chúng tôi.',
  cta1Text: 'Đặt Lịch Hẹn Ngay',
  cta1Href: '/lien-he',
}

export const defaultPricingPackages = {
  badge: 'Gói Dịch Vụ',
  title: 'Chọn Gói Phù Hợp Với Xe Của Bạn',
  subtitle: 'Tất cả các gói đều bao gồm kiểm tra miễn phí và báo cáo tình trạng xe chi tiết.',
  packages: [
    {
      name: 'Gói Bảo Dưỡng Cơ Bản',
      badge: 'Phổ Biến',
      highlight: false,
      price: 'Từ 350.000đ',
      description: 'Phù hợp cho xe mới và bảo dưỡng định kỳ theo cây số',
      cta: 'Đặt Lịch Ngay',
      items: [
        'Thay dầu động cơ (dầu tiêu chuẩn)',
        'Thay lọc dầu',
        'Kiểm tra 20+ hạng mục',
        'Kiểm tra áp suất lốp',
        'Kiểm tra mức nước làm mát',
        'Báo cáo tình trạng xe chi tiết',
      ],
    },
    {
      name: 'Gói Bảo Dưỡng Nâng Cao',
      badge: 'Khuyến Nghị',
      highlight: true,
      price: 'Từ 850.000đ',
      description: 'Gói toàn diện nhất được khách hàng lựa chọn nhiều nhất',
      cta: 'Chọn Gói Này',
      items: [
        'Thay dầu động cơ cao cấp (Full synthetic)',
        'Thay lọc dầu, lọc gió, lọc cabin',
        'Kiểm tra 30+ hạng mục',
        'Vệ sinh họng gió và buồng đốt',
        'Vệ sinh giàn lạnh & kiểm tra ga',
        'Kiểm tra hệ thống phanh',
        'Báo cáo video tình trạng xe',
      ],
    },
    {
      name: 'Gói Chăm Sóc Xe Toàn Diện',
      badge: 'Premium',
      highlight: false,
      price: 'Từ 2.500.000đ',
      description: 'Dành cho xe cao cấp hoặc khách hàng cần chăm sóc toàn diện',
      cta: 'Tư Vấn Thêm',
      items: [
        'Toàn bộ nội dung Gói Nâng Cao',
        'Đánh bóng xe ngoại thất',
        'Vệ sinh nội thất toàn diện',
        'Khử mùi bằng máy ozone',
        'Phủ lớp bảo vệ sơn nano',
        'Kiểm tra tổng thể gầm xe',
        'Bảo hành 3 tháng',
      ],
    },
  ],
  notes: [
    'Giá trên chưa bao gồm chi phí phụ tùng thay thế (nếu có)',
    'Báo giá chính xác sau khi kiểm tra trực tiếp xe tại xưởng',
    'Miễn phí kiểm tra tổng quát tại xưởng',
    'Áp dụng cho hầu hết các dòng xe phổ thông. Xe cao cấp có báo giá riêng',
    'Thanh toán linh hoạt: tiền mặt, chuyển khoản, thẻ tín dụng',
  ],
}

export const defaultTeamSection = {
  intro: {
    badge: 'Công Ty TNHH An Phát Industry',
    title: 'Trung Tâm Bảo Dưỡng – Sửa Chữa Ô Tô Chuyên Nghiệp',
    body1: 'An Phát Industry được thành lập với mục tiêu mang lại dịch vụ bảo dưỡng và sửa chữa ô tô đạt chuẩn kỹ thuật cao nhất tại TP. Hồ Chí Minh. Chúng tôi hiểu rằng chiếc xe không chỉ là phương tiện đi lại mà còn là tài sản giá trị và người bạn đồng hành đáng tin cậy.',
    body2: 'Qua nhiều năm hoạt động, An Phát Industry đã xây dựng được đội ngũ kỹ sư và kỹ thuật viên tay nghề cao, hệ thống thiết bị chẩn đoán hiện đại và quy trình dịch vụ chuẩn hóa.',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80',
    stats: [
      { value: '9+', label: 'Năm kinh nghiệm' },
      { value: '5K+', label: 'Khách hàng' },
      { value: '20K+', label: 'Xe đã phục vụ' },
      { value: '98%', label: 'Hài lòng' },
    ],
  },
  missions: [
    { title: 'Sứ Mệnh', description: 'Cung cấp dịch vụ bảo dưỡng và sửa chữa ô tô đạt chuẩn kỹ thuật cao nhất, giúp quý khách yên tâm trên từng hành trình.' },
    { title: 'Tầm Nhìn', description: 'Trở thành trung tâm dịch vụ ô tô hàng đầu tại TP.HCM, được tin tưởng bởi hàng chục nghìn khách hàng trên toàn thành phố.' },
    { title: 'Năng Lực Cốt Lõi', description: 'Đội ngũ kỹ sư và kỹ thuật viên được đào tạo bài bản, thiết bị chẩn đoán và sửa chữa hiện đại, quy trình dịch vụ chuẩn hóa.' },
    { title: 'Giá Trị Cốt Lõi', description: 'Trung thực – Tận tâm – Trách nhiệm – Chia sẻ. Bốn giá trị này định hướng mọi quyết định và hành động của An Phát Industry.' },
  ],
  fields: [
    'Bảo dưỡng sửa chữa tổng quát',
    'Điện & hệ thống điều hòa ô tô',
    'Sửa chữa máy gầm – tiểu tu, trung tu, đại tu',
    'Chăm sóc nội thất và ngoại thất chuyên sâu',
    'Đồng sơn và phục hồi thân vỏ xe',
    'Dịch vụ sửa chữa lưu động tại nhà 24/7',
    'Cứu hộ xe, xử lý bảo hiểm ô tô',
  ],
  team: [
    { name: 'Nguyễn Văn An', role: 'Giám Đốc / Kỹ Sư Trưởng', description: 'Hơn 15 năm kinh nghiệm trong ngành ô tô, tốt nghiệp ĐH Bách Khoa TP.HCM.' },
    { name: 'Trần Thị Phát', role: 'Quản Lý Xưởng Dịch Vụ', description: 'Chuyên gia bảo dưỡng và sửa chữa máy gầm với 10 năm kinh nghiệm thực chiến.' },
    { name: 'Lê Hoàng Nam', role: 'Trưởng Xưởng Đồng Sơn', description: 'Tay nghề pha màu và sơn xe điêu luyện, chuyên gia phục hồi xe sau tai nạn.' },
  ],
}

export const RECRUITMENT_POSTERS = [
  {
    slug: 'ky-thuat-vien-chuyen-nghiep',
    src: '/images/tuyen-dung/tuyen-dung-1.jpg',
    alt: 'Tuyển dụng Kỹ Thuật Viên chuyên nghiệp – Xưởng Dịch Vụ An Phát',
    title: 'Kỹ Thuật Viên Chuyên Nghiệp',
    summary:
      'Tìm kiếm Kỹ Thuật Viên lành nghề, có khả năng sửa chữa độc lập, bắt bệnh nhanh, sửa chữa chuẩn xác.',
  },
  {
    slug: 'ky-thuat-vien-tap-su',
    src: '/images/tuyen-dung/tuyen-dung-2.jpg',
    alt: 'Tuyển dụng Kỹ Thuật Viên tập sự – Xưởng Dịch Vụ An Phát',
    title: 'Kỹ Thuật Viên Tập Sự',
    summary:
      'Dành cho các bạn trẻ đam mê, muốn được sửa chữa bài bản theo tiêu chuẩn đại lý chính hãng.',
  },
]

export type RecruitmentJob = (typeof RECRUITMENT_POSTERS)[number]

export const RECRUIT_PHONE_DISPLAY = '0938 413 830'
export const RECRUIT_PHONE_LINK = 'tel:+84938413830'
export const RECRUIT_ADDRESS = '08 Nguyễn Ảnh Thủ, P. Trung Mỹ Tây, TP. Hồ Chí Minh'

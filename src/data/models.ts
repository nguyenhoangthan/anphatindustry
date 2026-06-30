// Data for the "MÔ HÌNH" section (training & diagnostic equipment).
// Structure mirrors the company category sheet. Items without real content yet
// are shown with an "đang cập nhật" placeholder on the page.

export interface ModelGroup {
  title: string
  items: string[]
}

export interface ModelCategory {
  slug: string
  label: string
  description: string
  icon: string
  image: string
  groups: ModelGroup[]
}

export const modelCategories: ModelCategory[] = [
  {
    slug: 'thiet-bi-dao-tao',
    label: 'Thiết Bị Đào Tạo Kỹ Thuật',
    description:
      'Hệ thống mô hình đào tạo trực quan phục vụ giảng dạy và thực hành kỹ thuật ô tô: tháo lắp, điện, khung gầm và điều hòa.',
    icon: 'graduation-cap',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    groups: [
      {
        title: 'Đào tạo tháo lắp',
        items: [
          'Mô hình khung quay động cơ',
          'Mô hình khung quay hộp số',
          'Mô hình cắt bổ động cơ, hộp số …',
          'Mô hình tháo lắp chi tiết',
          'Mô hình khung quay mô tơ điện VIN',
        ],
      },
      {
        title: 'Đào tạo điện',
        items: ['Điện động cơ', 'Điện thân xe', 'Xe điện'],
      },
      {
        title: 'Đào tạo khung gầm',
        items: ['Hệ thống lái', 'Hệ thống Phanh (Bao gồm ABS)', 'Hệ thống treo'],
      },
      {
        title: 'Đào tạo hệ thống điều hòa',
        items: ['Tự động', 'Cơ khí'],
      },
    ],
  },
  {
    slug: 'thiet-bi-chan-doan',
    label: 'Thiết Bị Kiểm Tra Chẩn Đoán',
    description:
      'Bộ thiết bị kiểm tra và chẩn đoán chuyên dụng phục vụ đào tạo và sửa chữa các hệ thống điện tử trên ô tô.',
    icon: 'activity',
    image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&q=80',
    groups: [
      {
        title: 'Danh mục thiết bị',
        items: [
          'Bộ kiểm tra ECU',
          'Bộ cấp nguồn',
          'Bộ chẩn đoán CAN',
          'Bộ chẩn đoán Vinfast',
          'Bộ chẩn đoán đồng hồ tap lô',
          'Bộ kiểm tra Bugi đánh lửa',
        ],
      },
    ],
  },
]

export function getModelCategory(slug: string) {
  return modelCategories.find((c) => c.slug === slug)
}

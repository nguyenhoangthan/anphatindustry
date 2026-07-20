// Định dạng lại nội dung bài "Bảo Dưỡng Xe Ô Tô Định Kỳ..." thành HTML chuẩn.
// Giữ nguyên 100% nội dung/số liệu kỹ thuật gốc, chỉ thêm thẻ HTML.
// Chạy 1 lần qua: npm run fix-post-content
const { PrismaClient } = require('@prisma/client')

const POST_ID = 'cmp5c3x3m000aadrrvu049i0v'

const list = (items) => `<ul>\n${items.map((i) => `  <li>${i}</li>`).join('\n')}\n</ul>`

const CONTENT = `
<h2>Lịch Bảo Dưỡng Định Kỳ Ô Tô Từ 1.000 Km Đến 200.000 Km</h2>
<p>Hướng dẫn tổng quát dành cho các dòng xe Toyota, Mazda, Ford, Hyundai, Kia, Honda, Mitsubishi, Nissan, Isuzu, BMW, Mercedes-Benz, Audi, Volkswagen...</p>
<p><em>Lưu ý: Lịch dưới đây mang tính tổng quát, áp dụng cho đa số xe sử dụng động cơ xăng và Diesel. Mỗi hãng xe có thể có một số khác biệt về chu kỳ thay thế tùy theo điều kiện vận hành và khuyến cáo của nhà sản xuất.</em></p>

<h3>Tại Sao Cần Bảo Dưỡng Định Kỳ?</h3>
<p>Xe ô tô là tập hợp của hàng chục nghìn chi tiết cơ khí và điện tử hoạt động liên tục trong điều kiện nhiệt độ, áp suất và tải trọng rất cao. Việc bảo dưỡng đúng chu kỳ sẽ giúp:</p>
${list([
  'Duy trì hiệu suất vận hành.',
  'Tiết kiệm nhiên liệu.',
  'Kéo dài tuổi thọ động cơ.',
  'Giảm nguy cơ hư hỏng đột xuất.',
  'Đảm bảo an toàn khi lưu thông.',
  'Tiết kiệm chi phí sửa chữa lớn về lâu dài.',
  'Giữ giá trị xe khi bán lại.',
])}

<h3>Mốc 1.000 Km (Hoặc Sau Khi Nhận Xe Mới)</h3>
<p>Công việc thực hiện:</p>
${list([
  'Kiểm tra mức dầu động cơ.', 'Kiểm tra nước làm mát.', 'Kiểm tra dầu thắng.',
  'Kiểm tra dầu trợ lực lái (nếu có).', 'Kiểm tra nước rửa kính.', 'Kiểm tra áp suất lốp.',
  'Kiểm tra lực siết bánh xe.', 'Kiểm tra rò rỉ dầu, nước.', 'Kiểm tra hệ thống điện.',
  'Kiểm tra hoạt động đèn chiếu sáng.', 'Kiểm tra cần gạt mưa.', 'Kiểm tra hệ thống điều hòa.',
])}

<h3>Mỗi 5.000 Km</h3>
<p>Thực hiện:</p>
${list([
  'Thay dầu động cơ.', 'Thay ron ốc xả nhớt (nếu cần).', 'Kiểm tra lọc dầu.',
  'Kiểm tra lọc gió động cơ.', 'Kiểm tra lọc gió điều hòa.', 'Kiểm tra má phanh.',
  'Kiểm tra đĩa phanh.', 'Kiểm tra độ mòn lốp.', 'Đảo lốp.', 'Cân chỉnh áp suất lốp.',
  'Kiểm tra ắc quy.', 'Kiểm tra dây curoa.', 'Kiểm tra hệ thống treo.',
  'Kiểm tra cao su giảm chấn.', 'Kiểm tra rô-tuyn lái.', 'Kiểm tra rô-tuyn cân bằng.',
  'Kiểm tra giảm xóc.', 'Kiểm tra gầm xe.',
])}

<h3>Mỗi 10.000 Km</h3>
<p>Ngoài các hạng mục 5.000 km:</p>
${list([
  'Thay lọc dầu động cơ.', 'Vệ sinh lọc gió động cơ.', 'Vệ sinh lọc gió điều hòa.',
  'Vệ sinh họng ga.', 'Kiểm tra kim phun.', 'Kiểm tra bugi (động cơ xăng).',
  'Kiểm tra dây điện động cơ.', 'Kiểm tra nước làm mát.', 'Kiểm tra dầu hộp số.',
  'Kiểm tra dầu vi sai (xe cầu sau, AWD, 4WD).', 'Kiểm tra dầu trợ lực lái.',
  'Kiểm tra hệ thống lái điện.', 'Kiểm tra ECU bằng máy chẩn đoán.', 'Xóa lỗi tạm thời nếu có.',
])}

<h3>Mỗi 20.000 Km</h3>
<p>Ngoài các hạng mục trên:</p>
${list([
  'Thay lọc gió động cơ.', 'Thay lọc gió điều hòa.', 'Cân bằng động bánh xe.',
  'Cân chỉnh góc đặt bánh xe.', 'Vệ sinh kim phun.', 'Vệ sinh buồng đốt.',
  'Vệ sinh họng ga chuyên sâu.', 'Kiểm tra cao su chân máy.', 'Kiểm tra bạc đạn bánh xe.',
  'Kiểm tra hệ thống ABS.', 'Kiểm tra cảm biến bánh xe.',
])}

<h3>Mỗi 40.000 Km</h3>
<p>Thực hiện:</p>
${list([
  'Thay dầu hộp số AT/CVT/DCT/MT.', 'Thay dầu vi sai.', 'Thay dầu hộp phân phối (4WD).',
  'Thay nước làm mát.', 'Thay dầu thắng.', 'Thay bugi thường.', 'Kiểm tra bugi Iridium.',
  'Thay lọc nhiên liệu (nếu quy định).', 'Vệ sinh két nước.', 'Kiểm tra quạt làm mát.',
  'Kiểm tra bơm nước.', 'Kiểm tra dây curoa phụ.', 'Kiểm tra máy phát.', 'Kiểm tra mô tơ đề.',
])}

<h3>Mỗi 60.000 Km</h3>
<p>Thực hiện:</p>
${list([
  'Thay bugi Iridium (nếu đến hạn).', 'Kiểm tra bơm xăng.', 'Kiểm tra áp suất nhiên liệu.',
  'Kiểm tra kim phun.', 'Vệ sinh buồng đốt.', 'Kiểm tra cảm biến oxy.',
  'Kiểm tra cảm biến MAF/MAP.', 'Kiểm tra Turbo (động cơ tăng áp).', 'Kiểm tra intercooler.',
  'Kiểm tra hệ thống EGR (Diesel).',
])}

<h3>Mỗi 80.000 Km</h3>
<p>Thực hiện:</p>
${list([
  'Kiểm tra dây cam hoặc xích cam.', 'Kiểm tra tăng cam.', 'Kiểm tra puly.',
  'Kiểm tra bạc đạn puly.', 'Kiểm tra phớt trục cơ.', 'Kiểm tra phớt trục cam.',
  'Kiểm tra hệ thống điều hòa.', 'Kiểm tra máy nén lạnh.', 'Kiểm tra dàn nóng.',
  'Kiểm tra dàn lạnh.', 'Bổ sung gas lạnh nếu cần.',
])}

<h3>Mỗi 100.000 Km</h3>
<p>Đây là cột mốc bảo dưỡng lớn:</p>
${list([
  'Thay toàn bộ dầu các hệ thống.', 'Thay nước làm mát.', 'Thay dầu thắng.',
  'Thay dầu hộp số.', 'Thay dầu vi sai.', 'Thay bugi.', 'Thay lọc nhiên liệu.',
  'Kiểm tra bơm nước.', 'Kiểm tra dây curoa.', 'Kiểm tra hệ thống lái.',
  'Kiểm tra giảm xóc.', 'Kiểm tra rotuyn.', 'Kiểm tra toàn bộ cao su gầm.',
  'Kiểm tra bạc đạn bánh xe.', 'Kiểm tra hệ thống điện thân xe.', 'Kiểm tra máy phát.',
  'Kiểm tra đề.', 'Kiểm tra ECU.', 'Quét lỗi toàn bộ xe.',
])}

<h3>Mỗi 120.000 Km</h3>
<p>Thực hiện:</p>
${list([
  'Đại bảo dưỡng hệ thống làm mát.', 'Vệ sinh két nước.', 'Thay van hằng nhiệt nếu cần.',
  'Kiểm tra bơm nước.', 'Kiểm tra toàn bộ hệ thống nhiên liệu.', 'Kiểm tra Turbo.',
  'Kiểm tra DPF (xe Diesel).', 'Kiểm tra xúc tác.', 'Kiểm tra hệ thống xả.',
])}

<h3>Mỗi 150.000 Km</h3>
<p>Thực hiện:</p>
${list([
  'Kiểm tra độ nén động cơ.', 'Kiểm tra hao dầu.', 'Kiểm tra hao nước.', 'Kiểm tra xupap.',
  'Kiểm tra xích cam.', 'Kiểm tra dây cam.', 'Kiểm tra bơm dầu.', 'Kiểm tra áp suất dầu.',
  'Kiểm tra piston.', 'Kiểm tra xy lanh bằng nội soi.', 'Kiểm tra bạc thanh truyền.',
  'Kiểm tra bạc trục khuỷu.',
])}

<h3>Mỗi 180.000 Km</h3>
<p>Thực hiện:</p>
${list([
  'Đại tu hệ thống treo nếu cần.', 'Thay toàn bộ cao su gầm lão hóa.', 'Kiểm tra thước lái.',
  'Đại tu phanh.', 'Kiểm tra hộp số.', 'Kiểm tra ly hợp (xe số sàn).',
  'Kiểm tra biến mô (xe AT).', 'Kiểm tra mechatronic (DCT nếu có).',
])}

<h3>Mỗi 200.000 Km</h3>
<p>Đại tu tổng thể động cơ (nếu có dấu hiệu xuống cấp). Các hạng mục có thể bao gồm:</p>
${list([
  'Kiểm tra độ mòn xy lanh.', 'Đo khe hở piston.', 'Thay xéc-măng.', 'Thay bạc piston.',
  'Thay bạc trục cơ.', 'Thay bạc thanh truyền.', 'Thay phớt dầu.', 'Thay toàn bộ gioăng động cơ.',
  'Thay phớt xu-páp.', 'Mài xu-páp.', 'Kiểm tra nắp máy.', 'Kiểm tra trục cam.',
  'Kiểm tra bơm dầu.', 'Kiểm tra bơm nước.', 'Thay dây cam hoặc xích cam (nếu cần).',
  'Cân chỉnh thời điểm phối khí.', 'Hiệu chỉnh kim phun.', 'Cân chỉnh ECU.',
  'Chạy rà động cơ sau đại tu.',
])}

<blockquote><p>Lưu ý: Không phải mọi xe đều cần đại tu đúng ở mốc 200.000 km. Nếu được bảo dưỡng đúng cách, nhiều động cơ hiện đại có thể vận hành ổn định đến 300.000–500.000 km trước khi cần đại tu lớn.</p></blockquote>

<hr>

<h2>Vai Trò Của Garage An Phát Bảo Dưỡng Đối Với Xe Đã Hết Bảo Hành Hãng</h2>
<p>Sau khi xe hết thời hạn bảo hành chính hãng (thường từ 3–5 năm hoặc 100.000–150.000 km tùy từng thương hiệu), việc lựa chọn một garage uy tín trở thành yếu tố quan trọng để duy trì chất lượng và tuổi thọ xe.</p>

<h3>Garage Chuyên Nghiệp Mang Lại Những Lợi Ích Sau:</h3>
${list([
  'Chi phí bảo dưỡng và sửa chữa hợp lý hơn so với trung tâm dịch vụ chính hãng.',
  'Linh hoạt sử dụng phụ tùng chính hãng hoặc phụ tùng OEM chất lượng cao theo nhu cầu và ngân sách của khách hàng.',
  'Trang bị máy chẩn đoán chuyên dụng giúp phát hiện sớm các lỗi điện, điện tử và động cơ.',
  'Kỹ thuật viên giàu kinh nghiệm xử lý nhiều dòng xe từ phổ thông đến xe sang như Toyota, Mazda, Ford, Hyundai, Kia, Honda, Mitsubishi, Nissan, Isuzu, BMW, Mercedes-Benz, Audi và Volkswagen.',
  'Theo dõi lịch sử sửa chữa, nhắc lịch bảo dưỡng định kỳ và tư vấn hạng mục cần ưu tiên.',
  'Phát hiện sớm các dấu hiệu hao mòn để xử lý trước khi phát sinh hư hỏng lớn, giúp giảm chi phí sửa chữa.',
  'Đảm bảo xe luôn vận hành ổn định, an toàn và giữ giá trị sử dụng lâu dài.',
])}

<p>Bảo dưỡng định kỳ không chỉ là thay dầu động cơ mà là quá trình kiểm tra toàn diện tất cả các hệ thống trên xe. Việc tuân thủ đúng lịch bảo dưỡng giúp giảm thiểu nguy cơ hỏng hóc, tối ưu hiệu suất vận hành và kéo dài tuổi thọ của xe.</p>
<p>Đối với các xe đã hết thời gian bảo hành của hãng, lựa chọn một Garage An Phát với đầy đủ thiết bị chẩn đoán, quy trình bảo dưỡng chuyên nghiệp và đội ngũ kỹ thuật viên nhiều kinh nghiệm là giải pháp hiệu quả để chiếc xe luôn hoạt động bền bỉ, an toàn và tiết kiệm chi phí trong suốt vòng đời sử dụng.</p>
`.trim()

async function main() {
  const prisma = new PrismaClient()
  const before = await prisma.blogPost.findUnique({ where: { id: POST_ID } })
  if (!before) {
    console.log('KHÔNG TÌM THẤY bài viết id:', POST_ID)
    process.exit(1)
  }
  console.log('Bài viết:', before.title)
  console.log('Độ dài content cũ:', before.content.length, '-> mới:', CONTENT.length)

  await prisma.blogPost.update({ where: { id: POST_ID }, data: { content: CONTENT } })
  console.log('OK - đã cập nhật content mới, đã format lại HTML đầy đủ.')
  await prisma.$disconnect()
}

main().catch((err) => {
  console.log('LỖI:', err.message)
  process.exit(1)
})

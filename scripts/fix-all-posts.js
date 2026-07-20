// Định dạng lại nội dung 5 bài viết còn lại thành HTML chuẩn.
// Giữ nguyên 100% nội dung/số liệu kỹ thuật gốc, chỉ thêm thẻ HTML.
// Chạy 1 lần qua: npm run fix-all-posts
const { PrismaClient } = require('@prisma/client')

const list = (items) => `<ul>\n${items.map((i) => `  <li>${i}</li>`).join('\n')}\n</ul>`
const table = (headers, rows) =>
  `<table>\n  <thead>\n    <tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>\n  </thead>\n  <tbody>\n${rows
    .map((r) => `    <tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('\n')}\n  </tbody>\n</table>`

const POSTS = [
  {
    id: 'cmp5c3x3r000badrrwrchug7b',
    content: `
<h2>10 Dấu Hiệu Nhận Biết Điều Hòa Ô Tô Cần Bảo Dưỡng Ngay</h2>
<p>Nếu điều hòa ô tô xuất hiện một hoặc nhiều dấu hiệu dưới đây, bạn nên đưa xe đến Garage An Phát để kiểm tra và bảo dưỡng sớm nhằm tránh hư hỏng nặng và tốn kém chi phí sửa chữa.</p>

<h3>1. ❄️ Điều hòa làm mát yếu hoặc không lạnh</h3>
${list(['Mất nhiều thời gian mới mát.', 'Chỉ mát khi xe chạy tốc độ cao.', 'Nhiệt độ trong xe không đạt mức cài đặt.'])}
<p>Nguyên nhân có thể:</p>
${list(['Thiếu gas lạnh.', 'Lọc gió điều hòa bẩn.', 'Dàn lạnh hoặc dàn nóng bám bụi.', 'Máy nén (lốc lạnh) hoạt động kém.'])}

<h3>2. 🌬️ Gió thổi yếu dù quạt đang ở mức cao</h3>
${list(['Lưu lượng gió giảm rõ rệt.', 'Có vị trí cửa gió thổi mạnh, vị trí khác thổi yếu.'])}
<p>Nguyên nhân có thể:</p>
${list(['Lọc gió cabin quá bẩn.', 'Quạt gió yếu.', 'Đường gió bị cản trở.'])}

<h3>3. 🤢 Có mùi hôi khi bật điều hòa</h3>
${list(['Mùi ẩm mốc.', 'Mùi chua.', 'Mùi khó chịu kéo dài.'])}
<p>Nguyên nhân có thể:</p>
${list(['Dàn lạnh bị nấm mốc.', 'Lọc gió cabin bẩn.', 'Đường thoát nước dàn lạnh bị nghẹt.'])}

<h3>4. 💧 Điều hòa chảy nước vào trong xe</h3>
${list(['Thảm sàn trước bị ướt.', 'Có nước nhỏ dưới taplo.'])}
<p>Nguyên nhân có thể:</p>
${list(['Tắc ống thoát nước dàn lạnh.', 'Đọng nước trong hộp gió.'])}

<h3>5. 🔊 Có tiếng kêu lạ khi bật điều hòa</h3>
${list(['Tiếng rít.', 'Tiếng ù.', 'Tiếng lạch cạch.', 'Tiếng két.'])}
<p>Nguyên nhân có thể:</p>
${list(['Bạc đạn lốc lạnh mòn.', 'Quạt gió hỏng.', 'Puly hoặc dây curoa bị mòn.'])}

<h3>6. 🚗 Xe bị ì hơn khi bật điều hòa</h3>
${list(['Xe tăng tốc chậm.', 'Động cơ gằn.', 'Tiêu hao nhiên liệu tăng.'])}
<p>Nguyên nhân có thể:</p>
${list(['Máy nén điều hòa hoạt động quá tải.', 'Áp suất gas không đúng.'])}

<h3>7. ⛽ Hao nhiên liệu bất thường</h3>
<p>Nếu điều hòa hoạt động không hiệu quả, động cơ phải làm việc nhiều hơn để duy trì khả năng làm mát.</p>

<h3>8. 🌡️ Điều hòa lúc lạnh lúc không</h3>
${list(['Khi lạnh sâu.', 'Khi chỉ còn gió thường.', 'Lạnh không ổn định.'])}
<p>Nguyên nhân có thể:</p>
${list(['Thiếu gas.', 'Cảm biến nhiệt lỗi.', 'Van tiết lưu gặp sự cố.'])}

<h3>9. 🔄 Máy lạnh đóng/ngắt liên tục</h3>
<p>Lốc lạnh bật rồi tắt liên tục trong thời gian ngắn.</p>
<p>Nguyên nhân có thể:</p>
${list(['Thiếu gas.', 'Công tắc áp suất lỗi.', 'Hệ thống điều khiển gặp vấn đề.'])}

<h3>10. ⚠️ Đã hơn 12 tháng hoặc 15.000–20.000 km chưa bảo dưỡng</h3>
<p>Ngay cả khi điều hòa vẫn mát, bạn vẫn nên kiểm tra định kỳ để:</p>
${list(['Vệ sinh dàn lạnh.', 'Vệ sinh dàn nóng.', 'Thay lọc gió điều hòa.', 'Kiểm tra lượng gas.', 'Kiểm tra rò rỉ.', 'Kiểm tra hoạt động của máy nén và quạt giải nhiệt.'])}

<h3>📋 Những hạng mục nên bảo dưỡng điều hòa ô tô</h3>
${list([
  '✅ Kiểm tra hiệu suất làm lạnh.', '✅ Kiểm tra áp suất gas.', '✅ Kiểm tra rò rỉ gas.',
  '✅ Vệ sinh dàn lạnh.', '✅ Vệ sinh dàn nóng.', '✅ Thay lọc gió điều hòa (lọc gió cabin) nếu bẩn.',
  '✅ Thông rửa ống thoát nước dàn lạnh.', '✅ Kiểm tra quạt dàn nóng và quạt gió trong xe.',
  '✅ Kiểm tra dây curoa và puly máy nén.', '✅ Kiểm tra cảm biến và hệ thống điện điều hòa.',
  '✅ Khử khuẩn, khử mùi hệ thống điều hòa.',
])}

<h3>💡 Lời khuyên từ Garage Ô tô An Phát</h3>
<p>Đừng chờ đến khi điều hòa không còn lạnh mới mang xe đi kiểm tra. Việc bảo dưỡng định kỳ giúp:</p>
${list([
  'Tiết kiệm chi phí sửa chữa lớn.', 'Kéo dài tuổi thọ máy nén (lốc lạnh).', 'Làm lạnh nhanh và sâu hơn.',
  'Loại bỏ mùi hôi, nấm mốc và vi khuẩn.', 'Bảo vệ sức khỏe người ngồi trên xe.',
  'Giảm tiêu hao nhiên liệu và giúp xe vận hành ổn định.',
])}
<blockquote><p>"Điều hòa mát sâu – Hành trình thoải mái. Bảo dưỡng đúng lúc – Tiết kiệm về lâu dài."</p></blockquote>
`.trim(),
  },

  {
    id: 'cmp5c3x3u000cadrrpg2dbgxt',
    content: `
<h2>🚗 Checklist Kiểm Tra Xe Ô Tô Trước Khi Đi Du Lịch Xa</h2>
<p><em>Garage Ô tô An Phát – Đồng hành cùng mọi hành trình</em></p>
<p>Chỉ mất khoảng 10–15 phút tự kiểm tra trước chuyến đi, bạn có thể giảm đáng kể nguy cơ gặp sự cố trên đường.</p>

<h3>✅ I. Kiểm Tra Lốp Xe (Quan Trọng Nhất)</h3>
${list(['☐ Áp suất 4 lốp đúng theo khuyến cáo của nhà sản xuất.', '☐ Kiểm tra lốp dự phòng còn đủ hơi.', '☐ Độ sâu gai lốp còn trên 1,6 mm (nên trên 3 mm khi đi đường dài hoặc trời mưa).', '☐ Không có vết nứt, phù, rách hoặc đinh cắm trên lốp.', '☐ Siết chặt các đai ốc bánh xe (nếu vừa tháo lắp hoặc thay lốp).'])}

<h3>✅ II. Kiểm Tra Dầu Động Cơ</h3>
${list(['☐ Mức dầu nằm giữa vạch MIN – MAX trên que thăm dầu.', '☐ Dầu không quá đen hoặc có mùi khét.', '☐ Không có hiện tượng rò rỉ dầu dưới gầm xe.'])}

<h3>✅ III. Kiểm Tra Nước Làm Mát</h3>
${list(['☐ Mực nước trong bình phụ nằm giữa LOW – FULL.', '☐ Không thiếu nước làm mát.', '☐ Không phát hiện rò rỉ tại két nước, ống nước hoặc khoang động cơ.'])}
<p><em>Lưu ý: Chỉ kiểm tra khi động cơ đã nguội để tránh nguy cơ bỏng.</em></p>

<h3>✅ IV. Kiểm Tra Nước Rửa Kính</h3>
${list(['☐ Bình nước rửa kính còn đủ.', '☐ Bổ sung dung dịch rửa kính chuyên dụng nếu cần.', '☐ Không dùng nước xà phòng hoặc nước giếng để thay thế.'])}

<h3>✅ V. Kiểm Tra Cần Gạt Mưa</h3>
${list(['☐ Gạt sạch nước, không để lại vệt.', '☐ Cao su gạt không bị chai, rách hoặc bong.', '☐ Không phát ra tiếng kêu khi hoạt động.'])}

<h3>✅ VI. Kiểm Tra Hệ Thống Đèn</h3>
${list(['☐ Đèn chiếu gần (Cos).', '☐ Đèn chiếu xa (Pha).', '☐ Đèn định vị.', '☐ Đèn xi nhan.', '☐ Đèn phanh.', '☐ Đèn lùi.', '☐ Đèn cảnh báo nguy hiểm (Hazard).'])}

<h3>✅ VII. Kiểm Tra Ắc Quy</h3>
${list(['☐ Cọc bình sạch, không bị oxy hóa.', '☐ Xe đề nổ dễ dàng.', '☐ Không xuất hiện đèn cảnh báo ắc quy trên bảng đồng hồ.'])}

<h3>✅ VIII. Kiểm Tra Điều Hòa</h3>
${list(['☐ Làm lạnh nhanh.', '☐ Không có mùi hôi.', '☐ Gió thổi mạnh và đều ở các cửa gió.'])}

<h3>✅ IX. Kiểm Tra Hệ Thống Phanh</h3>
${list(['☐ Bàn đạp phanh không quá mềm hoặc quá cứng.', '☐ Không phát ra tiếng kêu bất thường khi phanh.', '☐ Xe không bị lệch hướng khi đạp phanh.', '☐ Đèn báo phanh không sáng.'])}

<h3>✅ X. Kiểm Tra Vô Lăng</h3>
${list(['☐ Không bị rung khi chạy.', '☐ Không bị lệch khi đi thẳng.', '☐ Đánh lái nhẹ nhàng, không phát ra tiếng kêu.'])}

<h3>✅ XI. Kiểm Tra Kính Và Gương</h3>
${list(['☐ Gương chiếu hậu sạch.', '☐ Kính chắn gió không bị nứt lớn gây cản tầm nhìn.', '☐ Kính cửa lên xuống bình thường.'])}

<h3>✅ XII. Kiểm Tra Dây Đai An Toàn</h3>
${list(['☐ Khóa cài chắc chắn.', '☐ Dây kéo ra và thu vào mượt.', '☐ Không bị xoắn hoặc sờn.'])}

<h3>✅ XIII. Kiểm Tra Nhiên Liệu</h3>
${list(['☐ Đổ đầy bình trước khi khởi hành hoặc đảm bảo đủ cho quãng đường dự kiến.', '☐ Xác định trước các trạm xăng nếu đi qua khu vực thưa dân cư.'])}

<h3>✅ XIV. Chuẩn Bị Giấy Tờ Xe</h3>
${list(['☐ Giấy phép lái xe.', '☐ Đăng ký xe.', '☐ Giấy chứng nhận kiểm định (nếu thuộc diện phải kiểm định).', '☐ Bảo hiểm trách nhiệm dân sự còn hiệu lực.', '☐ Thẻ thu phí không dừng (ETC) còn đủ số dư (nếu sử dụng).'])}

<h3>✅ XV. Chuẩn Bị Dụng Cụ Khẩn Cấp</h3>
${list(['☐ Kích nâng xe.', '☐ Cờ lê tháo bánh.', '☐ Tam giác cảnh báo phản quang.', '☐ Dây câu bình.', '☐ Đèn pin.', '☐ Máy bơm lốp mini.', '☐ Đồng hồ đo áp suất lốp.', '☐ Bộ vá lốp nhanh (nếu có).', '☐ Bình chữa cháy (nếu trang bị).', '☐ Bộ sơ cứu y tế.'])}

<h3>✅ XVI. Kiểm Tra Khoang Hành Lý</h3>
${list(['☐ Hành lý được sắp xếp gọn gàng.', '☐ Không để vật nặng có thể trượt khi phanh gấp.', '☐ Không chở quá tải trọng cho phép của xe.'])}

<h3>⭐ Khuyến Nghị Từ Garage Ô Tô An Phát</h3>
<p>Nếu xe có một trong các dấu hiệu sau, bạn nên mang xe đến garage để kiểm tra trước chuyến đi:</p>
${list(['🔸 Đã hơn 10.000 km chưa thay dầu động cơ.', '🔸 Đã hơn 20.000 km chưa bảo dưỡng hệ thống phanh.', '🔸 Điều hòa làm lạnh yếu hoặc có mùi hôi.', '🔸 Lốp đã mòn gần vạch chỉ thị hoặc sử dụng trên 5 năm.', '🔸 Ắc quy đã sử dụng trên 2–3 năm hoặc có dấu hiệu yếu.', '🔸 Có đèn cảnh báo bất thường trên bảng đồng hồ.', '🔸 Xe phát ra tiếng kêu lạ, rung lắc hoặc có hiện tượng rò rỉ dầu, nước.'])}

<h3>🛡️ Cam Kết Từ Garage Ô Tô An Phát</h3>
<blockquote><p>"Kiểm tra kỹ trước mỗi chuyến đi – An tâm trên mọi hành trình."</p></blockquote>
<p>Tại Garage Ô tô An Phát, chúng tôi cung cấp dịch vụ kiểm tra tổng quát trước chuyến đi với đầy đủ các hạng mục như lốp, phanh, dầu động cơ, nước làm mát, điều hòa, ắc quy, hệ thống đèn và các chất lỏng, giúp bạn và gia đình khởi hành an toàn, hạn chế tối đa các sự cố ngoài ý muốn.</p>
`.trim(),
  },

  {
    id: 'cmp5c3x3y000dadrr3ffz852u',
    content: `
<h2>Sơn 1K Là Gì?</h2>
<p>Sơn 1K (One Component) là loại sơn chỉ có một thành phần, sử dụng trực tiếp và khô nhờ dung môi bay hơi hoặc phản ứng với không khí.</p>

<h3>Thường Được Sử Dụng Cho:</h3>
${list(['Sơn dặm nhỏ.', 'Sơn mâm xe.', 'Sơn cản nhựa.', 'Xe dịch vụ.', 'Xe tải.', 'Các chi tiết ít yêu cầu độ bóng cao.'])}

<h3>Ưu Điểm Của Sơn 1K</h3>
${list(['✅ Giá thành rẻ.', '✅ Thi công nhanh.', '✅ Không cần pha chất đóng rắn (Hardener).', '✅ Tiết kiệm chi phí sửa chữa.', '✅ Dễ dặm vá khi bị trầy xước.'])}

<h3>Nhược Điểm Của Sơn 1K</h3>
${list(['❌ Độ bóng không cao.', '❌ Màu dễ xuống theo thời gian.', '❌ Khả năng chống tia UV kém.', '❌ Dễ bị hóa chất làm ảnh hưởng.', '❌ Dễ trầy xước hơn.', '❌ Tuổi thọ ngắn.'])}
<p>Thông thường sau khoảng 2–4 năm, lớp sơn có thể bắt đầu giảm độ bóng tùy điều kiện sử dụng và chăm sóc.</p>

<h2>Sơn 2K Là Gì?</h2>
<p>Sơn 2K (Two Component) gồm hai thành phần:</p>
${list(['Sơn màu.', 'Chất đóng rắn (Hardener).'])}
<p>Hai thành phần được pha theo đúng tỷ lệ trước khi phun. Sau khi đóng rắn, lớp sơn có độ cứng và độ bền cao hơn.</p>
<p>Đây là loại sơn được sử dụng phổ biến trên:</p>
${list(['Xe du lịch.', 'Xe sang.', 'Xe mới.', 'Các garage chuyên nghiệp.', 'Xưởng đồng sơn đạt tiêu chuẩn.'])}

<h3>Ưu Điểm Của Sơn 2K</h3>
${list(['✅ Độ bóng cao.', '✅ Màu sắc đẹp, chiều sâu tốt.', '✅ Chống tia UV tốt.', '✅ Chống phai màu.', '✅ Chịu hóa chất tốt hơn.', '✅ Chống trầy xước tốt hơn.', '✅ Tuổi thọ dài.'])}
<p>Nếu thi công đúng quy trình và chăm sóc tốt, lớp sơn có thể giữ được chất lượng trong 5–10 năm hoặc lâu hơn.</p>

<h3>Nhược Điểm Của Sơn 2K</h3>
${list(['❌ Chi phí cao hơn.', '❌ Thi công yêu cầu kỹ thuật cao.', '❌ Phải pha đúng tỷ lệ.', '❌ Thời gian xử lý và hoàn thiện thường lâu hơn.', '❌ Khi dặm vá màu sắc đòi hỏi tay nghề cao để đồng đều với phần sơn cũ.'])}

<h2>So Sánh Nhanh</h2>
${table(
  ['Tiêu chí', 'Sơn 1K', 'Sơn 2K'],
  [
    ['Giá thành', '⭐⭐⭐⭐⭐ Rẻ', '⭐⭐⭐ Cao hơn'],
    ['Độ bóng', 'Trung bình', 'Rất cao'],
    ['Độ bền', 'Trung bình', 'Cao'],
    ['Chống UV', 'Kém', 'Tốt'],
    ['Chống trầy', 'Thấp', 'Tốt hơn'],
    ['Giữ màu', '2–4 năm', '5–10 năm hoặc hơn'],
    ['Thi công', 'Dễ', 'Cần kỹ thuật'],
    ['Dặm vá', 'Dễ', 'Khó hơn'],
    ['Phù hợp', 'Sửa chữa nhỏ, xe dịch vụ', 'Sơn toàn xe, xe gia đình, xe giá trị cao'],
  ]
)}

<h2>Ai Nên Chọn Sơn 1K?</h2>
<p>Sơn 1K phù hợp nếu bạn:</p>
${list(['Muốn tiết kiệm chi phí.', 'Chỉ sơn dặm một vài chi tiết nhỏ.', 'Xe đã sử dụng lâu năm và không yêu cầu thẩm mỹ cao.', 'Xe chạy dịch vụ hoặc xe tải, ưu tiên tính kinh tế.', 'Chấp nhận việc độ bóng và độ bền không bằng sơn 2K.'])}

<h2>Ai Nên Chọn Sơn 2K?</h2>
<p>Sơn 2K là lựa chọn phù hợp nếu bạn:</p>
${list(['Muốn xe có màu sắc đẹp và độ bóng cao.', 'Muốn lớp sơn bền lâu.', 'Sở hữu xe mới hoặc xe có giá trị cao.', 'Dự định sử dụng xe nhiều năm.', 'Muốn tăng khả năng chống phai màu dưới nắng.', 'Quan tâm đến giá trị bán lại của xe.'])}

<h2>Garage Ô Tô An Phát Khuyến Nghị</h2>
<p>Nếu ngân sách cho phép, sơn 2K thường là lựa chọn đáng cân nhắc hơn đối với đa số xe du lịch hiện nay. Mặc dù chi phí ban đầu cao hơn, nhưng đổi lại bạn có được:</p>
${list(['Bề mặt sơn bóng đẹp và bền màu.', 'Khả năng chống chịu thời tiết và hóa chất tốt hơn.', 'Chu kỳ phải sơn lại thường dài hơn, giúp giảm chi phí về lâu dài.'])}
<p>Trong khi đó, sơn 1K vẫn là giải pháp hợp lý cho các hạng mục sửa chữa nhỏ hoặc khi mục tiêu chính là tiết kiệm chi phí.</p>

<h2>Lưu Ý Quan Trọng</h2>
<p>Trong thực tế, nhiều xưởng sử dụng hệ thống sơn kết hợp thay vì chỉ "1K" hoặc "2K". Ví dụ:</p>
${list(['Sơn lót chống gỉ.', 'Sơn lót bề mặt.', 'Sơn màu.', 'Sơn bóng (clear coat).'])}
<p>Đối với các dòng xe hiện đại, lớp sơn bóng 2K (clear coat) thường đóng vai trò quyết định về độ bóng, khả năng chống tia UV và độ bền của bề mặt. Vì vậy, khi hỏi garage, bạn nên hỏi rõ:</p>
${list(['Hãng sơn sử dụng (PPG, Standox, Spies Hecker, R-M, Nippon, Sikkens, v.v.).', 'Quy trình sơn gồm những lớp nào.', 'Có sấy sơn trong phòng sơn hay không.', 'Chính sách bảo hành lớp sơn.'])}

<blockquote><p>Thông điệp từ Garage Ô tô An Phát: "Một lớp sơn đẹp không chỉ nằm ở loại sơn, mà còn ở quy trình chuẩn, tay nghề kỹ thuật viên và sự tỉ mỉ trong từng công đoạn."</p></blockquote>
`.trim(),
  },

  {
    id: 'cmp5c3x42000eadrrj9qa8x75',
    content: `
<h2>🌧️ Bảo Quản Xe Ô Tô Mùa Mưa Hiệu Quả – Phòng Ngừa Gỉ Sét</h2>
<p><em>Những lời khuyên từ Garage Ô tô An Phát dành cho xe thường xuyên di chuyển trong mùa mưa</em></p>
<p>Mùa mưa không chỉ làm việc lái xe trở nên khó khăn mà còn là thời điểm khiến gầm xe, hệ thống phanh, hệ thống điện và thân vỏ dễ bị hư hỏng nếu không được chăm sóc đúng cách. Nước mưa, bùn đất và độ ẩm kéo dài là những nguyên nhân chính gây gỉ sét, oxy hóa và giảm tuổi thọ xe.</p>
<p>Dưới đây là những kinh nghiệm thực tế giúp bạn bảo vệ chiếc xe hiệu quả trong mùa mưa.</p>

<h3>🚿 1. Rửa xe ngay sau khi đi qua đường ngập hoặc nhiều bùn đất</h3>
<p>Đây là việc quan trọng nhất. Nước mưa thường chứa bụi bẩn, axit và các tạp chất. Khi bám lâu trên thân xe hoặc gầm xe sẽ làm tăng nguy cơ:</p>
${list(['Gỉ sét gầm xe.', 'Ăn mòn bu lông, ốc vít.', 'Hư hỏng hệ thống treo.', 'Oxy hóa giắc điện.'])}
<p>Lưu ý:</p>
<p>✅ Ưu tiên rửa cả gầm xe.</p>
<p>✅ Xịt sạch bùn đất bám ở:</p>
${list(['Hốc bánh xe.', 'Gầm máy.', 'Càng A.', 'Thanh cân bằng.', 'Moay-ơ.'])}

<h3>🚗 2. Không để xe ướt qua đêm</h3>
<p>Sau khi đi mưa:</p>
${list(['✔ Lau khô kính.', '✔ Lau gioăng cửa.', '✔ Lau mép capo.', '✔ Lau cốp sau.', '✔ Mở cửa vài phút giúp xe khô ráo.'])}
<p>Độ ẩm kéo dài dễ gây:</p>
${list(['Mùi hôi nội thất.', 'Nấm mốc.', 'Oxy hóa các đầu giắc điện.'])}

<h3>🛞 3. Kiểm tra lốp xe thường xuyên</h3>
<p>Mùa mưa làm giảm độ bám đường. Hãy kiểm tra:</p>
${list(['☑ Gai lốp còn đủ.', '☑ Áp suất đúng tiêu chuẩn.', '☑ Không có hiện tượng nứt hoặc phù lốp.'])}
<p>Nếu gai lốp quá mòn, khả năng thoát nước giảm, dễ xảy ra hiện tượng trượt nước (Aquaplaning) khi chạy qua vũng nước ở tốc độ cao.</p>

<h3>🔧 4. Vệ sinh gầm xe định kỳ</h3>
<p>Nếu xe thường xuyên:</p>
${list(['Đi công trình.', 'Đi đường đất.', 'Đi vùng ngập.'])}
<p>Nên vệ sinh gầm xe khoảng 2–4 tuần/lần trong mùa mưa. Việc này giúp loại bỏ:</p>
${list(['Bùn đất.', 'Cát.', 'Lá cây.', 'Muối và các tạp chất bám lâu ngày.'])}

<h3>🛡️ 5. Phủ bảo vệ gầm xe (nếu cần)</h3>
<p>Đối với xe thường xuyên:</p>
${list(['Đi đường đèo.', 'Đường ven biển.', 'Khu vực ngập nước.', 'Công trường.'])}
<p>Có thể cân nhắc phủ gầm để:</p>
${list(['Hạn chế gỉ sét.', 'Giảm bám bẩn.', 'Hỗ trợ giảm tiếng ồn từ gầm xe.'])}
<p>Việc này không bắt buộc với mọi xe, đặc biệt là những xe mới đã có lớp bảo vệ gầm tốt từ nhà sản xuất. Hãy kiểm tra tình trạng gầm trước khi quyết định.</p>

<h3>⚡ 6. Kiểm tra hệ thống điện</h3>
<p>Độ ẩm là "kẻ thù" của hệ thống điện. Quan sát xem có:</p>
${list(['Đèn báo lỗi.', 'Đề khó nổ.', 'Đèn pha yếu.', 'Còi hoạt động không ổn định.'])}
<p>Nếu xuất hiện dấu hiệu bất thường, nên kiểm tra sớm để tránh hỏng lan rộng.</p>

<h3>❄️ 7. Vệ sinh điều hòa</h3>
<p>Mùa mưa dễ phát sinh:</p>
${list(['Mùi ẩm.', 'Mùi nấm mốc.', 'Vi khuẩn trong dàn lạnh.'])}
<p>Nên:</p>
${list(['✔ Thay lọc gió cabin đúng định kỳ.', '✔ Vệ sinh dàn lạnh nếu điều hòa có mùi hoặc làm lạnh kém.'])}

<h3>🚦 8. Kiểm tra hệ thống phanh</h3>
<p>Sau khi đi qua vùng ngập: phanh có thể giảm hiệu quả trong thời gian ngắn do bề mặt má phanh và đĩa phanh còn ướt. Bạn có thể rà phanh nhẹ ở tốc độ thấp, nơi an toàn, để giúp làm khô bề mặt phanh.</p>
<p>Nếu sau đó vẫn có các dấu hiệu như:</p>
${list(['Tiếng kêu kéo dài.', 'Xe bị lệch khi phanh.', 'Bàn đạp phanh bất thường.'])}
<p>Hãy đưa xe đến garage để kiểm tra.</p>

<h3>🌬️ 9. Kiểm tra cần gạt mưa</h3>
<p>Nếu cần gạt:</p>
${list(['Kêu.', 'Gạt không sạch.', 'Để lại vệt nước.'])}
<p>Nên thay mới. Một cặp cần gạt tốt giúp tăng đáng kể tầm nhìn khi lái xe trong mưa lớn.</p>

<h3>💡 10. Không để bình nhiên liệu quá cạn</h3>
<p>Khi đi đường dài trong mùa mưa: nên duy trì nhiên liệu ở mức ít nhất khoảng 1/4 bình, tốt hơn là trên 1/2 bình. Điều này giúp bạn chủ động hơn nếu gặp ùn tắc, mưa lớn hoặc phải thay đổi lộ trình.</p>

<h3>🚫 11. Hạn chế đỗ xe dưới cây lớn</h3>
<p>Mưa giông thường kèm theo:</p>
${list(['Cành cây gãy.', 'Trái cây rơi.', 'Lá cây làm tắc rãnh thoát nước.'])}
<p>Nếu có thể, hãy chọn nơi đỗ có mái che hoặc bãi đỗ an toàn.</p>

<h3>🔍 12. Kiểm tra các lỗ thoát nước</h3>
<p>Định kỳ vệ sinh các vị trí:</p>
${list(['Rãnh thoát nước dưới kính chắn gió.', 'Cửa xe.', 'Cốp sau.', 'Cửa sổ trời (nếu có).'])}
<p>Nếu bị tắc, nước có thể tràn vào khoang nội thất, gây ẩm mốc hoặc ảnh hưởng đến các chi tiết điện.</p>

<h2>📅 Lịch Kiểm Tra Khuyến Nghị Trong Mùa Mưa</h2>
${table(
  ['Hạng mục', 'Tần suất'],
  [
    ['Rửa thân xe', 'Sau khi đi mưa lớn hoặc đường bùn'],
    ['Rửa gầm', '2–4 tuần/lần (nếu đi mưa thường xuyên)'],
    ['Kiểm tra lốp', 'Mỗi tuần'],
    ['Kiểm tra phanh', 'Mỗi tháng hoặc khi có dấu hiệu bất thường'],
    ['Kiểm tra điều hòa', '6–12 tháng/lần hoặc khi có mùi hôi'],
    ['Kiểm tra cần gạt mưa', 'Mỗi tháng trong mùa mưa'],
    ['Kiểm tra hệ thống điện', 'Khi xuất hiện đèn báo lỗi hoặc sau khi xe bị ngập'],
  ]
)}

<h2>⭐ Lời Khuyên Dành Cho Xe Thường Xuyên Sử Dụng Trong Mùa Mưa</h2>
<p>Nếu bạn phải lái xe hằng ngày trong điều kiện mưa nhiều:</p>
${list([
  '🚗 Rửa gầm xe thường xuyên để hạn chế bùn đất và độ ẩm tích tụ.',
  '🛞 Duy trì áp suất lốp và thay lốp khi gai đã mòn.',
  '🧼 Giữ nội thất khô ráo, dùng thảm cao su để dễ vệ sinh.',
  '🔋 Theo dõi tình trạng ắc quy và hệ thống điện nếu xe thường xuyên đi qua vùng ngập.',
  '🚦 Sau khi đi qua nước, kiểm tra cảm giác phanh và lắng nghe các tiếng động bất thường.',
  '🔧 Thực hiện kiểm tra tổng quát định kỳ để phát hiện sớm dấu hiệu gỉ sét, rò rỉ hoặc hư hỏng.',
])}

<h2>🛡️ Cam Kết Từ Garage Ô Tô An Phát</h2>
<blockquote><p>"Phòng ngừa hôm nay – Tiết kiệm chi phí ngày mai."</p></blockquote>
<p>Tại Garage Ô tô An Phát, chúng tôi cung cấp dịch vụ kiểm tra xe mùa mưa với các hạng mục như vệ sinh gầm xe, kiểm tra phanh, lốp, hệ thống điện, điều hòa và các chất lỏng, giúp chiếc xe luôn sẵn sàng đồng hành cùng bạn trong mọi điều kiện thời tiết.</p>
`.trim(),
  },

  {
    id: 'cmp5c3x47000fadrrcyhznw4m',
    content: `
<h2>🛢️ Phân Biệt Dầu Động Cơ Chính Hãng Và Hàng Kém Chất Lượng</h2>
<p><em>Garage Ô tô An Phát – Chọn đúng dầu, bảo vệ động cơ bền bỉ</em></p>
<p>Dầu động cơ không chỉ có tác dụng bôi trơn mà còn giúp làm mát, làm sạch, chống mài mòn và bảo vệ các chi tiết bên trong động cơ. Tuy nhiên, trên thị trường hiện nay xuất hiện không ít sản phẩm kém chất lượng hoặc hàng giả, có thể gây ảnh hưởng nghiêm trọng đến tuổi thọ động cơ.</p>
<p>Dưới đây là những cách nhận biết giúp bạn lựa chọn đúng loại dầu động cơ.</p>

<h3>✅ 1. Kiểm tra bao bì và tem niêm phong</h3>
<p><strong>Dầu chính hãng</strong></p>
${list(['Bao bì sắc nét, màu in rõ ràng.', 'Nắp có tem hoặc vòng niêm phong nguyên vẹn.', 'Mã QR, mã vạch hoặc số lô sản xuất rõ ràng (nếu nhà sản xuất có áp dụng).', 'Không có dấu hiệu cạy mở hoặc rò rỉ.'])}
<p><strong>Dầu kém chất lượng</strong></p>
${list(['Bao bì in mờ, sai chính tả hoặc nhòe màu.', 'Tem dán lệch, dễ bong tróc.', 'Nắp lỏng hoặc dấu hiệu đã mở trước.', 'Thông tin sản phẩm thiếu hoặc không rõ nguồn gốc.'])}

<h3>✅ 2. Quan sát màu sắc và độ trong của dầu</h3>
<p><strong>Dầu chính hãng</strong></p>
${list(['Màu sắc đồng đều theo từng loại dầu.', 'Dầu trong, không có cặn.', 'Độ nhớt ổn định.'])}
<p><strong>Dầu kém chất lượng</strong></p>
${list(['Màu đục hoặc không đồng đều.', 'Có cặn lắng.', 'Có thể xuất hiện tạp chất hoặc bọt bất thường.'])}
<p><em>Lưu ý: Màu sắc không phải là tiêu chí duy nhất để đánh giá chất lượng. Một số loại dầu chính hãng có màu khác nhau tùy theo công thức của từng nhà sản xuất.</em></p>

<h3>✅ 3. Kiểm tra thông tin trên nhãn</h3>
<p>Một sản phẩm chính hãng thường ghi đầy đủ:</p>
${list(['Cấp độ nhớt (ví dụ: 0W-20, 5W-30, 5W-40).', 'Tiêu chuẩn chất lượng (API, ACEA hoặc tiêu chuẩn của nhà sản xuất xe nếu có).', 'Dung tích.', 'Ngày sản xuất hoặc số lô.', 'Hướng dẫn sử dụng.'])}
<p>Nếu thông tin mập mờ hoặc thiếu, hãy cẩn trọng.</p>

<h3>✅ 4. Mua tại địa chỉ uy tín</h3>
<p>Đây là cách hiệu quả nhất để hạn chế mua phải dầu giả hoặc dầu kém chất lượng. Nên lựa chọn:</p>
${list(['Garage uy tín.', 'Đại lý chính hãng.', 'Nhà phân phối được ủy quyền.'])}

<h3>🚨 Tác hại khi sử dụng dầu động cơ kém chất lượng</h3>
<p>Việc sử dụng dầu không đạt chất lượng có thể dẫn đến:</p>
${list(['❌ Bôi trơn kém, làm tăng ma sát.', '❌ Động cơ nóng hơn bình thường.', '❌ Hình thành cặn bùn trong động cơ.', '❌ Tăng mức tiêu hao nhiên liệu.', '❌ Tiếng động cơ lớn hơn.', '❌ Giảm tuổi thọ động cơ.', '❌ Có nguy cơ gây hư hỏng các chi tiết quan trọng nếu sử dụng trong thời gian dài.'])}

<h3>🔧 Dầu động cơ chính hãng mang lại những lợi ích gì?</h3>
${list(['✅ Bảo vệ động cơ khi khởi động nguội.', '✅ Giảm mài mòn các chi tiết.', '✅ Hỗ trợ làm sạch cặn bẩn.', '✅ Giúp động cơ vận hành êm ái.', '✅ Duy trì hiệu suất ổn định.', '✅ Góp phần tiết kiệm nhiên liệu (tùy loại dầu và điều kiện sử dụng).', '✅ Kéo dài tuổi thọ động cơ.'])}

<h3>📅 Khi nào nên thay dầu động cơ?</h3>
<p>Tùy theo loại dầu, dòng xe và điều kiện sử dụng, khoảng thay dầu có thể khác nhau. Tham khảo hướng dẫn của nhà sản xuất xe là ưu tiên hàng đầu.</p>
<p>Thông thường:</p>
${list(['Dầu khoáng: khoảng 5.000 km hoặc 6 tháng.', 'Dầu bán tổng hợp: khoảng 7.000–8.000 km hoặc 6–9 tháng.', 'Dầu tổng hợp toàn phần: khoảng 10.000–15.000 km hoặc 12 tháng (nếu phù hợp với khuyến nghị của nhà sản xuất).'])}
<p>Nếu xe thường xuyên chạy trong điều kiện khắc nghiệt (kẹt xe, quãng đường ngắn, chở nặng, nhiều bụi), có thể cần thay dầu sớm hơn.</p>

<h3>💡 Lời khuyên từ chuyên gia</h3>
<p>Đừng chỉ chọn dầu dựa trên giá rẻ. Điều quan trọng hơn là:</p>
${list(['Chọn đúng cấp độ nhớt theo khuyến nghị của nhà sản xuất.', 'Chọn dầu đạt tiêu chuẩn chất lượng phù hợp.', 'Thay dầu đúng định kỳ.', 'Thay lọc dầu khi cần theo khuyến nghị bảo dưỡng.'])}
<p>Chi phí thay dầu định kỳ thường nhỏ hơn rất nhiều so với chi phí sửa chữa động cơ nếu xảy ra hư hỏng do bôi trơn không đảm bảo.</p>

<h3>🛡️ Cam kết từ Garage Ô tô An Phát</h3>
<p>Tại Garage Ô tô An Phát, chúng tôi cam kết:</p>
${list([
  '✅ Chỉ sử dụng dầu động cơ chính hãng, có nguồn gốc rõ ràng từ các nhà phân phối uy tín.',
  '✅ Tư vấn đúng loại dầu và cấp độ nhớt phù hợp với từng dòng xe và điều kiện vận hành.',
  '✅ Không sử dụng dầu kém chất lượng, dầu không rõ nguồn gốc hoặc sản phẩm đã bị pha trộn.',
  '✅ Thay dầu theo đúng quy trình kỹ thuật, đồng thời kiểm tra lọc dầu, mức dầu và các hạng mục liên quan.',
  '✅ Minh bạch trong quá trình bảo dưỡng: khách hàng có thể kiểm tra bao bì, nhãn sản phẩm trước khi thay dầu và nhận tư vấn về chu kỳ thay dầu tiếp theo.',
])}

<h3>🚗 Garage Ô tô An Phát – Chăm xe bằng chất lượng, giữ trọn niềm tin</h3>
<blockquote><p>"Một can dầu chính hãng không chỉ giúp động cơ vận hành êm ái hôm nay, mà còn góp phần bảo vệ giá trị chiếc xe của bạn trong nhiều năm tới."</p></blockquote>
<p>An Phát cam kết sử dụng dầu động cơ chính hãng, đúng tiêu chuẩn và đúng chủng loại, để chiếc xe của bạn luôn đạt hiệu suất vận hành tốt nhất, bền bỉ trên mọi hành trình.</p>
`.trim(),
  },
]

async function main() {
  const prisma = new PrismaClient()
  for (const { id, content } of POSTS) {
    const before = await prisma.blogPost.findUnique({ where: { id } })
    if (!before) {
      console.log(`BỎ QUA - không tìm thấy id ${id}`)
      continue
    }
    await prisma.blogPost.update({ where: { id }, data: { content } })
    console.log(`OK - ${before.title} (${before.content.length} -> ${content.length} ký tự)`)
  }
  await prisma.$disconnect()
  console.log('\nHoàn tất định dạng lại tất cả bài viết.')
}

main().catch((err) => {
  console.log('LỖI:', err.message)
  process.exit(1)
})

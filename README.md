# Em Mơ - Túi Mù Mùa Lễ Hội

Website showroom và bách khoa phân loại nhân vật cho dự án SSG105 của nhóm **TECHCORN - FPT University**. Dự án kết hợp văn hóa đèn lồng Trung Thu với trải nghiệm blind bag hiện đại, nhằm giới thiệu 6 mẫu nhân vật, mô phỏng cơ chế mở túi ngẫu nhiên và truyền tải thông điệp gây quỹ thiện nguyện.

Đây là một website tĩnh, không có backend và không yêu cầu cài đặt framework hay package bên ngoài.

## Tổng quan chức năng

- Trang giới thiệu thương hiệu **Em Mơ** và câu chuyện Chú Cuội, Cung Trăng.
- Bảng phân cấp độ hiếm và tỉ lệ xuất hiện công khai:
	- **Phổ biến:** 55% gồm Cá Vàng Phát Lộc 30% và Ngôi Sao Như Ý 25%.
	- **Hiếm:** 35% gồm Ngựa Phi Vân 20% và Thỏ Ngọc Trung Thu 15%.
	- **Cực hiếm:** 10% gồm Doraemon Đèn Lồng 7% và Đầu Lân Vàng 3%.
- Showroom 6 nhân vật với thẻ 3D, hiệu ứng nghiêng theo con trỏ, ảnh, tỉ lệ, độ tinh xảo và mô tả văn hóa.
- Bộ lọc theo cấp độ hiếm và tìm kiếm theo tên, mô tả hoặc nhóm nhân vật.
- Modal hồ sơ chi tiết cho từng nhân vật: câu chuyện, nguồn cảm hứng, vật liệu, độ tinh xảo và đặc thù nổi bật.
- Giả lập khui túi mù 3D:
	- Nhấn từng bước hoặc kéo chuột/chạm để xé túi giấy kraft.
	- Có thể mở nhanh 1 túi hoặc combo 5 túi.
	- Hiệu ứng xé giấy, mảnh giấy bay, ánh sáng, đếm ngược hồi hộp 3 giây và âm thanh tạo bằng Web Audio API.
	- Kết quả được chọn bằng weighted random theo tỉ lệ của 6 nhân vật.
- Sổ tay sưu tập (Codex), tự động mở khóa nhân vật sau mỗi lần khui và lưu vào `localStorage`.
- Máy tính xác suất từ 1 đến 20 túi, sử dụng công thức:

	`P(ít nhất 1 lần) = 1 - (1 - p)^n`

- Bảng so sánh toàn diện 6 nhân vật.
- Preloader, rèm sân khấu, chuyển cảnh theo từng khu vực, thanh tiến độ cuộn, hiệu ứng spotlight và hạt sáng nền.
- Hỗ trợ thao tác chuột, cảm ứng và bàn phím Enter/Space tại khu vực túi mù.

## Nhân vật

| Nhân vật | Cấp độ | Tỉ lệ | Điểm nổi bật |
| --- | --- | ---: | --- |
| Cá Vàng Phát Lộc | Phổ biến | 30% | Cá chép, may mắn và thịnh vượng |
| Ngôi Sao Như Ý | Phổ biến | 25% | Đèn ông sao năm cánh truyền thống |
| Ngựa Phi Vân | Hiếm | 20% | Tuấn mã đạp mây, chạm khắc đa tầng |
| Thỏ Ngọc Trung Thu | Hiếm | 15% | Tích Thỏ Ngọc trên cung trăng |
| Doraemon Đèn Lồng | Cực hiếm | 7% | Giao thoa nhân vật tuổi thơ và đèn lồng Việt |
| Đầu Lân Vàng | Cực hiếm | 3% | Mẫu hiếm nhất, chạm trổ và dát nhũ vàng |

## Cấu trúc thư mục

```text
.
├── index.html                 # Trang chính, showroom và toàn bộ trải nghiệm tương tác
├── tui-mu-rarity.html         # Catalogue tĩnh rút gọn theo 3 cấp độ hiếm
├── README.md
├── asset/                     # Ảnh nhân vật, ảnh hero, túi mù và rèm sân khấu
├── css/
│   └── style.css              # Design system, bố cục, responsive và animation
└── js/
		├── app.js                 # Bộ điều khiển chính và dữ liệu nhân vật
		├── codex.js               # Quản lý sổ tay sưu tập bằng localStorage
		└── gacha-simulator.js     # Giả lập xé túi, random, âm thanh và kết quả
```

## Cách chạy

### Cách 1: Mở trực tiếp

Mở [index.html](index.html) bằng trình duyệt hiện đại. Cách này phù hợp để xem giao diện cơ bản.

### Cách 2: Dùng máy chủ tĩnh

Nên dùng Live Server hoặc một static server để các asset và hành vi trình duyệt hoạt động ổn định.

Ví dụ với Python:

```bash
python -m http.server 8000
```

Sau đó truy cập `http://localhost:8000/`.

Không cần `npm install`, không cần build và không cần biến môi trường.

## Công nghệ sử dụng

- HTML5 semantic markup.
- CSS3: CSS variables, Grid, Flexbox, responsive media queries, 3D transforms, gradients và animations.
- JavaScript thuần ES6 class, không dùng framework.
- Canvas 2D cho các hạt sáng nền.
- Web Audio API cho hiệu ứng âm thanh tương tác.
- `localStorage` để lưu tiến độ sưu tập trên từng trình duyệt.
- Google Fonts: Fraunces và Be Vietnam Pro.

## Luồng sử dụng chính

1. Mở trang chính và bỏ qua hoặc chờ preloader hoàn tất.
2. Xem bảng tỉ lệ để hiểu ba nhóm rarity.
3. Vào Showroom, lọc hoặc tìm kiếm nhân vật, rồi mở hồ sơ chi tiết.
4. Vào Simulator, nhấn túi 5 lần, kéo đường xé hoặc chọn nút mở nhanh.
5. Xem kết quả, kiểm tra tiến độ trong Codex và dùng máy tính xác suất để thử các kịch bản khác.

## Lưu ý kỹ thuật

- Tiến độ Codex được lưu với key `emmo_codex_collection` trong `localStorage`; xóa dữ liệu site sẽ xóa bộ sưu tập đã mở khóa.
- Âm thanh chỉ được phát sau tương tác của người dùng theo chính sách autoplay của trình duyệt. Có thể bật/tắt bằng nút chuông trên thanh điều hướng.
- Tỉ lệ từng nhân vật trong simulator là 30%, 25%, 20%, 15%, 7% và 3%, tổng cộng 100%.
- `tui-mu-rarity.html` là phiên bản catalogue độc lập, dùng inline CSS và ảnh WebP nhúng Base64; trang này không dùng các module JavaScript của trang chính.

## Bối cảnh dự án

**Em Mơ** được thực hiện trong khuôn khổ môn SSG105 bởi nhóm TECHCORN, FPT University. Dự án hướng tới việc đưa nghệ thuật đèn lồng và các tích truyện Trung Thu đến gần hơn với cách kể chuyện tương tác, đồng thời gắn sản phẩm với hoạt động thiện nguyện dành cho học sinh tại các trường tiểu học và mầm non.
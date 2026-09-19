# Em Mơ - Túi Mù Mùa Lễ Hội

Website showroom và bách khoa phân loại nhân vật cho dự án SSG105 của nhóm **TECHCORN - FPT University**. Dự án kết hợp văn hóa đèn lồng Trung Thu với trải nghiệm blind bag hiện đại, nhằm giới thiệu 6 mẫu nhân vật, mô phỏng cơ chế mở túi ngẫu nhiên và truyền tải thông điệp gây quỹ thiện nguyện.

Đây là một website tĩnh cao cấp, không có backend và không yêu cầu cài đặt framework hay package phức tạp bên ngoài.

---

## Tổng quan chức năng

- **Giới thiệu & Văn hóa dân gian**: Câu chuyện thương hiệu **Em Mơ**, sự tích Chú Cuội & Cây Đa Thần, Chị Hằng Nga và ý nghĩa thiện nguyện trao đèn lồng cho trẻ em khó khăn.
- **Bảng phân cấp độ hiếm & tỉ lệ xuất hiện công khai**:
  - **Phổ biến (Common - 55%)**: Cá Vàng Phát Lộc (30%) và Ngôi Sao Như Ý (25%).
  - **Hiếm (Rare - 35%)**: Ngựa Phi Vân (20%) và Thỏ Ngọc Trung Thu (15%).
  - **Cực hiếm (Epic/SSR - 10%)**: Doraemon Đèn Lồng (7%) và Đầu Lân Vàng (3%).
- **Showroom 6 nhân vật 3D tương tác**:
  - Thẻ bài 3D có hiệu ứng nghiêng theo con trỏ chuột (*dynamic 3D parallax tilt*), viền hào quang, tỉ lệ, độ tinh xảo và câu chuyện văn hóa.
  - Bộ lọc tức thì theo độ hiếm và thanh tìm kiếm đa năng theo tên, nhóm, đặc tính.
  - Modal hồ sơ chi tiết (Inspect Character): nguồn cảm hứng, vật liệu chế tác, độ tinh xảo và triết lý thiết kế.
- **Giả lập khui túi mù 3D chân thực (Gacha Simulator)**:
  - Tương tác xé túi 5 nhịp: chạm từng bước hoặc kéo chuột/vuốt cảm ứng ngang đường răng cưa để xé mở túi giấy kraft.
  - Hỗ trợ mở nhanh 1 túi hoặc Combo 5 túi.
  - Cơ chế đếm ngược hồi hộp 3.0 giây (*Dramatic Suspense Countdown*) đồng bộ với hiệu ứng túi lơ lửng, thẻ bài nhô lên, ánh sáng laser flare và rèm hào quang.
  - Kết quả mở ngẫu nhiên theo thuật toán Weighted RNG chuẩn xác.
- **Hệ thống âm thanh tương tác đa tầng (Hybrid Web Audio System)**:
  - **Âm thanh xé túi (`Tear_paper.MP3`)**: Âm thanh xé giấy thực tế với độ cao tăng dần theo từng nhịp xé (`0.96x` – `1.08x`), kết hợp tiếng bụp trầm túi giấy kraft và tiếng xé bung dứt khoát ở nhịp 5.
  - **Âm thanh đếm ngược hồi hộp (`delay_sound_effect.mp3`)**: Được tinh chỉnh chuẩn xác khớp từng mili-giây với chu kỳ delay 3.0s, tạo cao trào kịch tính trước khi mở thẻ.
  - **Âm thanh khai mở sau delay (`after_delay_sound.mp3`)**: Vang lên ngay thời điểm bừng sáng màn hình (*gold flash*), mang giai điệu hoành tráng chào mừng thẻ bài xuất hiện.
  - **Độ trễ 0ms & Tương thích 100%**: Giải mã bằng Web Audio API decode buffer, có Audio Pool fallback và Base64 offline backup, hoạt động mượt mà cả trên server lẫn mở trực tiếp file `index.html` (`file:///`).
  - Hỗ trợ bật/tắt âm thanh nhanh qua nút chuông 🔔 / 🔕 trên Header.
- **Sổ tay sưu tập cá nhân (Codex Drawer)**:
  - Tự động mở khóa và cập nhật tiến độ nhân vật sau mỗi lượt khui túi mù.
  - Lưu trữ bền vững bằng `localStorage`.
- **Máy tính xác suất mở túi (Probability Calculator)**:
  - Cho phép người dùng kéo thanh trượt từ 1 đến 20 túi, áp dụng công thức xác suất thực tế:
    $$P(\text{ít nhất 1 lần}) = 1 - (1 - p)^n$$
- **Bảng so sánh toàn diện 6 mẫu đèn lồng**: So sánh trực quan theo độ hiếm, kích thước, chất liệu và thời gian chế tác.
- **Hiệu ứng mỹ thuật sân khấu**: Rèm nhung mở màn (*Grand Red Curtain*), preloader đếm số, spotlight, hạt sáng lung linh và pháo kim tuyến rực rỡ khi trúng SSR.

---

## Bảng nhân vật

| Nhân vật | Cấp độ | Tỉ lệ | Điểm nổi bật |
| --- | --- | ---: | --- |
| **Cá Vàng Phát Lộc** | Phổ biến (Common) | 30% | Biểu tượng cá chép may mắn, hanh thông tài lộc |
| **Ngôi Sao Như Ý** | Phổ biến (Common) | 25% | Đèn ông sao năm cánh truyền thống rực rỡ tuổi thơ |
| **Ngựa Phi Vân** | Hiếm (Rare) | 20% | Tuấn mã đạp mây, kỹ nghệ chạm khắc đa tầng |
| **Thỏ Ngọc Trung Thu** | Hiếm (Rare) | 15% | Tích Thỏ Ngọc giã thuốc tiên trên cung trăng |
| **Doraemon Đèn Lồng** | Cực hiếm (Epic) | 7% | Giao thoa nhân vật tuổi thơ quốc dân và lồng đèn Việt |
| **Đầu Lân Vàng** | Cực hiếm (Epic) | 3% | Mẫu hiếm nhất, chạm trổ lân sư và dát nhũ vàng |

---

## Cấu trúc thư mục

```text
.
├── index.html                 # Trang chính, showroom và toàn bộ trải nghiệm tương tác
├── tui-mu-rarity.html         # Catalogue tĩnh rút gọn độc lập theo 3 cấp độ hiếm
├── README.md                  # Tài liệu hướng dẫn và giới thiệu dự án
├── asset/                     # Tài nguyên đồ họa (ảnh nhân vật, ảnh hero, túi mù, rèm nhung)
├── css/
│   └── style.css              # Design system, bố cục, responsive, 3D transform và keyframes
├── js/
│   ├── app.js                 # Controller chính, dữ liệu 6 nhân vật và điều phối giao diện
│   ├── codex.js               # Quản lý sổ tay sưu tập bằng localStorage
│   ├── gacha-simulator.js     # Giả lập khui túi, random RNG, bộ tổng hợp âm thanh Web Audio
│   └── tear-audio-data.js     # Asset âm thanh xé giấy offline zero-latency
└── sound/
    ├── Tear_paper.MP3         # Sound effect xé túi mù giấy kraft chân thực
    ├── delay_sound_effect.mp3 # Sound effect đếm ngược hồi hộp 3.0s chuẩn xác
    └── after_delay_sound.mp3  # Sound effect ăn mừng và khai mở thẻ sau delay
```

---

## Hướng dẫn cài đặt & khởi chạy

### Cách 1: Mở trực tiếp (Không cần cài đặt)

Nhấp đúp chuột mở file [index.html](index.html) bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari).

### Cách 2: Sử dụng máy chủ tĩnh (Khuyên dùng)

Khởi chạy bằng một máy chủ tĩnh nhẹ (như Live Server của VS Code, Python, hoặc Node.js):

**Với Python:**
```bash
python -m http.server 8000
```
Sau đó truy cập: `http://localhost:8000/`.

**Với Node.js (npx):**
```bash
npx serve .
```

---

## Công nghệ sử dụng

- **Cốt lõi**: HTML5 Semantic, CSS3 thuần hiện đại (CSS Variables, Grid, Flexbox, 3D Transform, Glassmorphism).
- **JavaScript**: ES6+ Class-based Architecture, phân tách module rõ ràng, không dùng framework cồng kềnh.
- **Âm thanh**: Web Audio API (BiquadFilter, Oscillator, AudioBufferSource, GainNode envelope) kết hợp HTML5 Audio pool.
- **Đồ họa & Hiệu ứng**: HTML5 Canvas 2D Particle System, Confetti Burst, CSS Keyframes Animation.
- **Lưu trữ cục bộ**: Web Storage API (`localStorage`).
- **Typography**: Phông chữ Google Fonts chuẩn tiếng Việt (`Fraunces` & `Be Vietnam Pro`).

---

## Bối cảnh & Mục tiêu dự án

Dự án **Em Mơ** được thực hiện trong khuôn khổ môn học **SSG105** bởi nhóm **TECHCORN - FPT University**. Dự án ra đời với mong muốn gìn giữ nét đẹp văn hóa Trung Thu truyền thống Việt Nam thông qua lăng kính công nghệ số và phong cách hộp mù hiện đại, lan tỏa tình yêu văn hóa dân gian và kết nối các hoạt động thiện nguyện mang lồng đèn trao tặng các em nhỏ vùng khó khăn.
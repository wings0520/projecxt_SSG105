/**
 * Em Mơ — Character & Rarity Codex Application
 * Core Application Controller
 */

const CHARACTERS_DATA = [
  // --- TIER 1: PHỔ BIẾN (COMMON - 50% TỔNG) ---
  {
    id: 'ca-vang',
    name: 'Cá Vàng Phát Lộc',
    tier: 'common',
    tierLabel: 'Phổ biến',
    tierBadge: 'Tier 1',
    odds: 12.5,
    groupOdds: '50%',
    image: 'asset/1789605343299_5176141762490889310_g5432164341293928425_505dd91408fd4b1bb78b769743f4d77e.jpg',
    flavor: 'Họa tiết cá chép truyền thống, tượng trưng cho may mắn, thịnh vượng và sung túc dư dả.',
    story: 'Lấy cảm hứng từ tích cổ dân gian "Cá chép hóa rồng" và bức tranh Đông Hồ trăng rằm. Thân cá được tạo hình uốn lượn uyển chuyển, vảy cá chạm rỗng tinh vi giúp ánh sáng đèn lồng tỏa ra huyền ảo như lân tinh dưới mặt hồ thu phẳng lặng.',
    inspiration: 'Tích cổ Cá Chép Vượt Vũ Môn & Tranh Tết Đông Hồ',
    craftStars: '★★★☆☆',
    craftRating: '3/5 (Cơ bản - Tinh xảo)',
    materials: 'Khung tre già chuốt nhẵn, giấy kiếng cam đỏ truyền thống, nút thắt chỉ lụa',
    specialTrait: 'Thân cá uốn lượn tạo hình động học, phản chiếu bóng hoa văn lên nền gạch'
  },
  {
    id: 'ngoi-sao',
    name: 'Ngôi Sao Như Ý',
    tier: 'common',
    tierLabel: 'Phổ biến',
    tierBadge: 'Tier 1',
    odds: 12.5,
    groupOdds: '50%',
    image: 'asset/1789605343329_5176141762490889310_g5432164341293928425_83d51e05fb20d709ec7b41115a848c3c.jpg',
    flavor: 'Dáng sao năm cánh cổ điển, đường nét hoa văn tay vẽ tỉ mỉ gợi nhớ ký ức tuổi thơ rước đèn.',
    story: 'Biểu tượng linh thiêng bất hủ của Tết Trung Thu bao thế hệ người Việt. Năm cánh sao đại diện cho ngũ hành cân bằng (Kim - Mộc - Thủy - Hỏa - Thổ), tâm sao trang trí họa tiết hoa cúc và đồng tiền cổ mang lại bình an, vạn sự như ý.',
    inspiration: 'Đèn ông sao năm cánh truyền thống phố cổ Hàng Mã',
    craftStars: '★★★☆☆',
    craftRating: '3/5 (Cổ điển - Thuần khiết)',
    materials: 'Nan tre dẻo buộc dây mây, giấy ngũ sắc, viền tua hoa giấy thủ công',
    specialTrait: 'Khung đối xứng hoàn hảo, bắt sáng đa góc nhìn khi xoay tròn'
  },
  {
    id: 'tho-ngoc-chu-sa',
    name: 'Thỏ Ngọc Chu Sa',
    tier: 'common',
    tierLabel: 'Phổ biến',
    tierBadge: 'Tier 1',
    odds: 12.5,
    groupOdds: '50%',
    image: 'asset/1789876638579_401249900163133978_401249900163133978_b7d5fdcb437d8e1fc089ca7da4f676e7.jpg',
    flavor: 'Thỏ đỏ trăng rằm khoác áo hoa văn chu sa may mắn, mang nét vẽ dân gian truyền thống đầm ấm.',
    story: 'Biến thể thỏ ngọc đỏ tươi truyền thống mang lại vượng khí và niềm vui đoàn viên ngày Tết Trung Thu. Đôi tai lớn điểm hoa văn mây tía, thân thỏ thêu hoa cúc vàng thanh tao, thích hợp cho mọi trẻ em rước đèn dưới trăng.',
    inspiration: 'Tranh khắc gỗ dân gian Hàng Trống & Tích thỏ đón trăng',
    craftStars: '★★★☆☆',
    craftRating: '3/5 (Cổ truyền - Thân thuộc)',
    materials: 'Khung nan tre chuốt tròn, giấy kiếng đỏ ruby, tua rua lụa đỏ',
    specialTrait: 'Họa tiết hoa cúc trên thân thỏ bắt sáng rực rỡ'
  },
  {
    id: 'ngoi-sao-vong-nguyet',
    name: 'Ngôi Sao Vọng Nguyệt',
    tier: 'common',
    tierLabel: 'Phổ biến',
    tierBadge: 'Tier 1 (N25-B)',
    odds: 12.5,
    groupOdds: '50%',
    image: 'asset/1789876710904_401249900163133978_401249900163133978_9b0811a8b23ecde06df09ca2298674bc.jpg',
    flavor: 'Đèn ông sao đa sắc viền bánh xe mặt trời lộng lẫy, tâm sao xoay tròn hoa văn pháo hoa rực rỡ.',
    story: 'Đỉnh cao của nghệ thuật đèn ông sao cổ truyền (Mã N25-B). Khác với dáng sao cơ bản, mẫu Vọng Nguyệt có 5 vòng bánh xe mặt trời bao quanh các đỉnh cánh, tâm sao vẽ họa tiết pháo hoa bừng nở trên nền trời thu lộng gió.',
    inspiration: 'Đèn ông sao cung đình Huế & Lễ hội rước đèn đêm rằm',
    craftStars: '★★★☆☆',
    craftRating: '3.5/5 (Rực rỡ - Cổ phong)',
    materials: 'Tre bánh tẻ dẻo dai, giấy kính ngũ sắc dán đa lớp, hoa văn thủ công',
    specialTrait: 'Vòng tròn bánh xe phụ ở 5 cánh tạo hiệu ứng hào quang kép'
  },

  // --- TIER 2: HIẾM (RARE / SR - 38% TỔNG) ---
  {
    id: 'ngua-phi-van',
    name: 'Ngựa Phi Vân',
    tier: 'rare',
    tierLabel: 'Hiếm',
    tierBadge: 'Tier 2 (SR)',
    odds: 6,
    groupOdds: '38%',
    image: 'asset/1789605343347_5176141762490889310_g5432164341293928425_211d746b7e2ffb6990d4d3c1edb059a2.jpg',
    flavor: 'Dáng tuấn mã phi nước đại đạp mây, kèm tua rua đỏ thắm và nút thắt cát tường truyền thống.',
    story: 'Hình tượng tuấn mã dũng mãnh đạp mây ngũ sắc ("Phi Vân") tượng trưng cho chí tiến thủ, sự bứt phá và điềm lành "Mã Đáo Thành Công". Từng đường nét bờm ngựa và vân mây được chạm lộng đa tầng, tạo cảm giác chuyển động sống động trong gió thu.',
    inspiration: 'Chiến mã thần thoại & Nghệ thuật cắt giấy lộng kiếng cung đình',
    craftStars: '★★★★☆',
    craftRating: '4/5 (Đa tầng - Sắc sảo)',
    materials: 'Khung uốn nhiệt định hình cao cấp, tua rua tơ đỏ bện nút cát tường may mắn',
    specialTrait: 'Bờm ngựa và cụm mây khắc layer 3D, khi thắp đèn tạo bóng tuấn mã phi nước đại'
  },
  {
    id: 'tho-ngoc',
    name: 'Thỏ Ngọc Trung Thu',
    tier: 'rare',
    tierLabel: 'Hiếm',
    tierBadge: 'Tier 2 (SR)',
    odds: 6,
    groupOdds: '38%',
    image: 'asset/1789605343375_5176141762490889310_g5432164341293928425_5f7b3a5fdadde01bafe23ea798792842.jpg',
    flavor: 'Cảm hứng từ tích Thỏ Ngọc cung trăng, hoạ tiết phối màu thanh thoát huyền ảo.',
    story: 'Người bạn đồng hành thân thiết của chị Hằng trên Cung Quảng Hàn. Đôi tai thỏ dựng cao thanh thoát, đôi mắt thỏ đính ngọc phản chiếu ánh trăng rằm. Đèn tỏa ánh sắc dịu êm mang năng lượng thuần khiết, an yên và chúc phúc trường thọ cho gia chủ.',
    inspiration: 'Truyền thuyết Thỏ Ngọc giã thuốc trường sinh trên Mặt Trăng',
    craftStars: '★★★★☆',
    craftRating: '4/5 (Thanh nhã - Chi tiết)',
    materials: 'Giấy vân lụa cao cấp, phủ màu gradient pastel thủ công tỉ mỉ',
    specialTrait: 'Hiệu ứng ánh sáng tỏa tròn mềm mịn, tạo bóng vầng trăng rằm'
  },
  {
    id: 'nguoi-nhen',
    name: 'Người Nhện Siêu Đẳng',
    tier: 'rare',
    tierLabel: 'Hiếm',
    tierBadge: 'Tier 2 (SR Hộ Vệ - N14-A)',
    odds: 6,
    groupOdds: '38%',
    image: 'asset/1789873373484_401249900163133978_401249900163133978_ffa393d4f7d972053db216b9157a5f3b.jpg',
    flavor: 'Siêu anh hùng bắn tơ được tạo hình theo phong cách chibi đèn lồng rực rỡ, sẵn sàng bảo vệ đêm hội bình an.',
    story: 'Sự kết hợp độc đáo giữa biểu tượng văn hóa đại chúng thế giới và nghệ thuật làm đèn lồng Việt. Spider-Man với dáng đứng vững chãi, đôi mắt phát quang và ngực áo nhện viền vàng, biểu trưng cho lòng quả cảm và tinh thần nghĩa hiệp bảo vệ trẻ thơ.',
    inspiration: 'Siêu anh hùng bảo vệ bình yên & Đèn lồng hiện đại cho thiếu nhi',
    craftStars: '★★★★☆',
    craftRating: '4/5 (Dũng mãnh - Độc đáo)',
    materials: 'Vật liệu dẻo tạo hình nhiệt, sơn tĩnh điện sắc sảo, nút thắt dây đỏ',
    specialTrait: 'Mắt nhện phát quang nổi bật trong bóng tối'
  },
  {
    id: 'pikachu',
    name: 'Pikachu Bánh Donut',
    tier: 'rare',
    tierLabel: 'Hiếm',
    tierBadge: 'Tier 2 (SR Đáng Yêu - N13-A)',
    odds: 6,
    groupOdds: '38%',
    image: 'asset/1789873373507_401249900163133978_401249900163133978_381d8e85a79a6de22b8b1fa25ceb76db.jpg',
    flavor: 'Chú chuột điện má hồng ôm chiếc bánh donut ngọt ngào kèm thẻ bài "Vui Tết Trung Thu" ngộ nghĩnh.',
    story: 'Mẫu đèn lồng vui tươi (Mã N13-A) lấy cảm hứng từ Pikachu - chú chuột điện đáng yêu quen thuộc. Đôi tai vểnh đón gió, chiếc đuôi sấm sét tinh nghịch và vòng hào quang ánh vàng mang lại niềm vui rộn rã cho mọi gia đình.',
    inspiration: 'Nhân vật hoạt hình quốc dân & Nét vẽ thư pháp Việt "Vui Tết Trung Thu"',
    craftStars: '★★★★☆',
    craftRating: '4/5 (Ngọt ngào - Rực rỡ)',
    materials: 'Mica dẫn sáng màu hổ phách, viền dập vân mây cổ điển, thẻ gỗ thư pháp',
    specialTrait: 'Tâm bánh donut phát sáng vàng óng như vầng trăng thu nhỏ'
  },
  {
    id: 'kim-nguu',
    name: 'Kim Ngưu Đạp Mây',
    tier: 'rare',
    tierLabel: 'Hiếm',
    tierBadge: 'Tier 2 (SR Thịnh Vượng - N27-A)',
    odds: 5,
    groupOdds: '38%',
    image: 'asset/1789876626189_401249900163133978_401249900163133978_a459c0b35b9bba65b4201ab64ec0ffd2.jpg',
    flavor: 'Trâu vàng no ấm sải bước trên thảm mây ngũ sắc, hoa văn mặt trời và đồng tiền rước đại phú đại quý.',
    story: 'Hình tượng "Con trâu là đầu cơ nghiệp" trong văn hóa nông nghiệp lúa nước Việt Nam được nâng tầm thành Kim Ngưu Thần Thoại (Mã N27-A). Thân trâu phủ sắc đỏ chu sa ấm áp, sừng vàng đón phúc, hoa văn vầng dương tỏa rạng cầu chúc mùa màng bội thu.',
    inspiration: 'Hình tượng Trâu Vàng dân gian & Họa tiết trống đồng Đông Sơn',
    craftStars: '★★★★☆',
    craftRating: '4/5 (No ấm - Cát tường)',
    materials: 'Gỗ ép uốn cong, giấy kiếng ngũ sắc truyền thống, đính hạt cườm đỏ',
    specialTrait: 'Chân trâu dẫm mây phát quang xanh ngọc bích'
  },
  {
    id: 'cinnamoroll',
    name: 'Cinnamoroll Thiên Thần',
    tier: 'rare',
    tierLabel: 'Hiếm',
    tierBadge: 'Tier 2 (SR Thuần Khiết)',
    odds: 5,
    groupOdds: '38%',
    image: 'asset/1789876630073_401249900163133978_401249900163133978_a5c6e42ee8b35f1223b36d7f34a18a1a.jpg',
    flavor: 'Chú cún tai dài trắng muốt mang đôi cánh thiên thần và vòng hào quang thiên sứ êm dịu trên đám mây sao.',
    story: 'Tác phẩm ngọt ngào hòa trộn phong cách Kawaii và lồng đèn trăng sao. Cinnamoroll chắp tay ước nguyện giữa trời mây, điểm xuyết những chiếc nơ xanh pastel và quả bông đỏ may mắn, mang thông điệp an lành và niềm tin trong trẻo.',
    inspiration: 'Nhân vật Cinnamoroll thiên thần & Bầu trời sao đêm rằm',
    craftStars: '★★★★☆',
    craftRating: '4/5 (Thanh nhã - Dịu ngọt)',
    materials: 'Vải lụa mờ tán sắc pastel, nơ ruy băng satin, viền đèn LED đom đóm',
    specialTrait: 'Vòng hào quang đỉnh đầu phát sáng mềm mịn dịu mắt'
  },
  {
    id: 'tau-thuy',
    name: 'Tàu Thủy Hoàng Sa Trường Sa',
    tier: 'rare',
    tierLabel: 'Hiếm',
    tierBadge: 'Tier 2 (SR Biển Đảo Tự Hào)',
    odds: 4,
    groupOdds: '38%',
    image: 'asset/1789876634407_401249900163133978_401249900163133978_880061db33188004874f84c73600e0fc.jpg',
    flavor: 'Con tàu mang cờ đỏ sao vàng cưỡi sóng biển quê hương, khẳng định chủ quyền thiêng liêng Hoàng Sa - Trường Sa.',
    story: 'Chiếc đèn lồng tàu thủy truyền thống từng thắp sáng tuổi thơ bao thế hệ, nay rạng rỡ với dòng chữ "VIỆT NAM" kiêu hãnh và hai ngọn hải đăng Hoàng Sa - Trường Sa. Từng đợt sóng biển xanh và chú cá heo uốn lượn dưới thân tàu là khúc tráng ca biển đảo quê hương.',
    inspiration: 'Tàu thủy sắt tây phố cổ Khương Đình & Tình yêu biển đảo Tổ quốc',
    craftStars: '★★★★☆',
    craftRating: '4/5 (Ý nghĩa - Kiên trung)',
    materials: 'Khung định hình sắt dẻo kết hợp giấy bóng kính ngũ sắc, cờ Tổ quốc',
    specialTrait: 'Dải đèn gầm phản chiếu ánh sóng biển lung linh trên mặt nước'
  },

  // --- TIER 3: CỰC HIẾM (EPIC / SSR / UR - 12% TỔNG) ---
  {
    id: 'doraemon',
    name: 'Doraemon Đèn Lồng',
    tier: 'epic',
    tierLabel: 'Cực hiếm',
    tierBadge: 'Tier 3 (SSR)',
    odds: 3,
    groupOdds: '12%',
    image: 'asset/1789605343386_5176141762490889310_g5432164341293928425_05acb51a68c446e75c05beda610dd314.jpg',
    flavor: 'Phiên bản giao thoa độc bản giữa chú mèo máy tuổi thơ và nghệ thuật đèn lồng cổ truyền dân gian.',
    story: 'Một tác phẩm giao thoa văn hóa đột phá: Chú mèo máy Doraemon gắn liền với tuổi thơ triệu đứa trẻ được các nghệ nhân tái hiện khéo léo trên cấu trúc đèn lồng nan tre truyền thống Việt Nam. Với chiếc chuông vàng đặc trưng và nụ cười rạng rỡ, đây là mẫu đèn lồng được săn đón nhất trong các buổi giao lưu.',
    inspiration: 'Biểu tượng tuổi thơ thế giới hòa quyện nghệ thuật dân gian Việt',
    craftStars: '★★★★★',
    craftRating: '5/5 (Độc bản - Phiên bản đặc biệt)',
    materials: 'Khung gia cố đa diện chịu lực, dập nổi chi tiết chuông vàng và túi thần kỳ',
    specialTrait: 'Tạo hình 3D tròn đầy đặn, chuông vàng rung leng keng khi cầm trên tay'
  },
  {
    id: 'doraemon-dua-hau',
    name: 'Doraemon Dưa Hấu',
    tier: 'epic',
    tierLabel: 'Cực hiếm',
    tierBadge: 'Tier 3 (SSR Giới Hạn - N05-B)',
    odds: 3,
    groupOdds: '12%',
    image: 'asset/1789876611793_401249900163133978_401249900163133978_68738b3978d13fee1200b0a6fa93c986.jpg',
    flavor: 'Chú mèo máy đội nón vàng thưởng thức miếng dưa hấu ngọt lành bên khung cửa sổ đêm trăng rằm thơ mộng.',
    story: 'Phiên bản đặc biệt mùa lễ hội (Mã N05-B): Doraemon trong khoảnh khắc bình yên ngắm trăng thưởng nguyệt, tay ôm miếng dưa hấu mát lành, xung quanh là bánh trung thu và những điều ước tuổi thơ bay xa. Chiếc đèn mang thông điệp "Những ước mơ sẽ luôn ở bên nhau".',
    inspiration: 'Ký ức tuổi thơ ngắm trăng rằm & Nghệ thuật tranh kính màu',
    craftStars: '★★★★★',
    craftRating: '5/5 (Độc bản - Ký ức tuổi thơ)',
    materials: 'Acrylic tán sáng đa lớp, viền mạ vàng chống oxy hóa, đèn LED ấm',
    specialTrait: 'Tỏa ánh sáng dịu êm như tranh vẽ trong phòng ngủ đêm rằm'
  },
  {
    id: 'su-tu-hi-cau',
    name: 'Sư Tử Hí Cầu',
    tier: 'epic',
    tierLabel: 'Cực hiếm',
    tierBadge: 'Tier 3 (UR Đại Cát)',
    odds: 3,
    groupOdds: '12%',
    image: 'asset/1789876622988_401249900163133978_401249900163133978_72e1cc303e31ee34d28b81f1a9f06725.jpg',
    flavor: 'Lân sư đỏ ôm quả cầu thái cực mang lại vạn điều đại cát, xua tan bóng tối và rước tài lộc sum vầy.',
    story: 'Điệu múa "Lân Hí Cầu" trứ danh trong lễ hội cung đình xưa, biểu trưng cho sự hòa hợp âm dương và niềm vui chiến thắng. Chú lân lông đỏ chu sa rực rỡ, chân ôm quả cầu lăng kính đa sắc, sừng lân phát quang rực rỡ mang đến phúc lộc vẹn toàn.',
    inspiration: 'Điệu múa Lân Hí Cầu Cung Đình & Tranh dân gian Kim Hoàng',
    craftStars: '★★★★★',
    craftRating: '5/5 (Đại cát - Tinh hoa thủ công)',
    materials: 'Gỗ quý chạm lộng, nhũ vàng chu sa, quả cầu lăng kính phản quang',
    specialTrait: 'Quả cầu xoay phản chiếu hoa văn thái cực đa sắc lên không gian'
  },
  {
    id: 'dau-lan',
    name: 'Đầu Lân Vàng',
    tier: 'epic',
    tierLabel: 'Cực hiếm',
    tierBadge: 'Tier 3 (UR Hoàng Gia)',
    odds: 1.5,
    groupOdds: '12%',
    image: 'asset/1789606808530_5176141762490889310_g5432164341293928425_d16f067c2c0d43a30233fbba767b57f7.jpg',
    flavor: 'Đỉnh cao chạm khắc với râu lân và mắt thần tinh xảo, linh vật tối thượng xua đuổi tà khí, rước đại cát.',
    story: 'Tái hiện thần thái oai phong, dũng mãnh của linh vật Lân Sư Rồng đêm hội trăng rằm. Từng chiếc râu lân, vảy trán, sừng ngọc và hàm lân đều được chạm khắc tỉ mỉ bằng tay với lớp nhũ vàng kim cương lấp lánh phản quang khi đón ánh sáng.',
    inspiration: 'Nghệ thuật múa Lân - Sư - Rồng cung đình Huế',
    craftStars: '★★★★★',
    craftRating: '5/5 (Kiệt tác thủ công đỉnh cao)',
    materials: 'Sơn mài dát nhũ vàng hoàng gia, râu tơ kim tuyến óng ánh, mắt lân đính hạt lăng kính',
    specialTrait: 'Chạm trổ hơn 120 chi tiết rỗng, tạo chùm tia sáng rạng ngời như vương miện rồng'
  },
  {
    id: 'than-long',
    name: 'Thần Long Dạ Quang',
    tier: 'epic',
    tierLabel: 'Cực hiếm',
    tierBadge: 'Tier 3 (UR Thần Thoại)',
    odds: 1.5,
    groupOdds: '12%',
    image: 'asset/1789876618892_401249900163133978_401249900163133978_b7766f695832842d09365da0c9003bc9.jpg',
    flavor: 'Rồng thần ngũ sắc uốn lượn giữa trời đêm rằm, vảy rồng phát quang chói lọi, biểu trưng của thịnh vượng và uy quyền tối thượng.',
    story: 'Lấy cảm hứng từ hình tượng Rồng thời Lý và truyền thuyết Thăng Long bay lên. Từng dải mây lành ngũ sắc bao bọc thân rồng uốn 12 khúc biểu trưng 12 tháng mưa thuận gió hòa. Khi thắp sáng, ánh đèn len qua lớp vảy lân tinh tỏa hào quang rực rỡ như rồng thần giáng thế.',
    inspiration: 'Hình tượng Rồng Thăng Long Cung Đình & Nghệ thuật khảm xà cừ ngũ sắc',
    craftStars: '★★★★★',
    craftRating: '5/5 (Thần thoại - Kiệt tác tối thượng)',
    materials: 'Khung mạ vàng ánh kim, sơn mài khắc nổi lân tinh phát quang, tơ ngũ sắc',
    specialTrait: 'Thân rồng đa khúc uốn lượn 3D với 36 điểm phát sáng lộng lẫy'
  }
];

class App {
  constructor() {
    this.characters = CHARACTERS_DATA;
    this.activeFilter = 'all';
    this.searchQuery = '';
    
    // Components
    this.codex = new CodexManager(this.characters);
    this.gacha = new GachaSimulator(this.characters, this.codex);

    this.initDOM();
    this.initScrollProgress();
    this.initPreloader();
    this.initPageTransitions();
    this.initCanvasStars();
    this.initTiltEffects();
    this.initHeroSpotlight();
    this.initProbabilityCalculator();
    this.renderCharacters();
    this.renderCompareMatrix();
    this.codex.updateUI();
  }

  // Interactive Lantern Spotlight Cursor Reveal on Hero Background
  initHeroSpotlight() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = 350;
    let currentX = mouseX;
    let currentY = mouseY;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      hero.style.setProperty('--spotlight-opacity', '1');
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseenter', () => {
      hero.style.setProperty('--spotlight-opacity', '1');
    });
    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--spotlight-opacity', '0.45');
    });

    // Touch support for mobile devices
    hero.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const rect = hero.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        hero.style.setProperty('--spotlight-opacity', '1');
      }
    }, { passive: true });

    // Smooth 60fps lerp update
    const updateSpotlight = () => {
      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;

      hero.style.setProperty('--spotlight-x', `${currentX.toFixed(1)}px`);
      hero.style.setProperty('--spotlight-y', `${currentY.toFixed(1)}px`);

      requestAnimationFrame(updateSpotlight);
    };
    updateSpotlight();
  }

  initDOM() {
    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Sound toggle button
    const btnAudio = document.getElementById('btnAudioToggle');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        const enabled = this.gacha.audio.toggle();
        btnAudio.innerHTML = enabled ? '🔔' : '🔕';
        btnAudio.title = enabled ? 'Âm thanh: Đang bật' : 'Âm thanh: Đã tắt';
      });
    }

    // Codex Drawer triggers
    const btnCodexOpen = document.getElementById('btnOpenCodex');
    const btnCodexClose = document.getElementById('btnCloseCodex');
    const drawer = document.getElementById('codexDrawer');
    
    if (btnCodexOpen) btnCodexOpen.addEventListener('click', () => this.openCodex());
    if (btnCodexClose) btnCodexClose.addEventListener('click', () => this.closeCodex());
    
    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (drawer && drawer.classList.contains('open')) {
        if (!drawer.contains(e.target) && !btnCodexOpen.contains(e.target)) {
          this.closeCodex();
        }
      }
    });

    // Inspect Modal close
    const inspectModal = document.getElementById('inspectModal');
    const btnCloseInspect = document.getElementById('btnCloseInspect');
    if (btnCloseInspect && inspectModal) {
      btnCloseInspect.addEventListener('click', () => {
        inspectModal.classList.remove('active');
      });
    }
    if (inspectModal) {
      inspectModal.addEventListener('click', (e) => {
        if (e.target === inspectModal) inspectModal.classList.remove('active');
      });
    }

    // Reveal Modal close
    const revealModal = document.getElementById('revealModal');
    const btnCloseReveal = document.getElementById('btnCloseReveal');
    if (btnCloseReveal && revealModal) {
      btnCloseReveal.addEventListener('click', () => {
        revealModal.classList.remove('active');
        if (this.gacha && this.gacha.audio) this.gacha.audio.stopAfterDelay();
      });
    }
    if (revealModal) {
      revealModal.addEventListener('click', (e) => {
        if (e.target === revealModal) {
          revealModal.classList.remove('active');
          if (this.gacha && this.gacha.audio) this.gacha.audio.stopAfterDelay();
        }
      });
    }

    // Moon Legend Modal (Giai thoại Chú Cuội)
    const legendModal = document.getElementById('legendModal');
    const btnCloseLegend = document.getElementById('btnCloseLegend');
    if (btnCloseLegend && legendModal) {
      btnCloseLegend.addEventListener('click', () => this.closeLegendModal());
    }
    if (legendModal) {
      legendModal.addEventListener('click', (e) => {
        if (e.target === legendModal) this.closeLegendModal();
      });
    }

    // Hero Showcase Card Click -> Open Legend Modal
    const heroShowcaseCard = document.getElementById('heroShowcaseCard');
    if (heroShowcaseCard) {
      heroShowcaseCard.addEventListener('click', (e) => {
        e.preventDefault();
        this.openLegendModal();
      });
    }

    // Escape Key Support for all modals and drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (legendModal && legendModal.classList.contains('active')) this.closeLegendModal();
        if (inspectModal && inspectModal.classList.contains('active')) inspectModal.classList.remove('active');
        if (revealModal && revealModal.classList.contains('active')) {
          revealModal.classList.remove('active');
          if (this.gacha && this.gacha.audio) this.gacha.audio.stopAfterDelay();
        }
        this.closeCodex();
      }
    });

    // Filter Pills
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter;
        this.renderCharacters();
      });
    });

    // Search Input
    const searchInput = document.getElementById('characterSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderCharacters();
      });
    }
  }

  openCodex() {
    const drawer = document.getElementById('codexDrawer');
    if (drawer) {
      this.codex.renderDrawer();
      drawer.classList.add('open');
    }
  }

  closeCodex() {
    const drawer = document.getElementById('codexDrawer');
    if (drawer) drawer.classList.remove('open');
  }

  openLegendModal() {
    const modal = document.getElementById('legendModal');
    if (modal) {
      modal.classList.add('active');
      if (this.gacha && this.gacha.audio) {
        this.gacha.audio.playReveal('rare');
      }
    }
  }

  closeLegendModal() {
    const modal = document.getElementById('legendModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // 3D Perspective Tilt on Card Hover
  initTiltEffects() {
    const attachTilt = (card) => {
      const inner = card.querySelector('.card-inner');
      if (!inner) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
      });
    };

    document.querySelectorAll('.character-card').forEach(attachTilt);

    // 3D Tilt for Hero Levitating Blind Box
    const royalShowcase = document.getElementById('heroShowcaseRoyal');
    const royalBox = document.getElementById('heroLevitatingBox');
    if (royalShowcase && royalBox) {
      royalShowcase.addEventListener('mousemove', (e) => {
        const rect = royalShowcase.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 14;
        royalBox.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.06)`;
      });
      royalShowcase.addEventListener('mouseleave', () => {
        royalBox.style.transform = '';
      });
    }
  }

  renderCharacters() {
    const grid = document.getElementById('charactersGrid');
    if (!grid) return;

    let filtered = this.characters;
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(c => c.tier === this.activeFilter);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(this.searchQuery) ||
        c.flavor.toLowerCase().includes(this.searchQuery) ||
        c.tierLabel.toLowerCase().includes(this.searchQuery)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--ink-tertiary);">
          <div style="font-size: 40px; margin-bottom: 12px;">🏮</div>
          <div style="font-family:'Fraunces', serif; font-size:1.3rem; color:var(--ink-secondary);">Không tìm thấy nhân vật phù hợp</div>
          <p style="font-size:0.9rem; margin-top:8px;">Hãy thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(char => `
      <div class="character-card" data-tier="${char.tier}" onclick="window.app.inspectCharacter('${char.id}')">
        <div class="card-inner">
          <div class="card-sheen"></div>
          <div class="card-hologram-sheen"></div>
          ${char.tier === 'epic' ? '<div class="epic-firefly-sparks"><span></span><span></span><span></span><span></span></div>' : ''}
          <div class="card-thumb-wrap ${char.tier === 'epic' ? 'royal-framed' : (char.tier === 'rare' ? 'rare-framed' : '')}">
            ${char.tier === 'epic' ? `
              <div class="thumb-corner tl"></div>
              <div class="thumb-corner tr"></div>
              <div class="thumb-corner bl"></div>
              <div class="thumb-corner br"></div>
            ` : (char.tier === 'rare' ? `
              <div class="thumb-corner tl"></div>
              <div class="thumb-corner tr"></div>
              <div class="thumb-corner bl"></div>
              <div class="thumb-corner br"></div>
            ` : '')}
            <span class="card-tier-pill pill-${char.tier}">${char.tierLabel}</span>
            <span class="card-odds-tag">${char.odds}%</span>
            <img src="${char.image}" alt="${char.name}" loading="lazy">
          </div>
          <div class="card-content">
            <h3 class="card-name">${char.name}</h3>
            <p class="card-desc">${char.flavor}</p>
            <div class="card-footer">
              <div class="card-craft-rating" title="Độ tinh xảo gia công: ${char.craftRating}">
                <span>${char.craftStars}</span>
              </div>
              <div class="pendant-btn">
                <span class="pendant-gem">🏮</span>
                <span class="pendant-text">Hồ sơ chi tiết</span>
                <span class="pendant-arrow">➔</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    this.initTiltEffects();
  }

  inspectCharacter(charId) {
    const char = this.characters.find(c => c.id === charId);
    if (!char) return;

    const modal = document.getElementById('inspectModal');
    const content = document.getElementById('inspectContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="inspect-grid">
        <div class="inspect-media ${char.tier === 'epic' ? 'royal-museum-frame' : (char.tier === 'rare' ? 'rare-museum-frame' : '')}">
          ${char.tier === 'epic' ? `
            <div class="inspect-crest"></div>
            <div class="inspect-corner corner-tl"></div>
            <div class="inspect-corner corner-tr"></div>
            <div class="inspect-corner corner-bl"></div>
            <div class="inspect-corner corner-br"></div>
          ` : (char.tier === 'rare' ? `
            <div class="inspect-crest"></div>
            <div class="inspect-corner corner-tl"></div>
            <div class="inspect-corner corner-tr"></div>
            <div class="inspect-corner corner-bl"></div>
            <div class="inspect-corner corner-br"></div>
          ` : '')}
          <img src="${char.image}" alt="${char.name}">
        </div>
        <div class="inspect-info">
          <div>
            <span class="inspect-tier-badge pill-${char.tier}">${char.tierLabel} · ${char.tierBadge}</span>
          </div>
          <h2 class="inspect-name">${char.name}</h2>
          <p class="inspect-story">${char.story}</p>
          
          <div class="inspect-spec-list">
            <div class="inspect-spec-item">
              <span class="spec-lbl">Tỉ lệ xuất hiện trong túi:</span>
              <span class="spec-val" style="color:var(--gold-bright); font-size:1.1rem;">${char.odds}% (Nhóm ${char.groupOdds})</span>
            </div>
            <div class="inspect-spec-item">
              <span class="spec-lbl">Nguồn cảm hứng:</span>
              <span class="spec-val">${char.inspiration}</span>
            </div>
            <div class="inspect-spec-item">
              <span class="spec-lbl">Độ tinh xảo chạm khắc:</span>
              <span class="spec-val" style="color:var(--gold-bright);">${char.craftStars} · ${char.craftRating}</span>
            </div>
            <div class="inspect-spec-item">
              <span class="spec-lbl">Đặc thù nổi bật:</span>
              <span class="spec-val">${char.specialTrait}</span>
            </div>
          </div>

          <div style="margin-top: 28px; display:flex; gap:12px;">
            <button class="btn btn-primary" onclick="window.app.gacha.roll(1); document.getElementById('inspectModal').classList.remove('active');">
              🎲 Thử khui túi tìm mẫu này
            </button>
            <button class="btn btn-secondary" onclick="document.getElementById('inspectModal').classList.remove('active')">
              Đóng
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  renderCompareMatrix() {
    const tbody = document.getElementById('compareTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.characters.map(char => `
      <tr>
        <td>
          <div class="table-char-cell">
            <img src="${char.image}" alt="${char.name}" class="table-char-thumb">
            <div>
              <div class="table-char-name">${char.name}</div>
              <div style="font-size:0.75rem; color:var(--ink-tertiary);">${char.inspiration}</div>
            </div>
          </div>
        </td>
        <td style="white-space:nowrap;">
          <span class="card-tier-pill pill-${char.tier}" style="position:static; display:inline-block; white-space:nowrap;">${char.tierLabel}</span>
        </td>
        <td>
          <strong style="color:var(--gold-bright); font-size:1.1rem;">${char.odds}%</strong>
        </td>
        <td>
          <span style="color:var(--gold-bright);">${char.craftStars}</span>
        </td>
        <td style="font-size:0.88rem; color:var(--ink-secondary); max-width:280px;">
          ${char.specialTrait}
        </td>
        <td>
          <button class="btn btn-secondary" style="padding:6px 14px; font-size:0.8rem;" onclick="window.app.inspectCharacter('${char.id}')">
            Chi tiết
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Interactive Probability Calculator
  initProbabilityCalculator() {
    const slider = document.getElementById('bagCountSlider');
    const countDisplay = document.getElementById('sliderCountDisplay');
    const epicPctDisplay = document.getElementById('calcEpicPct');
    const rarePctDisplay = document.getElementById('calcRarePct');
    const expectedEpicDisplay = document.getElementById('calcExpectedEpic');

    if (!slider) return;

    const updateCalc = () => {
      const n = parseInt(slider.value, 10);
      if (countDisplay) countDisplay.textContent = `${n} túi`;

      // Probability formulas:
      // p(Epic) = 0.12 => P(>=1 Epic in n bags) = 1 - (1 - 0.12)^n
      const pEpic = 1 - Math.pow(1 - 0.12, n);
      // p(Rare or Epic) = 0.38 + 0.12 = 0.50 => P(>=1 Rare+) = 1 - (1 - 0.50)^n
      const pRarePlus = 1 - Math.pow(1 - 0.50, n);
      // Expected number of Epic lanterns = n * 0.12
      const expectedEpic = (n * 0.12).toFixed(1);

      if (epicPctDisplay) {
        epicPctDisplay.textContent = `${(pEpic * 100).toFixed(1)}%`;
      }
      if (rarePctDisplay) {
        rarePctDisplay.textContent = `${(pRarePlus * 100).toFixed(1)}%`;
      }
      if (expectedEpicDisplay) {
        expectedEpicDisplay.textContent = expectedEpic;
      }
    };

    slider.addEventListener('input', updateCalc);
    updateCalc();
  }

  // Soft Floating Mid-Autumn Lantern Sparks (Canvas Particles)
  initCanvasStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.3 ? '255, 224, 138' : '246, 209, 102'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.twinkleSpeed) * 0.01;

        if (p.opacity < 0.1) p.opacity = 0.1;
        if (p.opacity > 0.8) p.opacity = 0.8;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  // Feature 1: Top Reading / Scroll Progress Bar
  initScrollProgress() {
    const progressBar = document.getElementById('siteScrollProgress');
    if (!progressBar) return;

    let ticking = false;
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

      progressBar.style.width = `${progress.toFixed(1)}%`;
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  // Feature 1: Mid-Autumn Festival Thematic Preloader Screen
  initPreloader() {
    const preloader = document.getElementById('sitePreloader');
    const barFill = document.getElementById('preloaderBarFill');
    const percentText = document.getElementById('preloaderPercent');
    const milestoneText = document.getElementById('preloaderMilestoneText');
    const btnSkip = document.getElementById('btnSkipPreloader');

    if (!preloader) return;

    const milestones = [
      { threshold: 0, text: '🏮 Đang thắp sáng đèn lồng & chuẩn bị giấy dó truyền thống...' },
      { threshold: 25, text: '📦 Đóng gói 6 mẫu túi mù (Cá Vàng, Sao, Thỏ Ngọc, Đầu Lân...)...' },
      { threshold: 55, text: '🌙 Hòa nhịp khúc ca rước đèn & tích cổ Chú Cuội Cung Trăng...' },
      { threshold: 80, text: '✨ Khởi tạo bách khoa phân loại & sàn giả lập túi mù 3D...' },
      { threshold: 96, text: '🎉 Chào mừng bạn bước vào không gian lễ hội Em Mơ!' }
    ];

    let currentProgress = 0;
    let isDismissed = false;
    let animId = null;

    const updateUI = (prog) => {
      if (barFill) barFill.style.width = `${prog}%`;
      if (percentText) percentText.textContent = `${Math.round(prog)}%`;

      if (milestoneText) {
        let activeText = milestones[0].text;
        for (let i = milestones.length - 1; i >= 0; i--) {
          if (prog >= milestones[i].threshold) {
            activeText = milestones[i].text;
            break;
          }
        }
        if (milestoneText.textContent !== activeText) {
          milestoneText.style.opacity = '0';
          setTimeout(() => {
            milestoneText.textContent = activeText;
            milestoneText.style.opacity = '1';
          }, 140);
        }
      }
    };

    const grandCurtain = document.getElementById('grandStageCurtain');

    const dismissPreloader = (instant = false) => {
      if (isDismissed) return;
      isDismissed = true;
      if (animId) cancelAnimationFrame(animId);

      updateUI(100);

      if (grandCurtain) {
        // Bước 1: Hiện rèm đỏ Đỏ NGAY LẬP TỨC (transition: none) — che toàn bộ màn hình
        grandCurtain.classList.add('visible');

        // Bước 2: Sau 1 frame render, ẩn preloader hoàn toàn (rèm đã phủ kín rồi)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Rèm đã ở trên → ẩn preloader ngay, không cần animation fade
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            preloader.style.transition = 'none';
          });
        });

        // Bước 3: 600ms sau mới kéo rèm mở (người dùng không thấy gì cả vì rèm đang đóng)
        const delayBeforePull = instant ? 120 : 700;
        setTimeout(() => {
          // Bước 4: Có thể ẩn preloader khỏi DOM an toàn
          preloader.style.display = 'none';

          // Bước 5: Phát âm thanh lễ hội và kéo rèm ra
          if (this.gacha && this.gacha.audio) {
            this.gacha.audio.playCurtainOpeningFanfare();
          }
          grandCurtain.classList.add('parted');

          // Bước 6: Sau khi animation rèm hoàn thành mới ẩn hoàn toàn
          setTimeout(() => {
            grandCurtain.classList.add('dismissed');
            // Xóa khỏi DOM sau khi transition dismissed kết thúc (0.3s)
            setTimeout(() => {
              grandCurtain.style.display = 'none';
            }, 350);
          }, 1600);
        }, delayBeforePull);
      } else {
        // Fallback if curtain container not found
        if (this.gacha && this.gacha.audio) {
          this.gacha.audio.playPreloaderComplete();
        }
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 650);
      }
    };

    if (btnSkip) {
      btnSkip.addEventListener('click', () => dismissPreloader(true));
    }

    // Smooth progress simulation over ~1.8 seconds
    const startTime = performance.now();
    const duration = 1850;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      
      // Gentle easeInOutQuad curve
      const eased = rawProgress < 0.5 
        ? 2 * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      currentProgress = eased * 100;
      updateUI(currentProgress);

      if (rawProgress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        dismissPreloader(false);
      }
    };

    animId = requestAnimationFrame(tick);

    // Safety fallback
    setTimeout(() => {
      if (!isDismissed) dismissPreloader(true);
    }, 4800);
  }

  // Replay Grand Theatrical Red Curtain Reveal (Can be triggered anytime)
  replayCurtainOpening() {
    const grandCurtain = document.getElementById('grandStageCurtain');
    if (!grandCurtain) return;

    grandCurtain.style.display = 'block';
    grandCurtain.classList.remove('dismissed', 'parted');
    grandCurtain.classList.add('visible');

    setTimeout(() => {
      if (this.gacha && this.gacha.audio) {
        this.gacha.audio.playCurtainOpeningFanfare();
      }
      grandCurtain.classList.add('parted');

      setTimeout(() => {
        grandCurtain.classList.add('dismissed');
        grandCurtain.style.display = 'none';
      }, 1550);
    }, 850);
  }

  // Feature 2: Cinematic Silk Velvet Page & Section Transition Curtain
  initPageTransitions() {
    const curtain = document.getElementById('pageTransitionCurtain');
    const targetTitle = document.getElementById('curtainTargetTitle');
    const targetDesc = document.getElementById('curtainTargetDesc');

    if (!curtain) return;

    this.isTransitioning = false;

    const SECTION_REGISTRY = {
      '#hero': {
        title: 'Trang Chủ · Em Mơ',
        desc: 'Khởi đầu hành trình khám phá túi mù mùa lễ hội'
      },
      '#ti-le': {
        title: 'Thang Đo Phân Loại',
        desc: 'Cơ chế xác suất & 3 tầng phân cấp độ hiếm'
      },
      '#showroom': {
        title: 'Showroom Trưng Bày',
        desc: 'Chi tiết hồ sơ văn hóa & thẩm mỹ 6 mẫu đèn lồng'
      },
      '#gacha': {
        title: 'Sàn Giả Lập Xé Túi Mù 3D',
        desc: 'Trải nghiệm xé túi mù giấy kraft tương tác chân thực'
      },
      '#tinh-xac-suat': {
        title: 'Máy Tính Xác Suất Toán Học',
        desc: 'Mô phỏng quy luật rơi nhân vật hiếm theo số túi mở'
      },
      '#so-sanh': {
        title: 'Bảng So Sánh Toàn Diện',
        desc: 'Đối chiếu thuộc tính, độ tinh xảo và kích thước'
      }
    };

    // Public method for programmatic navigation with curtain transition
    this.transitionTo = (targetSelector, callback) => {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      const meta = SECTION_REGISTRY[targetSelector] || {
        title: 'Đang Chuyển Phân Khu...',
        desc: 'Hòa cùng sắc màu ánh trăng Trung Thu'
      };

      if (targetTitle) targetTitle.textContent = meta.title;
      if (targetDesc) targetDesc.textContent = meta.desc;

      if (this.gacha && this.gacha.audio) {
        this.gacha.audio.playTransitionChime();
      }

      curtain.classList.add('active');

      // Wait for curtain to meet in center (340ms)
      setTimeout(() => {
        if (typeof callback === 'function') {
          callback();
        } else if (targetSelector && targetSelector.startsWith('#')) {
          const targetEl = document.querySelector(targetSelector);
          if (targetEl) {
            const headerHeight = 72;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'instant'
            });
            if (window.history && window.history.pushState) {
              window.history.pushState(null, null, targetSelector);
            }
          }
        }

        // Keep closed briefly for elegant presence, then unveil
        setTimeout(() => {
          curtain.classList.remove('active');
          setTimeout(() => {
            this.isTransitioning = false;
          }, 360);
        }, 160);
      }, 340);
    };

    // Intercept internal anchor clicks
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const targetEl = document.querySelector(hash);
      if (!targetEl) return;

      e.preventDefault();
      this.transitionTo(hash);
    });
  }
}

// Bootstrap App
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

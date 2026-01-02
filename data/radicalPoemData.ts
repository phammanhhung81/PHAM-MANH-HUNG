
export interface PoemGroup {
  id: string;
  title: string;
  lines: string[];
  explanation: string[];
}

export const radicalPoemData: PoemGroup[] = [
  {
    id: "group1",
    title: "Câu 1 - 10 (32 bộ)",
    lines: [
      "1. MỘC (木) – cây, THỦY (水) – nước, KIM (金) – vàng",
      "2. HỎA (火) – lửa, THỔ (土) – đất, NGUYỆT (月)- trăng, NHẬT (日) – trời",
      "3. XUYÊN (川) – sông, SƠN (山) – núi, PHỤ (阜) – đồi",
      "4. TỬ (子) – con, PHỤ (父) – bố, NHÂN (人) – người, SỶ (士) – quan",
      "5. MIÊN (宀) – mái nhà, HÁN (厂) – sườn non",
      "6. NGHIỄM (广) – hiên, HỘ (戶) – cửa, cổng – MÔN (門), LÝ (里) – làng",
      "7. CỐC (谷)- thung lũng, HUYỆT (穴)- cái hang",
      "8. TỊCH (夕) – khuya, THẦN (辰) – sớm, Dê – DƯƠNG (羊), HỔ (虍) – hùm",
      "9. NGÕA (瓦) – ngói đất, PHẪU (缶) – sành nung",
      "10. Ruộng – ĐIỀN (田), thôn – ẤP (邑), què – UÔNG (尢), LÃO (老) – già"
    ],
    explanation: [
      "Câu 1, 2: Nói đủ thất diệu (mặt trăng, mặt trời và 5 ngôi sao trong hệ mặt trời: Kim, Mộc, Thủy, Hỏa, Thổ) - tức là nói về Thiên.",
      "Câu 3, 4: Nói về Địa và Nhân (các thứ trên mặt đất, và các dạng người).",
      "Câu 5, 6: Những khái niệm do con người tạo ra, sử dụng, cư trú.",
      "Câu 7, 8: Nói về thời hồng hoang, ở trong hang núi, bắt đầu có khái niệm về buổi sáng, buổi tối, cũng như thiên địch (hổ) và thức ăn (dê).",
      "Câu 9, 10: Nói về thời kỳ đã tìm ra lửa, biết nung ngói, nung gốm sứ. Làm ruộng, đời sống con người tốt hơn, nâng cao tuổi thọ (Lão)."
    ]
  },
  {
    id: "group2",
    title: "Câu 11 - 20 (31 bộ)",
    lines: [
      "11. DẪN (廴)- đi gần, SƯỚC (辶) – đi xa",
      "12. BAO (勹) – ôm, TỴ (比) – sánh, CỦNG (廾) – là chắp tay",
      "13. ĐIỂU (鳥) – chim, TRẢO (爪) – vuốt, PHI (飛) – bay",
      "14. TÚC (足) – chân, DIỆN (面) – mặt, THỦ (手) – tay, HIỆT (頁) – đầu",
      "15. TIÊU (髟) là tóc, NHI (而) là râu",
      "16. NHA (牙) – nanh, KHUYỂN (犬) – chó, NGƯU (牛)- trâu, GIÁC (角) – sừng",
      "17. DỰC (弋) – cọc trâu, KỶ (己) – dây thừng",
      "18. QUA (瓜) – dưa, CỬU (韭) – hẹ, MA (麻) – vừng, TRÚC (竹) – tre",
      "19. HÀNH (行) – đi, TẨU (走) – chạy, XA (車) – xe",
      "20. MAO (毛) – lông, NHỤC (肉) – thịt, Da (皮) – Bì, CỐT (骨) – xương."
    ],
    explanation: [
      "Câu 11, 12: Nói về các động tác của con người (chân và tay).",
      "Câu 14: Có tính biền ngẫu: Túc, Diện, Thủ, Hiệt - Thủ // Túc ; Diện // Hiệt (chân & tay, đầu & mặt).",
      "Câu 16: Có tính biền ngẫu: Nha, Khuyển, Ngưu, Giác (có răng nanh nhọn, Trâu có sừng cong).",
      "Câu 17: Có tính nối liền: Cọc trâu, Dây thừng (cọc buộc trâu ắt phải có dây thừng).",
      "Câu 18: Nói về thực vật: Qua, Cửu, Ma, Trúc.",
      "Câu 19: Nói đến Giao thông, các từ đều nằm trong cùng trường nghĩa (đi lại).",
      "Câu 20: Nói đến các bộ phận trên cơ thể: Mao, Nhục, Bì, Cốt. Đồng thời cũng có tính biền ngẫu."
    ]
  },
  {
    id: "group3",
    title: "Câu 21 - 30 (31 bộ)",
    lines: [
      "21. KHẨU (口) là miệng, XỈ (齒) là răng",
      "22. Ngọt CAM (甘), mặn LỖ (鹵), dài TRƯỜNG (長), kiêu CAO (高)",
      "23. CHÍ (至) là đến, NHẬP (入) là vào",
      "24. BỈ (匕) môi, CỮU (臼) cối, ĐAO (刀) dao, MÃNH (皿) bồn",
      "25. VIẾT (曰) rằng, LẬP (立) đứng, lời NGÔN (言)",
      "26. LONG (龍) rồng, NGƯ (魚) cá, QUY (龜) con rùa rùa",
      "27. LỖI (耒) cày ruộng, TRỈ (黹) thêu thùa",
      "28. HUYỀN (玄) đen, YÊU (幺) nhỏ, MỊCH (糸) tơ, HOÀNG (黃) vàng",
      "29. CÂN (斤) rìu, THẠCH (石) đá, THỐN (寸) gang",
      "30. NHỊ (二) hai, BÁT (八) tám, PHƯƠNG (方) vuông, THẬP (十) mười"
    ],
    explanation: [
      "Câu 21: Nói về miệng và răng (cùng trường nghĩa).",
      "Câu 22: Nối tiếp câu 1, nói về vị giác (ngọt, mặn), sau đó chuyển tiếp đến sự trưởng thành (cao, dài).",
      "Câu 24: Nói về dụng cụ làm bếp (môi múc canh, cối giã gạo, con dao, cái bát mãnh).",
      "Câu 26: Câu tiếp theo bắt đầu là con rồng. Câu này gồm 3 loài thủy tộc. Trong đó đều là linh vật (Long, Quy) và 1 con có thể hóa rồng (Ngư).",
      "Câu 27: Chuyển tiếp sang việc nhà nông (cày ruộng, thêu thùa).",
      "Câu 29: Nói về cân đo, đong, đếm. Cân là rìu (1 cân), Thạch là đá (1 thạch), Thốn là 1 tấc.",
      "Câu 30: Câu này là những bộ thủ dùng để đếm (2, 8, 10) và phương hướng."
    ]
  },
  {
    id: "group4",
    title: "Câu 31 - 40 (24 bộ)",
    lines: [
      "31. NỮ (女) con gái, NHÂN (儿) chân người",
      "32. KIẾN (見) nhìn, MỤC (目) mắt, XÍCH (彳) dời chân đi",
      "33. Tay cầm que gọi là CHI (支 )",
      "34. Dang chân là BÁT (癶), cong thì là TƯ (厶)",
      "35. Tay cầm búa gọi là THÙ (殳)",
      "36. KHÍ (气) không, PHONG (風) gió, VŨ (雨) mưa, TỀ (齊) đều",
      "37. LỘC (鹿) hươu, MÃ (馬) ngựa, THỈ (豕) heo",
      "38. Sống SINH (生), LỰC (力) khoẻ, ĐÃI (隶) theo bắt về",
      "39. VÕNG (网) là lưới, CHÂU (舟) thuyền bè",
      "40. HẮC (黑) đen, BẠCH (白) trắng, XÍCH (赤) thì đỏ au"
    ],
    explanation: [
      "Câu 31: Bộ Nhân (儿) vẽ hai chân của loài người.",
      "Câu 32: Nói đến nữ thì nghĩ đến phái đẹp, khiến người ta phải ngắm nhìn (Kiến, Mục) và đi theo (Xích).",
      "Câu 36: Bộ Tề thêm vào cạnh gió mưa, khí hậu, ngụ ý mong muốn mưa thuận gió hòa.",
      "Câu 37: Tiếp đến nói về các loài thú quen thuộc với người TQ: hươu, ngựa, heo.",
      "Câu 39: Liên quan đến săn bắn thì có chài lưới, và thuyền bè giang hồ."
    ]
  },
  {
    id: "group5",
    title: "Câu 41 - 50 (30 bộ)",
    lines: [
      "41. THỰC (食) đồ ăn, ĐẤU (鬥) đánh nhau",
      "42. THỈ (矢) tên, CUNG (弓) nỏ, MÂU (矛) mâu, QUA (戈) đòng",
      "43. ĐÃI (歹) xương, HUYẾT (血) máu, TÂM (心) lòng",
      "44. THÂN (身) mình, THI (尸) xác, ĐỈNH (鼎) chung, CÁCH (鬲) nồi",
      "45. KHIẾM (欠) thiếu thốn, THẦN (臣) bầy tôi",
      "46. VÔ (毋) đừng, PHI (非) chớ, MÃNH (黽) thời ba ba",
      "47. NHỮU (禸) chân, THIỆT (舌) lưỡi, CÁCH (革) da",
      "48. MẠCH (麥) mỳ, HÒA (禾) lúa, THỬ (黍) là cây ngô",
      "49. TIỂU (小) là nhỏ, ĐẠI (大) là to",
      "50. TƯỜNG (爿) giường, SUYỄN (舛) dẫm, PHIẾN (片) tờ, VI (韋) vây"
    ],
    explanation: [
      "Câu 41: Thực là đồ ăn, bởi vì ăn uống mà con người tranh giành (đấu).",
      "Câu 42: Đánh nhau thì phải dùng đến vũ khí (Thỉ, Cung, Mâu, Qua).",
      "Câu 43: Đánh nhau thì máu đổ xương rơi (Đãi, Huyết, Tâm).",
      "Câu 44: Đánh nhau thì có kẻ còn sống (Thân), kẻ bỏ xác (Thi), kẻ làm vua thì có Đỉnh.",
      "Câu 48: Tiếp đến là các loài ngũ cốc. Mạch là lúa mạch, Hòa là lúa, Thử là cây ngô (bắp).",
      "Câu 50: Tường đối ngược dạng chữ với Phiến. Tường vẽ cái giường."
    ]
  },
  {
    id: "group6",
    title: "Câu 51 - 60 (22 bộ)",
    lines: [
      "51. TRỈ (夂) bàn chân, TUY (夊) rễ cây",
      "52. TỰ (自) từ, TỲ (鼻) mũi, NHĨ (耳) tai, THỦ (首) đầu",
      "53. THANH (青) xanh, THẢO (艹) cỏ, SẮC (色) màu",
      "54. TRĨ (豸) loài hổ báo, KỆ (彑) đầu con heo",
      "55. THỬ (鼠) là chuột, rất sợ mèo",
      "56. HƯƠNG (香) thơm, MỄ (米) gạo, TRIỆT (屮) rêu, DỤNG (用) dùng",
      "57. ĐẤU (斗) là cái đấu để đong",
      "58. Chữ CAN (干) lá chắn, chữ CÔNG (工) thợ thuyền",
      "59. THỊ (示) bàn thờ cúng tổ tiên",
      "60. NGỌC (玉) là đá quý, BỐI (貝) tiền ngày xưa"
    ],
    explanation: [
      "Câu 51: Bộ Trỉ (夂) vẽ hình 1 cái bàn chân đang đi xuống.",
      "Câu 52: Chữ Tự (自) ban đầu chính là vẽ cái mũi. Sau đó người ta mượn chữ này để chỉ nghĩa 'Tự mình'.",
      "Câu 53: Bộ Thanh nghĩa là màu xanh. Bộ Thảo vẽ 2 ngọn cỏ.",
      "Câu 55: Bộ Thử (鼠) là con chuột, cổ văn vẽ hình 1 con chuột.",
      "Câu 59: Bộ Thị (示) vẽ hình 1 cái bàn thờ thời tiền sử.",
      "Câu 60: Bộ Bối (貝) vẽ hình cái vỏ sò, ngày xưa dùng làm tiền tệ."
    ]
  },
  {
    id: "group7",
    title: "Câu 61 - 70 (19 bộ)",
    lines: [
      "61. ĐẬU (豆) là bát đựng đồ thờ",
      "62. SƯỞNG (鬯) chung rượu nghệ, DẬU (酉) vò rượu tăm",
      "63. Y (衣) là áo, CÂN (巾) là khăn",
      "64. HỰU (又) bàn tay phải, CHỈ (止) chân tạm dừng",
      "65. ẤT (乙) chim én, TRÙNG (虫) côn trùng",
      "66. CHUY (隹) chim đuôi ngắn, VŨ (羽) lông chim trời",
      "67. QUYNH (冂) vây 3 phía bên ngoài",
      "68. VI (囗) vây bốn phía, KHẢM (凵) thời hố sâu",
      "69. PHỐC (攴) đánh nhẹ, THÁI (采) hái rau",
      "70. KỶ (几) bàn, DUẬT (聿) bút, TÂN (辛) dao hành hình"
    ],
    explanation: [
      "Câu 61, 62: Vẫn tiếp tục nói đến bàn thờ và các thứ cúng tế.",
      "Câu 63, 64: Nói về y áo, khăn, thì liên tưởng đến tay chân (Hựu, Chỉ).",
      "Câu 65, 66: Nói về chim và thức ăn của chim.",
      "Câu 67, 68: Đều nói đến các bộ thủ bao vây: Quynh, Vi, Khảm.",
      "Câu 70: Nói về luật pháp, hình phạt: Kỷ là bàn, Duật là bút (ghi chép), Tân là con dao."
    ]
  },
  {
    id: "group8",
    title: "Câu 71 - 82 (25 bộ)",
    lines: [
      "71. VĂN (文) là chữ viết, văn minh",
      "72. CẤN (艮) là quẻ Cấn, giống hình bát cơm",
      "73. Ma là QUỶ (鬼), tiếng là ÂM (音)",
      "74. CỔ (鼓) là đánh trống, DƯỢC (龠) cầm sáo chơi",
      "75. THỊ (氏) là họ của con người",
      "76. BỐC (卜) là xem bói, NẠCH (疒) thời ốm đau",
      "77. Bóng là SAM (彡), vạch là HÀO (爻)",
      "78. Á (襾) che, MỊCH (冖) phủ, SƠ (疋) ĐẦU (亠) nghĩa nan",
      "79. SỔ (丨) PHẾT (丿) MÓC (亅) CHỦ (丶) nét đơn",
      "80. HỄ (匸) PHƯƠNG (匚) BĂNG (冫) TIẾT (卩), thì dồn nét đôi",
      "81. VÔ (无) là không, NHẤT (一) mộ thôi",
      "82. Diễn ca bộ thủ muôn đời không quên."
    ],
    explanation: [
      "Câu 71: Nói về văn, chữ viết.",
      "Câu 73, 74: Nhắc đến bói toán thì nghĩ ngay đến mê tín, ma quỷ. Người xưa cũng dùng âm nhạc (Cổ, Dược) để xua đuổi ma quỷ.",
      "Câu 76: Khi bệnh người ta hay xem bói (Bốc), thầy bói kiêm thầy thuốc (Nạch).",
      "Câu 79: Liệt kê 4 bộ thủ 1 nét: Sổ, Phết, Móc, Chủ.",
      "Câu 80: Liệt kê 4 bộ thủ 2 nét: Hễ, Phương, Băng, Tiết."
    ]
  }
];

export interface Radical {
  id: number;
  char: string;
  pinyin: string;
  meaning: string;
  example: string;
  association: string;
  strokes: number;
  category: string;
}

export const radicalsList: Radical[] = [
  { id: 1, char: '一', pinyin: 'yī', meaning: 'một, vạch ngang', example: '三 (ba)', association: 'Số 1, nét đầu tiên', strokes: 1, category: 'Số & Nét' },
  { id: 2, char: '丨', pinyin: 'gǔn', meaning: 'nét sổ', example: '中 (giữa)', association: 'Thẳng đứng như cột', strokes: 1, category: 'Số & Nét' },
  { id: 3, char: '丿', pinyin: 'piě', meaning: 'nét phẩy', example: '久 (lâu)', association: 'Như cành cây nghiêng', strokes: 1, category: 'Số & Nét' },
  { id: 4, char: '亻', pinyin: 'rén', meaning: 'người', example: '他 (anh ấy)', association: 'Bộ người đứng', strokes: 2, category: 'Con người' },
  { id: 5, char: '人', pinyin: 'rén', meaning: 'người', example: '你 (bạn)', association: 'Liên quan con người', strokes: 2, category: 'Con người' },
  { id: 6, char: '口', pinyin: 'kǒu', meaning: 'miệng', example: '吃 (ăn)', association: 'Ăn, nói, uống', strokes: 3, category: 'Cơ thể' },
  { id: 7, char: '囗', pinyin: 'wéi', meaning: 'bao quanh', example: '国 (nước)', association: 'Khung bao quanh', strokes: 3, category: 'Kiến trúc & Vị trí' },
  { id: 8, char: '女', pinyin: 'nǚ', meaning: 'phụ nữ', example: '妈 (mẹ)', association: 'Gia đình, phụ nữ', strokes: 3, category: 'Con người' },
  { id: 9, char: '子', pinyin: 'zǐ', meaning: 'con, trẻ', example: '字 (chữ)', association: 'Trẻ nhỏ, con cháu', strokes: 3, category: 'Con người' },
  { id: 10, char: '宀', pinyin: 'mián', meaning: 'mái nhà', example: '家 (nhà)', association: 'Nhà cửa, che chở', strokes: 3, category: 'Kiến trúc & Vị trí' },
  { id: 11, char: '心 / 忄', pinyin: 'xīn', meaning: 'tim, tình cảm', example: '忘 (quên)', association: 'Cảm xúc, suy nghĩ', strokes: 4, category: 'Cơ thể & Tâm trí' },
  { id: 12, char: '手 / 扌', pinyin: 'shǒu', meaning: 'tay', example: '打 (đánh)', association: 'Hành động tay', strokes: 4, category: 'Cơ thể' },
  { id: 13, char: '足', pinyin: 'zú', meaning: 'chân', example: '跑 (chạy)', association: 'Đi, chạy', strokes: 7, category: 'Cơ thể' },
  { id: 14, char: '辶', pinyin: 'chuò', meaning: 'bước đi', example: '进 (tiến)', association: 'Chuyển động', strokes: 3, category: 'Hoạt động' },
  { id: 15, char: '彳', pinyin: 'chì', meaning: 'bước chân trái', example: '很 (rất)', association: 'Liên quan đi bộ', strokes: 3, category: 'Hoạt động' },
  { id: 16, char: '日', pinyin: 'rì', meaning: 'mặt trời', example: '明 (sáng)', association: 'Thời gian, ngày', strokes: 4, category: 'Thiên nhiên' },
  { id: 17, char: '月', pinyin: 'yuè', meaning: 'trăng/thịt', example: '期 (kỳ), 胖 (béo)', association: 'Liên quan trăng, cơ thể', strokes: 4, category: 'Thiên nhiên' },
  { id: 18, char: '木', pinyin: 'mù', meaning: 'cây, gỗ', example: '林 (rừng)', association: 'Thực vật, gỗ', strokes: 4, category: 'Thảo mộc' },
  { id: 19, char: '水 / 氵', pinyin: 'shuǐ', meaning: 'nước', example: '河 (sông)', association: 'Nước, chất lỏng', strokes: 4, category: 'Thiên nhiên' },
  { id: 20, char: '火 / 灬', pinyin: 'huǒ', meaning: 'lửa', example: '热 (nóng)', association: 'Lửa, nhiệt', strokes: 4, category: 'Thiên nhiên' },
  { id: 21, char: '山', pinyin: 'shān', meaning: 'núi', example: '岁 (tuổi)', association: 'Núi, cao', strokes: 3, category: 'Thiên nhiên' },
  { id: 22, char: '土', pinyin: 'tǔ', meaning: 'đất', example: '地 (đất)', association: 'Đất đai', strokes: 3, category: 'Thiên nhiên' },
  { id: 23, char: '石', pinyin: 'shí', meaning: 'đá', example: '碎 (vỡ)', association: 'Đá, khoáng', strokes: 5, category: 'Thiên nhiên' },
  { id: 24, char: '竹 / ⺮', pinyin: 'zhú', meaning: 'tre, trúc', example: '笔 (bút)', association: 'Tre, đồ tre', strokes: 6, category: 'Thảo mộc' },
  { id: 25, char: '米', pinyin: 'mǐ', meaning: 'gạo', example: '粉 (bột)', association: 'Ngũ cốc', strokes: 6, category: 'Thực phẩm' },
  { id: 26, char: '糸 / 纟', pinyin: 'sī', meaning: 'tơ', example: '红 (đỏ)', association: 'Tơ sợi, quần áo', strokes: 6, category: 'Vật dụng' },
  { id: 27, char: '金 / 钅', pinyin: 'jīn', meaning: 'kim loại', example: '钱 (tiền)', association: 'Vàng, tiền', strokes: 8, category: 'Thiên nhiên' },
  { id: 28, char: '刀 / 刂', pinyin: 'dāo', meaning: 'dao', example: '到 (đến)', association: 'Dao, cắt', strokes: 2, category: 'Vật dụng' },
  { id: 29, char: '力', pinyin: 'lì', meaning: 'sức mạnh', example: '办 (làm)', association: 'Sức lực', strokes: 2, category: 'Tính chất' },
  { id: 30, char: '大', pinyin: 'dà', meaning: 'to', example: '天 (trời)', association: 'Lớn, to', strokes: 3, category: 'Tính chất' },
  { id: 31, char: '小 / ⺌', pinyin: 'xiǎo', meaning: 'nhỏ', example: '少 (ít)', association: 'Nhỏ bé', strokes: 3, category: 'Tính chất' },
  { id: 32, char: '言 / 讠', pinyin: 'yán', meaning: 'lời nói', example: '说 (nói)', association: 'Nói năng', strokes: 7, category: 'Hoạt động' },
  { id: 33, char: '馬 / 马', pinyin: 'mǎ', meaning: 'ngựa', example: '骑 (cưỡi)', association: 'Ngựa', strokes: 10, category: 'Động vật' },
  { id: 34, char: '牛 / 牜', pinyin: 'niú', meaning: 'trâu bò', example: '特 (đặc)', association: 'Gia súc', strokes: 4, category: 'Động vật' },
  { id: 35, char: '犬 / 犭', pinyin: 'quǎn', meaning: 'chó, thú', example: '狗 (chó)', association: 'Động vật', strokes: 4, category: 'Động vật' },
  { id: 36, char: '鱼', pinyin: 'yú', meaning: 'cá', example: '鲤 (cá chép)', association: 'Cá, thủy sản', strokes: 8, category: 'Động vật' },
  { id: 37, char: '鸟', pinyin: 'niǎo', meaning: 'chim', example: '鸭 (vịt)', association: 'Chim, gia cầm', strokes: 5, category: 'Động vật' },
  { id: 38, char: '虫', pinyin: 'chóng', meaning: 'côn trùng', example: '蚂 (kiến)', association: 'Sâu bọ', strokes: 6, category: 'Động vật' },
  { id: 39, char: '草 / 艹', pinyin: 'cǎo', meaning: 'cỏ', example: '花 (hoa)', association: 'Cây cỏ', strokes: 3, category: 'Thảo mộc' },
  { id: 40, char: '衣 / 衤', pinyin: 'yī', meaning: 'quần áo', example: '裙 (váy)', association: 'Trang phục', strokes: 6, category: 'Vật dụng' },
  { id: 41, char: '门', pinyin: 'mén', meaning: 'cửa', example: '问 (hỏi)', association: 'Cửa, nhà', strokes: 3, category: 'Kiến trúc & Vị trí' },
  { id: 42, char: '雨', pinyin: 'yǔ', meaning: 'mưa', example: '雪 (tuyết)', association: 'Thời tiết', strokes: 8, category: 'Thiên nhiên' },
  { id: 43, char: '食 / 饣', pinyin: 'shí', meaning: 'ăn', example: '饭 (cơm)', association: 'Ăn uống', strokes: 9, category: 'Thực phẩm' },
  { id: 44, char: '車 / 车', pinyin: 'chē', meaning: 'xe', example: '车 (xe)', association: 'Phương tiện', strokes: 7, category: 'Vật dụng' },
  { id: 45, char: '弓', pinyin: 'gōng', meaning: 'cung', example: '张 (mở)', association: 'Vũ khí, cong', strokes: 3, category: 'Vật dụng' },
  { id: 46, char: '舟', pinyin: 'zhōu', meaning: 'thuyền', example: '船 (thuyền)', association: 'Giao thông thủy', strokes: 6, category: 'Vật dụng' },
  { id: 47, char: '馬 / 马', pinyin: 'mǎ', meaning: 'ngựa', example: '驾 (lái)', association: 'Cưỡi, ngựa', strokes: 10, category: 'Động vật' },
  { id: 48, char: '羽', pinyin: 'yǔ', meaning: 'lông vũ', example: '翅 (cánh)', association: 'Lông, cánh', strokes: 6, category: 'Động vật' },
  { id: 49, char: '青', pinyin: 'qīng', meaning: 'xanh', example: '清 (trong)', association: 'Màu sắc', strokes: 8, category: 'Tính chất' },
  { id: 50, char: '黑', pinyin: 'hēi', meaning: 'đen', example: '黑 (đen)', association: 'Màu đen', strokes: 12, category: 'Tính chất' },
];
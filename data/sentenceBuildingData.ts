
export interface SentenceStep {
  vn: string;
  cn: string;
  py: string;
  type?: 'noun' | 'verb' | 'adj' | 'adverb' | 'particle' | 'phrase' | 'sentence' | 'time' | 'location' | 'conjunction';
}

export interface SentenceFlow {
  steps: SentenceStep[];
}

export interface SentenceLesson {
  id: string;
  title: string;
  flows: SentenceFlow[];
}

export const sentenceBuildingData: SentenceLesson[] = [
  {
    id: "1",
    title: "BÀI 1: Đại từ, Tính từ, Động từ cơ bản",
    flows: [
      {
        steps: [
          { vn: "tôi", cn: "我", py: "wǒ", type: "noun" },
          { vn: "tôi rất", cn: "我很", py: "wǒ hěn", type: "phrase" },
          { vn: "tôi rất khỏe", cn: "我很想", py: "wǒ hěn hǎo", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "chúng tôi", cn: "我们", py: "wǒmen", type: "noun" },
          { vn: "chúng tôi đến", cn: "我们来", py: "wǒmen lái", type: "phrase" },
          { vn: "chúng tôi đến rồi", cn: "我们来了", py: "wǒmen lái le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "bạn", cn: "你", py: "nǐ", type: "noun" },
          { vn: "bạn đi", cn: "你去", py: "nǐ qù", type: "phrase" },
          { vn: "bạn đi không?", cn: "你去吗？", py: "nǐ qù ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "các bạn", cn: "你们", py: "nǐmen", type: "noun" },
          { vn: "các bạn khỏe", cn: "你们好", py: "nǐmen hǎo", type: "phrase" },
          { vn: "các bạn khỏe không?", cn: "你们好吗？", py: "nǐmen hǎo ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "anh ấy", cn: "他", py: "tā", type: "noun" },
          { vn: "anh ấy đến", cn: "他来", py: "tā lái", type: "phrase" },
          { vn: "anh ấy đến không?", cn: "他来吗？", py: "tā lái ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "cô ấy", cn: "她", py: "tā", type: "noun" },
          { vn: "cô ấy rất", cn: "她很", py: "tā hěn", type: "phrase" },
          { vn: "cô ấy rất xinh đẹp", cn: "她很漂亮", py: "tā hěn piàoliang", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "không", cn: "不", py: "bù", type: "adverb" },
          { vn: "không ăn", cn: "不吃", py: "bù chī", type: "phrase" },
          { vn: "tôi không ăn", cn: "我不吃", py: "wǒ bù chī", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "không có", cn: "没有", py: "méiyǒu", type: "verb" },
          { vn: "không có tiền", cn: "没有钱", py: "méiyǒu qián", type: "phrase" },
          { vn: "tôi không có tiền", cn: "我没有钱", py: "wǒ méiyǒu qián", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "ở nhà", cn: "在家", py: "zài jiā", type: "phrase" },
          { vn: "tôi ở nhà", cn: "我在家", py: "wǒ zài jiā", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "rất", cn: "很", py: "hěn", type: "adverb" },
          { vn: "rất vui", cn: "很高兴", py: "hěn gāoxìng", type: "phrase" },
          { vn: "tôi rất vui", cn: "我很高兴", py: "wǒ hěn gāoxìng", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "quá", cn: "太", py: "tài", type: "adverb" },
          { vn: "quá tốt", cn: "太好", py: "tài hǎo", type: "phrase" },
          { vn: "tốt quá rồi!", cn: "太好了！", py: "tài hǎo le!", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đều", cn: "都", py: "dōu", type: "adverb" },
          { vn: "đều thích", cn: "都喜欢", py: "dōu xǐhuan", type: "phrase" },
          { vn: "chúng tôi đều thích", cn: "我们都喜欢", py: "wǒmen dōu xǐhuan", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "BÀI 2: Trợ từ nghi vấn, Đại từ nghi vấn",
    flows: [
      {
        steps: [
          { vn: "không", cn: "吗", py: "ma", type: "particle" },
          { vn: "khỏe không", cn: "好吗", py: "hǎo ma", type: "phrase" },
          { vn: "bạn khỏe không?", cn: "你好吗？", py: "nǐ hǎo ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "thế, nhỉ, vậy", cn: "呢", py: "ne", type: "particle" },
          { vn: "gì vậy", cn: "什么呢", py: "shénme ne", type: "phrase" },
          { vn: "làm gì vậy?", cn: "做什么呢？", py: "zuò shénme ne?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "rồi", cn: "了", py: "le", type: "particle" },
          { vn: "đến rồi", cn: "来了", py: "lái le", type: "phrase" },
          { vn: "tôi đến rồi", cn: "我来了", py: "wǒ lái le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ai", cn: "谁", py: "shéi", type: "noun" },
          { vn: "là ai", cn: "是谁", py: "shì shéi", type: "phrase" },
          { vn: "anh ấy là ai?", cn: "他是谁？", py: "tā shì shéi?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "gì, cái gì", cn: "什么", py: "shénme", type: "noun" },
          { vn: "nói cái gì", cn: "说什么", py: "shuō shénme", type: "phrase" },
          { vn: "bạn nói cái gì?", cn: "你说什么？", py: "nǐ shuō shénme?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "thế nào, làm sao", cn: "怎么", py: "zěnme", type: "adverb" },
          { vn: "làm sao vậy", cn: "怎么了", py: "zěnme le", type: "phrase" },
          { vn: "bạn làm sao vậy?", cn: "你怎么了？", py: "nǐ zěnme le?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đến", cn: "来", py: "lái", type: "verb" },
          { vn: "không đến", cn: "不来", py: "bù lái", type: "phrase" },
          { vn: "cô ấy không đến", cn: "她不来", py: "tā bù lái", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nhìn, xem, đọc", cn: "看", py: "kàn", type: "verb" },
          { vn: "tôi đọc", cn: "我看", py: "wǒ kàn", type: "phrase" },
          { vn: "tôi đọc sách", cn: "我看书", py: "wǒ kàn shū", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nói", cn: "说", py: "shuō", type: "verb" },
          { vn: "không nói", cn: "不说", py: "bù shuō", type: "phrase" },
          { vn: "tôi không nói", cn: "我不说", py: "wǒ bù shuō", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "mấy", cn: "几", py: "jǐ", type: "noun" },
          { vn: "mấy giờ", cn: "几点", py: "jǐ diǎn", type: "phrase" },
          { vn: "bây giờ mấy giờ?", cn: "现在几点？", py: "xiànzài jǐ diǎn?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "bao nhiêu", cn: "多少", py: "duōshao", type: "noun" },
          { vn: "bao nhiêu người", cn: "多少人", py: "duōshao rén", type: "phrase" },
          { vn: "có bao nhiêu người?", cn: "有多少人？", py: "yǒu duōshao rén?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "như thế nào", cn: "怎么样", py: "zěnmeyàng", type: "phrase" },
          { vn: "hôm nay thế nào", cn: "今天怎么样", py: "jīntiān zěnmeyàng", type: "phrase" },
          { vn: "bạn hôm nay thế nào?", cn: "你今天怎么样？", py: "nǐ jīntiān zěnmeyàng?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "họ", cn: "他们", py: "tāmen", type: "noun" },
          { vn: "họ đều", cn: "他们都", py: "tāmen dōu", type: "phrase" },
          { vn: "họ đều là người VN", cn: "他们都是越南人", py: "tāmen dōu shì Yuènán rén", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "BÀI 3: Số từ, Lượng từ, Mua sắm",
    flows: [
      {
        steps: [
          { vn: "đồng, tệ", cn: "块", py: "kuài", type: "noun" },
          { vn: "10 đồng", cn: "十块", py: "shí kuài", type: "phrase" },
          { vn: "tổng cộng 10 đồng", cn: "一共十块", py: "yígòng shí kuài", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "quyển", cn: "本", py: "běn", type: "noun" },
          { vn: "một quyển", cn: "一本", py: "yì běn", type: "phrase" },
          { vn: "một quyển sách", cn: "一本书", py: "yì běn shū", type: "phrase" },
          { vn: "có một quyển sách", cn: "有一本书", py: "yǒu yì běn shū", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "một chút, một ít", cn: "一点儿", py: "yìdiǎnr", type: "phrase" },
          { vn: "một ít đồ", cn: "一点儿东西", py: "yìdiǎnr dōngxi", type: "phrase" },
          { vn: "mua một ít đồ", cn: "买一点儿东西", py: "mǎi yìdiǎnr dōngxi", type: "phrase" },
          { vn: "tôi mua một ít đồ", cn: "我买一点儿东西", py: "wǒ mǎi yìdiǎnr dōngxi", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "một ít", cn: "些", py: "xiē", type: "noun" },
          { vn: "mua một ít", cn: "买些", py: "mǎi xiē", type: "phrase" },
          { vn: "mua một ít trái cây", cn: "买些水果", py: "mǎi xiē shuǐguǒ", type: "phrase" },
          { vn: "tôi mua một ít trái cây", cn: "我买些水果", py: "wǒ mǎi xiē shuǐguǒ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "cảm ơn", cn: "谢谢", py: "xièxie", type: "verb" },
          { vn: "cảm ơn bạn", cn: "谢谢你", py: "xièxie nǐ", type: "phrase" },
          { vn: "vô cùng cảm ơn bạn", cn: "非常谢谢你", py: "fēicháng xièxie nǐ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "xin lỗi", cn: "对不起", py: "duìbuqǐ", type: "phrase" },
          { vn: "tôi xin lỗi", cn: "我对不起", py: "wǒ duìbuqǐ", type: "phrase" },
          { vn: "tôi có lỗi với bạn", cn: "我对不起你", py: "wǒ duìbuqǐ nǐ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "tạm biệt", cn: "再见", py: "zàijiàn", type: "phrase" },
          { vn: "tạm biệt bạn", cn: "再见你", py: "zàijiàn nǐ", type: "phrase" },
          { vn: "tạm biệt bạn nhé", cn: "再见你啊", py: "zàijiàn nǐ a", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "có tiền", cn: "有钱", py: "yǒu qián", type: "phrase" },
          { vn: "tôi có tiền", cn: "我有钱", py: "wǒ yǒu qián", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "gọi, tên là", cn: "叫", py: "jiào", type: "verb" },
          { vn: "tên là gì", cn: "叫什么", py: "jiào shénme", type: "phrase" },
          { vn: "anh ấy tên là gì?", cn: "他叫什么？", py: "tā jiào shénme?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "làm ơn, mời", cn: "请", py: "qǐng", type: "verb" },
          { vn: "mời bạn", cn: "请你", py: "qǐng nǐ", type: "phrase" },
          { vn: "mời bạn ngồi", cn: "请你坐", py: "qǐng nǐ zuò", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đây, này", cn: "这", py: "zhè", type: "noun" },
          { vn: "đây là", cn: "这是", py: "zhè shì", type: "phrase" },
          { vn: "đây là cái gì?", cn: "这是什么？", py: "zhè shì shénme?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "kia, đó", cn: "那", py: "nà", type: "noun" },
          { vn: "kia là", cn: "那是", py: "nà shì", type: "phrase" },
          { vn: "kia là ai?", cn: "那是谁？", py: "nà shì shéi?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ở kia", cn: "那儿", py: "nàr", type: "location" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "anh ấy ở kia", cn: "他在那儿", py: "tā zài nàr", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đâu, ở đâu", cn: "哪儿", py: "nǎr", type: "location" },
          { vn: "đi", cn: "去", py: "qù", type: "verb" },
          { vn: "đi đâu", cn: "去哪儿", py: "qù nǎr", type: "phrase" },
          { vn: "bạn đi đâu?", cn: "你去哪儿？", py: "nǐ qù nǎr?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ở đây", cn: "这儿", py: "zhèr", type: "location" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "anh ấy ở đây", cn: "他在这儿", py: "tā zài zhèr", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "BÀI 4: Động từ, Tính từ, Vị trí",
    flows: [
      {
        steps: [
          { vn: "nghe", cn: "听", py: "tīng", type: "verb" },
          { vn: "nghe nhạc", cn: "听音乐", py: "tīng yīnyuè", type: "phrase" },
          { vn: "tôi nghe nhạc", cn: "我听音乐", py: "wǒ tīng yīnyuè", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đọc", cn: "读", py: "dú", type: "verb" },
          { vn: "đọc sách", cn: "读书", py: "dú shū", type: "phrase" },
          { vn: "tôi đọc sách", cn: "我读书", py: "wǒ dú shū", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "viết", cn: "写", py: "xiě", type: "verb" },
          { vn: "viết chữ Hán", cn: "写汉字", py: "xiě Hànzì", type: "phrase" },
          { vn: "chúng tôi viết chữ Hán", cn: "我们写汉字", py: "wǒmen xiě Hànzì", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "tốt, khỏe", cn: "好", py: "hǎo", type: "adj" },
          { vn: "rất khỏe", cn: "很好", py: "hěn hǎo", type: "phrase" },
          { vn: "tôi rất khỏe", cn: "我很好", py: "wǒ hěn hǎo", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nhỏ, bé", cn: "小", py: "xiǎo", type: "adj" },
          { vn: "vẫn còn", cn: "还", py: "hái", type: "adverb" },
          { vn: "vẫn còn nhỏ", cn: "还小", py: "hái xiǎo", type: "phrase" },
          { vn: "cậu ấy vẫn còn nhỏ", cn: "他还小", py: "tā hái xiǎo", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "to, lớn", cn: "大", py: "dà", type: "adj" },
          { vn: "rất", cn: "很", py: "hěn", type: "adverb" },
          { vn: "rất to", cn: "很大", py: "hěn dà", type: "phrase" },
          { vn: "công ty tôi rất to", cn: "我公司很大", py: "wǒ gōngsī hěn dà", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "quay lại, về", cn: "回", py: "huí", type: "verb" },
          { vn: "về nhà", cn: "回家", py: "huí jiā", type: "phrase" },
          { vn: "về nhà rồi", cn: "回家了", py: "huí jiā le", type: "phrase" },
          { vn: "tôi về nhà rồi", cn: "我回家了", py: "wǒ huí jiā le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đi", cn: "去", py: "qù", type: "verb" },
          { vn: "đi đâu", cn: "去哪儿", py: "qù nǎr", type: "phrase" },
          { vn: "muốn", cn: "想", py: "xiǎng", type: "verb" },
          { vn: "muốn đi đâu", cn: "想去哪儿", py: "xiǎng qù nǎr", type: "phrase" },
          { vn: "bạn muốn đi đâu?", cn: "你想去哪儿？", py: "nǐ xiǎng qù nǎr?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "làm", cn: "做", py: "zuò", type: "verb" },
          { vn: "biết", cn: "会", py: "huì", type: "verb" },
          { vn: "biết làm", cn: "会做", py: "huì zuò", type: "phrase" },
          { vn: "bạn biết làm không?", cn: "你会做吗？", py: "nǐ huì zuò ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ngủ", cn: "睡觉", py: "shuìjiào", type: "verb" },
          { vn: "phải", cn: "要", py: "yào", type: "verb" },
          { vn: "phải ngủ", cn: "要睡觉", py: "yào shuìjiào", type: "phrase" },
          { vn: "tôi phải ngủ rồi", cn: "我要睡觉了", py: "wǒ yào shuìjiào le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "yêu", cn: "爱", py: "ài", type: "verb" },
          { vn: "yêu em", cn: "爱你", py: "ài nǐ", type: "phrase" },
          { vn: "anh yêu em", cn: "我爱你", py: "wǒ ài nǐ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "thích", cn: "喜欢", py: "xǐhuan", type: "verb" },
          { vn: "thích anh ấy", cn: "喜欢他", py: "xǐhuan tā", type: "phrase" },
          { vn: "tôi thích anh ấy", cn: "我喜欢他", py: "wǒ xǐhuan tā", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "muốn, nhớ", cn: "想", py: "xiǎng", type: "verb" },
          { vn: "nhớ em", cn: "想你", py: "xiǎng nǐ", type: "phrase" },
          { vn: "anh nhớ em", cn: "我想你", py: "wǒ xiǎng nǐ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "quen, quen biết", cn: "认识", py: "rènshi", type: "verb" },
          { vn: "quen cô ấy", cn: "认识她", py: "rènshi tā", type: "phrase" },
          { vn: "bạn quen cô ấy không?", cn: "你认识她吗？", py: "nǐ rènshi tā ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "biết (kỹ năng)", cn: "会", py: "huì", type: "verb" },
          { vn: "biết viết", cn: "会写", py: "huì xiě", type: "phrase" },
          { vn: "biết viết chữ Hán", cn: "会写汉字", py: "huì xiě Hànzì", type: "phrase" },
          { vn: "tôi biết viết chữ Hán", cn: "我会写汉字", py: "wǒ huì xiě Hànzì", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "BÀI 5: Động từ năng nguyện, Trạng thái",
    flows: [
      {
        steps: [
          { vn: "có thể", cn: "能", py: "néng", type: "verb" },
          { vn: "có thể nói", cn: "能说", py: "néng shuō", type: "phrase" },
          { vn: "tôi có thể nói tiếng Trung", cn: "我能说汉语", py: "wǒ néng shuō Hànyǔ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "vui, vui mừng", cn: "高兴", py: "gāoxìng", type: "adj" },
          { vn: "rất vui", cn: "很高兴", py: "hěn gāoxìng", type: "phrase" },
          { vn: "rất vui được quen biết bạn", cn: "很高兴认识你", py: "hěn gāoxìng rènshi nǐ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "gọi điện thoại", cn: "打电话", py: "dǎ diànhuà", type: "verb" },
          { vn: "đang", cn: "在", py: "zài", type: "adverb" },
          { vn: "đang gọi điện thoại", cn: "在打电话", py: "zài dǎ diànhuà", type: "phrase" },
          { vn: "anh ấy đang gọi điện thoại", cn: "他在打电话", py: "tā zài dǎ diànhuà", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "mở, bật", cn: "开", py: "kāi", type: "verb" },
          { vn: "bật tivi", cn: "开电视", py: "kāi diànshì", type: "phrase" },
          { vn: "tôi bật tivi", cn: "我开电视", py: "wǒ kāi diànshì", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "lái", cn: "开", py: "kāi", type: "verb" },
          { vn: "lái xe", cn: "开车", py: "kāi chē", type: "phrase" },
          { vn: "bố lái xe", cn: "爸爸开车", py: "bàba kāi chē", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ngồi", cn: "坐", py: "zuò", type: "verb" },
          { vn: "ngồi ở đây", cn: "坐这儿", py: "zuò zhèr", type: "phrase" },
          { vn: "bạn ngồi ở đây", cn: "你坐这儿", py: "nǐ zuò zhèr", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "sống ở", cn: "住", py: "zhù", type: "verb" },
          { vn: "sống ở đâu", cn: "住哪儿", py: "zhù nǎr", type: "phrase" },
          { vn: "anh ấy sống ở đâu?", cn: "他住哪儿？", py: "tā zhù nǎr?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "mưa", cn: "下雨", py: "xià yǔ", type: "verb" },
          { vn: "ngoài trời", cn: "外面", py: "wàimian", type: "location" },
          { vn: "ngoài trời mưa", cn: "外面下雨", py: "wàimian xià yǔ", type: "phrase" },
          { vn: "ngoài trời mưa rồi", cn: "外面下雨了", py: "wàimian xià yǔ le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "làm việc", cn: "工作", py: "gōngzuò", type: "verb" },
          { vn: "đang", cn: "在", py: "zài", type: "adverb" },
          { vn: "đang làm việc", cn: "在工作", py: "zài gōngzuò", type: "phrase" },
          { vn: "vẫn", cn: "还", py: "hái", type: "adverb" },
          { vn: "vẫn đang làm việc", cn: "还在工作", py: "hái zài gōngzuò", type: "phrase" },
          { vn: "tôi vẫn đang làm việc", cn: "我还在工作", py: "wǒ hái zài gōngzuò", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "học", cn: "学习", py: "xuéxí", type: "verb" },
          { vn: "đang học", cn: "在学习", py: "zài xuéxí", type: "phrase" },
          { vn: "đang học tiếng Trung", cn: "在学习汉语", py: "zài xuéxí Hànyǔ", type: "phrase" },
          { vn: "tôi đang học tiếng Trung", cn: "我在学习汉语", py: "wǒ zài xuéxí Hànyǔ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ít", cn: "少", py: "shǎo", type: "adj" },
          { vn: "rất ít", cn: "很少", py: "hěn shǎo", type: "phrase" },
          { vn: "người", cn: "人", py: "rén", type: "noun" },
          { vn: "người rất ít", cn: "人很少", py: "rén hěn shǎo", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nhiều", cn: "多", py: "duō", type: "adj" },
          { vn: "rất nhiều", cn: "很多", py: "hěn duō", type: "phrase" },
          { vn: "rất nhiều tiền", cn: "很多钱", py: "hěn duō qián", type: "phrase" },
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "có rất nhiều tiền", cn: "有很多钱", py: "yǒu hěn duō qián", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "lạnh", cn: "冷", py: "lěng", type: "adj" },
          { vn: "rất lạnh", cn: "很冷", py: "hěn lěng", type: "phrase" },
          { vn: "thời tiết", cn: "天气", py: "tiānqì", type: "noun" },
          { vn: "thời tiết rất lạnh", cn: "天气很冷", py: "tiānqì hěn lěng", type: "sentence" },
          { vn: "hôm nay thời tiết rất lạnh", cn: "今天天气很冷", py: "jīntiān tiānqì hěn lěng", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nóng", cn: "热", py: "rè", type: "adj" },
          { vn: "không nóng", cn: "不热", py: "bú rè", type: "phrase" },
          { vn: "bạn không nóng à?", cn: "你不热吗？", py: "nǐ bú rè ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "người", cn: "人", py: "rén", type: "noun" },
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "có người", cn: "有人", py: "yǒu rén", type: "phrase" },
          { vn: "ở đây", cn: "这里", py: "zhèlǐ", type: "location" },
          { vn: "ở đây có người", cn: "这里有人", py: "zhèlǐ yǒu rén", type: "phrase" },
          { vn: "ở đây có người không?", cn: "这里有人吗？", py: "zhèlǐ yǒu rén ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nhà", cn: "家", py: "jiā", type: "noun" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "ở nhà", cn: "在家", py: "zài jiā", type: "phrase" },
          { vn: "ở nhà không?", cn: "在家吗？", py: "zài jiā ma?", type: "phrase" },
          { vn: "bạn ở nhà không?", cn: "你在家吗？", py: "nǐ zài jiā ma?", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "6",
    title: "BÀI 6: Giao tiếp, Địa điểm",
    flows: [
      {
        steps: [
          { vn: "không sao", cn: "没关系", py: "méi guānxi", type: "phrase" },
          { vn: "tôi không sao", cn: "我没关系", py: "wǒ méi guānxi", type: "phrase" },
          { vn: "tôi không sao, hiểu rồi", cn: "我没关系，明白了", py: "wǒ méi guānxi, míngbai le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "vâng, đúng vậy", cn: "是的", py: "shì de", type: "phrase" },
          { vn: "là, vâng", cn: "是的，是", py: "shì de, shì", type: "phrase" },
          { vn: "vâng, là anh ấy", cn: "是的，是他", py: "shì de, shì tā", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nhìn thấy", cn: "看见", py: "kànjiàn", type: "verb" },
          { vn: "nhìn thấy rồi", cn: "看见了", py: "kànjiàn le", type: "phrase" },
          { vn: "tôi nhìn thấy rồi", cn: "我看见了", py: "wǒ kànjiàn le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "a lô", cn: "喂", py: "wéi", type: "phrase" },
          { vn: "a lô, là", cn: "喂，是", py: "wéi, shì", type: "phrase" },
          { vn: "a lô, là tôi", cn: "喂，是我", py: "wéi, shì wǒ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "và", cn: "和", py: "hé", type: "conjunction" },
          { vn: "tôi và", cn: "我和", py: "wǒ hé", type: "phrase" },
          { vn: "tôi và anh ấy", cn: "我和他", py: "wǒ hé tā", type: "phrase" },
          { vn: "tôi và anh ấy là bạn bè", cn: "我和他是朋友", py: "wǒ hé tā shì péngyǒu", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "trường học", cn: "学校", py: "xuéxiào", type: "noun" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "ở trường học", cn: "在学校", py: "zài xuéxiào", type: "phrase" },
          { vn: "tôi ở trường học", cn: "我在学校", py: "wǒ zài xuéxiào", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "quán ăn", cn: "饭店", py: "fàndiàn", type: "noun" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "quán ăn ở", cn: "饭店在", py: "fàndiàn zài", type: "phrase" },
          { vn: "quán ăn ở đâu?", cn: "饭店在哪儿？", py: "fàndiàn zài nǎr?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "cửa hàng", cn: "商店", py: "shāngdiàn", type: "noun" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "cửa hàng ở", cn: "商店在", py: "shāngdiàn zài", type: "phrase" },
          { vn: "cửa hàng ở phía trước", cn: "商店在前面", py: "shāngdiàn zài qiánmian", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "Trung Quốc", cn: "中国", py: "Zhōngguó", type: "noun" },
          { vn: "rất", cn: "很", py: "hěn", type: "adverb" },
          { vn: "Trung Quốc rất", cn: "中国很", py: "Zhōngguó hěn", type: "phrase" },
          { vn: "Trung Quốc rất rộng lớn", cn: "中国很大", py: "Zhōngguó hěn dà", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "bệnh viện", cn: "医院", py: "yīyuàn", type: "noun" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "ở bệnh viện", cn: "在医院", py: "zài yīyuàn", type: "phrase" },
          { vn: "tôi ở bệnh viện", cn: "我在医院", py: "wǒ zài yīyuàn", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ga xe lửa", cn: "火车站", py: "huǒchē zhàn", type: "noun" },
          { vn: "đi ra", cn: "去", py: "qù", type: "verb" },
          { vn: "đi ra ga tàu", cn: "去火车站", py: "qù huǒchē zhàn", type: "phrase" },
          { vn: "tôi đi ra ga tàu", cn: "我去火车站", py: "wǒ qù huǒchē zhàn", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "trên", cn: "上", py: "shàng", type: "location" },
          { vn: "trên bàn", cn: "桌子上", py: "zhuōzi shàng", type: "phrase" },
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "trên bàn có sách", cn: "桌子上有书", py: "zhuōzi shàng yǒu shū", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "dưới", cn: "下", py: "xià", type: "location" },
          { vn: "dưới bàn", cn: "桌子下", py: "zhuōzi xià", type: "phrase" },
          { vn: "dưới bàn có gì?", cn: "桌子下有什么？", py: "zhuōzi xià yǒu shénme?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "phía trước", cn: "前面", py: "qiánmian", type: "location" },
          { vn: "là", cn: "是", py: "shì", type: "verb" },
          { vn: "phía trước là trường học", cn: "前面是学校", py: "qiánmian shì xuéxiào", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "phía sau", cn: "后面", py: "hòumian", type: "location" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "anh ấy ở phía sau", cn: "他在后面", py: "tā zài hòumian", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "bên trong", cn: "里面", py: "lǐmian", type: "location" },
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "bên trong có gì?", cn: "里面有什么？", py: "lǐmian yǒu shénme?", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "7",
    title: "BÀI 7: Thời gian",
    flows: [
      {
        steps: [
          { vn: "hôm nay", cn: "今天", py: "jīntiān", type: "time" },
          { vn: "không", cn: "不", py: "bù", type: "adverb" },
          { vn: "không mưa", cn: "不下雨", py: "bú xià yǔ", type: "phrase" },
          { vn: "hôm nay không mưa", cn: "今天不下雨", py: "jīntiān bú xià yǔ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ngày mai", cn: "明天", py: "míngtiān", type: "time" },
          { vn: "đi", cn: "去", py: "qù", type: "verb" },
          { vn: "ngày mai tôi đi đâu?", cn: "明天我去哪儿？", py: "míngtiān wǒ qù nǎr?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "hôm qua", cn: "昨天", py: "zuótiān", type: "time" },
          { vn: "là", cn: "是", py: "shì", type: "verb" },
          { vn: "thứ Hai", cn: "星期一", py: "xīngqīyī", type: "time" },
          { vn: "hôm qua là thứ Hai", cn: "昨天是星期一", py: "zuótiān shì xīngqīyī", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "năm", cn: "年", py: "nián", type: "time" },
          { vn: "năm 2024", cn: "二零二四年", py: "èr líng èr sì nián", type: "phrase" },
          { vn: "là năm 2024", cn: "是二零二四年", py: "shì èr líng èr sì nián", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "tháng", cn: "月", py: "yuè", type: "time" },
          { vn: "tháng 9", cn: "九月", py: "jiǔ yuè", type: "phrase" },
          { vn: "cô ấy", cn: "她", py: "tā", type: "noun" },
          { vn: "trở về", cn: "回来", py: "huílái", type: "verb" },
          { vn: "tháng 9 cô ấy trở về", cn: "九月她回来", py: "jiǔ yuè tā huílái", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "ngày", cn: "日", py: "rì", type: "time" },
          { vn: "ngày mấy", cn: "几日", py: "jǐ rì", type: "phrase" },
          { vn: "là ngày mấy", cn: "是几日", py: "shì jǐ rì", type: "phrase" },
          { vn: "hôm nay là ngày mấy?", cn: "今天是几日？", py: "jīntiān shì jǐ rì?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "lúc, khi", cn: "时候", py: "shíhou", type: "time" },
          { vn: "lúc nào", cn: "什么时候", py: "shénme shíhou", type: "phrase" },
          { vn: "đi", cn: "去", py: "qù", type: "verb" },
          { vn: "lúc nào đi?", cn: "什么时候去？", py: "shénme shíhou qù?", type: "sentence" },
          { vn: "bạn lúc nào đi?", cn: "你什么时候去？", py: "nǐ shénme shíhou qù?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "giờ", cn: "点", py: "diǎn", type: "time" },
          { vn: "mấy", cn: "几", py: "jǐ", type: "noun" },
          { vn: "mấy giờ", cn: "几点", py: "jǐ diǎn", type: "phrase" },
          { vn: "bây giờ mấy giờ?", cn: "现在几点？", py: "xiànzài jǐ diǎn?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "mấy giờ", cn: "几点", py: "jǐ diǎn", type: "phrase" },
          { vn: "tới", cn: "来", py: "lái", type: "verb" },
          { vn: "bạn mấy giờ tới?", cn: "你几点来？", py: "nǐ jǐ diǎn lái?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "phút", cn: "分", py: "fēn", type: "time" },
          { vn: "mười", cn: "十", py: "shí", type: "noun" },
          { vn: "mười giờ mười phút", cn: "十点十分", py: "shí diǎn shí fēn", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "8",
    title: "BÀI 8: Phương hướng, Vị trí",
    flows: [
      {
        steps: [
          { vn: "đường", cn: "路", py: "lù", type: "noun" },
          { vn: "rất", cn: "很", py: "hěn", type: "adverb" },
          { vn: "rất xa", cn: "很远", py: "hěn yuǎn", type: "phrase" },
          { vn: "đường rất xa", cn: "路很远", py: "lù hěn yuǎn", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "bên trái", cn: "左边", py: "zuǒbiān", type: "location" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "ở bên trái", cn: "在左边", py: "zài zuǒbiān", type: "phrase" },
          { vn: "trường học ở bên trái", cn: "学校在左边", py: "xuéxiào zài zuǒbiān", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "bên phải", cn: "右边", py: "yòubiān", type: "location" },
          { vn: "là", cn: "是", py: "shì", type: "verb" },
          { vn: "là nhà tôi", cn: "是我家", py: "shì wǒ jiā", type: "phrase" },
          { vn: "bên phải là nhà tôi", cn: "右边是我家", py: "yòubiān shì wǒ jiā", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "bên cạnh", cn: "旁边", py: "pángbiān", type: "location" },
          { vn: "ở", cn: "在", py: "zài", type: "verb" },
          { vn: "ở bên cạnh", cn: "在旁边", py: "zài pángbiān", type: "phrase" },
          { vn: "máy tính ở bên cạnh", cn: "电脑在旁边", py: "diànnǎo zài pángbiān", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "giờ, tiếng", cn: "小时", py: "xiǎoshí", type: "time" },
          { vn: "một", cn: "一个", py: "yí ge", type: "phrase" },
          { vn: "một tiếng", cn: "一个小时", py: "yí ge xiǎoshí", type: "phrase" },
          { vn: "một tiếng rồi", cn: "一个小时了", py: "yí ge xiǎoshí le", type: "phrase" }
        ]
      },
      {
        steps: [
          { vn: "buổi sáng", cn: "早上", py: "zǎoshang", type: "time" },
          { vn: "tôi", cn: "我", py: "wǒ", type: "noun" },
          { vn: "buổi sáng tôi đi học", cn: "早上我要上课", py: "zǎoshang wǒ yào shàngkè", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "buổi tối", cn: "晚上", py: "wǎnshang", type: "time" },
          { vn: "chúng tôi", cn: "我们", py: "wǒmen", type: "noun" },
          { vn: "đi chơi", cn: "去玩", py: "qù wán", type: "phrase" },
          { vn: "buổi tối chúng tôi đi chơi", cn: "晚上我们去玩", py: "wǎnshang wǒmen qù wán", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "thời gian", cn: "时间", py: "shíjiān", type: "noun" },
          { vn: "vẫn còn", cn: "还", py: "hái", type: "adverb" },
          { vn: "sớm", cn: "早", py: "zǎo", type: "adj" },
          { vn: "thời gian vẫn còn sớm", cn: "时间还早", py: "shíjiān hái zǎo", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "năm ngoái", cn: "去年", py: "qùnián", type: "time" },
          { vn: "chúng tôi", cn: "我们", py: "wǒmen", type: "noun" },
          { vn: "quen nhau", cn: "认识", py: "rènshi", type: "verb" },
          { vn: "năm ngoái chúng tôi quen nhau", cn: "去年我们认识", py: "qùnián wǒmen rènshi", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "cửa", cn: "门", py: "mén", type: "noun" },
          { vn: "mở", cn: "开", py: "kāi", type: "verb" },
          { vn: "mở cửa!", cn: "开门！", py: "kāi mén!", type: "sentence" },
          { vn: "mau mở cửa!", cn: "快开门！", py: "kuài kāi mén!", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "báo", cn: "报纸", py: "bàozhǐ", type: "noun" },
          { vn: "đọc", cn: "看", py: "kàn", type: "verb" },
          { vn: "đọc báo", cn: "看报纸", py: "kàn bàozhǐ", type: "phrase" },
          { vn: "mẹ đang đọc báo", cn: "妈妈在看报纸", py: "māma zài kàn bàozhǐ", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "thuyền", cn: "船", py: "chuán", type: "noun" },
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "có thuyền", cn: "有船", py: "yǒu chuán", type: "phrase" },
          { vn: "không có thuyền", cn: "没有船", py: "méiyǒu chuán", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "trên biển", cn: "海上", py: "hǎishàng", type: "location" },
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "thuyền", cn: "船", py: "chuán", type: "noun" },
          { vn: "trên biển có thuyền không?", cn: "海上有船吗？", py: "hǎishàng yǒu chuán ma?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "xe buýt", cn: "公共汽车", py: "gōnggòng qìchē", type: "noun" },
          { vn: "ngồi", cn: "坐", py: "zuò", type: "verb" },
          { vn: "ngồi xe buýt", cn: "坐公共汽车", py: "zuò gōnggòng qìchē", type: "phrase" },
          { vn: "đi làm", cn: "上班", py: "shàngbān", type: "verb" },
          { vn: "ngồi xe buýt đi làm nhé!", cn: "坐公共汽车上班吧！", py: "zuò gōnggòng qìchē shàngbān ba!", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "xe đạp", cn: "自行车", py: "zìxíngchē", type: "noun" },
          { vn: "đạp", cn: "骑", py: "qí", type: "verb" },
          { vn: "đạp xe đạp", cn: "骑自行车", py: "qí zìxíngchē", type: "phrase" },
          { vn: "đi học", cn: "上课", py: "shàngkè", type: "verb" },
          { vn: "tôi đạp xe đạp đi học", cn: "我骑自行车上课", py: "wǒ qí zìxíngchē shàngkè", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "sinh nhật", cn: "生日", py: "shēngrì", type: "noun" },
          { vn: "vui vẻ", cn: "快乐", py: "kuàilè", type: "adj" },
          { vn: "chúc", cn: "祝", py: "zhù", type: "verb" },
          { vn: "chúc bạn sinh nhật vui vẻ!", cn: "祝你生日快乐！", py: "zhù nǐ shēngrì kuàilè!", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "mắt", cn: "眼睛", py: "yǎnjing", type: "noun" },
          { vn: "nhìn", cn: "看", py: "kàn", type: "verb" },
          { vn: "mắt nhìn", cn: "眼睛看", py: "yǎnjing kàn", type: "phrase" },
          { vn: "nhìn không", cn: "看不", py: "kàn bu", type: "phrase" },
          { vn: "nhìn không rõ", cn: "看不清", py: "kàn bu qīng", type: "sentence" }
        ]
      }
    ]
  },
  {
    id: "9",
    title: "BÀI 9: Cơ thể, Gia đình",
    flows: [
      {
        steps: [
          { vn: "thân thể, sức khỏe", cn: "身体", py: "shēntǐ", type: "noun" },
          { vn: "sức khỏe thế nào", cn: "身体怎么样", py: "shēntǐ zěnmeyàng", type: "phrase" },
          { vn: "sức khỏe thế nào rồi?", cn: "身体怎么样了？", py: "shēntǐ zěnmeyàng le?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "vấn đề, câu hỏi", cn: "问题", py: "wèntí", type: "noun" },
          { vn: "câu hỏi gì", cn: "什么问题", py: "shénme wèntí", type: "phrase" },
          { vn: "có câu hỏi gì?", cn: "有什么问题？", py: "yǒu shénme wèntí?", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "em gái", cn: "妹妹", py: "mèimei", type: "noun" },
          { vn: "ngủ", cn: "睡觉", py: "shuìjiào", type: "verb" },
          { vn: "em gái ngủ rồi", cn: "妹妹睡觉了", py: "mèimei shuìjiào le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "anh trai", cn: "哥哥", py: "gēge", type: "noun" },
          { vn: "không có", cn: "没有", py: "méiyǒu", type: "verb" },
          { vn: "tôi không có anh trai", cn: "我没有哥哥", py: "wǒ méiyǒu gēge", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "chị gái", cn: "姐姐", py: "jiějie", type: "noun" },
          { vn: "rất", cn: "很", py: "hěn", type: "adverb" },
          { vn: "chị gái rất xinh đẹp", cn: "姐姐很漂亮", py: "jiějie hěn piàoliang", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "em trai", cn: "弟弟", py: "dìdi", type: "noun" },
          { vn: "đang", cn: "在", py: "zài", type: "adverb" },
          { vn: "em trai đang học bài", cn: "弟弟在学习", py: "dìdi zài xuéxí", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "thuốc", cn: "药", py: "yào", type: "noun" },
          { vn: "uống", cn: "吃", py: "chī", type: "verb" },
          { vn: "uống thuốc", cn: "吃药", py: "chī yào", type: "phrase" },
          { vn: "tôi uống thuốc", cn: "我吃药", py: "wǒ chī yào", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "vé", cn: "票", py: "piào", type: "noun" },
          { vn: "mua", cn: "买", py: "mǎi", type: "verb" },
          { vn: "mua vé", cn: "买票", py: "mǎi piào", type: "phrase" },
          { vn: "tôi mua vé", cn: "我买票", py: "wǒ mǎi piào", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "vợ", cn: "妻子", py: "qīzi", type: "noun" },
          { vn: "vợ tôi", cn: "我妻子", py: "wǒ qīzi", type: "phrase" },
          { vn: "là", cn: "是", py: "shì", type: "verb" },
          { vn: "đây là vợ tôi", cn: "这是我妻子", py: "zhè shì wǒ qīzi", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "chồng", cn: "丈夫", py: "zhàngfu", type: "noun" },
          { vn: "chồng tôi", cn: "我丈夫", py: "wǒ zhàngfu", type: "phrase" },
          { vn: "đang", cn: "在", py: "zài", type: "adverb" },
          { vn: "làm việc", cn: "工作", py: "gōngzuò", type: "verb" },
          { vn: "chồng tôi đang làm việc", cn: "我丈夫在工作", py: "wǒ zhàngfu zài gōngzuò", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "trẻ em, con", cn: "孩子", py: "háizi", type: "noun" },
          { vn: "nhìn", cn: "看", py: "kàn", type: "verb" },
          { vn: "tôi nhìn con", cn: "我看孩子", py: "wǒ kàn háizi", type: "phrase" },
          { vn: "chơi", cn: "玩", py: "wán", type: "verb" },
          { vn: "tôi nhìn con chơi", cn: "我看孩子玩", py: "wǒ kàn háizi wán", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "nhân viên phục vụ", cn: "服务员", py: "fúwùyuán", type: "noun" },
          { vn: "gọi", cn: "叫", py: "jiào", type: "verb" },
          { vn: "anh ấy gọi nhân viên phục vụ đến", cn: "他叫服务员来", py: "tā jiào fúwùyuán lái", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "điện thoại", cn: "手机", py: "shǒujī", type: "noun" },
          { vn: "là", cn: "是", py: "shì", type: "verb" },
          { vn: "đây là điện thoại", cn: "这是手机", py: "zhè shì shǒujī", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đồng hồ", cn: "手表", py: "shǒubiǎo", type: "noun" },
          { vn: "có", cn: "有", py: "yǒu", type: "verb" },
          { vn: "tôi có đồng hồ", cn: "我有手表", py: "wǒ yǒu shǒubiǎo", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "công ty", cn: "公司", py: "gōngsī", type: "noun" },
          { vn: "tới", cn: "到", py: "dào", type: "verb" },
          { vn: "tới công ty rồi", cn: "到公司了", py: "dào gōngsī le", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "tuyết", cn: "雪", py: "xuě", type: "noun" },
          { vn: "ngắm", cn: "看", py: "kàn", type: "verb" },
          { vn: "ngắm tuyết", cn: "看雪", py: "kàn xuě", type: "phrase" },
          { vn: "thích ngắm tuyết", cn: "喜欢看雪", py: "xǐhuan kàn xuě", type: "phrase" },
          { vn: "tôi thích ngắm tuyết", cn: "我喜欢看雪", py: "wǒ xǐhuan kàn xuě", type: "sentence" }
        ]
      },
      {
        steps: [
          { vn: "đen", cn: "黑", py: "hēi", type: "adj" },
          { vn: "trời", cn: "天", py: "tiān", type: "noun" },
          { vn: "trời tối", cn: "天黑", py: "tiān hēi", type: "phrase" },
          { vn: "trời tối rồi", cn: "天黑了", py: "tiān hēi le", type: "sentence" }
        ]
      }
    ]
  }
];

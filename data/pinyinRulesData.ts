
export interface PinyinRuleCase {
  condition: string;
  result: string;
  example?: string;
  examplePinyin?: string;
  diagram?: string;
}

export interface PinyinRule {
  id: number;
  title: string;
  description: string;
  cases: PinyinRuleCase[];
  color: string;
}

export const pinyinRules: PinyinRule[] = [
  {
    id: 1,
    title: 'Vận mẫu có "i"',
    description: 'Quy tắc viết phiên âm cho các vận mẫu bắt đầu bằng "i" khi không có phụ âm đầu.',
    color: 'blue',
    cases: [
      {
        condition: 'i, in, ing',
        result: 'yi, yin, ying',
        diagram: 'Thêm "y" vào trước'
      },
      {
        condition: 'ia, ie, iao, iou, ian, iong',
        result: 'ya, ye, yao, you, yan, yong',
        diagram: 'Đổi "i" thành "y"'
      }
    ]
  },
  {
    id: 2,
    title: 'Vận mẫu bắt đầu bằng "u"',
    description: 'Quy tắc viết phiên âm cho các vận mẫu bắt đầu bằng "u" khi không có phụ âm đầu.',
    color: 'indigo',
    cases: [
      {
        condition: 'u (đứng một mình)',
        result: 'w',
        diagram: 'Đổi "u" thành "w"'
      },
      {
        condition: 'ua, uo, uai, uei, uan, uen, uang, ueng',
        result: 'wa, wo, wai, wei, wan, wen, wang, weng',
        diagram: 'Đổi "u" thành "w"'
      }
    ]
  },
  {
    id: 3,
    title: 'Hai thanh 3 đi liền nhau',
    description: 'Khi từ có 2 âm tiết mang thanh 3 (v) đứng liền kề nhau.',
    color: 'red',
    cases: [
      {
        condition: 'Thanh 3 + Thanh 3',
        result: 'Thanh 2 + Thanh 3',
        example: '你好 (nǐ hǎo)',
        examplePinyin: 'ní hǎo',
        diagram: 'v + v ➜ / + v'
      }
    ]
  },
  {
    id: 4,
    title: 'Ba thanh 3 đi liền nhau',
    description: 'Khi cụm từ có 3 âm tiết mang thanh 3 đứng liền kề nhau.',
    color: 'orange',
    cases: [
      {
        condition: 'Dạng 1 (Thường gặp)',
        result: 'Thanh 2 + Thanh 2 + Thanh 3',
        example: '展览馆 (zhǎn lǎn guǎn)',
        examplePinyin: 'zhán lán guǎn',
        diagram: 'v + v + v ➜ / + / + v'
      },
      {
        condition: 'Dạng 2 (Nhấn mạnh từ đầu)',
        result: 'Thanh 3 + Thanh 2 + Thanh 3',
        example: '我请你 (wǒ qǐng nǐ)',
        examplePinyin: 'wǒ qíng nǐ',
        diagram: 'v + v + v ➜ v + / + v'
      }
    ]
  },
  {
    id: 5,
    title: 'Bốn thanh 3 đi liền nhau',
    description: 'Khi 4 âm tiết cùng mang thanh thứ 3.',
    color: 'amber',
    cases: [
      {
        condition: '4 Thanh 3 liên tiếp',
        result: 'Thanh 2 + Thanh 3 + Thanh 2 + Thanh 3',
        example: '我也很好 (wǒ yě hěn hǎo)',
        examplePinyin: 'wó yě hén hǎo',
        diagram: 'v+v+v+v ➜ /+v+/+v'
      }
    ]
  },
  {
    id: 6,
    title: 'Biến điệu của "不" (bù)',
    description: 'Thanh điệu của "不" thay đổi tùy thuộc vào âm tiết đi sau nó.',
    color: 'emerald',
    cases: [
      {
        condition: '"不" (bù) + Thanh 4 (\\)',
        result: 'Đọc thành "bú" (Thanh 2)',
        example: '不是 (bù shì)',
        examplePinyin: 'bú shì',
        diagram: 'bù + \\ ➜ bú + \\'
      },
      {
        condition: '"不" + Thanh 1, 2, 3',
        result: 'Giữ nguyên "bù" (Thanh 4)',
        diagram: 'Không thay đổi'
      }
    ]
  },
  {
    id: 7,
    title: 'Vận mẫu có "ü"',
    description: 'Quy tắc viết dấu chấm trên đầu "ü" trong các trường hợp khác nhau.',
    color: 'teal',
    cases: [
      {
        condition: 'ü, üe, üan, ün (đứng một mình)',
        result: 'yu, yue, yuan, yun',
        diagram: 'Thêm y, bỏ dấu chấm'
      },
      {
        condition: 'j, q, x + ü',
        result: 'ju, qu, xu',
        diagram: 'Bỏ hai dấu chấm'
      },
      {
        condition: 'n, l + ü',
        result: 'nü, lü',
        diagram: 'Giữ nguyên dấu chấm'
      }
    ]
  },
  {
    id: 8,
    title: 'Thanh mẫu đặc biệt + "i"',
    description: 'Cách phát âm vận mẫu "i" khi đi sau nhóm thanh mẫu đầu lưỡi và uốn lưỡi.',
    color: 'cyan',
    cases: [
      {
        condition: 'z, c, s, zh, ch, sh, r + i',
        result: 'Đọc "i" giống "ư"',
        diagram: 'i ➜ ư'
      }
    ]
  },
  {
    id: 9,
    title: 'Biến điệu của "一" (yī)',
    description: 'Quy tắc biến đổi thanh điệu của số 1 (yī).',
    color: 'sky',
    cases: [
      {
        condition: '"一" (yī) + Thanh 4',
        result: 'Đọc thành "yí" (Thanh 2)',
        example: '一个 (yī gè)',
        examplePinyin: 'yí gè',
        diagram: 'yī + \\ ➜ yí + \\'
      },
      {
        condition: '"一" + Thanh 1, 2, 3',
        result: 'Đọc thành "yì" (Thanh 4)',
        example: '一天 (yī tiān)',
        examplePinyin: 'yì tiān',
        diagram: 'yī + -/v ➜ yì'
      }
    ]
  },
  {
    id: 10,
    title: 'Vận mẫu "o"',
    description: 'Cách phát âm vận mẫu "o" trong các ngữ cảnh khác nhau.',
    color: 'purple',
    cases: [
      {
        condition: 'o đứng một mình',
        result: 'Đọc thành "ô"',
        diagram: 'o ➜ ô'
      },
      {
        condition: 'b, p, m, f + o',
        result: 'Đọc thành "uô"',
        diagram: 'o ➜ uô'
      }
    ]
  }
];

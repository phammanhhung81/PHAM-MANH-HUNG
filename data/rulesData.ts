
import { StrokeData } from '../components/StrokeVisualizer';
import { getStrokeData } from './strokeData';
import { ArrowDown, ArrowRight, Plus, Slash, BoxSelect, Layers, Square } from 'lucide-react';

export interface RuleData {
  lesson_id: number;
  title: string;
  rule_description: string;
  example_character: string;
  example_description: string;
  stroke_steps: string[];
  visualization?: StrokeData;
  quiz: {
    question: string;
    options: string[];
    correct_option: number;
    explanation: string;
  };
  practice: {
    instructions: string;
    canvas_settings: {
      background_character: string;
      show_order_hint: boolean;
      allow_draw_next: boolean;
    };
  };
}

// Helper to fetch data from our central store if available
const getDataForChar = (char: string): StrokeData => {
  return getStrokeData(char) || { char, paths: [] };
};

export const rule1Data: RuleData = {
  lesson_id: 1,
  title: "Quy tắc 1 – Từ trên xuống",
  rule_description: "Quy tắc cơ bản nhất trong viết chữ Hán: Các nét bên trên được viết trước, các nét bên dưới viết sau. Nguyên tắc này giúp chữ viết cân đối và thuận tay.",
  example_character: "三",
  example_description: "Ví dụ: 三 (tam), 六 (lục), 王 (vương), 竟 (cánh).",
  stroke_steps: [
    "Nét 1: Nét ngang trên cùng (kẻ từ trái sang phải ở đỉnh chữ).",
    "Nét 2: Nét ngang thứ hai ở giữa (viết dưới nét 1, hơi ngắn hơn).",
    "Nét 3: Nét ngang dưới cùng (viết cuối cùng, dài giống nét đầu tiên)."
  ],
  visualization: getDataForChar("三"),
  quiz: {
    question: "Theo quy tắc \"Từ trên xuống\", nét nào viết trước trong chữ 二 (số 2)?",
    options: [
      "Nét ngang phía trên viết trước, sau đó nét ngang phía dưới.",
      "Nét ngang phía dưới viết trước, sau đó nét ngang phía trên."
    ],
    correct_option: 0,
    explanation: "Chữ 二 có hai nét ngang, nét trên nằm ở cao hơn nên phải viết trước, nét dưới viết sau."
  },
  practice: {
    instructions: "Hãy vẽ chữ \"三\" bằng cách viết các nét ngang từ trên xuống dưới. Bắt đầu với nét ngang trên cùng...",
    canvas_settings: {
      background_character: "三", 
      show_order_hint: true,
      allow_draw_next: false
    }
  }
};

export const rule2Data: RuleData = {
  lesson_id: 2,
  title: "Quy tắc 2 – Từ Trái Sang Phải",
  rule_description: "Với các chữ có cấu trúc trái - phải, ta viết bộ bên trái trước, sau đó viết bộ bên phải. Quy tắc này áp dụng cho phần lớn các chữ ghép.",
  example_character: "好",
  example_description: "Ví dụ: 好 (hảo), 开 (khai), 剂 (tễ), 明 (minh).",
  stroke_steps: [
    "Nét 1-3: Viết bộ Nữ (女) bên trái trước (Phẩy chấm, Phẩy, Ngang).",
    "Nét 4-6: Viết bộ Tử (子) bên phải sau (Ngang gập, Cong móc, Ngang)."
  ],
  visualization: getDataForChar("好"),
  quiz: {
    question: "Chữ 明 (Minh) gồm bộ Nhật và bộ Nguyệt. Thứ tự viết là gì?",
    options: [
      "Viết bộ Nguyệt (phải) trước, bộ Nhật (trái) sau.",
      "Viết bộ Nhật (trái) trước, bộ Nguyệt (phải) sau."
    ],
    correct_option: 1,
    explanation: "Theo quy tắc 'Từ trái sang phải', viết bộ Nhật bên trái trước."
  },
  practice: {
    instructions: "Viết chữ '好'. Bắt đầu với bộ Nữ bên trái, sau đó viết bộ Tử bên phải.",
    canvas_settings: {
      background_character: "好",
      show_order_hint: true,
      allow_draw_next: false
    }
  }
};

export const rule3Data: RuleData = {
  lesson_id: 3,
  title: "Quy tắc 3 – Ngang trước dọc sau",
  rule_description: "Khi nét ngang và nét dọc giao nhau, ta viết nét ngang trước, sau đó mới viết nét dọc.",
  example_character: "千",
  example_description: "Ví dụ: 千 (thiên), 井 (tỉnh), 七 (thất), 秦 (tần).",
  stroke_steps: [
    "Nét 1: Nét phẩy (nằm trên cùng).",
    "Nét 2: Nét ngang (viết từ trái sang phải).",
    "Nét 3: Nét sổ (viết từ trên xuống dưới, cắt qua nét ngang)."
  ],
  visualization: getDataForChar("千"),
  quiz: {
    question: "Trong chữ 十 (thập), thứ tự viết đúng là gì?",
    options: [
      "Sổ trước, Ngang sau",
      "Ngang trước, Sổ sau"
    ],
    correct_option: 1,
    explanation: "Theo quy tắc, nét ngang được viết trước để tạo nền tảng, nét sổ viết sau để hoàn thiện cấu trúc."
  },
  practice: {
    instructions: "Viết chữ \"千\". Nhớ viết nét ngang trước khi viết nét sổ!",
    canvas_settings: {
      background_character: "千",
      show_order_hint: true,
      allow_draw_next: false
    }
  }
};

export const rule4Data: RuleData = {
  lesson_id: 4,
  title: "Quy tắc 4 – Phẩy trước mác sau",
  rule_description: "Nét xiên trái (phẩy) được viết trước, sau đó đến nét xiên phải (mác).",
  example_character: "又",
  example_description: "Ví dụ: 又 (hựu), 人 (nhân), 父 (phụ), 全 (toàn).",
  stroke_steps: [
    "Nét 1: Nét ngang phẩy (橫撇) viết từ trái qua.",
    "Nét 2: Nét mác (捺) viết từ trên xuống sang phải."
  ],
  visualization: getDataForChar("又"),
  quiz: {
    question: "Chữ 人 (nhân) được viết như thế nào?",
    options: [
      "Viết nét bên phải trước, bên trái sau.",
      "Viết nét bên trái (phẩy) trước, bên phải (mác) sau."
    ],
    correct_option: 1,
    explanation: "Phẩy trước mác sau là quy tắc vàng cho các chữ như 人, 八, 入."
  },
  practice: {
    instructions: "Thử viết chữ \"又\". Bắt đầu bằng nét ngang phẩy.",
    canvas_settings: {
      background_character: "又",
      show_order_hint: true,
      allow_draw_next: false
    }
  }
};

export const rule5Data: RuleData = {
  lesson_id: 5,
  title: "Quy tắc 5 – Ngoài trước trong sau",
  rule_description: "Với các chữ có cấu trúc bao quanh (như bộ Khuynh 冂, bộ Vi 囗), ta viết khung bao quanh bên ngoài trước, sau đó mới viết các nét bên trong.",
  example_character: "同",
  example_description: "Ví dụ: 同 (đồng), 月 (nguyệt), 闪 (thiểm), 内 (nội).",
  stroke_steps: [
    "Nét 1: Nét sổ thẳng bên trái của khung.",
    "Nét 2: Nét ngang gập móc (bao quanh phía trên và bên phải).",
    "Nét 3-6: Viết các nét bên trong (chữ Nhất và bộ Khẩu)."
  ],
  visualization: getDataForChar("同"),
  quiz: {
    question: "Với chữ '同' (Đồng), thứ tự viết khung bao quanh là gì?",
    options: [
      "Viết nét bên trong trước, sau đó viết khung bao quanh.",
      "Viết nét sổ trái, rồi nét ngang gập, sau đó viết bên trong."
    ],
    correct_option: 1,
    explanation: "Quy tắc 'Ngoài trước trong sau' yêu cầu viết khung bên ngoài trước để định hình chữ."
  },
  practice: {
    instructions: "Viết chữ '同'. Nhớ viết khung ngoài trước!",
    canvas_settings: {
      background_character: "同",
      show_order_hint: true,
      allow_draw_next: false
    }
  }
};

export const rule6Data: RuleData = {
  lesson_id: 6,
  title: "Quy tắc 6 – Trong trước ngoài sau",
  rule_description: "Quy tắc này thường áp dụng cho các chữ có bộ bao quanh ở phía dưới hoặc bên trái như bộ Dẫn (廴) hoặc bộ Xước (辶). Phần bên trong được viết trước, phần bao quanh viết sau.",
  example_character: "达",
  example_description: "Ví dụ: 达 (đạt), 边 (biên), 运 (vận), 建 (kiến).",
  stroke_steps: [
    "Nét 1-3: Viết chữ 'Đại' (大) bên trong trước.",
    "Nét 4: Nét chấm của bộ Xước.",
    "Nét 5: Nét ngang gập cong.",
    "Nét 6: Nét mác dài đỡ lấy chữ."
  ],
  visualization: getDataForChar("达"),
  quiz: {
    question: "Khi viết chữ có bộ Xước (辶) như '过', '这', ta viết thế nào?",
    options: [
      "Viết bộ Xước trước, phần bên trong sau.",
      "Viết phần bên trong trước, bộ Xước viết sau cùng."
    ],
    correct_option: 1,
    explanation: "Đây là trường hợp đặc biệt 'Trong trước ngoài sau', bộ Xước luôn viết cuối cùng để đỡ lấy chữ."
  },
  practice: {
    instructions: "Viết chữ '达'. Hãy viết chữ Đại (大) trước, rồi mới đến bộ Xước.",
    canvas_settings: {
      background_character: "达",
      show_order_hint: true,
      allow_draw_next: false
    }
  }
};

export const rule7Data: RuleData = {
  lesson_id: 7,
  title: "Quy tắc 7 – Vào nhà trước đóng cửa sau",
  rule_description: "Với các chữ có cấu trúc bao quanh hoàn toàn (như bộ Vi 囗), ta viết khung 3 phía trước, sau đó viết phần bên trong, và cuối cùng mới viết nét ngang dưới đáy để 'đóng cửa'.",
  example_character: "回",
  example_description: "Ví dụ: 回 (hồi), 国 (quốc), 田 (điền), 日 (nhật).",
  stroke_steps: [
    "Nét 1: Nét sổ thẳng bên trái.",
    "Nét 2: Nét ngang gập (tạo thành nóc và cạnh phải).",
    "Nét 3-5: Viết phần bên trong (chữ Khẩu nhỏ).",
    "Nét 6: Nét ngang dưới cùng để đóng kín chữ."
  ],
  visualization: getDataForChar("回"),
  quiz: {
    question: "Trong chữ '国' (Quốc), nét nào viết cuối cùng?",
    options: [
      "Nét chấm bên trong chữ Ngọc.",
      "Nét ngang dưới cùng của bộ Vi (khung ngoài)."
    ],
    correct_option: 1,
    explanation: "Theo quy tắc 'Vào nhà trước, đóng cửa sau', nét ngang đáy của khung bao quanh luôn được viết cuối cùng."
  },
  practice: {
    instructions: "Viết chữ '回'. Viết khung ngoài, rồi viết chữ khẩu nhỏ bên trong, cuối cùng mới đóng đáy.",
    canvas_settings: {
      background_character: "回",
      show_order_hint: true,
      allow_draw_next: false
    }
  }
};

export const writingRules = [
  {
    id: 1,
    title: "Từ Trên Xuống",
    desc: "Các nét bên trên được viết trước, các nét bên dưới viết sau.",
    icon: ArrowDown,
    animation: "group-hover:translate-y-1",
    color: "blue",
    examples: ["三", "六", "王", "竟"],
    data: rule1Data 
  },
  {
    id: 2,
    title: "Từ Trái Sang Phải",
    desc: "Viết bộ bên trái trước rồi đến bộ bên phải.",
    icon: ArrowRight,
    animation: "group-hover:translate-x-1",
    color: "indigo",
    examples: ["好", "开", "剂", "明"],
    data: rule2Data
  },
  {
    id: 3,
    title: "Ngang Trước Dọc Sau",
    desc: "Nét ngang và sổ dọc giao nhau, viết ngang trước.",
    icon: Plus,
    animation: "group-hover:scale-110",
    color: "sky",
    examples: ["千", "井", "七", "秦"],
    data: rule3Data
  },
  {
    id: 4,
    title: "Phẩy Trước Mác Sau",
    desc: "Nét xiên trái (phẩy) trước, nét xiên phải (mác) sau.",
    icon: Slash,
    animation: "group-hover:-rotate-12",
    color: "emerald",
    examples: ["又", "人", "父", "全"],
    data: rule4Data
  },
  {
    id: 5,
    title: "Ngoài Trước Trong Sau",
    desc: "Khung bao quanh viết trước, phần bên trong viết sau.",
    icon: BoxSelect,
    animation: "group-hover:scale-105",
    color: "orange",
    examples: ["同", "月", "闪", "内"],
    data: rule5Data
  },
  {
    id: 6,
    title: "Trong Trước Ngoài Sau",
    desc: "Áp dụng khi có nét bao quanh ở dưới đáy (như bộ 辶).",
    icon: Layers,
    animation: "group-hover:translate-y-1",
    color: "purple",
    examples: ["达", "边", "运", "建"],
    data: rule6Data
  },
  {
    id: 7,
    title: "Vào Nhà Trước Đóng Cửa Sau",
    desc: "Viết khung ngoài, viết bên trong, rồi mới đóng đáy.",
    icon: Square,
    animation: "group-hover:opacity-70",
    color: "rose",
    examples: ["回", "国", "田", "日"],
    data: rule7Data
  }
];

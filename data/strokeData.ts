
import { StrokeData } from "../components/StrokeVisualizer";

// A repository of SVG paths for characters used in the app
// These are simplified SVG paths for demonstration purposes
const charPaths: Record<string, string[]> = {
  // --- Rule 1: Từ trên xuống ---
  "三": [
    "M20,30 L80,30", // Top
    "M30,50 L70,50", // Middle
    "M10,80 L90,80"  // Bottom
  ],
  "六": [
    "M50,15 L50,25", // Dot
    "M20,30 L80,30", // Heng
    "M40,40 L25,70", // Pie
    "M60,40 L75,70"  // Dian
  ],
  "王": [
    "M25,25 L75,25", // Heng 1
    "M25,50 L75,50", // Heng 2
    "M50,25 L50,75", // Shu
    "M15,75 L85,75"  // Heng 3 (Bottom)
  ],
  "竟": [
    "M50,10 L50,20", // Lid dot
    "M20,25 L80,25", // Lid heng
    "M35,30 L25,45", // Lid pie
    "M65,30 L75,45", // Lid na
    "M30,50 L70,50", // Middle heng
    "M25,60 L75,60", // Lower heng
    "M40,60 L30,85", // Legs pie
    "M60,60 L70,85"  // Legs wan gou
  ],

  // --- Rule 2: Từ trái sang phải ---
  "好": [
    "M30,25 L40,40 L25,60", // Nu (Pie Dian)
    "M25,45 L45,35", // Nu (Pie)
    "M20,50 L55,50", // Nu (Heng)
    "M65,25 L65,55 L60,60", // Zi (Heng Zhe Gou)
    "M60,45 L85,45", // Zi (Heng)
    "M70,25 L70,85" // Zi (Shu Gou)
  ],
  "开": [
    "M25,35 L75,35", // Heng 1
    "M20,55 L80,55", // Heng 2
    "M35,35 L30,85", // Pie
    "M65,35 L65,85"  // Shu
  ],
  "剂": [
    "M30,20 L50,20", // Wen dot
    "M20,35 L60,35", // Wen heng
    "M40,35 L30,65", // Wen pie
    "M40,35 L50,65", // Wen na
    "M70,20 L70,70 L65,75", // Dao shu gou
    "M80,30 L80,60"  // Dao shu
  ],
  "明": [
    "M20,20 L20,70", // Ri shu
    "M20,20 L40,20 L40,70", // Ri heng zhe
    "M20,45 L40,45", // Ri heng mid
    "M20,70 L40,70", // Ri heng bot
    "M50,20 L50,80 Q50,90 45,85", // Yue pie/shu
    "M50,20 L75,20 L75,80", // Yue heng zhe gou
    "M50,40 L75,40", // Yue heng 1
    "M50,60 L75,60"  // Yue heng 2
  ],

  // --- Rule 3: Ngang trước dọc sau ---
  "千": [
    "M65,20 Q50,35 35,45", // Pie (Top)
    "M20,55 L80,55",       // Heng (Middle)
    "M50,45 L50,95"        // Shu (Vertical)
  ],
  "井": [
    "M25,35 L75,35", // Heng 1
    "M20,60 L80,60", // Heng 2
    "M40,20 L30,80", // Pie/Shu 1
    "M60,20 L65,80"  // Shu 2
  ],
  "七": [
    "M25,50 L80,35", // Heng (Slanted)
    "M50,30 L50,70 L70,70" // Shu Wan Gou
  ],
  "秦": [
    "M25,20 L75,20", // Three hengs top
    "M25,30 L75,30",
    "M25,40 L75,40",
    "M50,15 L50,45", // Shu through
    "M20,50 L45,90", // Pie
    "M80,50 L55,90"  // Na
  ],

  // --- Rule 4: Phẩy trước mác sau ---
  "又": [
    "M30,30 L75,30 Q45,65 30,85", // Heng Pie
    "M35,40 Q55,60 85,85"         // Na
  ],
  "人": [
    "M50,20 Q40,60 20,90", // Pie
    "M50,35 Q65,65 85,90"  // Na
  ],
  "父": [
    "M30,25 L40,35", // Pie (top left)
    "M70,25 L60,35", // Dian (top right)
    "M50,40 Q30,70 20,90", // Pie (large)
    "M50,40 Q70,70 85,90"  // Na (large)
  ],
  "全": [
    "M50,15 Q30,40 20,60", // Ren (Pie)
    "M50,25 Q70,50 85,60", // Ren (Na)
    "M30,50 L70,50", // Wang (Heng 1)
    "M30,70 L70,70", // Wang (Heng 2)
    "M50,50 L50,85", // Wang (Shu)
    "M20,85 L80,85"  // Wang (Heng 3)
  ],

  // --- Rule 5: Ngoài trước trong sau ---
  "同": [
    "M25,20 L25,90",         // Shu
    "M25,20 L80,20 L80,85 L75,90", // Heng Zhe Gou
    "M40,35 L65,35",        // Heng
    "M38,50 L38,75",        // Kou Shu
    "M38,50 L68,50 L68,75", // Kou Heng Zhe
    "M38,75 L68,75"         // Kou Heng
  ],
  "月": [
    "M30,20 Q30,70 25,90", // Pie
    "M30,20 L70,20 L70,80 L65,90", // Heng Zhe Gou
    "M30,40 L70,40", // Heng 1
    "M30,60 L70,60"  // Heng 2
  ],
  "闪": [
    "M30,20 L30,80", // Men (Dian/Shu)
    "M30,20 L75,20 L75,80", // Men (Heng Zhe Gou)
    "M50,15 L55,25", // Men (Dot)
    "M45,40 L60,55", // Ren (Pie) - inside
    "M55,45 L65,60"  // Ren (Dian) - inside
  ],
  "内": [
    "M25,20 L25,90", // Shu
    "M25,20 L80,20 L80,80 L75,85", // Heng Zhe Gou
    "M40,40 L65,60", // Pie
    "M65,40 L45,60"  // Dian
  ],

  // --- Rule 6: Trong trước ngoài sau ---
  "达": [
    "M50,35 L80,35",              // Da (Heng)
    "M65,35 Q50,60 40,70",       // Da (Pie)
    "M65,35 Q75,60 85,70",       // Da (Na)
    "M25,30 L30,35",             // Zhuo (Dian)
    "M25,45 L45,45 L35,60",      // Zhuo (Heng Zhe Zhe Pie)
    "M20,65 Q40,85 90,85"        // Zhuo (Na)
  ],
  "边": [
    "M60,30 L50,50", // Li (Pie)
    "M60,30 L70,45 L60,60", // Li (Heng Zhe Gou)
    "M25,30 L30,35", // Zhuo 1
    "M25,45 L45,45 L35,60", // Zhuo 2
    "M20,65 Q40,85 90,85"   // Zhuo 3
  ],
  "运": [
    "M50,30 L80,30", // Yun (Heng)
    "M50,45 L80,45", // Yun (Heng)
    "M45,30 L45,55 L65,60", // Yun (Pie Zhe Dian)
    "M25,30 L30,35", // Zhuo 1
    "M25,45 L45,45 L35,60", // Zhuo 2
    "M20,65 Q40,85 90,85"   // Zhuo 3
  ],
  "建": [
    "M55,25 L85,25", // Jian (Heng Zhe)
    "M55,35 L85,35", // Jian (Heng)
    "M60,20 L60,60", // Jian (Shu)
    "M45,40 L85,40", // Jian (Heng long)
    "M25,30 L30,35", // Zhuo (Dian)
    "M25,45 L45,45 L35,60", // Zhuo (Heng Zhe Zhe Pie)
    "M20,65 Q40,85 90,85"   // Zhuo (Na)
  ],

  // --- Rule 7: Vào nhà trước đóng cửa sau ---
  "回": [
    "M20,20 L20,85",             // Outer Shu
    "M20,20 L85,20 L85,85",      // Outer Heng Zhe
    "M38,38 L38,65",             // Inner Shu
    "M38,38 L68,38 L68,65",      // Inner Heng Zhe
    "M38,65 L68,65",             // Inner Heng
    "M20,85 L85,85"              // Outer Close
  ],
  "国": [
    "M15,15 L15,90", // Wei (Shu)
    "M15,15 L85,15 L85,90", // Wei (Heng Zhe)
    "M35,35 L65,35", // Yu (Heng)
    "M35,50 L65,50", // Yu (Heng)
    "M50,35 L50,75", // Yu (Shu)
    "M60,60 L65,65", // Yu (Dian)
    "M25,80 L75,80", // Yu (Heng Bottom)
    "M15,90 L85,90"  // Wei (Close)
  ],
  "田": [
    "M20,20 L25,85", // Shu
    "M20,20 L80,20 L80,85", // Heng Zhe
    "M50,20 L50,85", // Shu (Mid)
    "M20,50 L80,50", // Heng (Mid)
    "M25,85 L80,85"  // Close
  ],
  "日": [
    "M25,20 L25,85", // Shu
    "M25,20 L75,20 L75,85", // Heng Zhe
    "M25,50 L75,50", // Heng (Mid)
    "M25,85 L75,85"  // Close
  ],
  
  // --- Common Radicals & Vocab ---
  "你": [
    "M30,20 L20,50", "M25,40 L25,85", "M45,25 Q55,25 60,30", 
    "M45,40 L75,40 L70,45", "M60,35 L60,80 L55,75", 
    "M45,55 L55,65", "M75,55 L85,65"
  ],
  "一": ["M10,50 L90,50"],
  "十": ["M20,50 L80,50", "M50,20 L50,80"],
  "八": ["M45,30 Q35,60 20,80", "M55,30 Q65,60 80,80"]
};

export const getStrokeData = (char: string): StrokeData | null => {
  const paths = charPaths[char];
  if (!paths) return null;
  return { char, paths };
};

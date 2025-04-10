// hexagramsData.js
export const hexagrams = [
  // Level 0 (θ = 0, 1 hexagram)
  {
    no: 1,
    number: "01",
    symbol: "䷀",
    traditionalChinese: "乾",
    pinyin: "qián",
    simplifiedChinese: "乾",
    english: "Initiating",
    lines: "111111",
    level: 0,
    theta: 0,
    phi: 0,
  },

  // Level 1 (θ = π/6, 6 hexagrams at 60°)
  {
    no: 43,
    number: "43",
    symbol: "䷪",
    traditionalChinese: "夬",
    pinyin: "guài",
    simplifiedChinese: "夬",
    english: "Eliminating",
    lines: "111110",
    level: 1,
    theta: Math.PI / 6,
    phi: 0,
  },
  {
    no: 44,
    number: "44",
    symbol: "䷫",
    traditionalChinese: "姤",
    pinyin: "gòu",
    simplifiedChinese: "姤",
    english: "Encountering",
    lines: "011111",
    level: 1,
    theta: Math.PI / 6,
    phi: Math.PI / 3,
  },
  {
    no: 13,
    number: "13",
    symbol: "䷌",
    traditionalChinese: "同人",
    pinyin: "tóng rén",
    simplifiedChinese: "同人",
    english: "Seeking Harmony",
    lines: "111101",
    level: 1,
    theta: Math.PI / 6,
    phi: (2 * Math.PI) / 3,
  },
  {
    no: 10,
    number: "10",
    symbol: "䷉",
    traditionalChinese: "履",
    pinyin: "lǚ",
    simplifiedChinese: "履",
    english: "Fulfillment",
    lines: "111011",
    level: 1,
    theta: Math.PI / 6,
    phi: Math.PI,
  },
  {
    no: 9,
    number: "09",
    symbol: "䷈",
    traditionalChinese: "小畜",
    pinyin: "xiǎo chù",
    simplifiedChinese: "小畜",
    english: "Little Accumulation",
    lines: "110111",
    level: 1,
    theta: Math.PI / 6,
    phi: (4 * Math.PI) / 3,
  },
  {
    no: 14,
    number: "14",
    symbol: "䷍",
    traditionalChinese: "大有",
    pinyin: "dà yǒu",
    simplifiedChinese: "大有",
    english: "Great Harvest",
    lines: "101111",
    level: 1,
    theta: Math.PI / 6,
    phi: (5 * Math.PI) / 3,
  },

  // Level 2 (θ = π/3, 12 outer at 30° + 3 inner)
  {
    no: 5,
    number: "05",
    symbol: "䷄",
    traditionalChinese: "需",
    pinyin: "xū",
    simplifiedChinese: "需",
    english: "Needing",
    lines: "010111",
    level: 2,
    theta: Math.PI / 3,
    phi: 0,
  },
  {
    no: 34,
    number: "34",
    symbol: "䷡",
    traditionalChinese: "大壯",
    pinyin: "dà zhuàng",
    simplifiedChinese: "大壮",
    english: "Great Strength",
    lines: "001111",
    level: 2,
    theta: Math.PI / 3,
    phi: Math.PI / 6,
  },
  {
    no: 50,
    number: "50",
    symbol: "䷱",
    traditionalChinese: "鼎",
    pinyin: "dǐng",
    simplifiedChinese: "鼎",
    english: "Establishing The New",
    lines: "101110",
    level: 2,
    theta: Math.PI / 3,
    phi: Math.PI / 3,
  },
  {
    no: 28,
    number: "28",
    symbol: "䷛",
    traditionalChinese: "大過",
    pinyin: "dà guò",
    simplifiedChinese: "大过",
    english: "Great Exceeding",
    lines: "011110",
    level: 2,
    theta: Math.PI / 3,
    phi: Math.PI / 2,
  },
  {
    no: 49,
    number: "49",
    symbol: "䷰",
    traditionalChinese: "革",
    pinyin: "gé",
    simplifiedChinese: "革",
    english: "Abolishing The Old",
    lines: "011101",
    level: 2,
    theta: Math.PI / 3,
    phi: (2 * Math.PI) / 3,
  },
  {
    no: 33,
    number: "33",
    symbol: "䷠",
    traditionalChinese: "遯",
    pinyin: "dùn",
    simplifiedChinese: "遯",
    english: "Retreat",
    lines: "111100",
    level: 2,
    theta: Math.PI / 3,
    phi: (5 * Math.PI) / 6,
  },
  {
    no: 6,
    number: "06",
    symbol: "䷅",
    traditionalChinese: "訟",
    pinyin: "sòng",
    simplifiedChinese: "讼",
    english: "Contention",
    lines: "111010",
    level: 2,
    theta: Math.PI / 3,
    phi: Math.PI,
  },
  {
    no: 25,
    number: "25",
    symbol: "䷘",
    traditionalChinese: "無妄",
    pinyin: "wú wàng",
    simplifiedChinese: "无妄",
    english: "Without Falsehood",
    lines: "111001",
    level: 2,
    theta: Math.PI / 3,
    phi: (7 * Math.PI) / 6,
  },
  {
    no: 37,
    number: "37",
    symbol: "䷤",
    traditionalChinese: "家人",
    pinyin: "jiā rén",
    simplifiedChinese: "家人",
    english: "Household",
    lines: "110101",
    level: 2,
    theta: Math.PI / 3,
    phi: (4 * Math.PI) / 3,
  },
  {
    no: 61,
    number: "61",
    symbol: "䷼",
    traditionalChinese: "中孚",
    pinyin: "zhōng fú",
    simplifiedChinese: "中孚",
    english: "Innermost Sincerity",
    lines: "110011",
    level: 2,
    theta: Math.PI / 3,
    phi: (3 * Math.PI) / 2,
  },
  {
    no: 38,
    number: "38",
    symbol: "䷥",
    traditionalChinese: "睽",
    pinyin: "kuí",
    simplifiedChinese: "睽",
    english: "Diversity",
    lines: "101011",
    level: 2,
    theta: Math.PI / 3,
    phi: (5 * Math.PI) / 3,
  },
  {
    no: 26,
    number: "26",
    symbol: "䷙",
    traditionalChinese: "大畜",
    pinyin: "dà chù",
    simplifiedChinese: "大畜",
    english: "Great Accumulation",
    lines: "100111",
    level: 2,
    theta: Math.PI / 3,
    phi: (11 * Math.PI) / 6,
  },
  // Inner circle (centered on main axis)
  {
    no: 30,
    number: "30",
    symbol: "䷝",
    traditionalChinese: "離",
    pinyin: "lí",
    simplifiedChinese: "离",
    english: "Brightness",
    lines: "101101",
    level: 2,
    theta: Math.PI / 3,
    phi: 0,
  },
  {
    no: 57,
    number: "57",
    symbol: "䷸",
    traditionalChinese: "巽",
    pinyin: "xùn",
    simplifiedChinese: "巽",
    english: "Proceeding Humbly",
    lines: "110110",
    level: 2,
    theta: Math.PI / 3,
    phi: Math.PI / 2,
  },
  {
    no: 58,
    number: "58",
    symbol: "䷹",
    traditionalChinese: "兌",
    pinyin: "duì",
    simplifiedChinese: "兑",
    english: "Joyful",
    lines: "011011",
    level: 2,
    theta: Math.PI / 3,
    phi: Math.PI,
  },

  // Level 3 (θ = π/2, 6 groups of 3 + 2 inner)
  {
    no: 54,
    number: "54",
    symbol: "䷵",
    traditionalChinese: "歸妹",
    pinyin: "guī mèi",
    simplifiedChinese: "归妹",
    english: "Marrying Maiden",
    lines: "001011",
    level: 3,
    theta: Math.PI / 2,
    phi: 0,
  },
  {
    no: 11,
    number: "11",
    symbol: "䷊",
    traditionalChinese: "泰",
    pinyin: "tài",
    simplifiedChinese: "泰",
    english: "Advance",
    lines: "000111",
    level: 3,
    theta: Math.PI / 2,
    phi: Math.PI / 12,
  },
  {
    no: 18,
    number: "18",
    symbol: "䷑",
    traditionalChinese: "蠱",
    pinyin: "gǔ",
    simplifiedChinese: "蛊",
    english: "Remedying",
    lines: "100110",
    level: 3,
    theta: Math.PI / 2,
    phi: Math.PI / 6,
  },
  {
    no: 48,
    number: "48",
    symbol: "䷯",
    traditionalChinese: "井",
    pinyin: "jǐng",
    simplifiedChinese: "井",
    english: "Replenishing",
    lines: "010110",
    level: 3,
    theta: Math.PI / 2,
    phi: Math.PI / 3,
  },
  {
    no: 32,
    number: "32",
    symbol: "䷟",
    traditionalChinese: "恆",
    pinyin: "héng",
    simplifiedChinese: "恒",
    english: "Long Lasting",
    lines: "001110",
    level: 3,
    theta: Math.PI / 2,
    phi: (5 * Math.PI) / 12,
  },
  {
    no: 55,
    number: "55",
    symbol: "䷶",
    traditionalChinese: "豐",
    pinyin: "fēng",
    simplifiedChinese: "丰",
    english: "Abundance",
    lines: "001101",
    level: 3,
    theta: Math.PI / 2,
    phi: Math.PI / 2,
  },
  {
    no: 47,
    number: "47",
    symbol: "䷮",
    traditionalChinese: "困",
    pinyin: "kùn",
    simplifiedChinese: "困",
    english: "Exhausting",
    lines: "011010",
    level: 3,
    theta: Math.PI / 2,
    phi: (2 * Math.PI) / 3,
  },
  {
    no: 31,
    number: "31",
    symbol: "䷞",
    traditionalChinese: "咸",
    pinyin: "xián",
    simplifiedChinese: "咸",
    english: "Mutual Influence",
    lines: "011100",
    level: 3,
    theta: Math.PI / 2,
    phi: (7 * Math.PI) / 12,
  },
  {
    no: 56,
    number: "56",
    symbol: "䷷",
    traditionalChinese: "旅",
    pinyin: "lǚ",
    simplifiedChinese: "旅",
    english: "Travelling",
    lines: "101100",
    level: 3,
    theta: Math.PI / 2,
    phi: (3 * Math.PI) / 4,
  },
  {
    no: 53,
    number: "53",
    symbol: "䷴",
    traditionalChinese: "漸",
    pinyin: "jiàn",
    simplifiedChinese: "渐",
    english: "Developing Gradually",
    lines: "110100",
    level: 3,
    theta: Math.PI / 2,
    phi: Math.PI,
  },
  {
    no: 12,
    number: "12",
    symbol: "䷋",
    traditionalChinese: "否",
    pinyin: "pǐ",
    simplifiedChinese: "否",
    english: "Hindrance",
    lines: "111000",
    level: 3,
    theta: Math.PI / 2,
    phi: (11 * Math.PI) / 12,
  },
  {
    no: 17,
    number: "17",
    symbol: "䷐",
    traditionalChinese: "隨",
    pinyin: "suí",
    simplifiedChinese: "随",
    english: "Following",
    lines: "011001",
    level: 3,
    theta: Math.PI / 2,
    phi: (7 * Math.PI) / 6,
  },
  {
    no: 21,
    number: "21",
    symbol: "䷔",
    traditionalChinese: "噬嗑",
    pinyin: "shì kè",
    simplifiedChinese: "噬嗑",
    english: "Eradicating",
    lines: "101001",
    level: 3,
    theta: Math.PI / 2,
    phi: (4 * Math.PI) / 3,
  },
  {
    no: 42,
    number: "42",
    symbol: "䷩",
    traditionalChinese: "益",
    pinyin: "yì",
    simplifiedChinese: "益",
    english: "Increasing",
    lines: "110001",
    level: 3,
    theta: Math.PI / 2,
    phi: (17 * Math.PI) / 12,
  },
  {
    no: 59,
    number: "59",
    symbol: "䷺",
    traditionalChinese: "渙",
    pinyin: "huàn",
    simplifiedChinese: "涣",
    english: "Dispersing",
    lines: "110010",
    level: 3,
    theta: Math.PI / 2,
    phi: (3 * Math.PI) / 2,
  },
  {
    no: 22,
    number: "22",
    symbol: "䷕",
    traditionalChinese: "賁",
    pinyin: "bì",
    simplifiedChinese: "贲",
    english: "Adorning",
    lines: "100101",
    level: 3,
    theta: Math.PI / 2,
    phi: (5 * Math.PI) / 3,
  },
  {
    no: 41,
    number: "41",
    symbol: "䷨",
    traditionalChinese: "損",
    pinyin: "sǔn",
    simplifiedChinese: "损",
    english: "Decreasing",
    lines: "100011",
    level: 3,
    theta: Math.PI / 2,
    phi: (19 * Math.PI) / 12,
  },
  {
    no: 60,
    number: "60",
    symbol: "䷻",
    traditionalChinese: "節",
    pinyin: "jié",
    simplifiedChinese: "节",
    english: "Restricting",
    lines: "010011",
    level: 3,
    theta: Math.PI / 2,
    phi: (11 * Math.PI) / 6,
  },
  // Inner circle
  {
    no: 63,
    number: "63",
    symbol: "䷾",
    traditionalChinese: "既濟",
    pinyin: "jì jì",
    simplifiedChinese: "既济",
    english: "Already Fulfilled",
    lines: "010101",
    level: 3,
    theta: Math.PI / 2,
    phi: 0,
  },
  {
    no: 64,
    number: "64",
    symbol: "䷿",
    traditionalChinese: "未濟",
    pinyin: "wèi jì",
    simplifiedChinese: "未济",
    english: "Not Yet Fulfilled",
    lines: "101010",
    level: 3,
    theta: Math.PI / 2,
    phi: Math.PI,
  },

  // Level 4 (θ = 2π/3, 12 outer at 30° + 3 inner)
  {
    no: 36,
    number: "36",
    symbol: "䷣",
    traditionalChinese: "明夷",
    pinyin: "míng yí",
    simplifiedChinese: "明夷",
    english: "Brilliance Injured",
    lines: "000101",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: 0,
  },
  {
    no: 46,
    number: "46",
    symbol: "䷭",
    traditionalChinese: "升",
    pinyin: "shēng",
    simplifiedChinese: "升",
    english: "Growing Upward",
    lines: "000110",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: Math.PI / 6,
  },
  {
    no: 40,
    number: "40",
    symbol: "䷧",
    traditionalChinese: "解",
    pinyin: "xiè",
    simplifiedChinese: "解",
    english: "Relief",
    lines: "001010",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: Math.PI / 3,
  },
  {
    no: 62,
    number: "62",
    symbol: "䷽",
    traditionalChinese: "小過",
    pinyin: "xiǎo guò",
    simplifiedChinese: "小过",
    english: "Little Exceeding",
    lines: "001100",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: Math.PI / 2,
  },
  {
    no: 39,
    number: "39",
    symbol: "䷦",
    traditionalChinese: "蹇",
    pinyin: "jiǎn",
    simplifiedChinese: "蹇",
    english: "Hardship",
    lines: "010100",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: (2 * Math.PI) / 3,
  },
  {
    no: 45,
    number: "45",
    symbol: "䷬",
    traditionalChinese: "萃",
    pinyin: "cuì",
    simplifiedChinese: "萃",
    english: "Bringing Together",
    lines: "011000",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: (5 * Math.PI) / 6,
  },
  {
    no: 35,
    number: "35",
    symbol: "䷢",
    traditionalChinese: "晉",
    pinyin: "jìn",
    simplifiedChinese: "晋",
    english: "Proceeding Forward",
    lines: "101000",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: Math.PI,
  },
  {
    no: 20,
    number: "20",
    symbol: "䷓",
    traditionalChinese: "觀",
    pinyin: "guān",
    simplifiedChinese: "观",
    english: "Watching",
    lines: "110000",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: (7 * Math.PI) / 6,
  },
  {
    no: 3,
    number: "03",
    symbol: "䷂",
    traditionalChinese: "屯",
    pinyin: "zhūn",
    simplifiedChinese: "屯",
    english: "Beginning",
    lines: "010001",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: (4 * Math.PI) / 3,
  },
  {
    no: 27,
    number: "27",
    symbol: "䷚",
    traditionalChinese: "頤",
    pinyin: "yí",
    simplifiedChinese: "颐",
    english: "Nourishing",
    lines: "100001",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: (3 * Math.PI) / 2,
  },
  {
    no: 4,
    number: "04",
    symbol: "䷃",
    traditionalChinese: "蒙",
    pinyin: "méng",
    simplifiedChinese: "蒙",
    english: "Childhood",
    lines: "100010",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: (5 * Math.PI) / 3,
  },
  {
    no: 19,
    number: "19",
    symbol: "䷒",
    traditionalChinese: "臨",
    pinyin: "lín",
    simplifiedChinese: "临",
    english: "Approaching",
    lines: "000011",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: (11 * Math.PI) / 6,
  },
  // Inner circle
  {
    no: 29,
    number: "29",
    symbol: "䷜",
    traditionalChinese: "坎",
    pinyin: "kǎn",
    simplifiedChinese: "坎",
    english: "Darkness",
    lines: "010010",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: 0,
  },
  {
    no: 51,
    number: "51",
    symbol: "䷲",
    traditionalChinese: "震",
    pinyin: "zhèn",
    simplifiedChinese: "震",
    english: "Taking Action",
    lines: "001001",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: Math.PI / 2,
  },
  {
    no: 52,
    number: "52",
    symbol: "䷳",
    traditionalChinese: "艮",
    pinyin: "gèn",
    simplifiedChinese: "艮",
    english: "Keeping Still",
    lines: "100100",
    level: 4,
    theta: (2 * Math.PI) / 3,
    phi: Math.PI,
  },

  // Level 5 (θ = 5π/6, 6 hexagrams at 60°)
  {
    no: 7,
    number: "07",
    symbol: "䷆",
    traditionalChinese: "師",
    pinyin: "shī",
    simplifiedChinese: "师",
    english: "Multitude",
    lines: "000010",
    level: 5,
    theta: (5 * Math.PI) / 6,
    phi: 0,
  },
  {
    no: 15,
    number: "15",
    symbol: "䷎",
    traditionalChinese: "謙",
    pinyin: "qiān",
    simplifiedChinese: "谦",
    english: "Humbleness",
    lines: "000100",
    level: 5,
    theta: (5 * Math.PI) / 6,
    phi: Math.PI / 3,
  },
  {
    no: 16,
    number: "16",
    symbol: "䷏",
    traditionalChinese: "豫",
    pinyin: "yù",
    simplifiedChinese: "豫",
    english: "Delight",
    lines: "001000",
    level: 5,
    theta: (5 * Math.PI) / 6,
    phi: (2 * Math.PI) / 3,
  },
  {
    no: 8,
    number: "08",
    symbol: "䷇",
    traditionalChinese: "比",
    pinyin: "bǐ",
    simplifiedChinese: "比",
    english: "Union",
    lines: "010000",
    level: 5,
    theta: (5 * Math.PI) / 6,
    phi: Math.PI,
  },
  {
    no: 23,
    number: "23",
    symbol: "䷖",
    traditionalChinese: "剝",
    pinyin: "bō",
    simplifiedChinese: "剥",
    english: "Falling Away",
    lines: "100000",
    level: 5,
    theta: (5 * Math.PI) / 6,
    phi: (4 * Math.PI) / 3,
  },
  {
    no: 24,
    number: "24",
    symbol: "䷗",
    traditionalChinese: "復",
    pinyin: "fù",
    simplifiedChinese: "复",
    english: "Turning Back",
    lines: "000001",
    level: 5,
    theta: (5 * Math.PI) / 6,
    phi: (5 * Math.PI) / 3,
  },

  // Level 6 (θ = π, 1 hexagram)
  {
    no: 2,
    number: "02",
    symbol: "䷁",
    traditionalChinese: "坤",
    pinyin: "kūn",
    simplifiedChinese: "坤",
    english: "Responding",
    lines: "000000",
    level: 6,
    theta: Math.PI,
    phi: 0,
  },
];

export const paths = [
  { from: 2, to: 24 }, // Receptive (000000) to Return (000001)
  //{ from: 2, to: 7 }, // Receptive (000000) to The Army (000010)
  //{ from: 1, to: 14 }, // The Creative (111111) to Possession in Great Measure (111101)
  { from: 1, to: 43 }, // The Creative (111111) to Breakthrough (111110)
  //{ from: 12, to: 45 }, // Standstill (000111) to Gathering Together (000110)
  //{ from: 50, to: 56 }, // The Cauldron (101011) to The Wanderer (101100)
];

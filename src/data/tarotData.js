// 22张大阿尔卡纳塔罗牌数据
export const TAROT_CARDS = [
  {
    id: 0,
    name: "愚者",
    nameEn: "The Fool",
    emoji: "🃏",
    keywords: ["新开始", "冒险", "自由", "天真"],
    upright: {
      meaning: "新的开始、自由的精神、天真无邪、勇于冒险",
      description:
        "愚者代表着人生旅程的起点，象征着纯真、自发和对未知的探索。现在是展开新冒险的好时机，放下顾虑，跟随内心的召唤。",
    },
    reversed: {
      meaning: "鲁莽、缺乏计划、逃避责任、愚蠢的决定",
      description:
        "逆位的愚者提醒你需要更加谨慎。虽然冒险精神可贵，但也要考虑后果，避免因冲动而做出错误的决定。",
    },
  },
  {
    id: 1,
    name: "魔术师",
    nameEn: "The Magician",
    emoji: "🎩",
    keywords: ["创造力", "技能", "意志力", "行动"],
    upright: {
      meaning: "创造力、技能、意志力、将想法变为现实",
      description:
        "魔术师象征着你拥有实现目标所需的所有工具和能力。现在是发挥才能、采取行动的最佳时机。相信自己，你可以将梦想变为现实。",
    },
    reversed: {
      meaning: "操纵、欺骗、缺乏能力、浪费才能",
      description:
        "逆位的魔术师警告你可能在滥用自己的才能，或者受到他人的操纵。需要重新审视自己的动机和方法。",
    },
  },
  {
    id: 2,
    name: "女祭司",
    nameEn: "The High Priestess",
    emoji: "🌙",
    keywords: ["直觉", "神秘", "潜意识", "智慧"],
    upright: {
      meaning: "直觉、内在智慧、神秘知识、潜意识",
      description:
        "女祭司代表着内在的智慧和直觉。她提醒你倾听内心的声音，相信你的第六感。答案可能藏在表面之下，需要静心聆听。",
    },
    reversed: {
      meaning: "忽视直觉、表面化、情绪失控、秘密",
      description:
        "逆位的女祭司表示你可能忽略了内心的声音，过分依赖理性思考。或者有隐藏的信息尚未揭示。",
    },
  },
  {
    id: 3,
    name: "皇后",
    nameEn: "The Empress",
    emoji: "👑",
    keywords: ["丰饶", "滋养", "创造", "自然"],
    upright: {
      meaning: "丰饶、滋养、创造、母性、自然之美",
      description:
        "皇后象征着丰饶和创造力。她代表着培育、关怀和物质上的富足。现在是培养关系、享受生活的好时机。",
    },
    reversed: {
      meaning: "依赖、空虚、过度保护、创造力阻塞",
      description:
        "逆位的皇后可能表示过度依赖或创造力受阻。需要找回自我价值，平衡给予和接受。",
    },
  },
  {
    id: 4,
    name: "皇帝",
    nameEn: "The Emperor",
    emoji: "🏛️",
    keywords: ["权威", "结构", "控制", "领导"],
    upright: {
      meaning: "权威、结构、控制、父性、领导力",
      description:
        "皇帝代表着秩序、权威和稳定。他鼓励你建立结构，发挥领导力，用理性和纪律达成目标。",
    },
    reversed: {
      meaning: "专制、僵化、缺乏纪律、滥用权力",
      description:
        "逆位的皇帝警告可能存在过度控制或滥用权力的情况。需要在权威和灵活性之间找到平衡。",
    },
  },
  {
    id: 5,
    name: "教皇",
    nameEn: "The Hierophant",
    emoji: "📿",
    keywords: ["传统", "教导", "信仰", "道德"],
    upright: {
      meaning: "传统、教导、信仰、道德准则、寻求指引",
      description:
        "教皇象征着传统智慧和精神指引。他提示你向传统、导师或信仰体系寻求答案，尊重既定的规则。",
    },
    reversed: {
      meaning: "叛逆、打破传统、质疑信仰、不合群",
      description:
        "逆位的教皇表示你可能在挑战传统或寻找自己的道路。这可能是自我发现的时期，但要小心不要完全抛弃有价值的传统。",
    },
  },
  {
    id: 6,
    name: "恋人",
    nameEn: "The Lovers",
    emoji: "💕",
    keywords: ["爱情", "选择", "和谐", "价值观"],
    upright: {
      meaning: "爱情、和谐、选择、价值观一致、完美结合",
      description:
        "恋人牌代表着深刻的连接和重要的选择。这可能关于爱情关系，也可能关于人生中的重大决定。选择符合你价值观的道路。",
    },
    reversed: {
      meaning: "不和谐、错误选择、价值观冲突、缺乏承诺",
      description:
        "逆位的恋人暗示关系中的不和谐或价值观冲突。可能需要重新评估你的选择和优先事项。",
    },
  },
  {
    id: 7,
    name: "战车",
    nameEn: "The Chariot",
    emoji: "🏹",
    keywords: ["胜利", "决心", "控制", "前进"],
    upright: {
      meaning: "胜利、决心、意志力、控制、克服障碍",
      description:
        "战车象征着通过决心和自律获得的胜利。你正朝着目标前进，需要保持专注和控制，克服路上的障碍。",
    },
    reversed: {
      meaning: "失控、缺乏方向、侵略性、被动",
      description:
        "逆位的战车表示失去控制或方向不明。需要重新找回平衡，明确目标，避免盲目前进。",
    },
  },
  {
    id: 8,
    name: "力量",
    nameEn: "Strength",
    emoji: "🦁",
    keywords: ["勇气", "耐心", "温柔", "控制"],
    upright: {
      meaning: "内在力量、勇气、耐心、温柔的控制、驯服本能",
      description:
        "力量牌代表着内在的勇气和温柔的力量。真正的力量来自于自我控制和慈悲，而非暴力。用爱和耐心面对挑战。",
    },
    reversed: {
      meaning: "自我怀疑、软弱、缺乏自信、失控",
      description:
        "逆位的力量表示自我怀疑或失去控制。需要重新找回内在的勇气和自信，克服恐惧。",
    },
  },
  {
    id: 9,
    name: "隐士",
    nameEn: "The Hermit",
    emoji: "🕯️",
    keywords: ["内省", "孤独", "寻找", "智慧"],
    upright: {
      meaning: "内省、独处、寻找真理、内在指引、智慧",
      description:
        "隐士象征着通过独处和内省寻找真理的过程。现在需要退后一步，倾听内心的声音，寻找自己的道路。",
    },
    reversed: {
      meaning: "孤立、逃避、拒绝帮助、迷失",
      description:
        "逆位的隐士可能表示过度孤立或逃避现实。虽然独处重要，但也不要完全与世隔绝。",
    },
  },
  {
    id: 10,
    name: "命运之轮",
    nameEn: "Wheel of Fortune",
    emoji: "🎡",
    keywords: ["命运", "变化", "循环", "转折点"],
    upright: {
      meaning: "好运、变化、循环、命运的转折点、新机会",
      description:
        "命运之轮代表着生命的循环和变化。好运即将来临，或者人生即将迎来重大转折。拥抱变化，顺应潮流。",
    },
    reversed: {
      meaning: "厄运、抗拒变化、失控、坏循环",
      description:
        "逆位的命运之轮警告可能陷入负面循环或抗拒必要的变化。需要接受改变，打破旧模式。",
    },
  },
  {
    id: 11,
    name: "正义",
    nameEn: "Justice",
    emoji: "⚖️",
    keywords: ["公平", "真相", "法律", "因果"],
    upright: {
      meaning: "公平、真相、法律、因果报应、责任",
      description:
        "正义牌代表着公平和真相。你的行为会得到相应的回报。现在是面对真相、承担责任的时候。",
    },
    reversed: {
      meaning: "不公、偏见、逃避责任、腐败",
      description:
        "逆位的正义表示不公平对待或逃避责任。需要正视问题，寻求公正的解决方案。",
    },
  },
  {
    id: 12,
    name: "倒吊人",
    nameEn: "The Hanged Man",
    emoji: "🙃",
    keywords: ["牺牲", "放手", "新视角", "等待"],
    upright: {
      meaning: "牺牲、放手、新视角、暂停、顿悟",
      description:
        "倒吊人象征着通过放手和改变视角获得的智慧。有时需要暂停、等待，从不同角度看待问题。",
    },
    reversed: {
      meaning: "无谓牺牲、拖延、抗拒、停滞",
      description:
        "逆位的倒吊人表示无意义的牺牲或过度拖延。是时候采取行动，而不是继续等待。",
    },
  },
  {
    id: 13,
    name: "死神",
    nameEn: "Death",
    emoji: "💀",
    keywords: ["结束", "转变", "重生", "放下"],
    upright: {
      meaning: "结束、转变、重生、放下过去、新开始",
      description:
        "死神牌代表着重大的转变和结束。虽然令人不安，但结束是新开始的必要条件。放下过去，拥抱转变。",
    },
    reversed: {
      meaning: "抗拒改变、无法放手、停滞、恐惧",
      description:
        "逆位的死神表示抗拒必要的改变或无法放下过去。需要接受转变，让旧事物自然结束。",
    },
  },
  {
    id: 14,
    name: "节制",
    nameEn: "Temperance",
    emoji: "🧘",
    keywords: ["平衡", "耐心", "调和", "中庸"],
    upright: {
      meaning: "平衡、耐心、调和、中庸之道、和谐",
      description:
        "节制牌象征着平衡和和谐。现在需要保持耐心，在各种力量之间寻找平衡，避免极端。",
    },
    reversed: {
      meaning: "失衡、过度、缺乏耐心、极端",
      description:
        "逆位的节制警告生活失去平衡或走向极端。需要找回中心，恢复和谐。",
    },
  },
  {
    id: 15,
    name: "恶魔",
    nameEn: "The Devil",
    emoji: "😈",
    keywords: ["束缚", "诱惑", "瘾症", "物质"],
    upright: {
      meaning: "束缚、诱惑、瘾症、物质主义、自我限制",
      description:
        "恶魔牌代表着束缚和诱惑。你可能被物质欲望、成瘾或不健康的关系所困。意识到这些束缚是解脱的第一步。",
    },
    reversed: {
      meaning: "解放、打破枷锁、克服瘾症、重获自由",
      description:
        "逆位的恶魔表示从束缚中解脱。你正在认识到自己的局限，并采取措施重获自由。",
    },
  },
  {
    id: 16,
    name: "塔",
    nameEn: "The Tower",
    emoji: "🏰",
    keywords: ["突变", "崩塌", "启示", "解放"],
    upright: {
      meaning: "突然的变化、崩溃、启示、破坏性的变革",
      description:
        "塔牌代表着突然而剧烈的变化。虽然令人不安，但这种破坏是必要的，它会清除虚假的基础，带来真相。",
    },
    reversed: {
      meaning: "逃避灾难、延迟不可避免、恐惧改变",
      description:
        "逆位的塔表示延迟或逃避必要的变革。虽然可怕，但面对真相比逃避更好。",
    },
  },
  {
    id: 17,
    name: "星星",
    nameEn: "The Star",
    emoji: "⭐",
    keywords: ["希望", "灵感", "治愈", "平静"],
    upright: {
      meaning: "希望、灵感、平静、治愈、乐观",
      description:
        "星星牌象征着希望和治愈。经历黑暗后，光明即将来临。保持信念，灵感和平静正在路上。",
    },
    reversed: {
      meaning: "失去信心、绝望、缺乏灵感、负面",
      description:
        "逆位的星星表示失去希望或信心。需要重新连接内在的光芒，找回乐观的态度。",
    },
  },
  {
    id: 18,
    name: "月亮",
    nameEn: "The Moon",
    emoji: "🌙",
    keywords: ["幻觉", "直觉", "恐惧", "潜意识"],
    upright: {
      meaning: "幻觉、不确定、直觉、潜意识、恐惧",
      description:
        "月亮牌代表着幻觉和不确定性。事情可能不如表面那样，需要信任直觉，面对潜意识中的恐惧。",
    },
    reversed: {
      meaning: "释放恐惧、真相揭示、克服焦虑",
      description:
        "逆位的月亮表示恐惧正在消散，真相逐渐清晰。你正在从困惑中走出。",
    },
  },
  {
    id: 19,
    name: "太阳",
    nameEn: "The Sun",
    emoji: "☀️",
    keywords: ["成功", "喜悦", "活力", "幸福"],
    upright: {
      meaning: "成功、喜悦、活力、积极、幸福",
      description:
        "太阳牌象征着成功和喜悦。一切都在朝着正确的方向发展，享受这段幸福和成功的时光吧。",
    },
    reversed: {
      meaning: "暂时困难、延迟的成功、缺乏热情",
      description:
        "逆位的太阳表示暂时的困难或延迟。但光明依然存在，只是暂时被遮蔽。",
    },
  },
  {
    id: 20,
    name: "审判",
    nameEn: "Judgement",
    emoji: "📯",
    keywords: ["觉醒", "反思", "决定", "重生"],
    upright: {
      meaning: "觉醒、反思、决定、宽恕、重生",
      description:
        "审判牌代表着觉醒和重大决定的时刻。反思过去，做出重要决定，准备新的篇章。",
    },
    reversed: {
      meaning: "自我怀疑、逃避责任、缺乏自我认识",
      description:
        "逆位的审判表示逃避自我反思或拒绝做出决定。需要诚实面对自己，承担责任。",
    },
  },
  {
    id: 21,
    name: "世界",
    nameEn: "The World",
    emoji: "🌍",
    keywords: ["完成", "成就", "圆满", "整合"],
    upright: {
      meaning: "完成、成就、圆满、完整、成功",
      description:
        "世界牌象征着一个周期的完成和成就。你已经达到了目标，享受这份成就感，准备开始新的旅程。",
    },
    reversed: {
      meaning: "未完成、缺乏结束、停滞、寻找目标",
      description:
        "逆位的世界表示事情尚未完成或缺少结束感。需要找到阻碍完成的原因，继续前进。",
    },
  },
];

// 占卜类型
export const DIVINATION_TYPES = [
  {
    id: "daily",
    name: "每日运势",
    description: "抽取一张牌，了解今日指引",
    cardCount: 1,
  },
  {
    id: "three",
    name: "三牌占卜",
    description: "过去-现在-未来",
    cardCount: 3,
    positions: ["过去", "现在", "未来"],
  },
  {
    id: "love",
    name: "情感占卜",
    description: "了解你的感情状况",
    cardCount: 3,
    positions: ["你", "对方", "关系"],
  },
  {
    id: "career",
    name: "事业占卜",
    description: "探索职业发展方向",
    cardCount: 3,
    positions: ["现状", "挑战", "建议"],
  },
];

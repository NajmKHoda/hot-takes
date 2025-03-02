export interface Debate {
  id: string
  title: string
  summary: string
  topic: string
  messages: {
    id: string
    userId: string
    content: string
    timestamp: Date
  }[]
  likes: number
  comments: number
  createdAt: Date
}

export const mockDebates: Debate[] = [
  {
    id: "1",
    title: "are NFTs actually valuable or just a trend?",
    summary: "The debate centers on whether NFTs represent genuine value or are merely a passing trend. One participant argues that NFTs create artificial scarcity in digital assets with no inherent value, while the other contends they represent a legitimate evolution of ownership in the digital age.",
    topic: "cryptocurrency",
    messages: [
      {
        id: "1-msg1",
        userId: "user1",
        content: "NFTs represent a revolutionary way to establish ownership and scarcity in digital assets. This is something that wasn't possible before blockchain technology.",
        timestamp: new Date(2025, 1, 28, 14, 30)
      },
      {
        id: "1-msg2",
        userId: "user2",
        content: "But most NFTs have no inherent value. You're buying a receipt that points to an easily copyable digital file. The scarcity is completely artificial.",
        timestamp: new Date(2025, 1, 28, 14, 32)
      }
    ],
    likes: 237,
    comments: 48,
    createdAt: new Date(2025, 1, 28, 14, 30)
  },
  {
    id: "2",
    title: "is remote work more productive than traditional office work?",
    summary: "The debate explores productivity differences between remote and traditional office work. One participant argues remote work increases productivity through flexibility and reduced commute stress, while the other believes in-person collaboration provides better communication and stronger work culture.",
    topic: "work",
    messages: [
      {
        id: "2-msg1",
        userId: "user3",
        content: "Remote work eliminates commuting stress and allows for a better work-life balance, leading to higher productivity.",
        timestamp: new Date(2025, 2, 1, 9, 15)
      },
      {
        id: "2-msg2",
        userId: "user4",
        content: "But in-person collaboration fosters creativity and stronger team bonds that can't be replicated through Zoom calls.",
        timestamp: new Date(2025, 2, 1, 9, 18)
      }
    ],
    likes: 342,
    comments: 67,
    createdAt: new Date(2025, 2, 1, 9, 15)
  },
  {
    id: "3",
    title: "does AI art threaten human creativity?",
    summary: "This debate addresses whether AI art tools represent a threat to human creativity and the art world. One side argues AI merely automates technical aspects while humans retain creative direction, while the other contends AI devalues human artistic skill and threatens artists' livelihoods.",
    topic: "artificial intelligence",
    messages: [
      {
        id: "3-msg1",
        userId: "user5",
        content: "AI art tools are just new mediums that expand creative possibilities. They don't replace human creativity, they enhance it.",
        timestamp: new Date(2025, 2, 2, 16, 45)
      },
      {
        id: "3-msg2",
        userId: "user6",
        content: "But these tools are trained on human artists' work without compensation, and they're already taking jobs away from illustrators and concept artists.",
        timestamp: new Date(2025, 2, 2, 16, 48)
      }
    ],
    likes: 518,
    comments: 94,
    createdAt: new Date(2025, 2, 2, 16, 45)
  },
  {
    id: "4",
    title: "is cryptocurrency the future of money?",
    summary: "The debate focuses on whether cryptocurrency will become the dominant form of money. One participant argues crypto solves problems with traditional banking and offers better financial sovereignty, while the other points to volatility, environmental concerns, and regulatory challenges.",
    topic: "cryptocurrency",
    messages: [
      {
        id: "4-msg1",
        userId: "user7",
        content: "Cryptocurrency solves fundamental problems with traditional banking - inflation, censorship, and exclusion. It's inevitable that it becomes the global standard for money.",
        timestamp: new Date(2025, 1, 25, 10, 20)
      },
      {
        id: "4-msg2",
        userId: "user8",
        content: "The volatility alone makes crypto unsuitable as everyday currency. Not to mention the environmental impact, regulatory challenges, and scaling problems.",
        timestamp: new Date(2025, 1, 25, 10, 23)
      }
    ],
    likes: 426,
    comments: 83,
    createdAt: new Date(2025, 1, 25, 10, 20)
  },
  {
    id: "5",
    title: "should social media platforms be regulated like utilities?",
    summary: "This debate considers whether major social media platforms should be regulated as public utilities. One side argues their essential role in modern communication warrants regulation to ensure fairness and reduce harm, while the other contends government regulation would stifle innovation and potentially enable censorship.",
    topic: "technology",
    messages: [
      {
        id: "5-msg1",
        userId: "user9",
        content: "Social media has become essential infrastructure for modern communication. When private companies have this much influence over public discourse, they need to be regulated like utilities.",
        timestamp: new Date(2025, 2, 1, 13, 10)
      },
      {
        id: "5-msg2",
        userId: "user10",
        content: "Government regulation would stifle innovation and potentially enable censorship. The solution is more competition, not treating these platforms as utilities.",
        timestamp: new Date(2025, 2, 1, 13, 14)
      }
    ],
    likes: 387,
    comments: 79,
    createdAt: new Date(2025, 2, 1, 13, 10)
  },
  {
    id: "6",
    title: "is vegetarianism the most ethical diet?",
    summary: "The debate examines whether vegetarianism represents the most ethical dietary choice. One participant argues vegetarianism minimizes animal suffering and environmental impact, while the other suggests ethical considerations are more nuanced, involving cultural, economic, and health factors beyond animal welfare.",
    topic: "food",
    messages: [
      {
        id: "6-msg1",
        userId: "user11",
        content: "A vegetarian diet minimizes animal suffering while also reducing our environmental footprint. It's clearly the most ethical choice for most people in developed countries.",
        timestamp: new Date(2025, 2, 2, 19, 30)
      },
      {
        id: "6-msg2",
        userId: "user12",
        content: "Ethics aren't so simple. Food choices involve culture, economics, health, and sustainability. In some regions, limited plant agriculture means animal products are more sustainable.",
        timestamp: new Date(2025, 2, 2, 19, 34)
      }
    ],
    likes: 293,
    comments: 65,
    createdAt: new Date(2025, 2, 2, 19, 30)
  },
  {
    id: "7",
    title: "should college be free for all students?",
    summary: "This debate centers on whether higher education should be provided free of charge. One side argues free college would increase access to education and social mobility while reducing student debt, while the other contends it would be financially unsustainable and potentially devalue degrees.",
    topic: "education",
    messages: [
      {
        id: "7-msg1",
        userId: "user13",
        content: "Free college education would dramatically increase social mobility and reduce inequality while eliminating the burden of student debt that's crushing an entire generation.",
        timestamp: new Date(2025, 1, 29, 14, 15)
      },
      {
        id: "7-msg2",
        userId: "user14",
        content: "But the enormous cost would have to be paid somehow, likely through higher taxes. And when something is free, it often becomes devalued, potentially reducing the quality of education.",
        timestamp: new Date(2025, 1, 29, 14, 20)
      }
    ],
    likes: 412,
    comments: 76,
    createdAt: new Date(2025, 1, 29, 14, 15)
  },
  {
    id: "8",
    title: "is space exploration worth the cost?",
    summary: "The debate discusses whether the substantial financial investment in space exploration is justified. One participant emphasizes technological innovations, scientific discoveries, and humanity's future, while the other argues these resources could better address immediate problems on Earth.",
    topic: "science",
    messages: [
      {
        id: "8-msg1",
        userId: "user15",
        content: "Space exploration drives technological innovation and scientific discovery while securing humanity's future. The ROI on space programs is actually incredible when you look at spinoff technologies.",
        timestamp: new Date(2025, 1, 26, 11, 45)
      },
      {
        id: "8-msg2",
        userId: "user16",
        content: "But we have urgent problems right here on Earth - climate change, poverty, disease. Wouldn't those billions be better spent addressing these immediate challenges?",
        timestamp: new Date(2025, 1, 26, 11, 51)
      }
    ],
    likes: 374,
    comments: 88,
    createdAt: new Date(2025, 1, 26, 11, 45)
  }
];

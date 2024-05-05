import { Article, Topic } from "@/api/types";

const topics: { [key: string]: Topic } = {
  Tech: { name: "Tech", id: 1 },
  Politics: { name: "Politics", id: 2 },
  Sports: { name: "Sports", id: 3 },
  Money: { name: "Money", id: 4 },
};
const articles: Article[] = [
  {
    id: 1,
    topics: [topics["Tech"]],
    title: "Election Reforms: A New Dawn",
    content:
      "As nations around the globe tighten their belts, political landscapes are undergoing significant transformations. From election reforms to diplomatic strategies, the implications of these changes ripple through societies. Experts argue that the adoption of digital platforms in legislative processes could enhance transparency and citizen engagement. However, the digital divide remains a formidable barrier. Meanwhile, environmental policies are gaining traction, reflecting a global shift towards sustainability. The question remains: Are we witnessing the dawn of a new political era or merely the cyclical nature of governance?",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 2,
    topics: [topics["Money"]],
    title: "Investing in Green Energy",
    content:
      "The financial sector is witnessing unprecedented changes, with cryptocurrency leading the charge towards a digital economy. Meanwhile, the stock market shows signs of recovery, buoyed by investor confidence and governmental stimulus packages. As the world grapples with the post-pandemic economic landscape, green energy emerges as a lucrative investment avenue, promising long-term benefits and sustainability. The real estate market, however, faces a digital transformation challenge, balancing traditional practices with the convenience and reach of online platforms. These dynamics offer a glimpse into the future of finance, marked by innovation and adaptation.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 3,
    topics: [topics["Sports"]],
    title: "Fitness Trends Shaping the Future",
    content:
      "As the world gears up for the 2024 Olympics, expectations soar, highlighting the event's significance in fostering global unity and showcasing athletic excellence. Concurrently, eSports continue to rise, challenging traditional notions of sports and entertainment. The spotlight also shines on women athletes who are breaking barriers and setting new records, symbolizing progress and empowerment. Behind the scenes, the financial intricacies of hosting mega-sports events are brought to light, revealing a complex web of investments, sponsorships, and economic impacts. Meanwhile, evolving fitness trends reflect society's growing emphasis on health and well-being.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 4,
    topics: [topics["Tech"]],
    title: "Cybersecurity in the 5G Era",
    content:
      "The tech industry is at the forefront of innovation, with artificial intelligence (AI) leading the charge. As AI technologies evolve, they promise to transform everyday life, yet skeptics question their ethical implications. Cybersecurity becomes increasingly critical in the 5G era, with new challenges and opportunities for protection. The future of work is being reshaped by remote and hybrid models, spurred by the pandemic's lasting effects. In the realm of renewable energy, technological advancements offer hope for sustainable solutions. Meanwhile, virtual reality (VR) continues to push the boundaries of digital experiences, promising unprecedented levels of immersion and interaction.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 5,
    topics: [topics["Politics"]],
    title: "Global Summits and Local Impacts",
    content:
      "As nations around the globe tighten their belts, political landscapes are undergoing significant transformations. From election reforms to diplomatic strategies, the implications of these changes ripple through societies. Experts argue that the adoption of digital platforms in legislative processes could enhance transparency and citizen engagement. However, the digital divide remains a formidable barrier. Meanwhile, environmental policies are gaining traction, reflecting a global shift towards sustainability. The question remains: Are we witnessing the dawn of a new political era or merely the cyclical nature of governance? This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 6,
    topics: [topics["Money"]],
    title: "Cryptocurrency: The Future of Finance",
    content:
      "The financial sector is witnessing unprecedented changes, with cryptocurrency leading the charge towards a digital economy. Meanwhile, the stock market shows signs of recovery, buoyed by investor confidence and governmental stimulus packages. As the world grapples with the post-pandemic economic landscape, green energy emerges as a lucrative investment avenue, promising long-term benefits and sustainability. The real estate market, however, faces a digital transformation challenge, balancing traditional practices with the convenience and reach of online platforms. These dynamics offer a glimpse into the future of finance, marked by innovation and adaptation. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 7,
    topics: [topics["Sports"]],
    title: "Olympics 2024: What to Expect",
    content:
      "As the world gears up for the 2024 Olympics, expectations soar, highlighting the event's significance in fostering global unity and showcasing athletic excellence. Concurrently, eSports continue to rise, challenging traditional notions of sports and entertainment. The spotlight also shines on women athletes who are breaking barriers and setting new records, symbolizing progress and empowerment. Behind the scenes, the financial intricacies of hosting mega-sports events are brought to light, revealing a complex web of investments, sponsorships, and economic impacts. Meanwhile, evolving fitness trends reflect society's growing emphasis on health and well-being. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 8,
    topics: [topics["Tech"]],
    title: "AI Revolution: Beyond the Hype",
    content:
      "The tech industry is at the forefront of innovation, with artificial intelligence (AI) leading the charge. As AI technologies evolve, they promise to transform everyday life, yet skeptics question their ethical implications. Cybersecurity becomes increasingly critical in the 5G era, with new challenges and opportunities for protection. The future of work is being reshaped by remote and hybrid models, spurred by the pandemic's lasting effects. In the realm of renewable energy, technological advancements offer hope for sustainable solutions. Meanwhile, virtual reality (VR) continues to push the boundaries of digital experiences, promising unprecedented levels of immersion and interaction. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 9,
    topics: [topics["Politics"]],
    title: "Legislative Changes in Digital Era",
    content:
      "As nations around the globe tighten their belts, political landscapes are undergoing significant transformations. From election reforms to diplomatic strategies, the implications of these changes ripple through societies. Experts argue that the adoption of digital platforms in legislative processes could enhance transparency and citizen engagement. However, the digital divide remains a formidable barrier. Meanwhile, environmental policies are gaining traction, reflecting a global shift towards sustainability. The question remains: Are we witnessing the dawn of a new political era or merely the cyclical nature of governance? This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 10,
    topics: [topics["Money"]],
    title: "Stock Market Trends 2024",
    content:
      "The financial sector is witnessing unprecedented changes, with cryptocurrency leading the charge towards a digital economy. Meanwhile, the stock market shows signs of recovery, buoyed by investor confidence and governmental stimulus packages. As the world grapples with the post-pandemic economic landscape, green energy emerges as a lucrative investment avenue, promising long-term benefits and sustainability. The real estate market, however, faces a digital transformation challenge, balancing traditional practices with the convenience and reach of online platforms. These dynamics offer a glimpse into the future of finance, marked by innovation and adaptation. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 11,
    topics: [topics["Sports"]],
    title: "The Evolution of eSports",
    content:
      "As the world gears up for the 2024 Olympics, expectations soar, highlighting the event's significance in fostering global unity and showcasing athletic excellence. Concurrently, eSports continue to rise, challenging traditional notions of sports and entertainment. The spotlight also shines on women athletes who are breaking barriers and setting new records, symbolizing progress and empowerment. Behind the scenes, the financial intricacies of hosting mega-sports events are brought to light, revealing a complex web of investments, sponsorships, and economic impacts. Meanwhile, evolving fitness trends reflect society's growing emphasis on health and well-being. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 12,
    topics: [topics["Tech"]],
    title: "The Future of Work: Remote and Hybrid Models",
    content:
      "The tech industry is at the forefront of innovation, with artificial intelligence (AI) leading the charge. As AI technologies evolve, they promise to transform everyday life, yet skeptics question their ethical implications. Cybersecurity becomes increasingly critical in the 5G era, with new challenges and opportunities for protection. The future of work is being reshaped by remote and hybrid models, spurred by the pandemic's lasting effects. In the realm of renewable energy, technological advancements offer hope for sustainable solutions. Meanwhile, virtual reality (VR) continues to push the boundaries of digital experiences, promising unprecedented levels of immersion and interaction. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 13,
    topics: [topics["Politics"]],
    title: "Diplomacy in the Modern World",
    content:
      "As nations around the globe tighten their belts, political landscapes are undergoing significant transformations. From election reforms to diplomatic strategies, the implications of these changes ripple through societies. Experts argue that the adoption of digital platforms in legislative processes could enhance transparency and citizen engagement. However, the digital divide remains a formidable barrier. Meanwhile, environmental policies are gaining traction, reflecting a global shift towards sustainability. The question remains: Are we witnessing the dawn of a new political era or merely the cyclical nature of governance? This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 14,
    topics: [topics["Money"]],
    title: "Global Economic Shifts Post-Pandemic",
    content:
      "The financial sector is witnessing unprecedented changes, with cryptocurrency leading the charge towards a digital economy. Meanwhile, the stock market shows signs of recovery, buoyed by investor confidence and governmental stimulus packages. As the world grapples with the post-pandemic economic landscape, green energy emerges as a lucrative investment avenue, promising long-term benefits and sustainability. The real estate market, however, faces a digital transformation challenge, balancing traditional practices with the convenience and reach of online platforms. These dynamics offer a glimpse into the future of finance, marked by innovation and adaptation. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 15,
    topics: [topics["Sports"]],
    title: "Women in Sports: Breaking Barriers",
    content:
      "As the world gears up for the 2024 Olympics, expectations soar, highlighting the event's significance in fostering global unity and showcasing athletic excellence. Concurrently, eSports continue to rise, challenging traditional notions of sports and entertainment. The spotlight also shines on women athletes who are breaking barriers and setting new records, symbolizing progress and empowerment. Behind the scenes, the financial intricacies of hosting mega-sports events are brought to light, revealing a complex web of investments, sponsorships, and economic impacts. Meanwhile, evolving fitness trends reflect society's growing emphasis on health and well-being. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
  {
    id: 16,
    topics: [topics["Tech"]],
    title: "Innovations in Renewable Energy Technology",
    content:
      "The tech industry is at the forefront of innovation, with artificial intelligence (AI) leading the charge. As AI technologies evolve, they promise to transform everyday life, yet skeptics question their ethical implications. Cybersecurity becomes increasingly critical in the 5G era, with new challenges and opportunities for protection. The future of work is being reshaped by remote and hybrid models, spurred by the pandemic's lasting effects. In the realm of renewable energy, technological advancements offer hope for sustainable solutions. Meanwhile, virtual reality (VR) continues to push the boundaries of digital experiences, promising unprecedented levels of immersion and interaction. This evolving scenario offers a fascinating glimpse into the future, inviting scholars and practitioners alike to explore, debate, and navigate the complexities of the modern world.",
    createdAt: new Date("2023-06-06"),
    originUrls: ["https://example.com"],
  },
];

export default articles;

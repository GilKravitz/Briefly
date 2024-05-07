type ArticleProvider = {
  name: string;
  logo: any;
  link: string;
};

export const getArticleProvider = (link: string): ArticleProvider => {
  // if the link contains "ynet" return ynet
  if (link.includes("ynet")) {
    return {
      name: "Ynet",
      logo: require("@/assets/images/articleProviders/ynet.png"),
      link: link,
    };
  }
  // if the link contains "mako" return mako
  if (link.includes("mako") || link.includes("n12")) {
    return {
      name: "N12",
      logo: require("@/assets/images/articleProviders/n12.png"),
      link: link,
    };
  }
  if (link.includes("13tv")) {
    return {
      name: "13tv",
      logo: require("@/assets/images/articleProviders/13tv.png"),
      link: link,
    };
  }
  return {
    name: "",
    logo: null,
    link: link,
  };
};

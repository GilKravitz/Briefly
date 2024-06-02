const getTextColor = (catagory: string) => {
  switch (catagory) {
    case "technology":
      return "#3DAAF6";
    case "economic":
      return "#43B47B";
    case "politics":
      return "#B44343";
    case "sports":
      return "#717BE8";
    case "food":
      return "#FF9800";
    case "fashion":
      return "#FF33C4";
    case "entertainment":
      return "#9C27B0";
    default:
      return "#FFC107";
  }
};

const getBgColor = (catagory: string) => {
  switch (catagory) {
    case "technology":
      return "#EEF8FF";
    case "economic":
      return "#EBFFE8";
    case "politics":
      return "#FFE8E8";
    case "sports":
      return "#E8F4FF";
    case "food":
      return "#FFFAE8";
    case "fashion":
      return "#FFE8F5";
    case "entertainment":
      return "#F3E5F5";
    default:
      return "#FFFAE8";
  }
};

export { getTextColor, getBgColor };

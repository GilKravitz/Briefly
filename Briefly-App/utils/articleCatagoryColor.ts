const getTextColor = (catagory: string) => {
  console.log(catagory);
  switch (catagory) {
    case "Tech":
      return "#3DAAF6";
    case "Economics":
      return "#43B47B";
    case "Politics":
      return "#B44343";
    case "Sport":
      return "#717BE8";
    case "Food":
      return "#FF9800";
    default:
      return "#FFC107";
  }
};

const getBgColor = (catagory: string) => {
  switch (catagory) {
    case "Tech":
      return "#EEF8FF";
    case "Economics":
      return "#F2FAF7";
    case "Politics":
      return "#FAF2F2";
    case "Sport":
      return "#F6F7FE";
    case "Food":
      return "#FFF3E0";
    default:
      return "#FFFDE7";
  }
};

export { getTextColor, getBgColor };

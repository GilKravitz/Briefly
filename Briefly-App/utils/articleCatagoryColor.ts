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
      return "#EBFFE8";
    case "Politics":
      return "#FFE8E8";
    case "Sport":
      return "#E8F4FF";
    case "Food":
      return "#FFFAE8";
    default:
      return "#FFFAE8";
  }
};

export { getTextColor, getBgColor };

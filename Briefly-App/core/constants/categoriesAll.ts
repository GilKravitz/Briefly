import { Category } from "@/types";

const categoriesAll: Category[] = [
  { name: "sports", image: require("@/assets/images/categories/sports.png") },
  { name: "technology", image: require("@/assets/images/categories/tech.png") },
  { name: "food", image: require("@/assets/images/categories/food.png") },
  { name: "politics", image: require("@/assets/images/categories/politics.png") },
  // TODO: change the image name to economic
  { name: "economic", image: require("@/assets/images/categories/money.png") },
  { name: "fashion", image: require("@/assets/images/categories/fashion.png") },
  { name: "entertainment", image: require("@/assets/images/categories/entertainment.png") },
];

export default categoriesAll;

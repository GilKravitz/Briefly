import { articles } from "@/core/data/articles";

//use @data/data.json to get articles
export const getArticles = async () => {
  //return promise within 1 second that resolves to articles
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(articles);
    }, 300);
  });
};

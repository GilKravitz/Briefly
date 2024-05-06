// simple article context
//

import React, { createContext, useContext, useState } from "react";
import { Article } from "@/types";

export type ArticleContextType = {
  article: Article;
  setArticle: React.Dispatch<React.SetStateAction<Article>>;
};

import { ReactNode } from "react";

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [article, setArticle] = useState<Article>({} as Article);

  return <ArticleContext.Provider value={{ article, setArticle }}>{children}</ArticleContext.Provider>;
};

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error("useArticle must be used within a ArticleProvider");
  }
  return context;
};

export default ArticleContext;

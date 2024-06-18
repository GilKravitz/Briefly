// simple article context
//

import React, { createContext, useContext, useState } from "react";

export type FontSizeContextType = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
};

import { ReactNode } from "react";

const DEFAULT_FONT_SIZE = 16;
const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);

  return <FontSizeContext.Provider value={{ fontSize, setFontSize }}>{children}</FontSizeContext.Provider>;
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error("useFontsize must be used within a FontSizeProvider");
  }
  return context;
};

export default FontSizeContext;

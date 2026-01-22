// context/ProductContext.jsx
import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <ProductContext.Provider
      value={{ selectedProductId, setSelectedProductId }}
    >
      {children}
    </ProductContext.Provider>
  );
};

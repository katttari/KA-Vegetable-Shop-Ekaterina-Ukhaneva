import { useContext } from "react";
import { CartContext } from "./CartContext";

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      "useCartContext нужно вызывать внутри CartContext.Provider",
    );
  }

  return context;
};

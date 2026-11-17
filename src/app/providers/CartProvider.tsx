import type { ReactNode } from "react";
import { CartContext } from "../../entities/cart/context/CartContext";
import { useCart } from "../../entities/cart/hooks/useCart";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const {
    cart,
    sumUpTotal,
    operationCartItem,

    addToCart,
  } = useCart();

  return (
    <CartContext.Provider
      value={{ cart, sumUpTotal, addToCart, operationCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

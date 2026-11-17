import { useEffect, useState } from "react";
import { getItemsLocalStorage } from "../getItemsLocalStorage";
import type { CartItemData } from "../types";

export const useCart = () => {
  const [cart, setCart] = useState<CartItemData[]>(getItemsLocalStorage);

  const addToCart = (newItem: CartItemData) => {
    setCart((prev) => {
      const findItem = prev.some((item) => item.id === newItem.id);

      if (findItem) {
        return prev.map((item) => {
          if (item.id === newItem.id) {
            return {
              ...item,
              quantity: item.quantity + newItem.quantity,
            };
          }

          return item;
        });
      }
      return [...prev, newItem];
    });
  };

  const sumUpTotal = () => {
    const sum = cart.reduce((acc, curentPrice) => {
      return acc + curentPrice.quantity * curentPrice.unitPrice;
    }, 0);

    return sum;
  };

  const operationCartItem = (
    currentItem: CartItemData,
    operation: "plus" | "minus",
  ) => {
    setCart((prev) => {
      const targetItem = prev.find((item) => item.id === currentItem.id);

      if (!targetItem) return prev;

      if (operation === "minus" && targetItem.quantity === 1) {
        return prev.filter((item) => item.id !== currentItem.id);
      }

      return prev.map((item) => {
        if (item.id === currentItem.id) {
          return {
            ...item,
            quantity:
              operation === "plus" ? item.quantity + 1 : item.quantity - 1,
          };
        }

        return item;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return {
    cart,
    addToCart,

    sumUpTotal,
    operationCartItem,
  };
};

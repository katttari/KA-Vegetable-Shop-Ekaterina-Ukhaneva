import type { CartItemData } from "./types";

export const getItemsLocalStorage = (): CartItemData[] => {
  try {
    const localStorageCart = localStorage.getItem("cart");

    if (!localStorageCart) {
      return [];
    }

    const parsedLocalStorageCart = JSON.parse(localStorageCart);

    if (!Array.isArray(parsedLocalStorageCart)) {
      return [];
    }

    return parsedLocalStorageCart as CartItemData[];
  } catch (error) {
    console.error("Ошибка получения данных из localStorage", error);
    return [];
  }
};

export interface CartItemData {
  id: number;
  imageSrc: string;
  title: string;
  weightLabel: string;
  quantity: number;
  unitPrice: number;
}

export interface CartContextValue {
  cart: CartItemData[];
  sumUpTotal: () => number;
  addToCart: (item: CartItemData) => void;
  operationCartItem: (item: CartItemData, operation: "plus" | "minus") => void;
}

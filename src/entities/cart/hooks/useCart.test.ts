import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useCart, type CartItemData } from "..";

const banana: CartItemData = {
  id: 1,
  imageSrc:
    "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/banana.jpg",
  title: "Banana",
  weightLabel: "1",
  quantity: 1,
  unitPrice: 40,
};

const apple: CartItemData = {
  id: 8,
  imageSrc:
    "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg",
  title: "Apple",
  weightLabel: "1",
  quantity: 1,
  unitPrice: 25,
};

// "useCart"
describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("if there is no saved cart data in localStorage hook returns an empty array", () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.cart).toHaveLength(0);
  });

  it("the hook useCart retrieves the basket stored in localStorage", () => {
    const testCart = [banana];
    localStorage.setItem("cart", JSON.stringify(testCart));
    const { result } = renderHook(() => useCart());

    expect(result.current.cart).toEqual([banana]);
  });

  it("adding a new item to the cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(apple);
    });

    expect(result.current.cart).toEqual([apple]);
  });

  it("adding an item to the cart that is already there", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(apple);
    });

    act(() => {
      result.current.addToCart(apple);
    });

    expect(result.current.cart).toEqual([{ ...apple, quantity: 2 }]);
  });

  it("adding two items to the cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(banana);
      result.current.addToCart(apple);
    });

    expect(result.current.cart).toEqual([banana, apple]);
  });

  it("calculating the total amount when there are repeated multiple items", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(banana);
      result.current.addToCart(apple);
    });

    act(() => {
      result.current.addToCart(banana);
    });

    expect(result.current.sumUpTotal()).toBe(105);
  });
});

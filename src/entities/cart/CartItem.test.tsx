import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../tests/renderWithProviders";
import { CartItem } from "./CartItem";
import type { CartContextValue } from "./types";

const makeCartValue = (operationCartItem = vi.fn()): CartContextValue => ({
  cart: [],
  sumUpTotal: () => 0,
  addToCart: vi.fn(),
  operationCartItem,
});

const renderItem = (cart: CartContextValue, quantity = 1) =>
  renderWithProviders(
    <CartItem
      id={2}
      imageSrc="Strawberry///"
      title="Strawberry"
      weightLabel="1/4"
      quantity={quantity}
      unitPrice={50}
      lastIndex={false}
    />,
    { cart },
  );

// "CartItem"
describe("CartItem", () => {
  it("passes the 'plus' operation to operationCartItem when the + button is clicked", async () => {
    const user = userEvent.setup();
    const operationCartItem = vi.fn();
    renderItem(makeCartValue(operationCartItem));

    await user.click(screen.getByRole("button", { name: /increment/i }));

    expect(operationCartItem).toHaveBeenCalledTimes(1);
    expect(operationCartItem).toHaveBeenCalledWith(
      {
        id: 2,
        imageSrc: "Strawberry///",
        title: "Strawberry",
        weightLabel: "1/4",
        quantity: 1,
        unitPrice: 50,
      },
      "plus",
    );
  });

  it("passes the 'minus' operation to operationCartItem when clicking on '-' ", async () => {
    const user = userEvent.setup();
    const operationCartItem = vi.fn();
    renderItem(makeCartValue(operationCartItem), 2);

    await user.click(screen.getByRole("button", { name: /decrement/i }));

    expect(operationCartItem).toHaveBeenCalledTimes(1);
    expect(operationCartItem).toHaveBeenCalledWith(
      {
        id: 2,
        imageSrc: "Strawberry///",
        title: "Strawberry",
        weightLabel: "1/4",
        quantity: 2,
        unitPrice: 50,
      },
      "minus",
    );
  });
});

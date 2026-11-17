import { screen, within } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../tests/renderWithProviders";
import { PreviewCart } from "./PreviewCart";

const strawberry = {
  id: 2,
  title: "Strawberry",
  weightLabel: "1/4",
  quantity: 1,
  unitPrice: 50,
  imageSrc: "Strawberry///",
};

const mango = {
  id: 6,
  title: "Mango",
  weightLabel: "1",
  quantity: 1,
  unitPrice: 100,
  imageSrc: "Mango///",
};

// "PreviewCart"
describe("PreviewCart", () => {
  beforeEach(() => {
    localStorage.setItem("cart", JSON.stringify([strawberry]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders an increased quantity and price upon clicking the + sign", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PreviewCart />, { withCartProvider: true });

    const priceOfProduct = within(screen.getByRole("listitem")).getByText(
      "$ 50",
    );
    expect(priceOfProduct).toBeInTheDocument();

    const buttonIncrement = screen.getByRole("button", {
      name: /increment/i,
    });
    const quantity = screen.getByLabelText("quantity");

    await user.click(buttonIncrement);

    expect(quantity).toHaveTextContent("2");
    expect(priceOfProduct).toHaveTextContent("$ 100");
  });

  it("checks if the quantity of an item in the cart is 1; if it is, clicking the '-' button removes the item", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PreviewCart />, { withCartProvider: true });

    const nameOfProduct = within(screen.getByRole("listitem")).getByText(
      "Strawberry",
    );
    expect(nameOfProduct).toBeInTheDocument();

    const buttonDecrement = screen.getByRole("button", {
      name: /decrement/i,
    });

    await user.click(buttonDecrement);

    expect(nameOfProduct).not.toBeInTheDocument();
  });

  it("when the only item is removed from the cart, an empty cart state—'Your cart is empty!'—is rendered", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PreviewCart />, { withCartProvider: true });

    const nameOfProduct = within(screen.getByRole("listitem")).getByText(
      "Strawberry",
    );
    expect(nameOfProduct).toBeInTheDocument();

    const buttonDecrement = screen.getByRole("button", {
      name: /decrement/i,
    });

    await user.click(buttonDecrement);

    const emptyCart = screen.getByText("Your cart is empty!");
    expect(emptyCart).toBeInTheDocument();
  });

  it("if there are multiple items, the total amount is calculated correctly when the quantity is increased", async () => {
    localStorage.setItem("cart", JSON.stringify([strawberry, mango]));
    const user = userEvent.setup();
    renderWithProviders(<PreviewCart />, { withCartProvider: true });

    const totalPriceBefore = screen.getByText("$ 150");
    expect(totalPriceBefore).toBeInTheDocument();

    const strawberryItem = screen.getByText("Strawberry").closest("li")!;
    const buttonIncrementStrawberry = within(strawberryItem).getByRole(
      "button",
      {
        name: /increment/i,
      },
    );

    await user.click(buttonIncrementStrawberry);

    const totalPriceAfter = screen.getByText("$ 200");
    expect(totalPriceAfter).toBeInTheDocument();
  });
});

import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { ProductCard } from "./ProductCard";
import { renderWithProviders } from "../../tests/renderWithProviders";

// "ProductCard"
describe("ProductCard", () => {
  it("should correctly call onAdd with the quantity when clicking Add to cart", async () => {
    const handleAdd = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <ProductCard
        title="Mango"
        weightLabel="1"
        price={45}
        imageSrc="Mango///"
        onAdd={handleAdd}
      />,
    );

    const buttonAddToCart = screen.getByRole("button", {
      name: /add-to-cart/i,
    });

    await user.click(buttonAddToCart);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(1);
  });

  it("should correctly call onAdd with the quantity as 3 when clicking Add to cart", async () => {
    const handleAdd = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <ProductCard
        title="Mango"
        weightLabel="1"
        price={45}
        imageSrc="Mango///"
        onAdd={handleAdd}
      />,
    );

    const buttonAddToCart = screen.getByRole("button", {
      name: /add-to-cart/i,
    });

    const buttonIncrement = screen.getByRole("button", {
      name: /increment/i,
    });

    await user.click(buttonIncrement);
    await user.click(buttonIncrement);
    await user.click(buttonAddToCart);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith(3);
  });

  it("the decrement button should not be available if the quantity is 1", async () => {
    const handleAdd = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <ProductCard
        title="Mango"
        weightLabel="1"
        price={45}
        imageSrc="Mango///"
        onAdd={handleAdd}
      />,
    );

    const buttonIncrement = screen.getByRole("button", {
      name: /increment/i,
    });
    const buttonDecrement = screen.getByRole("button", {
      name: /decrement/i,
    });
    const quantity = screen.getByLabelText("quantity");

    await user.click(buttonIncrement);
    await user.click(buttonDecrement);

    expect(quantity).toHaveTextContent("1");
    expect(buttonDecrement).toBeDisabled();
  });
});

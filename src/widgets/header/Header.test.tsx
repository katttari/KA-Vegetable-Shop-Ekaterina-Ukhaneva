import { screen, within } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../tests/renderWithProviders";
import { Header } from "./Header";

const strawberry = {
  id: 2,
  title: "Strawberry",
  weightLabel: "1/4",
  quantity: 2,
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

const handleClick = vi.fn();

// "Header"
describe("Header", () => {
  beforeEach(() => {
    localStorage.setItem("cart", JSON.stringify([strawberry, mango]));
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("the badge should correctly display the number of items in the cart", () => {
    renderWithProviders(<Header onCartClick={handleClick} />, {
      withCartProvider: true,
    });

    const buttonCart = screen.getByRole("button", {
      name: /cart-button/i,
    });

    const totalBadgeCount = within(buttonCart).getByText("3");
    expect(totalBadgeCount).toBeInTheDocument();
  });

  it("if the cart is empty, the badge is not displayed", () => {
    localStorage.clear();
    renderWithProviders(<Header onCartClick={handleClick} />, {
      withCartProvider: true,
    });

    const buttonCart = screen.getByRole("button", {
      name: /cart-button/i,
    });

    const totalBadgeCount = within(buttonCart).queryByLabelText("cart-badge");

    expect(totalBadgeCount).not.toBeInTheDocument();
  });

  it("calls onCartClick when the cart button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header onCartClick={handleClick} />, {
      withCartProvider: true,
    });

    const buttonCart = screen.getByRole("button", {
      name: /cart-button/i,
    });

    await user.click(buttonCart);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

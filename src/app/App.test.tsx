import { screen, within } from "@testing-library/react";
import { describe, it, afterEach, beforeEach, vi, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../tests/renderWithProviders";
import App from "./App";

const API = [
  {
    id: 5,
    name: "CarrotS - 1 Kg",
    price: 56,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/carrots.jpg",
    category: "vegetables",
  },
  {
    id: 6,
    name: "Tomato - 1 Kg",
    price: 16,
    image:
      "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/tomato.jpg",
    category: "vegetables",
  },
];


vi.mock("../entities/product/api/productApi", () => ({
  getAllProducts: vi.fn(() => Promise.resolve(API)),
}));

// "App"
describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("when the 'Add to Cart' button is clicked, the badge value on the cart button in the header updates correctly", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { withCartProvider: false });

    const buttonCart = screen.getByRole("button", {
      name: /cart-button/i,
    });
    const totalBadgeCount = within(buttonCart).queryByLabelText("cart-badge");

    expect(totalBadgeCount).not.toBeInTheDocument();

    const carrotElement = await screen.findByText("CarrotS");
    const productCard = carrotElement.closest(
      '[data-testid="product-card"]',
    ) as HTMLElement;
    const buttonCarrotAddToCart = within(productCard).getByRole("button", {
      name: /add-to-cart/i,
    });

    await user.click(buttonCarrotAddToCart);

    const totalBadgeCount2 = within(buttonCart).queryByLabelText("cart-badge");

    expect(totalBadgeCount2).toBeInTheDocument();
    expect(totalBadgeCount2).toHaveTextContent("1");
  });
});

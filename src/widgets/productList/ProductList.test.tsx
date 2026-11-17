import { screen } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { renderWithProviders } from "../../tests/renderWithProviders";
import { ProductList } from "./ProductList";

const API = [
  {
    id: 5,
    name: "Carrot - 1 Kg",
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

vi.mock("../../entities/product/api/productApi", () => ({
  getAllProducts: vi.fn(() => Promise.resolve(API)),
}));

// "ProductList"
describe("ProductList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loaders first, then products", async () => {
    renderWithProviders(<ProductList />, { withCartProvider: true });

    expect(screen.getAllByLabelText("loading")).toHaveLength(8);
    expect(await screen.findByText("Carrot")).toBeInTheDocument();
    expect(screen.queryAllByLabelText("loading")).toHaveLength(0);
  });
});

import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { CartProvider } from "../app/providers/CartProvider";
import { type CartContextValue, CartContext } from "../entities/cart";

interface Options {
  cart?: CartContextValue;
  withCartProvider?: boolean;
}

export const renderWithProviders = (
  ui: ReactElement,
  { cart, withCartProvider = false }: Options = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MantineProvider>
      {cart ? (
        <CartContext.Provider value={cart}>{children}</CartContext.Provider>
      ) : withCartProvider ? (
        <CartProvider>{children}</CartProvider>
      ) : (
        children
      )}
    </MantineProvider>
  );

  return render(ui, { wrapper: Wrapper });
};

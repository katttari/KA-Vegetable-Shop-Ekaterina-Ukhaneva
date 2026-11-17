import { CatalogPage } from "../pages";
import { CartProvider } from "./providers/CartProvider";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <CatalogPage />
    </CartProvider>
  );
}

export default App;

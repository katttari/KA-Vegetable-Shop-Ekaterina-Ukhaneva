import { api } from "../../../shared/api/Api";
import type { Product } from "../types";

export const getAllProducts = async () => {
  return await api
    // .get("vadass/raw/upload/v1535817394/json/products.json")
    .get("sivadass/raw/upload/v1535817394/json/products.json")
    .json<Product[]>();
};

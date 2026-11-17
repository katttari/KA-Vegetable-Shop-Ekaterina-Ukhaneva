import { useState, useEffect } from "react";
import { getAllProducts } from "../api/productApi";
import type { FormattedProduct } from "../types";

export const useProducts = () => {
  const [dataProducts, setDataProducts] = useState<FormattedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await getAllProducts();

        const formattedProducts = products.map((item) => {
          const parts = item.name ? item.name.split(" - ") : [];

          const title = parts[0] ? parts[0].trim() : item.name;
          const weight = parts[1] ? parts[1].trim() : "";

          const formattedWeight = weight.replace(/kg/gi, "");

          return {
            ...item,
            title,
            weightLabel: formattedWeight.trim(),
          };
        });

        setDataProducts(formattedProducts);

        setErrorMessage(null);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Произошла неизвестная ошибка");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { dataProducts, isLoading, errorMessage };
};

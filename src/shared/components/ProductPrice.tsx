import { Text } from "@mantine/core";

import styles from "./ProductPrice.module.scss";

interface ProductPriceProps {
  price: number;
}

export const ProductPrice = ({ price }: ProductPriceProps) => {
  return (
    <Text
      className={styles.productPriceText}
      c="customGray.9"
      fw={600}
      fz="20px"
      lh="24px"
    >
      $ {price}
    </Text>
  );
};

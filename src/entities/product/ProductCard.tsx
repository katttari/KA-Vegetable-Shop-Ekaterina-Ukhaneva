import { useState } from "react";
import { Card, Flex, Image, Group } from "@mantine/core";
import {
  AppCounter,
  CustomerButton,
  ProductNameAndWeight,
  ProductPrice,
} from "../../shared/components";
import { CartIconGreen } from "../../shared/assets";

import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  weightLabel: string;
  price: number;
  onAdd: (quantity: number) => void;
}

export const ProductCard = ({
  imageSrc,
  title,
  weightLabel,
  price,
  onAdd,
}: ProductCardProps) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Card className={styles.productCard} mih={414} maw={302} p="md" bdrs="lg" data-testid="product-card">
      <Flex
        gap="md"
        justify="space-between"
        align="center"
        direction="column"
        h="100%"
      >
        <Image w="100%" fit="contain" src={imageSrc} alt={title} />

        <Group
          className={styles.productGroup}
          justify="space-between"
          align="center"
          wrap="wrap"
          w="100%"
        >
          <ProductNameAndWeight
            title={title}
            weightLabel={weightLabel}
          ></ProductNameAndWeight>

          <AppCounter
            value={count}
            miw={30}
            h={30}
            fw={400}
            fz={"md"}
            disabled={true}
            increment={handleIncrement}
            decrement={handleDecrement}
          />
        </Group>

        <Group
          justify="space-between"
          align="center"
          gap="sm"
          wrap="nowrap"
          w="100%"
        >
          <ProductPrice price={price}></ProductPrice>

          <CustomerButton
            variant={"light"}
            color={"customGreen"}
            w="100%"
            aria-label="add-to-cart"
            onClick={() => onAdd(count)}
            rightSection={<CartIconGreen />}
          >
            Add to cart
          </CustomerButton>
        </Group>
      </Flex>
    </Card>
  );
};

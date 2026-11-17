import { useCartContext } from "./context/useCartContext";
import { Flex, Group, Image } from "@mantine/core";
import clsx from "clsx";
import {
  AppCounter,
  ProductNameAndWeight,
  ProductPrice,
} from "../../shared/components";
import type { CartItemData } from "./types";

import styles from "./CartItem.module.scss";

interface CartItemProps {
  id: number;
  imageSrc: string;
  title: string;
  weightLabel: string;
  quantity: number;
  unitPrice: number;
  lastIndex: boolean;
}

export const CartItem = ({
  id,
  imageSrc,
  title,
  weightLabel,
  quantity,
  unitPrice,
  lastIndex,
}: CartItemProps) => {
  const { operationCartItem } = useCartContext();

  const currentItem: CartItemData = {
    id,
    imageSrc,
    title,
    weightLabel,
    quantity,
    unitPrice,
  };

  const handleIncrement = () => {
    operationCartItem(currentItem, "plus");
  };

  const handleDecrement = () => {
    operationCartItem(currentItem, "minus");
  };

  return (
    <li className={styles.itemWrapper}>
      <Group
        gap="sm"
        justify="flex-start"
        align="flex-start"
        w="100%"
        mih={80}
        mb="sm"
      >
        <Image mih={64} w={64} fit="contain" src={imageSrc} alt={title} />

        <div
          className={clsx(styles.contentWrapper, {
            [styles.lastItem]: lastIndex,
          })}
        >
          <Group justify="space-between" align="flex-end" w="100%" mih={62}>
            <Flex
              justify="space-between"
              gap={4}
              align="flex-start"
              direction="column"
            >
              <ProductNameAndWeight title={title} weightLabel={weightLabel} />

              <ProductPrice price={quantity * unitPrice}></ProductPrice>
            </Flex>

            <AppCounter
              value={quantity}
              miw={30}
              h={30}
              fw={400}
              fz="md"
              disabled={false}
              increment={handleIncrement}
              decrement={handleDecrement}
            />
          </Group>
        </div>
      </Group>
    </li>
  );
};

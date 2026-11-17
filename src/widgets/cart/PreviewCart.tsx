import { useCartContext } from "../../entities/cart/context/useCartContext";

import { Flex, Text } from "@mantine/core";

import { CartItem } from "../../entities/cart/CartItem";
import { CartCardWrapper } from "./CartCardWrapper";
import { TotalAmount } from "../../entities/cart/TotalAmount";
import { ImgEmptyCart } from "../../shared/assets";

import styles from "./PreviewCart.module.scss";

export const PreviewCart = () => {
  const { cart } = useCartContext();
  const cartLength = cart.length;

  return cartLength === 0 ? (
    <CartCardWrapper className={styles.cardWrapper} h={227} maw={301}>
      <Flex
        gap="lg"
        justify="space-between"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <ImgEmptyCart />
        <Text c="customGray.6" fw={400} fz="16px" lh="24px">
          Your cart is empty!
        </Text>
      </Flex>
    </CartCardWrapper>
  ) : (
    <CartCardWrapper className={styles.cardWrapper} h={268} maw={444}>
      <Flex
        justify="space-between"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <ul className={styles.cardList}>
          {cart.map((item, index) => {
            return (
              <CartItem
                id={item.id}
                key={item.id}
                imageSrc={item.imageSrc}
                title={item.title}
                weightLabel={item.weightLabel}
                quantity={item.quantity}
                unitPrice={item.unitPrice}
                lastIndex={index === cart.length - 1}
              />
            );
          })}
        </ul>

        <TotalAmount />
      </Flex>
    </CartCardWrapper>
  );
};

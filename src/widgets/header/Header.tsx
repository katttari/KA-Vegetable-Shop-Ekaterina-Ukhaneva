import { useCartContext } from "../../entities/cart/context/useCartContext";
import { Group } from "@mantine/core";
import { CartIconWhite, HeaderLogo } from "../../shared/assets";
import { CustomerBadge, CustomerButton } from "../../shared/components";

import styles from "./Header.module.scss";

export interface HeaderProps {
  onCartClick: () => void;
}

export const Header = ({ onCartClick }: HeaderProps) => {
  const { cart } = useCartContext();

  const totalCountItems = () => {
    const count = cart.reduce((acc, curentPrice) => {
      return acc + curentPrice.quantity;
    }, 0);

    return count;
  };

  return (
    <Group
      className={styles.headerGroup}
      justify="space-between"
      align="center"
      wrap="nowrap"
      w="100%"
      px={20}
      py={7.5}
      mb={60}
      bg="customGray.0"
      pos="sticky"
      top={0}
    >
      <HeaderLogo />
      <CustomerButton
        variant="filled"
        color="customGreen"
        aria-label="cart-button"
        miw={totalCountItems() > 0 ? "174px" : "144px"}
        leftSection={
          totalCountItems() > 0 && (
            <CustomerBadge
              miw={20}
              h={20}
              fw={600}
              fz={"16px"}
              variant="filled"
              c="customGray.9"
              color="customGray.0"
              aria-label="cart-badge"
              px={3}
            >
              {totalCountItems()}
            </CustomerBadge>
          )
        }
        rightSection={<CartIconWhite />}
        onClick={onCartClick}
      >
        Cart
      </CustomerButton>
    </Group>
  );
};

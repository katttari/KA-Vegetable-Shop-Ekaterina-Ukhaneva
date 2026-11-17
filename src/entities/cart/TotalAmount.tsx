import { useCartContext } from "./context/useCartContext";
import { Group, Text } from "@mantine/core";

import styles from "./TotalAmount.module.scss";

export const TotalAmount = () => {
  const { sumUpTotal } = useCartContext();

  return (
    <Group
      className={styles.totalAmountWrapper}
      gap="sm"
      justify="space-between"
      align="flex-end"
      w="100%"
      mih={36}
    >
      <Text c="customGray.9" fw={600} fz="md" lh="24px">
        Total
      </Text>
      <Text c="customGray.9" fw={600} fz="md" lh="24px">
        $ {sumUpTotal()}
      </Text>
    </Group>
  );
};

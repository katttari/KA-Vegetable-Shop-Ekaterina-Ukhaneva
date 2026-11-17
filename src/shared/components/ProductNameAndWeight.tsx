import { Text, Group } from "@mantine/core";
import styles from "./ProductNameAndWeight.module.scss";

interface ProductNameAndWeightProps {
  title: string;
  weightLabel: string;
}

export const ProductNameAndWeight = ({
  title,
  weightLabel,
}: ProductNameAndWeightProps) => {
  return (
    <Group className={styles.productNameAndWeightGroup} gap="sm" miw={0}>
      <Text c="customGray.9" fw={600} fz={18}>
        {title}
      </Text>

      <Text
        className={styles.productNameAndWeightText}
        c="customGray.6"
        fw={600}
        fz="14px"
        lh="20px"
      >
        {weightLabel ? weightLabel + " kg" : ""}
      </Text>
    </Group>
  );
};

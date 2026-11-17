import { type ReactNode } from "react";
import { Badge, type BadgeProps } from "@mantine/core";

import styles from "./CustomerBadge.module.scss";

interface CustomerBadgeProps extends BadgeProps {
  children: ReactNode;
}

export const CustomerBadge = ({
  children,
  variant,
  miw,
  h,
  fw,
  fz,
  ...rest
}: CustomerBadgeProps) => {
  return (
    <Badge
      className={styles.customerBadge}
      miw={miw}
      h={h}
      fw={fw}
      variant={variant}
      fz={fz}
      radius="xl"
      px="xs"
      {...rest}
    >
      {children}
    </Badge>
  );
};

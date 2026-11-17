import { Button, type ButtonProps } from "@mantine/core";
import { type ReactNode } from "react";

interface CustomerButtonProps extends ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const CustomerButton = ({
  children,
  variant,
  color,
  onClick,
  ...rest
}: CustomerButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      radius="md"
      px="xs"
      py="xs"
      h={44}
      fz="16px"
      lh="24px"
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

import type { ReactNode } from "react";
import { Card, type CardProps } from "@mantine/core";

interface CartCardWrapperProps extends CardProps {
  h?: number;
  maw?: number;
  className?: string;
  children: ReactNode;
}

export const CartCardWrapper = ({
  children,
  h,
  maw,
  className,
  ...rest
}: CartCardWrapperProps) => {
  return (
    <Card
      className={className}
      pos="fixed"
      top={71}
      right={20}
      radius="lg"
      bg="customGray.0"
      w={"calc(100vw - 40px)"}
      h={h}
      maw={maw}
      p={24}
      shadow="md"
      {...rest}
    >
      {children}
    </Card>
  );
};

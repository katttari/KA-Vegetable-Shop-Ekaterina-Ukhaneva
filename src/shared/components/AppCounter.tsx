import { IconPlus, IconMinus } from "@tabler/icons-react";
import { ActionIcon, Group } from "@mantine/core";

import { CustomerBadge } from "./CustomerBadge";

interface AppCounterProps {
  value: number;
  miw: number;
  h: number;
  fw: number;
  fz: string;
  disabled: boolean;
  increment: () => void;
  decrement: () => void;
}

export const AppCounter = ({
  value,
  miw,
  h,
  fw,
  fz,
  disabled,
  increment,
  decrement,
}: AppCounterProps) => {
  return (
    <Group gap="0" align="center" wrap="nowrap">
      <ActionIcon
        variant="filled"
        size="md"
        radius="md"
        color="customGray.3"
        aria-label={"decrement"}
        onClick={decrement}
        disabled={value === 1 && disabled}
      >
        <IconMinus
          stroke={2}
          size={18}
          color="black"
          opacity={disabled && value === 1 ? "30%" : "100%"}
        />
      </ActionIcon>

      <CustomerBadge
        miw={miw}
        h={h}
        fw={fw}
        fz={fz}
        variant="transparent"
        c="customGray.9"
        color="customGray.3"
        aria-label="quantity"
      >
        {value}
      </CustomerBadge>

      <ActionIcon
        variant="filled"
        size="md"
        radius="md"
        color="customGray.3"
        aria-label={"increment"}
        onClick={increment}
      >
        <IconPlus stroke={2} size={18} color="black" />
      </ActionIcon>
    </Group>
  );
};

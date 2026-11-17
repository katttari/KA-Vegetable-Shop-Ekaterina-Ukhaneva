import {
  MantineProvider as BaseMantineProvider,
  createTheme,
  type MantineColorsTuple,
} from "@mantine/core";
import "@mantine/core/styles.css";

const customGreen: MantineColorsTuple = [
  "#EAFBEE",
  "#E7FAEB", // дефолтный bg кнопки add
  "#D6F0DC", // hover - кнопки
  "#94d0a1",
  "#74c186",
  "#60b874",
  "#54b46a", // дефолтный цвет кнопки корзины
  "#3B944E",
  "#449e59",
  "#3B944E", // темно-зеленый (цвет текст) + hover цвет кнопки корзины
];

const customGray: MantineColorsTuple = [
  "#FFFFFF",
  "#F3F5FA",
  "#E9ECEF",
  "#DEE2E6",
  "#CED4DA",
  "#CED4DA",
  "#868E96",
  "#495057",
  "#343A40",
  "#212529",
];

const theme = createTheme({
  colors: {
    customGreen,
    customGray,
  },
  primaryColor: "customGreen",
  fontFamily: "Inter, sans-serif",
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function MantineProvider({ children }: ProvidersProps) {
  return <BaseMantineProvider theme={theme}>{children}</BaseMantineProvider>;
}

import { useState } from "react";
import { Container, Stack, Title } from "@mantine/core";
import { ProductList } from "../widgets/productList";
import { Header } from "../widgets/header";
import { PreviewCart } from "../widgets/cart";

export const CatalogPage = () => {
  const [showPreviewCart, setShowPreviewCart] = useState<boolean>(false);

  const handleClick = () => {
    setShowPreviewCart((prev) => !prev);
  };

  return (
    <Container
      maw={1440}
      mx="auto"
      px={0}
      pb={119}
      size="lg"
      bg="customGray.1"
      pos="relative"
    >
      <Header onCartClick={handleClick} />
      {showPreviewCart && <PreviewCart />}

      <Stack
        bg="customGray.1"
        align="stretch"
        justify="center"
        gap={49}
        px={{ base: 50, "400": 80 }}
      >
        <Title order={1}>Catalog</Title>

        <ProductList />
      </Stack>
    </Container>
  );
};

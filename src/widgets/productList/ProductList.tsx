import { SimpleGrid, Text } from "@mantine/core";
import { LoadingCard, ProductCard, useProducts } from "../../entities/product";
import { useCartContext } from "../../entities/cart";

export const ProductList = () => {
  const { addToCart } = useCartContext();
  const { dataProducts, isLoading, errorMessage } = useProducts();

  const emptyArray = ["", "", "", "", "", "", "", ""];

  return (
    <>
      {errorMessage && (
        <Text c="red.9" fw={400}>
          {errorMessage}
        </Text>
      )}
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
        spacing={{ base: "xs", sm: "sm", md: "xl", lg: "xl", xl: "lg" }}
        verticalSpacing={{ base: "xs", sm: "sm", md: "xl", lg: "lg", xl: "xl" }}
        m="auto"
        maw={1280}
      >
        {isLoading
          ? emptyArray.map((_, index) => {
              return <LoadingCard key={index} />;
            })
          : dataProducts.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  title={item.title}
                  weightLabel={item.weightLabel}
                  price={item.price}
                  imageSrc={item.image}
                  onAdd={(quantity) =>
                    addToCart({
                      id: item.id,
                      imageSrc: item.image,
                      title: item.title,
                      weightLabel: item.weightLabel,
                      quantity,
                      unitPrice: item.price,
                    })
                  }
                />
              );
            })}
      </SimpleGrid>
    </>
  );
};

import { Card, Flex, Center } from "@mantine/core";
import { LoaderIconProductCard } from "../../shared/assets";

export const LoadingCard = () => {
  return (
    <Card mih={414} maw={302} p="md" shadow="sm" bdrs="lg" aria-label="loading">
      <Flex
        gap="md"
        justify="space-between"
        align="center"
        direction="column"
        h="100%"
      >
        <Center bg="customGray.1" my={0} mih={276} miw={276} w="100%" bdrs="md">
          <LoaderIconProductCard />
        </Center>
      </Flex>
    </Card>
  );
};

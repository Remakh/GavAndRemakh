import { Box } from "@chakra-ui/react";
import React from "react";
import TestProductImageCarousel from "../components/productCarousel";
import ProductImageCarousel from "../components/productImageCarousel";
import { useProductQuery } from "../generated/graphql";
const Product = () => {
  const { data, loading } = useProductQuery({ variables: { productId: 2 } });
  console.log(data);

  if (data) {
    return (
      <Box w={400} height={400}>
        <TestProductImageCarousel
          images={data.product.images}
        ></TestProductImageCarousel>
      </Box>
    );
  }
  return <div>Hello World</div>;
};

export default Product;

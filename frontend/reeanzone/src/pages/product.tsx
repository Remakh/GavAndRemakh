import { Box } from "@chakra-ui/react";
import React from "react";
import ProductImageCarousel from "../components/productImageCarousel";
import { useProductQuery } from "../generated/graphql";
const Product = () => {
  const { data, loading } = useProductQuery({ variables: { productId: 2 } });
  console.log(data);

  if (data) {
    return (
      <Box w={400} height={400}>
        <ProductImageCarousel
          images={data.product.images}
        ></ProductImageCarousel>
      </Box>
    );
  }
  return <div>Hello World</div>;
};

export default Product;

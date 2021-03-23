import React from "react";
import { useProductQuery } from "../generated/graphql";

const ProductImageCarousel = () => {
  const { data, loading } = useProductQuery({ variables: { productId: 2 } });
  console.log(data);
  return <div>Hello World</div>;
};

export default ProductImageCarousel;

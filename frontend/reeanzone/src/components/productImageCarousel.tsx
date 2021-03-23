import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import React from "react";
import { useProductQuery } from "../generated/graphql";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Box } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";

const ProductImageCarousel = () => {
  const { data, loading } = useProductQuery({ variables: { productId: 2 } });
  console.log(data);

  if (data) {
    const imageTest = data.product.images.map((image, index) => {
      return (
        <Slide index={index}>
          <Img
            w={150}
            h={250}
            objectFit="cover"
            src={image.url}
            alt={image.description}
            key={image.id}
          />
        </Slide>
      );
    });
    return (
      <Box w={200} h={200}>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={imageTest.length}
          visibleSlides={1}
          infinite={true}
        >
          <Slider>{imageTest}</Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      </Box>
    );
  }
  return <div>Hello World</div>;
};

export default ProductImageCarousel;

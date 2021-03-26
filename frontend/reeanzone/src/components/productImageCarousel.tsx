import {
  ButtonBack,
  ButtonNext,
  CarouselContext,
  CarouselProvider,
  Slide,
  Slider,
  WithStore,
} from "pure-react-carousel";
import React, { useContext, useEffect, useState } from "react";
import { ProductImages, useProductQuery } from "../generated/graphql";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Box } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";

interface ImageCarouselProps {
  images: ProductImages[];
}

const MainCarouselImage: React.FC<ImageCarouselProps> = ({ images }) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  if (images.length >= 1) {
    return (
      <Img
        w={150}
        h={250}
        objectFit="cover"
        src={images[currentSlide].url}
        alt={images[currentSlide].description}
      />
    );
  }
  return <div>Hello World</div>;
};

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
          <MainCarouselImage images={data.product.images} />
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

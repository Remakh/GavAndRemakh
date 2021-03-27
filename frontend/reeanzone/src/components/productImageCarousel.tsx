import {
  ButtonBack,
  ButtonNext,
  CarouselContext,
  CarouselProvider,
  DotGroup,
  ImageWithZoom,
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
        w="100%"
        h="70%"
        objectFit="cover"
        src={images[currentSlide].url}
        alt={images[currentSlide].description}
      />
    );
  }
  return <div>Hello World</div>;
};

const ProductImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const imageTest = images.map((image, index) => {
    return (
      <Slide index={index}>
        <Img
          w="100%"
          h="100%"
          objectFit="contain"
          src={image.url}
          alt={image.description}
        />
      </Slide>
    );
  });
  return (
    <Box>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={imageTest.length}
        visibleSlides={1}
        infinite={true}
      >
        {/* <MainCarouselImage images={images} /> */}
        <Slider>{imageTest}</Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
        <DotGroup
          renderDots={({ totalSlides, currentSlide }) => {
            const dots = [];

            if (totalSlides) {
              for (let i = 0; i < totalSlides; i += 1) {
                dots.push(
                  <Box h="25%" w="25%" display="inline-flex">
                    <Img
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      src={images[i].url}
                      alt={images[i].description}
                      border={i === currentSlide ? "5px solid #555" : ""}
                    />
                  </Box>
                );
              }
            }
            return dots;
          }}
        />
      </CarouselProvider>
    </Box>
  );
};

export default ProductImageCarousel;

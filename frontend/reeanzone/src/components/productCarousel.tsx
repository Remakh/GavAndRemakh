import { Img } from "@chakra-ui/image";
import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Product, ProductImages } from "../generated/graphql";

interface ImageCarouselProps {
  images: ProductImages[];
}

const getPreviousSlide = (maxSlides: number, currentSlide: number) => {
  let newSlide = currentSlide - 1;
  if (newSlide < 0) {
    newSlide = maxSlides - 1;
  }
  return newSlide;
};

const getNextSlide = (maxSlides: number, currentSlide: number) => {
  let newSlide = currentSlide + 1;
  if (newSlide === maxSlides) {
    newSlide = 0;
  }
  return newSlide;
};

const generatePreviewSlides = (
  images: ProductImages[],
  currentSlide: number
): ProductImages[] => {
  return [
    images[getPreviousSlide(images.length, currentSlide)],
    images[currentSlide],
    images[getNextSlide(images.length, currentSlide)],
  ];
};

const TestProductImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentSlide, updateCurrentSlide] = useState(0);

  return (
    <Box h="100%" w="100%">
      <Img
        h="70%"
        w="100%"
        objectFit="contain"
        src={images[currentSlide].url}
        alt={images[currentSlide].description}
      ></Img>
      {generatePreviewSlides(images, currentSlide).map(
        (currentImage, index) => {
          return (
            <Box display="inline-flex" h="30%" width="33%">
              <Img
                h="100%"
                w="100%"
                objectFit="contain"
                src={currentImage.url}
                alt={currentImage.description}
                border={index === 1 ? "5px solid #555" : ""}
              ></Img>
            </Box>
          );
        }
      )}
      <Button
        onClick={() =>
          updateCurrentSlide((prevSlide: number) => {
            return getPreviousSlide(images.length, prevSlide);
          })
        }
      >
        {"<-"}
      </Button>
      <Button
        onClick={() =>
          updateCurrentSlide((prevSlide: number) => {
            return getNextSlide(images.length, prevSlide);
          })
        }
      >
        {"->"}
      </Button>
    </Box>
  );
};

export default TestProductImageCarousel;

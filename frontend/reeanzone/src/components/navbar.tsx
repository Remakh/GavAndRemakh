import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import LoginMenu from "./loginMenu";

const Navbar = () => {
  return (
    <Box w="100%" backgroundColor="burlywood">
      <Flex alignItems="center">
        <Box ml={2}>
          <RouterLink to="/">ReeanZone</RouterLink>
        </Box>

        <Box mt={2} mb={2} mr="1%" ml="auto">
          <LoginMenu />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;

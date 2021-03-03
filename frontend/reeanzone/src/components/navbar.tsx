import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box w="100%" backgroundColor="burlywood">
      <Flex alignItems="center">
        <Box ml={2}>
          <RouterLink to="/">ReeanZone</RouterLink>
        </Box>

        <Box mt={2} mb={2} mr="1%" ml="auto">
          <Menu>
            <MenuButton
              icon={<Icon as={CgProfile} w={10} h={10} />}
              as={IconButton}
              rightIcon={<ChevronDownIcon />}
              bg="burlywood"
              _hover={{ bg: "gray" }}
            ></MenuButton>
            <MenuList>
              <RouterLink to="/login">
                <MenuItem>Login</MenuItem>
              </RouterLink>
              <RouterLink to="/register">
                <MenuItem>Register</MenuItem>
              </RouterLink>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;

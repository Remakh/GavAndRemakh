import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
import { useCurrentUserQuery, useLoginMutation } from "../generated/graphql";

const LoginMenu = () => {
  const { loading, data } = useCurrentUserQuery();
  const [logout] = useLoginMutation();

  if (loading) {
    return (
      <Menu>
        <MenuButton
          icon={<Icon as={CgProfile} w={10} h={10} />}
          as={IconButton}
          rightIcon={<ChevronDownIcon />}
          bg="burlywood"
          _hover={{ bg: "gray" }}
        ></MenuButton>
      </Menu>
    );
  }
  console.log(data);
  //Not logged in
  if (!data?.currentUser.success || !data.currentUser.user) {
    return (
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
    );
  }

  //Logged in
  return (
    <Menu>
      <MenuButton
        icon={<Icon as={CgProfile} w={10} h={10} />}
        as={IconButton}
        rightIcon={<ChevronDownIcon />}
        bg="burlywood"
        _hover={{ bg: "gray" }}
      ></MenuButton>
      <MenuList>
        <MenuItem
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LoginMenu;

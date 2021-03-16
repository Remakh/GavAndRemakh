import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";

const LoginMenu = () => {
  const { loading, data } = useCurrentUserQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

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

  //Not logged in
  if (!data || data?.currentUser.errors || !data.currentUser.user) {
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
            await apolloClient.resetStore();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LoginMenu;

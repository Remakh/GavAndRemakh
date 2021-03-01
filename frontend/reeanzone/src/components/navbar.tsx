import { Box, Flex, Icon, Link } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box w="100%" backgroundColor="burlywood">
      <Flex>
        <Link mt={2} mb={2} mr="1%" ml="auto">
          <RouterLink to="/register">
            <Icon as={CgProfile} w={10} h={10} />
          </RouterLink>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;

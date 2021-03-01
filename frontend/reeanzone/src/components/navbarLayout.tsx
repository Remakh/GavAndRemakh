import { Box } from "@chakra-ui/react";
import Navbar from "./navbar";

export interface NavbarLayoutProps {
  children: React.ReactNode | null;
}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};

export default NavbarLayout;

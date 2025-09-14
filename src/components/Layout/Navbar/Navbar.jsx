import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function AppNavbar() {
  const { isLogedIn, setisLogedIn, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    setisLogedIn(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  console.log(userData);
  

  return (
    <Navbar>
      <NavbarBrand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white logo">
          SocialApp
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={userData?.photo}
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{userData?.name}</span>
            <span className="block truncate text-sm font-medium">
            {userData?.email}
            </span>
          </DropdownHeader>
          <DropdownItem as={Link} to="/login">
            Login
          </DropdownItem>
          <DropdownItem as={Link} to="/register">
            Register
          </DropdownItem>
          {isLogedIn && (
            <>
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem as="button" onClick={handleLogOut}>Sign out</DropdownItem>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>
      {isLogedIn && (
        <NavbarCollapse>
          <NavbarLink as={NavLink} to="/" active>
            Home
          </NavbarLink>
          <NavbarLink as={NavLink} to="/">
            About
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
}

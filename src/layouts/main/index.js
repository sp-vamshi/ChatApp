import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)

  if (isLoggedIn) {
    return <Navigate to="/app" />
  }
  return (
    <Container sx={{ pt: 5, }} maxWidth="sm">

      <Stack spacing={5}>
        <Stack sx={{ width: '100%', }} direction={"column"} alignItems={"center"}>
          <img src={Logo} alt="logo" style={{ height: 120, width: 120 }} />
        </Stack>
      </Stack>
      {/* Main Layout */}
      <Outlet />
    </Container>
  );
};

export default MainLayout;

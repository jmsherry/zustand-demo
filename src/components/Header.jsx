import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            sx={{ my: 2, color: "white", display: "block" }}
            component={NavLink}
            to="/"
          >
            CarsApp
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pathname !== "/add" ? (
              <Button
                sx={{ my: 2, display: "block" }}
                component={NavLink}
                to="/add"
                variant="contained"
                color="secondary"
              >
                Add Car
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

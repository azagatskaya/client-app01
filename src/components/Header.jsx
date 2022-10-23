import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import React from "react";
function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="sm">
        <Toolbar>
          <Typography>Test Notes App</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

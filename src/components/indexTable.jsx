import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Content from "./Content";
import BasicMenu from "../dropdown/drop";

function indexTable() {
  return (
    <>
      <Box sx={{ background: "#eeeee4", height: "740px" }}>
        <AppBar position="static">
          <Toolbar>
            <BasicMenu />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              ROSHAN BOOK STORE
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ marginTop: "15px" }}>
          <Content />
        </Container>
      </Box>
    </>
  );
}

export default indexTable;

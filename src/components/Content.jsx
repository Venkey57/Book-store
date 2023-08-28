import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { getStates } from "../firebase/Server";
import TableList from "./TableList";
import AddModel from "./AddModel";

function Content() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getStates());
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Your books
      </Button>
      <TableList />
      <AddModel open={open} handleClose={handleClose} />
    </Box>
  );
}

export default Content;

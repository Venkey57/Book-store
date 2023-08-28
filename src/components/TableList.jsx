import React, { useState } from "react";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditModel from "./EditModel";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTask } from "../User";
import { deleteTaskList } from "../firebase/Server";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Drop from "../dropdown/Dropss";
import Page from "../pagination/Page";

function TableList() {
  const dispatch = useDispatch();
  // const activeCategory = useSelector((state) => state.task.activeCategory);
  // const rowsPerPage = useSelector((state) => state.task.rowsPerPage);
  // const data = useSelector((state) => state.task.data);
  // console.log(page);
  // console.log(data);
  const { page, data, rowsPerPage, activeCategory } = useSelector(
    (state) => state.task
  );

  const deleteTask = (task) => {
    dispatch(deleteTaskList(task.id));
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = (task) => {
    setOpen(true);
    dispatch(setSelectedTask(task));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = { backgroundColor: "black", color: "#fff" };

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(even)": {
      background: "#eeeee5",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Drop />
      <Container sx={{ marginTop: "10px" }}>
        {activeCategory && (
          <Typography variant="h4" color={"GrayText"} textAlign={"start"}>
            {activeCategory} Books
          </Typography>
        )}
        <TableContainer component={Paper}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={style}>
                  S.NO
                </TableCell>
                <TableCell align="center" style={style}>
                  TITLE
                </TableCell>
                <TableCell align="center" style={style}>
                  AUTHOR
                </TableCell>
                {!activeCategory && (
                  <TableCell align="center" style={style}>
                    CATEGORY
                  </TableCell>
                )}
                <TableCell align="center" style={style}>
                  EDIT
                </TableCell>
                <TableCell align="center" style={style}>
                  DELETE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, index) => (
                  <StyledTableRow key={task.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{task.Title}</TableCell>
                    <TableCell align="center">{task.Author}</TableCell>
                    {activeCategory == "" ? (
                      <TableCell align="center">{task.Category}</TableCell>
                    ) : null}
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        variant="contained"
                        size="large"
                        onClick={() => handleClickOpen(task)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        variant="contained"
                        size="large"
                        color="error"
                        onClick={() => deleteTask(task)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <EditModel open={open} handleClose={handleClose} />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          <Page />
        </Box>
      </Container>
    </>
  );
}

export default TableList;

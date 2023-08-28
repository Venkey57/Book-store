import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addTaskToList } from "../firebase/Server";
import { useDispatch } from "react-redux";

function AddModel(props) {
  const data = {
    Title: "",
    Category: "",
    Author: "",
    CoverImage: null,
  };
  const [state, setState] = useState(data);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCancelButton = () => {
    props.handleClose();
    setError({
      TitleEror: "",
      AuthorEror: "",
      CatrgoryEror: "",
      CoverImage: null,
    });
  };
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setState((prev) => ({
      ...prev,
      CoverImage: file,
    }));
  };
  const validation = () => {
    const error = {};
    if (!state.Title) {
      error["TitleEror"] = "Title Requrired";
    }
    if (!state.Author) {
      error["AuthorEror"] = "Author Name Requrired";
    }
    if (state.Category == "") {
      error["CatrgoryEror"] = "selecct type of catrgory";
    }
    if (!state.CoverImage) {
      error["CoverImage"] =
        "upload Your CoverImage in .png .jpg & .jpeg Format";
    }
    setError(error);
    return Object.keys(error).length === 0;
  };
  const handleAddBook = async (task) => {
    const isvalidate = validation();
    if (isvalidate) {
      await dispatch(addTaskToList(task));
      props.handleClose();
      setState({
        Title: "",
        Category: "",
        Author: "",
        CoverImage: null,
      });
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          {error.TitleEror !== "" ? (
            <span style={{ color: "red" }}>{error.TitleEror}</span>
          ) : null}
          <TextField
            autoFocus
            margin="dense"
            id="Title"
            name="Title"
            label="Title"
            type="text"
            value={state.Title}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          {error.AuthorEror !== "" ? (
            <span style={{ color: "red" }}>{error.AuthorEror}</span>
          ) : null}
          <TextField
            autoFocus
            margin="dense"
            id="Author"
            name="Author"
            label="Author"
            type="text"
            value={state.Author}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          {error.CatrgoryEror !== "" ? (
            <span style={{ color: "red" }}>{error.CatrgoryEror}</span>
          ) : null}
          <TextField
            autoFocus
            margin="dense"
            id="Category"
            label="Category"
            select
            name="Category"
            value={state.Category}
            onChange={handleChange}
            fullWidth
            variant="standard"
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="Historical">Historical</option>
            <option value="Mystery">Mystery</option>
            <option value="Fantasy">Fantasy</option>
          </TextField>
          {error.CoverImage !== "" ? (
            <span style={{ color: "red" }}>{error.CoverImage}</span>
          ) : null}
          <TextField
            autoFocus
            margin="dense"
            id="CoverImage"
            label="CoverImage"
            name="CoverImage"
            onChange={handleCoverImageChange}
            type="file"
            accept=".jpg,.png,.jpeg"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCancelButton()}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleAddBook(state)}
            variant="contained"
            color="success"
          >
            Add book
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddModel;

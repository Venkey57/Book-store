import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskToList } from "../firebase/Server";

function FormDialog(props) {
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.task.selectedTask);

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setId(selectedTask.id);
      setTitle(selectedTask.Title);
      setAuthor(selectedTask.Author);
    }
  }, [selectedTask]);

  const update = () => {
    dispatch(updateTaskToList({ id, Title, Author }));
    props.handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <label htmlFor="title">Title</label>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
          <label htmlFor="Name">Author</label>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={() => update()} variant="contained" color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;

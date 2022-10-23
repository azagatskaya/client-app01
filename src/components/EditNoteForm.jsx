import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AppContext } from "../context/AppContext";

function EditFormDialog() {
  const { isEditOpen, updateNote, noteToEdit, changeEditOpenState } =
    useContext(AppContext);
  const [id, setId] = useState(noteToEdit.id);
  const [title, setTitle] = useState(noteToEdit.title);
  const [text, setText] = useState(noteToEdit.body);

  useEffect(() => {
    setId(noteToEdit.id);
    setTitle(noteToEdit.title);
    setText(noteToEdit.body);
  }, [noteToEdit]);

  const handleClose = () => {
    changeEditOpenState();
  };

  const handleSave = (e) => {
    console.log("save click");
    if (validateFileds()) updateNote({ id: id, title: title, text: text });
  };

  const validateFileds = () => {
    return !!title && !!text;
  };

  const handleChange = (e) => {
    const type = e.target.dataset.type;
    const value = e.target.value;
    switch (type) {
      case "title":
        setTitle(value);
        break;
      case "text":
        setText(value);
        break;
      default:
        throw Error("Unknown input type");
    }
  };

  return (
    <div>
      <Dialog open={isEditOpen} onClose={handleClose}>
        <DialogTitle>Update record</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              width: "550px",
              "& .MuiTextField-root": { m: 1, width: "30ch" },
              "& .MuiButton-contained": {
                m: 1,
              },
              mt: "25px",
              mb: "25px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-textarea"
              label="Title"
              placeholder="Type the title"
              value={title}
              inputProps={{ "data-type": "title" }}
              onChange={handleChange}
              multiline
            />
            <TextField
              required
              id="outlined-textarea"
              label="Text"
              placeholder="Type your note"
              value={text}
              inputProps={{ "data-type": "text" }}
              onChange={handleChange}
              multiline
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditFormDialog;

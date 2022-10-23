import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function AddNoteForm() {
  const { addNote } = useContext(AppContext);
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const handleAddNote = (e) => {
    console.log("add click");
    if (validateFileds()) addNote({ title: title, text: text });
    clearFields();
  };

  const validateFileds = () => {
    return !!title && !!text;
  };
  const clearFields = () => {
    setTitle("");
    setText("");
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
    <Container maxWidth="sm">
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
        <Button variant="contained" onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
    </Container>
  );
}

export default AddNoteForm;

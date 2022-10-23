import "./App.css";
import Header from "./components/Header";
import AddNoteForm from "./components/AddNoteForm";
import NotesList from "./components/NotesList";
import Stack from "@mui/material/Stack";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Stack>
        <Header />
        <AddNoteForm />
        <NotesList />
      </Stack>
    </AppContextProvider>
  );
}

export default App;

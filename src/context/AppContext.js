import React, { useState, useEffect, createContext } from "react";

const AppContext = createContext();
const url = "http://localhost:";
const PORT = 3000;

function AppContextProvider(props) {
  const [rowsData, setRowsData] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({});

  useEffect(() => {
    getNotes();
  }, []);

  function createData(id, title, body) {
    return { id, title, body };
  }

  async function getNotes() {
    const result = await fetch(`${url}${PORT}/getnotes`, {
      method: "GET",
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    const data = await result.json();
    const rData = await data.reduce((res, note) => {
      return (res = [...res, createData(note.id, note.title, note.body)]);
    }, []);

    setRowsData(rData);
    return rData;
  }

  async function getNoteById(idArr) {
    const note = rowsData.filter((row) => row.id === idArr[0]);

    setNoteToEdit(...note);
    console.log(...note);
    return note[0];
  }
  async function getHeaders() {
    const result = await fetch(`${url}${PORT}/getheaders`, {
      method: "GET",
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });
    const data = await result.json();
    return data;
  }

  async function addNote(note) {
    console.log("add note context");
    const newNote = JSON.stringify(note);
    const result = await fetch(`${url}${PORT}/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: newNote,
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });
    getNotes();
    return result;
  }
  async function deleteNotes(idArr) {
    console.log("delete note context");
    const ids = JSON.stringify(idArr);
    const result = await fetch(`${url}${PORT}/deletenotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: ids,
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });
    getNotes();
    return result;
  }
  async function updateNote(note) {
    console.log("update note context");
    const result = await fetch(`${url}${PORT}/updatenote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(note),
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });
    getNotes();
    return result;
  }

  const changeEditOpenState = () => {
    setIsEditOpen((prevState) => !prevState);
  };

  const headCells = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "title",
      numeric: false,
      disablePadding: false,
      label: "Title",
    },
    {
      id: "body",
      numeric: false,
      disablePadding: false,
      label: "Text",
    },
  ];

  return (
    <AppContext.Provider
      value={{
        getNotes,
        getHeaders,
        headCells,
        rowsData,
        getNoteById,
        addNote,
        deleteNotes,
        updateNote,
        changeEditOpenState,
        isEditOpen,
        noteToEdit,
        createData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };

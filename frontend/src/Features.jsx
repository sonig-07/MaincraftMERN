import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./App.css";

function Features() {

  const [notes, setNotes] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const token =
    localStorage.getItem("token");


  // FETCH NOTES
  const fetchNotes = async () => {

    try {

      const res =
        await axios.get(

          `http://localhost:5000/notes?search=${search}&page=${page}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setNotes(res.data.notes);

      setTotalPages(
        res.data.totalPages
      );

    } catch (err) {

      console.log(err);

    }
  };


  useEffect(() => {

    fetchNotes();

  }, [search, page]);


  // ADD NOTE
  const addNote = async () => {

    if (!title || !content) {

      alert("Fill all fields");

      return;
    }

    try {

      await axios.post(

        "http://localhost:5000/notes",

        {
          title,
          content
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setTitle("");

      setContent("");

      fetchNotes();

    } catch (err) {

      console.log(err);

    }
  };


  // EDIT NOTE
  const editNote =
    async (note) => {

      const newTitle = prompt(
        "Edit title",
        note.title
      );

      const newContent = prompt(
        "Edit content",
        note.content
      );

      if (
        !newTitle ||
        !newContent
      ) return;

      try {

        await axios.put(

          `http://localhost:5000/notes/${note._id}`,

          {
            title: newTitle,
            content: newContent
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchNotes();

      } catch (err) {

        console.log(err);

      }
  };


  // DELETE NOTE
  const deleteNote =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:5000/notes/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchNotes();

      } catch (err) {

        console.log(err);

      }
  };


  return (

    <div className="notes-page">

      <div className="notes-container">

        <h1>My Notes</h1>


        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search notes..."

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          className="search-input"

        />


        {/* FORM */}

        <div className="note-form">

          <input

            type="text"

            placeholder="Note title"

            value={title}

            onChange={(e)=>
              setTitle(e.target.value)
            }

          />

          <textarea

            placeholder="Write your note..."

            value={content}

            onChange={(e)=>
              setContent(e.target.value)
            }

          />

          <button onClick={addNote}>

            Add Note

          </button>

        </div>


        {/* NOTES */}

        <div className="notes-grid">

          {notes.map((note) => (

            <div
              key={note._id}
              className="note-card"
            >

              <h3>
                {note.title}
              </h3>

              <p>
                {note.content}
              </p>

              <div className="note-buttons">

                <button

                  className="edit-btn"

                  onClick={() =>
                    editNote(note)
                  }

                >

                  Edit

                </button>

                <button

                  className="delete-btn"

                  onClick={() =>
                    deleteNote(note._id)
                  }

                >

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>


        {/* PAGINATION */}

        <div className="pagination">

          <button

            disabled={page === 1}

            onClick={() =>
              setPage(page - 1)
            }

          >

            Previous

          </button>

          <span>

            Page {page}

          </span>

          <button

            disabled={
              page === totalPages
            }

            onClick={() =>
              setPage(page + 1)
            }

          >

            Next

          </button>

        </div>

      </div>

    </div>

  );
}

export default Features;
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./App.css";

import { io }
from "socket.io-client";

import {
  ToastContainer,
  toast
} from "react-toastify";

import
"react-toastify/dist/ReactToastify.css";


// SOCKET CONNECTION
const socket =
  io("http://localhost:5000");


function Features() {

  const [notes, setNotes] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [debouncedSearch,
    setDebouncedSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  // MODAL STATES
  const [showModal,
    setShowModal] =
    useState(false);

  const [selectedNote,
    setSelectedNote] =
    useState(null);

  const [editTitle,
    setEditTitle] =
    useState("");

  const [editContent,
    setEditContent] =
    useState("");

  const token =
    localStorage.getItem("token");


  // DEBOUNCED SEARCH
  useEffect(() => {

    const timer =
      setTimeout(() => {

        setDebouncedSearch(
          search
        );

      }, 500);

    return () =>
      clearTimeout(timer);

  }, [search]);


  // FETCH NOTES
  const fetchNotes = async () => {

    try {

      setLoading(true);

      setError("");

      const res =
        await axios.get(

          `http://localhost:5000/notes?search=${debouncedSearch}&page=${page}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }
        );

      setNotes(
        res.data.notes
      );

      setTotalPages(
        res.data.totalPages
      );

    } catch (err) {

      console.log(err);

      setError(
        "Failed to fetch notes"
      );

    } finally {

      setLoading(false);

    }
  };


  // REAL-TIME LISTENER
  useEffect(() => {

    fetchNotes();

    socket.on(

      "refreshNotes",

      () => {

        fetchNotes();

      }
    );

    return () => {

      socket.off(
        "refreshNotes"
      );

    };

  }, [debouncedSearch, page]);


  // ADD NOTE
  const addNote = async () => {

    if (!title || !content) {

      toast.error(
        "Fill all fields"
      );

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

      socket.emit(
        "noteUpdated"
      );

      toast.success(
        "Note added"
      );

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to add note"
      );

    }
  };


  // OPEN MODAL
  const openEditModal =
    (note) => {

      setSelectedNote(note);

      setEditTitle(
        note.title
      );

      setEditContent(
        note.content
      );

      setShowModal(true);
  };


  // UPDATE NOTE
  const updateNote =
    async () => {

      try {

        await axios.put(

          `http://localhost:5000/notes/${selectedNote._id}`,

          {

            title: editTitle,

            content: editContent

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }
        );

        fetchNotes();

        socket.emit(
          "noteUpdated"
        );

        toast.success(
          "Note updated"
        );

        setShowModal(false);

      } catch (err) {

        console.log(err);

        toast.error(
          "Update failed"
        );

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

        socket.emit(
          "noteUpdated"
        );

        toast.success(
          "Note deleted"
        );

      } catch (err) {

        console.log(err);

        toast.error(
          "Delete failed"
        );

      }
  };


  return (

    <div className="notes-page">

      <ToastContainer />

      <div className="notes-container">

        <h1>
          My Notes
        </h1>


        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search notes..."

          value={search}

          onChange={(e)=>

            setSearch(
              e.target.value
            )

          }

          className="search-input"

        />


        {/* NOTE FORM */}

        <div className="note-form">

          <input

            type="text"

            placeholder="Note title"

            value={title}

            onChange={(e)=>

              setTitle(
                e.target.value
              )

            }

          />

          <textarea

            placeholder="Write your note..."

            value={content}

            onChange={(e)=>

              setContent(
                e.target.value
              )

            }

          />

          <button
            onClick={addNote}
          >

            Add Note

          </button>

        </div>


        {/* LOADING */}

        {loading && (

          <h2
            style={{
              textAlign: "center"
            }}
          >

            Loading...

          </h2>

        )}


        {/* ERROR */}

        {error && (

          <h3
            style={{
              color: "red",
              textAlign: "center"
            }}
          >

            {error}

          </h3>

        )}


        {/* EMPTY STATE */}

        {!loading &&
        notes.length === 0 && (

          <div
            className="empty-state"
          >

            <h2>
              No Notes Found
            </h2>

            <p>
              Create your
              first note 😄
            </p>

          </div>

        )}


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
                    openEditModal(note)
                  }

                >

                  Edit

                </button>

                <button

                  className="delete-btn"

                  onClick={() =>
                    deleteNote(
                      note._id
                    )
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


      {/* EDIT MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="edit-modal">

            <h2>
              Edit Note
            </h2>

            <input

              type="text"

              value={editTitle}

              onChange={(e)=>

                setEditTitle(
                  e.target.value
                )

              }

            />

            <textarea

              value={editContent}

              onChange={(e)=>

                setEditContent(
                  e.target.value
                )

              }

            />

            <div className="modal-buttons">

              <button
                onClick={updateNote}
              >

                Save

              </button>

              <button

                className="cancel-btn"

                onClick={() =>
                  setShowModal(false)
                }

              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Features;
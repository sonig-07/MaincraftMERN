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

  const token =
    localStorage.getItem("token");

  // FETCH NOTES
  const fetchNotes = async () => {

    try {

      const res =
        await axios.get(

          "http://localhost:5000/notes",

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      setNotes(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchNotes();

  }, []);

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
            Authorization: `Bearer ${token}`
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
              Authorization: `Bearer ${token}`
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

          ))}

        </div>

      </div>

    </div>

  );
}

export default Features;
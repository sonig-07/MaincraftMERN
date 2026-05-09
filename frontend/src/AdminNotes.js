import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminNotes() {

  const [notes, setNotes] =
    useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    fetchAllNotes();

  }, []);

  const fetchAllNotes =
    async () => {

      try {

        const res =
          await axios.get(

            "http://localhost:5000/admin/notes",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setNotes(res.data);

      } catch (err) {

        console.log(err);

      }
  };

  return (

    <div style={{
      padding: "20px"
    }}>

      <h2>
        Admin Notes Panel
      </h2>

      {notes.map((note) => (

        <div

          key={note._id}

          style={{

            background: "black",

            padding: "15px",

            marginBottom: "15px",

            borderRadius: "10px"

          }}

        >

          <h3>
            {note.title}
          </h3>

          <p>
            {note.content}
          </p>

          <small>

            Owner:
            {" "}
            {note.owner?.name}
            {" "}
            (
            {note.owner?.email}
            )

          </small>

        </div>

      ))}

    </div>
  );
}

export default AdminNotes;
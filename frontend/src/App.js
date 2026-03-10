import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

const [tasks, setTasks] = useState([]);
const [text, setText] = useState("");

useEffect(() => {

axios.get("http://localhost:5000/tasks")
.then((res) => {
setTasks(res.data);
});

}, []);

const addTask = () => {

if (!text) {
alert("Task cannot be empty");
return;
}

axios.post("http://localhost:5000/add", { text })
.then((res) => {

setTasks([ res.data, ...tasks]);
setText("");

});

};

const updateTask = (id, oldText) => {

const newText = prompt("Edit task:", oldText);

if (!newText) return;

axios.put(`http://localhost:5000/update/${id}`, { text: newText })
.then((res) => {

setTasks(tasks.map(task =>
task._id === id ? res.data : task
));

});

};

const deleteTask = (id) => {

axios.delete(`http://localhost:5000/delete/${id}`)
.then(() => {

setTasks(tasks.filter(task =>
task._id !== id
));

});

};

return (

<div className="app">

<h1>My Tasks</h1>

<div className="task-input">

<input
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="Enter new task"
/>

<button onClick={addTask}>Add</button>

</div>

<ul className="task-list">

{tasks.map((task) => (

<li key={task._id} className="task-item">

<span>{task.text}</span>

<div className="task-buttons">

<button className="edit-btn"
onClick={() => updateTask(task._id, task.text)}>
Edit
</button>

<button className="delete-btn"
onClick={() => deleteTask(task._id)}>
Delete
</button>

</div>

</li>

))}

</ul>

</div>

);

}

export default App;
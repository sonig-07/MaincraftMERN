const express = require("express");
const router = express.Router();

const Task = require("../models/Task");


/* ADD TASK */

router.post("/add", async (req, res) => {

    const newTask = new Task({
        text: req.body.text
    });

    await newTask.save();

    res.json(newTask);

});


/* GET ALL TASKS */

router.get("/tasks", async (req, res) => {

    const tasks = await Task.find();

    res.json(tasks);

});


/* UPDATE TASK */

router.put("/update/:id", async (req, res) => {

    const { id } = req.params;
    const { text } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { text },
        { new: true }
    );

    res.json(updatedTask);

});


/* DELETE TASK */

router.delete("/delete/:id", async (req, res) => {

    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted" });

});


module.exports = router;
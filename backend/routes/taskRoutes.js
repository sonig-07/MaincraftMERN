const express = require("express");

const router = express.Router();

const Task = require("../models/Task");


router.post("/add", async (req, res) =>
{

    try
    {

        const newTask = new Task(
        {
            text: req.body.text
        });

        await newTask.save();

        res.json(newTask);

    }

    catch (error)
    {
        res.status(500).json(
        {
            error: error.message
        });
    }

});


router.get("/tasks", async (req, res) =>
{

    try
    {

        const tasks = await Task.find();

        res.json(tasks);

    }

    catch (error)
    {

        res.status(500).json(
        {
            error: error.message
        });

    }

});


module.exports = router;
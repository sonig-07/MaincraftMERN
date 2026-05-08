const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");


// ROUTES
const taskRoutes =
require("./routes/taskRoutes");

const authRoutes =
require("./routes/authRoutes");

const noteRoutes =
require("./routes/noteRoutes");


dotenv.config();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/", taskRoutes);

app.use("/", authRoutes);

app.use("/", noteRoutes);


// DATABASE
mongoose.connect(
process.env.MONGO_URI
)

.then(() => {

console.log("MongoDB Connected");

})

.catch((err) => {

console.log(err);

});


// SERVER
const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

console.log(
`Server running on port ${PORT}`
);

});
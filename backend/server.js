const express =
require("express");

const mongoose =
require("mongoose");

const cors =
require("cors");

const dotenv =
require("dotenv");

const http =
require("http");

const helmet =
require("helmet");

const rateLimit =
require("express-rate-limit");

const { Server } =
require("socket.io");


// ROUTES
const taskRoutes =
require("./routes/taskRoutes");

const authRoutes =
require("./routes/authRoutes");

const noteRoutes =
require("./routes/noteRoutes");


dotenv.config();

const app = express();


// HTTP SERVER
const server =
http.createServer(app);


// SOCKET.IO
const io = new Server(server, {

  cors: {

    origin:
      process.env.CLIENT_URL,

    credentials: true

  }

});


// SOCKET CONNECTION
io.on(

  "connection",

  (socket) => {

    console.log(
      "User Connected"
    );

    // NOTE UPDATE EVENT
    socket.on(

      "noteUpdated",

      () => {

        socket.broadcast.emit(

          "refreshNotes"

        );

      }
    );

    // DISCONNECT
    socket.on(

      "disconnect",

      () => {

        console.log(
          "User Disconnected"
        );

      }
    );
});


// SECURITY MIDDLEWARE
app.use(helmet());


// RATE LIMITING
const limiter =
rateLimit({

  windowMs:
    15 * 60 * 1000,

  max: 100,

  message:
    "Too many requests. Please try again later."

});

app.use(limiter);


// CORS
app.use(cors({

  origin:
    process.env.CLIENT_URL,

  credentials: true

}));


// BODY PARSER
app.use(express.json());


// ROUTES
app.use("/", taskRoutes);

app.use("/", authRoutes);

app.use("/", noteRoutes);


// DATABASE CONNECTION
mongoose.connect(

  process.env.MONGO_URI

)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

  // SERVER START
  server.listen(

    process.env.PORT || 5000,

    () => {

      console.log(

        `Server running on port ${process.env.PORT || 5000}`

      );

    }
  );

})

.catch((err) => {

  console.log(err);

});
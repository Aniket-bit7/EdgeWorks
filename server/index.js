const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.js");

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});

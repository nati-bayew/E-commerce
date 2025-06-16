const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookiePparser = require("cookie-parser");
const authRouter = require("./routes/auth-routes/auth");
const app = express();

mongoose
  .connect("mongodb://localhost/T-shitio")
  .then(() => console.log("Successfully connected to mongodb..."))
  .catch((error) =>
    console.log("Opps Someting got wrong connection faild!...")
  );
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "pragma",
    ],
    credentials: true,
  })
);
app.use(cookiePparser);
app.use(express.json());

app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running on port: ${port}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth-routes/auth");
const adminProductsRouter = require("./routes/admin/products-route");
const shopProductsRouter = require("./routes/shop/products-routes");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/T-shitio")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port: ${port}`));

//muler
/*
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth-routes/auth");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/T-shitio")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
*/

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const path = require("path");

// Use CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the Angular client folder
app.use(
  express.static(path.join(__dirname, "dist", "equipped-after-dark", "browser"))
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

// Define API routes
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);

// Serve the Angular app for the root URL and all other routes
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist", "equipped-after-dark", "browser", "index.html")
  );
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist", "equipped-after-dark", "browser", "index.html")
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

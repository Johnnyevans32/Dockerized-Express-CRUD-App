const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express CRUD API." });
});

// Initialize database and start server
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Failed to synchronize database:", err);
  });

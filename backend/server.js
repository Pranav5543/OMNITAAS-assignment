const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors()); // Allow all origins for debugging connection issues

// ─── Hardcoded valid credentials ─────────────────────────────────────────────
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin";

// ─── POST /login ─────────────────────────────────────────────────────────────
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 400 — missing fields
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  // 401 — invalid credentials
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password.",
    });
  }

  // 200 — success
  return res.status(200).json({
    success: true,
    message: "Login successful!",
    username,
  });
});

// ─── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

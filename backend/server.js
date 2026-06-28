const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

// Read users
const getUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  } catch {
    return [];
  }
};

// Save users
const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Home Route
app.get("/", (req, res) => {
  res.send("Netflix Authentication API Running...");
});

// Register API
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  const users = getUsers();

  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  users.push({
    name,
    email,
    password,
  });

  saveUsers(users);

  res.status(201).json({
    message: "Registration successful",
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    message: "Login successful",
    user,
  });
});

// Dashboard API
app.get("/dashboard", (req, res) => {
  res.json({
    message: "Welcome to Dashboard",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
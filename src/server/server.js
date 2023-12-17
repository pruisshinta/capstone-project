const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "culture_vooyager",
});

// Membuat koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL database");
});

function validate(username, password) {
  // Pemeriksaan apakah username dan password tidak boleh null atau undefined
  if (username == null || password == null) {
    return false;
  }
  return true;
}

function authenticateToken(req, res, next) {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  // Pisahkan token dari kata "Bearer"
  const token = tokenHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Invalid token format" });
  }

  jwt.verify(token, "as", (err, user) => {
    if (err) {
      console.log(err.stack);
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    req.user = user;
    next();
  });
}
const secretKey = "as"; // Gantilah dengan kunci rahasia yang kuat
function generateToken(username) {
  const secretKey = "as"; // Gantilah dengan kunci rahasia yang kuat
  const expiresIn = "1h"; // Token berlaku selama 1 jam

  return jwt.sign({ username }, secretKey, { expiresIn });
}

app.get("/user", authenticateToken, (req, res) => {
  const { username } = req.user;

  // Query untuk mendapatkan data pengguna dari database berdasarkan username
  const query = "SELECT * FROM user WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = results[0];
    res.json({ user });
  });
});

// API endpoint untuk login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Query untuk mendapatkan informasi pengguna dari database berdasarkan username
  const query = "SELECT * FROM user WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const user = results[0];

    // Memeriksa apakah kata sandi cocok menggunakan bcrypt
    bcrypt.compare(password, user.password, (bcryptErr, match) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!match) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Jika login berhasil, buat token dan atur waktu kedaluwarsa
      const token = generateToken(username);

      // Simpan token dan waktu kedaluwarsa di database
      res.json({ message: "Login successful", token });
    });
  });
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  console.log(password);

  // Pengecekan apakah username sudah digunakan
  const checkUsernameQuery = "SELECT * FROM user WHERE username = ?";
  db.query(checkUsernameQuery, [username], (checkUsernameErr, results) => {
    if (checkUsernameErr) {
      console.error("Error checking username:", checkUsernameErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Jika username sudah digunakan, kirim respons kesalahan
    if (results.length > 0) {
      res.status(400).json({ error: "Username sudah digunakan" });
      return;
    }

    // Lanjutkan dengan proses pendaftaran jika username belum digunakan
    var isValidate = validate(username, password);

    if (!isValidate) {
      res.status(400).json({ error: "Harap Masukkan data yang benar" });
      return;
    }

    // Hashing password menggunakan bcrypt
    bcrypt.hash(password, 10, (hashErr, hash) => {
      if (hashErr) {
        console.error("Error hashing password:", hashErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Query untuk menyimpan pengguna baru ke database
      const insertQuery =
        "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
      db.query(insertQuery, [username, hash, email], (insertErr) => {
        if (insertErr) {
          console.error("Error inserting user into database:", insertErr);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.json({ message: "Registration successful" });
      });
    });
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohammadtajutzamzami07@gmail.com",
    pass: "muixdeabbgfkrgon",
  },
});

const user = {
  id: 1,
  email: "mohammadtajutzamzami07@gmail.com",
  isVerified: false,
};

// Generate a JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
}

function sendVerificationEmail(user) {
  const token = generateToken(user);

  const mailOptions = {
    from: "mohammadtajutzamzami07@gmail.com",
    to: user.email,
    subject: "Email Verification",
    html: `<p>Click the following link to verify your email:</p>
           <a href="http://localhost:3000/verify?token=${token}">Verify Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent:", info.response);
  });
}

app.get("/verify", (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send("Invalid token");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    // Update user's verification status (this should be stored in your database)
    user.isVerified = true;
    res.send("Email verified successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/send-verification', (req, res) => {
  sendVerificationEmail(user);
  res.send('Verification email sent!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

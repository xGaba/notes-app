import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import { Strategy } from "passport-local";
import dotenv from "dotenv";
import { hash } from "crypto";
import bcryptjs from "bcryptjs";

const app = express();
const port = 3000;
dotenv.config();
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/notes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Error al recuperar las notas");
  }
});

app.get("/login", (req, res) => {});

app.post("/note-app", async (req, res) => {
  const { title, content } = req.body;
  try {
    await db.query("INSERT INTO notes (title, content) VALUES ($1, $2)", [
      title,
      content,
    ]);
    console.log(req.body);
    res.send("Nota enviada correctamente");
  } catch (error) {
    console.log("Error: ", error);
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.json({ success: false, message: "Incorrect credentials" });
    } else {
      bcryptjs.hash(password, saltRounds, async (error, hash) => {
        if (error) {
          res.json({ success: false, message: "Error hashing the password" });
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (error) => {
            if (error) {
              return res.json({
                success: false,
                message: "Error logging the user",
              });
            } else {
              return res.json({success: true, message: "User registres successfully"})
            }
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/notes/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Note deleted" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro deleting the note");
  }
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

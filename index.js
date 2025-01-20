import env from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";

const app = express();
const port = 3000;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.get("/", () => {
  console.log("hi");
});

app.post("/note-app", (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: "Nota añadida correctamente" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

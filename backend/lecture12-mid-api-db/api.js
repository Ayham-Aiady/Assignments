import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "user-login",
  password: "1234",
  port: 5432,
});

db.connect()
  .then(() => {
    console.log("connected to postgreSQL");
  })
  .catch({});



  app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id");
    res.json(result.rows);
  } catch (error) {
  res.status(500).json({ error: error.message });
}
});


app.post("/users", async (req, res) => {
  const { email, name, phoneNumber,address,gender } = req.body;
  console.log(req.body);
  try {
    const result = await db.query(
      "INSERT INTO users(email,name,phonenumber,address,gender) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [ email, name, phoneNumber,address,gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
  console.error("❌ Error in POST /users:", error);
  res.status(500).json({ message: "Internal server error", error: error.message });
}

});



app.listen(port, () => {
  console.log("Server running at API http://localhost:4000");
});

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "1234",
  port: 5432,
});

db.connect()
  .then(() => {
    console.log("connected to postgreSQL");
  })
  .catch({});

// let posts = [
//     {
//         id:1,
//         title:"jomayka",
//         content:"kabab res that sells the sandwish in 1 jd",
//         author:"ayham xd",
//         date:"2025-05-09",

//     },
//     {
//         id:2,
//         title:"jomayka",
//         content:"kabab res that sells the sandwish in 1 jd",
//         author:"ayham xd",
//         date:"2025-05-09",
//     },
//     {
//         id:3,
//         title:"jomayka",
//         content:"kabab res that sells the sandwish in 1 jd",
//         author:"ayham xd",
//         date:"2025-05-09",
//     },

// ];

// let lastId=3;

app.get("/posts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id");
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(404).json({ error: "post not found" });
  } catch {
    res.status(500).json({ error: error.message });
  }
});

app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body);
  try {
    const result = await db.query(
      "INSERT INTO posts(title,content,author) VALUES($1,$2,$3) RETURNING *",
      [title, content, author]
    );
    res.send(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
  try {
    const fields = [];
    const values = [];
    let count = 1;
    if (title) {
      fields.push(`title = $${count++}`);
      values.push(title);
    }
    if (content) {
      fields.push(`content = $${count++}`);
      values.push(content);
    }
    if (author) {
      fields.push(`author = $${count++}`);
      values.push(author);
    }
    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    fields.push(`date = NOW()`);
    values.push(id);

    // const result = await db.query(
    //     `UPDATE posts SET ${fields.join(", ")}
    //     ,date= NOW() WHERE id= $${count} RETURNING *`,
    //     values
    // );
    const query = `
      UPDATE posts SET ${fields.join(", ")}
      WHERE id = $${count}
      RETURNING *;
    `;
    const result = await db.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: `post ${id} not found` });
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
});

app.put("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
  try {
    const result = await db.query(
      "UPDATE posts SET title =$1, content=$2, author=$3 ,date= NOW() WHERE id= $4 RETURNING *",
      [title, content, author, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: `post ${id} not found` });
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.sendStatus(200);
      

    } else {
      res.status(404).json({ error: `post ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("Server running at API http://localhost:4000");
});

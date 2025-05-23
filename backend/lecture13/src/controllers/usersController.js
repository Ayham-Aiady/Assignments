import pool from "../config/db.js";
const db = pool;

//create


// export const createUser = async (req,res)=>{
//     const{name,email}=req.body;
//     try{
// await pool.query('INSERT INTO users (name,email) VALUES ($1,$2)',
//         [name,email]
//     );
//     }catch(err){

//     }
    
// };


//READ

// export const getUsers = async (req,res)=>{
//     const result = await pool.query('SELECT * FROM users')
//   res.render('index.ejs',{users:result.rows});
// };


//update

// export const updateUsers = async (req,res)=>{
//     const {name , email}= req.body;
//     const id = req.params.id;
//      await pool.query('UPDATE users SET name =$1 , email = $2 VALUES WHERE id=$3 ',
//         [name,
//             email,
//             id,
//         ]
//      );
  
// };



//delete

// export const deleteUser = async (req,res)=>{
//      const id = req.params.id;
//  await pool.query('DELETE FROM users WHERE id =$1',[id]);
 
// };


//////////////////////////////////////////////////////////////////////////
export const getPosts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id");
    res.json(result.rows);
    res.render('index.ejs')
  } catch {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(404).json({ error: "post not found" });
  } catch {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
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
};

export const editPost = async (req, res) => {
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
};

export const rePost = async (req, res) => {
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
};

export const deletePost = async (req, res) => {
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
};
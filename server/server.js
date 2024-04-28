import express from "express";
import cors from 'cors';
import { connectDatabase, closeDatabase, client } from "./db.js";
import { createTableUsers } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDatabase()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });

  app.post('/signup', async (req, res) => {
    const { firstName: first_name, lastName: last_name, email, password } = req.body;
    await createTableUsers();

    try {
      const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);

      if (userExists.rows.length > 0) {
          res.status(409).send("User already exists");
          return;
      }
        const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
        const values = [first_name, last_name, email, password];
        await client.query(query, values);
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).send("An error occurred while creating the user");
    }
})

// app.post('/signup', async (req, res) => {
//     const { first_name, last_name, email, password } = req.body;

//     try {
//         const query = (`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`, [first_name, last_name, email, password]);
//         await client.query(query);
//         res.status(201).send("User created successfully");
//     } catch (error) {
//         console.error("Error creating user", error);
//         res.status(500).send("An error occurred while creating the user");
//     }
// })

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
import express from "express";
import cors from 'cors';
import { connectDatabase, closeDatabase, client } from "./db.js";
import { createTableUsers } from "./database.js";
import sendEmail from "./sendEmailVerification.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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
    const { firstName, lastName, email, password } = req.body;
    await createTableUsers();

    try {
        const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userExists.rows.length > 0) {
            return res.status(409).send("User already exists");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const verificationToken = crypto.randomBytes(16).toString('hex');

        const query = 'INSERT INTO users (first_name, last_name, email, password, verification_token, is_verified) VALUES ($1, $2, $3, $4, $5, false)';
        const values = [firstName, lastName, email, hashedPassword, verificationToken];
        await client.query(query, values);

        await sendEmail(email, firstName, verificationToken);

        res.status(201).send("User created successfully. Check your email to verify your account.");
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).send("An error occurred while creating the user");
    }
});

app.get('/verify-email', async (req, res) => {
  const { token, email } = req.query;

  try {
      const result = await client.query('UPDATE users SET is_verified = true WHERE email = $1 AND verification_token = $2 AND is_verified = false', [email, token]);

      if (result.rowCount > 0) {
          res.send("Email verified successfully!");
      } else {
          res.status(400).send("Invalid or expired email verification link");
      }
  } catch (error) {
      console.error("Failed to verify email", error);
      res.status(500).send("An error occurred during email verification");
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).send("Invalid email");
        }
        
        const user = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send("Invalid password");
        }

        if (!user.is_verified) {
            return res.status(403).send("Email not verified");
        }

        res.send("Login successful");
    } catch (error) {
        console.error("Error logging in", error);
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
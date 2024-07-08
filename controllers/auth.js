import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysqlConnection from '../config/db.js';

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Wrap the MySQL query in a Promise to use async/await
    const insertUser = () => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, passwordHash, email], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    };

    const results = await insertUser();
    res.status(201).send({ message: 'User registered successfully', userId: results.insertId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/* LOGIN USER */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const queryUser = () => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]); // Assuming username is unique
          }
        });
      });
    };

    const user = await queryUser();

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
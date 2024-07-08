import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const mysqlConnection = require('../config/db');
// import User from "../models/User.js";

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
    // Catch any errors that occur during the process
    res.status(500).send({ error: error.message });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
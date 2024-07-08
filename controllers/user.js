import mysqlConnection from '../db/mysql.js';
import bcrypt from 'bcryptjs';

/* CREATE PROFILE */
exports.createProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const result = await new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      mysqlConnection.query(query, [name, email, hashedPassword], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    res.status(201).send({ message: 'Profile created successfully', userId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).send({ error: 'Email already exists.' });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
};

/* GET PROFILE */
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      mysqlConnection.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

/* UPDATE PROFILE */
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;

  try {
    const updateQuery = `
      UPDATE users
      SET name = ?, password = ?, email = ?
      WHERE id = ?
    `;
    const hashedPassword = await hashPassword(password);

    const result = await new Promise((resolve, reject) => {
      mysqlConnection.query(updateQuery, [name, hashedPassword, email, userId], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    if (result.affectedRows > 0) {
      res.send({ message: 'Profile updated successfully.' });
    } else {
      res.status(404).send({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

/* DELETE PROFILE */
exports.deleteProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      mysqlConnection.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.affectedRows > 0) {
      res.send({ message: 'Profile deleted successfully.' });
    } else {
      res.status(404).send({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
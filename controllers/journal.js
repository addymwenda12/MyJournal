const mysqlConnection = require('../config/db');

exports.createJournal = async (req, res) => {
  const { title, content, category } = req.body;
  const userId = req.user.id;

  try {
    const result = await new Promise((resolve, reject) => {
      const query = 'INSERT INTO journals (title, content, category, user_id) VALUES (?, ?, ?, ?)';
      mysqlConnection.query(query, [title, content, category, userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    res.status(201).send({ message: 'Journal created successfully', journalId: result.insertId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
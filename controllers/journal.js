const mysqlConnection = require('../config/db');

/* CREATE JOURNAL */
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

/* GET JOURNALS */
exports.getJournals = async (req, res) => {
  const userId = req.user.id;

  try {
    const journals = await new Promise((resolve, reject) => {
      const query = 'SELECT * FROM journals WHERE user_id = ?';
      mysqlConnection.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    res.status(200).send(journals);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/* GET JOURNAL BY ID */
exports.getJournalById = async (req, res) => {
  const userId = req.user.id;
  const journalId = req.params.id;

  try {
    const journal = await new Promise((resolve, reject) => {
      const query = 'SELECT * FROM journals WHERE id = ? AND user_id = ?';
      mysqlConnection.query(query, [journalId, userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!journal) {
      return res.status(404).send({ message: 'Journal not found' });
    }

    res.status(200).send(journal);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/* UPDATE JOURNAL */
exports.updateJournal = async (req, res) => {
  const userId = req.user.id;
  const journalId = req.params.id;
  const { title, content, category } = req.body;

  try {
    const result = await new Promise((resolve, reject) => {
      const query = 'UPDATE journals SET title = ?, content = ?, category = ? WHERE id = ? AND user_id = ?';
      mysqlConnection.query(query, [title, content, category, journalId, userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Journal not found' });
    }

    res.status(200).send({ message: 'Journal updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/* DELETE JOURNAL */
exports.deleteJournal = async (req, res) => {
  const userId = req.user.id;
  const journalId = req.params.id;

  try {
    const result = await new Promise((resolve, reject) => {
      const query = 'DELETE FROM journals WHERE id = ? AND user_id = ?';
      mysqlConnection.query(query, [journalId, userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Journal not found' });
    }

    res.status(200).send({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
import mysqlConnection from '../config/db.js';

/* CREATE JOURNAL */
export const createJournal = async (req, res) => {
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
export const getJournals = async (req, res) => {
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
export const getJournalById = async (req, res) => {
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
export const updateJournal = async (req, res) => {
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
export const deleteJournal = async (req, res) => {
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

/* GET SUMMARY */
export const getSummary = async (req, res) => {
  const { period } = req.query; // 'daily', 'weekly', 'monthly'
  const userId = req.user.id;

  let startDate, endDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  switch (period) {
    case 'daily':
      startDate = today;
      endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 1);
      break;
    case 'weekly':
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - startDate.getDay());
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);
      break;
    case 'monthly':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    default:
      return res.status(400).send({ message: 'Invalid period specified' });
  }

  // Convert dates to SQL format
  startDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
  endDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

  // Fetch summary data from database
  try {
    const result = await new Promise((resolve, reject) => {
      const query = `
        SELECT COUNT(*) AS entryCount, category
        FROM journal_entries
        WHERE userId = ? AND (createdAt BETWEEN ? AND ?)
        GROUP BY category
      `;
      mysqlConnection.query(query, [userId, startDate, endDate], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
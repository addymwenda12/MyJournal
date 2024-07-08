const express = require('express');
const { createJournal, getJournals, getJournalById, updateJournal, deleteJournal } = require('../controllers/journal');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.use(verifyToken);

router.post('/', createJournal);
router.get('/', getJournals);
router.get('/:id', getJournalById);
router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);

module.exports = router;
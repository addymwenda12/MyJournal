import { Router } from 'express';
import { 
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getSummary
} from '../controllers/journal.js';
import verifyToken from '../middleware/auth.js';

const router = Router();

router.use(verifyToken);

router.post('/', createJournal);
router.get('/', getJournals);
router.get('/:id', getJournalById);
router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);

export default router;
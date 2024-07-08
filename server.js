import express from 'express';
import { register, login } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';
import { userRoutes } from './routes/user.js';
import verifyToken from './middleware/auth.js';

const app = express();

/* DATABASE SETUP */
const PORT = process.env.PORT || 3000;

/* CONFIGURATION */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/api/journals', verifyToken, journalRoutes);
app.use('/api/users', verifyToken, userRoutes);


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
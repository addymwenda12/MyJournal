const express = require('express');
const { register, login } = require('./controllers/auth');
const { authRoutes } = require('./routes/auth');
const { journalRoutes } = require('./routes/journal');
const verifyToken = require('./middleware/auth');

const app = express();

/* DATABASE SETUP */
const PORT = process.env.PORT || 3000;

/* CONFIGURATION */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/api/journals', verifyToken, journalRoutes);


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const app = express();

/* DATABASE SETUP */
const PORT = process.env.PORT || 3000;

/* CONFIGURATION */
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
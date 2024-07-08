import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Y*mw27$12',
  database: 'MyJournal'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

export default connection;
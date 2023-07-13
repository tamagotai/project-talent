import * as dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

// CONFIGURATION
dotenv.config();
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/users', userRoutes)

//database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

//export pool for modules use
export { pool };

// connect to the database 
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
    app.listen(process.env.APP_PORT, () => {
      console.log('Listening for requests on port', process.env.APP_PORT);
    });
  }
});



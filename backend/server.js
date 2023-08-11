import express from 'express';
import bodyParser from 'body-parser';
import pool from './database.js';
import 'express-async-errors';
import cors from 'cors';
import errorController from './controllers/errorController.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

// CONFIGURATION
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

//cors
app.use(cors({
  origin: 'http://localhost:3000',
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

//error handler
app.use(errorController.get404);
app.use(errorController.get500);


// connect to the database 
pool.query("SELECT 1")
  .then(() => {
    console.log('Connected to database');
    app.listen(process.env.APP_PORT, () => {
      console.log('Listening for requests on port', process.env.APP_PORT);
  });
  }).catch((err) => {
    console.error('Error connecting to database:', err);
});



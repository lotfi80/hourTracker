import express from 'express';
import connectDB from './libs/db';
import dotenv from 'dotenv';
import userRoute from "./routes/userRoutes"
import authRouter from './routes/auth';
import entryTimeRouter from './routes/timeEntry';
import { authorizeJwt } from './middelware/authorization';
import cors from 'cors';
import cookieparser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 3000;
// const clientUrl = `http://localhost:${PORT}`;

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));


app.use('/auth', authRouter);
app.use('/user',authorizeJwt, userRoute);
app.use('/timeEntry', authorizeJwt, entryTimeRouter);



// app.listen(PORT, () => {
//     console.log(`The server 🙈 is listening on port ${PORT}`);
//     console.log(`Visit ${clientUrl} in your browser`);
//     });

(async () => {
    await connectDB();
  
    app.listen(PORT, () => {
      console.log(`The server 🙈 is listening on port ${PORT}`);
      // console.log(`Visit ${clientUrl} in your browser`);
    });
  })();
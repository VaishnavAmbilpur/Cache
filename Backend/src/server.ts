import express from 'express';
import mongoose from 'mongoose';
import router from './Routes';
import dotenv from 'dotenv';
import { MONGO_URL } from './Config';
import cors from "cors"
import cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000);
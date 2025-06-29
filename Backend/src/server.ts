import express from 'express';
import mongoose from 'mongoose';
import router from './Routes';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(router);
mongoose.connect(process.env.MONGO_URL as string || "mongodb+srv://vaishnavambilpur2006:Vaishnav%4011@cluster0.nhu16gt.mongodb.net/Cache-SecondBrain?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000);
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Routes_1 = __importDefault(require("./Routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(Routes_1.default);
mongoose_1.default.connect(process.env.MONGO_URL || "mongodb+srv://vaishnavambilpur2006:Vaishnav%4011@cluster0.nhu16gt.mongodb.net/Cache-SecondBrain?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.listen(3000);

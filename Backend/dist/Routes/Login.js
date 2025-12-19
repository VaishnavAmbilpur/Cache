"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Config_1 = require("../Config");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const check = yield db_1.UserModel.findOne({ email: email, username: name });
        if (!check || !check.password) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, check.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const generateToken = () => { return jsonwebtoken_1.default.sign({ id: check._id }, Config_1.SECRET); };
        const token = generateToken();
        res.status(200).json({
            message: "User Loggedin successfully",
            user: {
                token
            }
        });
    }
    catch (err) {
        res.status(401).send("Error creating user: " + err);
    }
});
exports.default = Login;

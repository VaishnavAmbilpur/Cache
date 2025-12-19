"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = exports.TagsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const contenTypes = ["video", "twitter", "documents", "links"];
const userSchema = new mongoose_2.Schema({
    username: { type: String, required: true, minlength: 3, maxlength: 20, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
});
const Tags = new mongoose_2.Schema({
    title: { type: String, required: true, unique: true },
});
const contentSchema = new mongoose_2.Schema({
    link: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: { type: String, enum: contenTypes, required: true, },
    tags: { type: [] },
    UserId: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true },
});
const LinkSchema = new mongoose_2.Schema({
    hash: { type: String, required: true, unique: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
});
exports.TagsModel = mongoose_1.default.model('Tags', Tags);
exports.UserModel = mongoose_1.default.model('User', userSchema);
exports.ContentModel = mongoose_1.default.model('Content', contentSchema);
exports.LinkModel = mongoose_1.default.model('Link', LinkSchema);
module.exports = {
    UserModel: exports.UserModel,
    TagsModel: exports.TagsModel,
    ContentModel: exports.ContentModel,
    LinkModel: exports.LinkModel
};


import mongoose from "mongoose";
import { Schema } from "mongoose";
const contenTypes = ['text', 'image', 'video', 'audio'];
const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3, maxlength: 20, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
});

const Tags = new Schema({
   title: { type: String, required: true, unique: true },
})

const contentSchema = new Schema({
      link : { type: String, required: true, unique: true },
      title: { type: String, required: true },
      type: { type: String, enum: contenTypes ,required: true, },
      tags: { type: []},
      UserId : { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const LinkSchema = new Schema({
   hash : {type:String , required: true, unique: true},
   userId : {type: mongoose.Types.ObjectId, ref: 'User', required: true},
})
export const TagsModel = mongoose.model('Tags', Tags);
export const UserModel = mongoose.model('User', userSchema);
export const ContentModel = mongoose.model('Content', contentSchema);
export const LinkModel = mongoose.model('Link', LinkSchema);
module.exports = {
   UserModel,
   TagsModel,
   ContentModel,
   LinkModel
};

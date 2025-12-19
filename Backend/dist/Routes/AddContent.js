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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const AddContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, title, type } = req.body;
    const tags = req.body.tags;
    const UserId = req.userId;
    try {
        yield db_1.ContentModel.create({
            link: link,
            title: title,
            type: type,
            UserId: UserId,
            tags: [...tags]
        });
        res.status(200).send("Content Created");
    }
    catch (err) {
        res.status(401).send("Error creating Content: " + err);
    }
});
exports.default = AddContent;

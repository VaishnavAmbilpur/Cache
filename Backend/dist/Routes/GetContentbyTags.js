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
const getContentbyTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = req.params.tags.split(",");
        // Find content that has at least one of the tags
        const response = yield db_1.ContentModel.find({ tags: { $in: tags } });
        if (response && response.length > 0) {
            res.status(200).send({ response });
        }
        else {
            res.status(404).send("Not Found");
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.default = getContentbyTags;

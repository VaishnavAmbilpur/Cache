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
const sharelink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        // Check if a link already exists for the user.
        const existingLink = yield db_1.LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash }); // Send existing hash if found.
            return;
        }
        // Generate a new hash for the shareable link.
        const hash = random(10);
        yield db_1.LinkModel.create({ userId: req.userId, hash: hash });
        res.json({ hash }); // Send new hash in the response.
    }
    else {
        // Remove the shareable link if share is false.
        yield db_1.LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" }); // Send success response.
    }
});
const random = (len) => {
    let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
    let length = options.length;
    // Initialize an empty string to store the result.
    let ans = "";
    // Loop `len` times to construct the random string.
    for (let i = 0; i < len; i++) {
        // Generate a random index and append the corresponding character from `options` to `ans`.
        ans += options[Math.floor(Math.random() * length)];
    }
    // Return the final random string.
    return ans;
};
exports.default = sharelink;

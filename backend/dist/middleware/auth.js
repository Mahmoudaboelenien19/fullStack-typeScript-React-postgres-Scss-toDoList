"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const auth = (req, res, next) => {
    try {
        const authHearders = req.headers.authorization;
        console.log("entered ");
        if (authHearders) {
            console.log("entered 1");
            const token = authHearders.split(" ")[1];
            console.log(13);
            console.log({ token });
            const decode = jsonwebtoken_1.default.verify(token, config_js_1.ACCESS_TOKEN_SECRET);
            if (decode) {
                console.log("entered 2");
                next();
            }
            else {
                res.status(401).send("Invalid token");
            }
        }
        else {
            res.status(401).json("expired token");
        }
    }
    catch (err) {
        res.status(401).json("autherization failed");
    }
};
exports.auth = auth;

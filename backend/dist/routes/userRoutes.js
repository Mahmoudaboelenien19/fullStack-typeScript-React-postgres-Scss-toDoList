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
const users_js_1 = __importDefault(require("./../models/users.js"));
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
            phone: req.body.phone,
        };
        const result = yield users_js_1.default.createUser(newUser);
        res
            .status(200)
            .json({ status: 200, result, message: "user created successfully" });
    }
    catch (err) {
        next(err);
    }
});
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_js_1.default.getAllToDos(req.params.userid);
        res.status(200).json({ message: "get data sucessfully", result });
    }
    catch (err) {
        next(err);
    }
});
const clear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_js_1.default.clear(req.params.userid);
        res.status(200).json({ message: "data cleared sucessfully", result });
    }
    catch (err) {
        next(err);
    }
});
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = yield users_js_1.default.authenticate(user, next);
        console.log({ result });
        if (result) {
            const expiration = { expiresIn: "15s" };
            const accessToken = jsonwebtoken_1.default.sign({ user }, config_js_1.ACCESS_TOKEN_SECRET, expiration);
            const refToken = jsonwebtoken_1.default.sign({ user }, config_js_1.REFRESH_TOKEN_SECRET);
            res.cookie("access-token", accessToken);
            res.cookie("refresh-token", refToken);
            res.cookie("user-id", result.id.toString());
            res.status(200).json(Object.assign(Object.assign({ message: "you logged in sucessfully" }, result), { refToken,
                accessToken, status: 200 }));
        }
        // res.json(result);
    }
    catch (err) {
        next(err);
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userid;
        const user = yield users_js_1.default.getUser(userId, next);
        res.status(200).json({ user, status: 200 });
    }
    catch (err) {
        // next(err);
        // console.log(err);
        next(err);
    }
});
const getNewRefToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refToken } = req.body;
    if (!refToken) {
        return res.status(401).json({ message: "unautherized" });
    }
    else {
        let user = yield users_js_1.default.verfiyRefToken(refToken, next);
        if (user) {
            const accessTokenExpiration = { expiresIn: "15s" };
            const accessToken = jsonwebtoken_1.default.sign({ user }, config_js_1.ACCESS_TOKEN_SECRET, accessTokenExpiration);
            const refreshToken = jsonwebtoken_1.default.sign({ user }, config_js_1.REFRESH_TOKEN_SECRET);
            res.cookie("access-token", accessToken);
            res.cookie("refresh-token", refToken);
            res.status(200).json({ refreshToken, accessToken });
        }
    }
});
const logOut = (req, res) => {
    const { refToken } = req.body;
    if (refToken) {
        res.clearCookie("access-token");
        res.clearCookie("user-id");
        res.clearCookie("refresh-token");
        res
            .status(200)
            .json({ status: 200, message: "you logged out successfully" });
    }
    else {
        res.status(404).json({ status: 404, message: "wrong refresh-token token" });
    }
};
const userRoutes = (0, express_1.Router)();
userRoutes.route("/user").post(createUser);
userRoutes.route("/user/authenticate").post(authenticate);
userRoutes.route("/user/:userid/todos").get(getTodos);
userRoutes.route("/user/:userid").get(getUser);
userRoutes.route("/user/logout").post(logOut);
userRoutes.route("/user/auth/refresh").post(getNewRefToken);
userRoutes.route("/user/:userid/cleartodos").delete(clear);
exports.default = userRoutes;

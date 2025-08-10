"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5000,
    dbURI: process.env.NODE_ENV === "development"
        ? process.env.LOCAL_DB
        : process.env.NODE_ENV === "test"
            ? process.env.TEST_DB
            : process.env.DB,
    jwtSecret: process.env.JWT_SECRET,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./database/connection"));
const blogroutes_1 = __importDefault(require("./routes/blogroutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/blog", blogroutes_1.default);
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    (0, connection_1.default)();
});
exports.default = app;

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
const mongoose_1 = __importDefault(require("mongoose"));
const blogModel_1 = require("../database/model/blogModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dummyData = [
    {
        title: "first dummy post",
        content: "this is just me improving my skills and challenging myself",
        author: "danj",
        tags: ["first-post", "typescript"]
    },
    {
        title: " is backend the future of tech?",
        content: "this post talks about the nuke and cranies of tech and the dark side of the startup industries",
        author: "Danese",
        tags: ["backend", "typescript"]
    }
];
const blogseeds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DB);
        console.log("connected to database");
        yield blogModel_1.BlogModel.deleteMany({});
        const result = yield blogModel_1.BlogModel.insertMany(dummyData);
        console.log(`seeded ${result.length} blog posts successfully`);
    }
    catch (err) {
        console.error("seeding Failed", err);
    }
    finally {
        yield mongoose_1.default.disconnect();
        console.log("disconnect from DB");
    }
});
blogseeds();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var productsHandler_1 = __importDefault(require("./handlers/productsHandler"));
var usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
app.use(body_parser_1["default"].json());
(0, productsHandler_1["default"])(app);
(0, usersHandler_1["default"])(app);
app.listen(3000, function () {
    console.log("server started at localhost:".concat(address));
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const sweets_routes_1 = __importDefault(require("./routes/sweets.routes"));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/sweets', sweets_routes_1.default);
app.get('/', (req, res) => {
    res.send('Sweet Shop API');
});
exports.default = app;

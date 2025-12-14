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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const app_2 = require("../src/app");
describe('Auth Endpoints', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_2.prisma.user.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_2.prisma.$disconnect();
    }));
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('test@example.com');
    }));
    it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        // First register
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({
            email: 'login@example.com',
            password: 'password123'
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({
            email: 'login@example.com',
            password: 'password123'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    }));
});

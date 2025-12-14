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
describe('Inventory API', () => {
    let userToken;
    let adminToken;
    let sweetId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_2.prisma.sweet.deleteMany();
        yield app_2.prisma.user.deleteMany();
        // Create User
        yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email: 'user_inv@test.com', password: 'password', name: 'User'
        });
        const userRes = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email: 'user_inv@test.com', password: 'password'
        });
        userToken = userRes.body.token;
        // Create Admin
        yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email: 'admin_inv@test.com', password: 'password', name: 'Admin'
        });
        yield app_2.prisma.user.update({
            where: { email: 'admin_inv@test.com' },
            data: { role: 'ADMIN' }
        });
        const adminRes = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email: 'admin_inv@test.com', password: 'password'
        });
        adminToken = adminRes.body.token;
        // Create initial sweet
        const sweet = yield app_2.prisma.sweet.create({
            data: { name: 'Jelly Bean', category: 'Jelly', price: 1.0, quantity: 10 }
        });
        sweetId = sweet.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_2.prisma.$disconnect();
    }));
    // POST /api/sweets/:id/purchase
    it('should allow user to purchase sweet and decrease quantity', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 2 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.quantity).toBe(8); // 10 - 2
    }));
    it('should return 400 if quantity not enough', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 100 });
        expect(res.statusCode).toEqual(400);
    }));
    // POST /api/sweets/:id/restock (Admin only)
    it('should not allow user to restock', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/sweets/${sweetId}/restock`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 10 });
        expect(res.statusCode).toEqual(403);
    }));
    it('should allow admin to restock', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/sweets/${sweetId}/restock`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ quantity: 10 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.quantity).toBe(18); // 8 + 10
    }));
});

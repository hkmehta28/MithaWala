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
describe('Sweets API', () => {
    let userToken;
    let adminToken;
    let sweetId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_2.prisma.sweet.deleteMany();
        yield app_2.prisma.user.deleteMany();
        // Create User
        yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email: 'user@test.com', password: 'password', name: 'User'
        });
        const userRes = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email: 'user@test.com', password: 'password'
        });
        userToken = userRes.body.token;
        // Create Admin (Assuming we have a way to create admin or verify role)
        // Ideally we seed an admin or have an admin secret. For now assume register makes generic USER
        // We will manually upgrade the "admin" user in DB for testing
        yield (0, supertest_1.default)(app_1.default).post('/api/auth/register').send({
            email: 'admin@test.com', password: 'password', name: 'Admin'
        });
        yield app_2.prisma.user.update({
            where: { email: 'admin@test.com' },
            data: { role: 'ADMIN' }
        });
        const adminRes = yield (0, supertest_1.default)(app_1.default).post('/api/auth/login').send({
            email: 'admin@test.com', password: 'password'
        });
        adminToken = adminRes.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app_2.prisma.$disconnect();
    }));
    // POST /api/sweets (Protected)
    it('should allow user to add a sweet', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
            name: 'Chocolate Bar',
            category: 'Chocolates',
            price: 2.50,
            quantity: 100
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toBe('Chocolate Bar');
        sweetId = res.body.id;
    }));
    it('should not allow unauthenticated user to add sweet', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/sweets')
            .send({ name: 'Candy', category: 'Hard', price: 1, quantity: 10 });
        expect(res.statusCode).toEqual(401);
    }));
    // GET /api/sweets
    it('should list all sweets', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/sweets')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    }));
    // PUT /api/sweets/:id
    it('should update a sweet', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/sweets/${sweetId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ price: 3.00 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.price).toBe(3.00);
    }));
    // DELETE /api/sweets/:id (Admin only)
    it('should not allow normal user to delete sweet', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/sweets/${sweetId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(403); // Forbidden
    }));
    it('should allow admin to delete sweet', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/sweets/${sweetId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(204); // No Content
    }));
});

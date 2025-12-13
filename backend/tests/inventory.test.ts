import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/app';

describe('Inventory API', () => {
    let userToken: string;
    let adminToken: string;
    let sweetId: number;

    beforeAll(async () => {
        await prisma.sweet.deleteMany();
        await prisma.user.deleteMany();

        // Create User
        await request(app).post('/api/auth/register').send({
            email: 'user_inv@test.com', password: 'password', name: 'User'
        });
        const userRes = await request(app).post('/api/auth/login').send({
            email: 'user_inv@test.com', password: 'password'
        });
        userToken = userRes.body.token;

        // Create Admin
        await request(app).post('/api/auth/register').send({
            email: 'admin_inv@test.com', password: 'password', name: 'Admin'
        });
        await prisma.user.update({
            where: { email: 'admin_inv@test.com' },
            data: { role: 'ADMIN' }
        });
        const adminRes = await request(app).post('/api/auth/login').send({
            email: 'admin_inv@test.com', password: 'password'
        });
        adminToken = adminRes.body.token;

        // Create initial sweet
        const sweet = await prisma.sweet.create({
            data: { name: 'Jelly Bean', category: 'Jelly', price: 1.0, quantity: 10 }
        });
        sweetId = sweet.id;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    // POST /api/sweets/:id/purchase
    it('should allow user to purchase sweet and decrease quantity', async () => {
        const res = await request(app)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 2 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.quantity).toBe(8); // 10 - 2
    });

    it('should return 400 if quantity not enough', async () => {
        const res = await request(app)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 100 });
        expect(res.statusCode).toEqual(400);
    });

    // POST /api/sweets/:id/restock (Admin only)
    it('should not allow user to restock', async () => {
        const res = await request(app)
            .post(`/api/sweets/${sweetId}/restock`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ quantity: 10 });
        expect(res.statusCode).toEqual(403);
    });

    it('should allow admin to restock', async () => {
        const res = await request(app)
            .post(`/api/sweets/${sweetId}/restock`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ quantity: 10 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.quantity).toBe(18); // 8 + 10
    });
});

import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/app';

describe('Sweets API', () => {
    let userToken: string;
    let adminToken: string;
    let sweetId: number;

    beforeAll(async () => {
        await prisma.sweet.deleteMany();
        await prisma.user.deleteMany();

        // Create User
        await request(app).post('/api/auth/register').send({
            email: 'user@test.com', password: 'password', name: 'User'
        });
        const userRes = await request(app).post('/api/auth/login').send({
            email: 'user@test.com', password: 'password'
        });
        userToken = userRes.body.token;

        // Create Admin (Assuming we have a way to create admin or verify role)
        // Ideally we seed an admin or have an admin secret. For now assume register makes generic USER
        // We will manually upgrade the "admin" user in DB for testing
        await request(app).post('/api/auth/register').send({
            email: 'admin@test.com', password: 'password', name: 'Admin'
        });
        await prisma.user.update({
            where: { email: 'admin@test.com' },
            data: { role: 'ADMIN' }
        });
        const adminRes = await request(app).post('/api/auth/login').send({
            email: 'admin@test.com', password: 'password'
        });
        adminToken = adminRes.body.token;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    // POST /api/sweets (Protected)
    it('should allow user to add a sweet', async () => {
        const res = await request(app)
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
    });

    it('should not allow unauthenticated user to add sweet', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .send({ name: 'Candy', category: 'Hard', price: 1, quantity: 10 });
        expect(res.statusCode).toEqual(401);
    });

    // GET /api/sweets
    it('should list all sweets', async () => {
        const res = await request(app)
            .get('/api/sweets')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // PUT /api/sweets/:id
    it('should update a sweet', async () => {
        const res = await request(app)
            .put(`/api/sweets/${sweetId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ price: 3.00 });
        expect(res.statusCode).toEqual(200);
        expect(res.body.price).toBe(3.00);
    });

    // DELETE /api/sweets/:id (Admin only)
    it('should not allow normal user to delete sweet', async () => {
        const res = await request(app)
            .delete(`/api/sweets/${sweetId}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(403); // Forbidden
    });

    it('should allow admin to delete sweet', async () => {
        const res = await request(app)
            .delete(`/api/sweets/${sweetId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(204); // No Content
    });
});

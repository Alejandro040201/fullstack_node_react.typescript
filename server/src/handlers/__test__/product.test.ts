import request from 'supertest';
import server from '../../server';
import db from '../../config/db';

describe('POST /api/products', () => {
    it('should display validation error', async () => {
        const response = await request(server).post('/api/products').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })

     it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test Product',
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test Product',
            price: "Holda"
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);
    })


    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test Product',
            price: 10.99
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty('errors');

    })

})

describe('GET /api/products', () => {
it('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    })

    it('GET a JSON response with prodycts', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.body).not.toHaveProperty('errors');

    })
})

describe('GET /api/products/:id', () => {
    it('should retrun a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    })

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('El id no válido');
    })

    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.id).toBe(1);
    })
})

describe('PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const response = await request(server)
                                            .put('/api/products/not-valid-url')
                                            .send({
                                                name: 'Updated Product',
                                                price: 300,
                                                availability: true,
                                            }) 
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('El id no válido');
    })

    it('should display validation error messages when updating a product', async() => {
        const responde = await request(server).put('/api/products/1').send({})  

        expect(responde.status).toBe(400);
        expect(responde.body).toHaveProperty('errors');
        expect(responde.body.errors).toBeTruthy();
        expect(responde.body.errors).toHaveLength(5);

        expect(responde.status).not.toBe(200);
        expect(responde.body).not.toHaveProperty('data');
    })

    it('should validate that the price is greater than 0', async () => {
        const responde = await request(server)
                                            .put('/api/products/1')
                                            .send({
                                                name: 'Updated Product',
                                                price: 0,
                                                availability: true,
                                            })  

        expect(responde.status).toBe(400);
        expect(responde.body).toHaveProperty('errors');
        expect(responde.body.errors).toBeTruthy();
        expect(responde.body.errors).toHaveLength(1);
        expect(responde.body.errors[0].msg).toBe('El precio debe ser mayor a 0');

        expect(responde.status).not.toBe(200);
        expect(responde.body).not.toHaveProperty('data');
    })

    it('should return a 404 response for a non-existent product', async () => {
        const prodyctId = 2000
        const responde = await request(server)
                                            .put(`/api/products/${prodyctId}`)
                                            .send({
                                                name: 'Updated Product',
                                                price: 10,
                                                availability: true,
                                            })  

        expect(responde.status).toBe(404);
        expect(responde.body.error).toBe('Producto no encontrado');

        expect(responde.status).not.toBe(200);
        expect(responde.body).not.toHaveProperty('data');
    })

    it('should return a 404 response for a non-existent product', async () => {
        const responde = await request(server)
                                            .put(`/api/products/1`)
                                            .send({
                                                name: 'Updated Product',
                                                price: 300,
                                                availability: true,
                                            })  

        expect(responde.status).toBe(200);
        expect(responde.body).toHaveProperty('data');

        expect(responde.status).not.toBe(400);
        expect(responde.body).not.toHaveProperty('errors');
    })
})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existing product', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
        
    })

    it('should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid ID in the URL', async () => {
        const response = await request(server).delete('/api/products/not-valid-url');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1); 
        expect(response.body.errors[0].msg).toBe('El id no válido');
    })

    it('should return a 404 response for a non-existent prduct', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Producto Eliminado")

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})

beforeAll(async () => {
    await db.sync({ force: true });
});


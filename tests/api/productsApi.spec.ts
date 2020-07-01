import jestOpenApi from 'jest-openapi';
import superTest from 'supertest';

import app from '../../src/server/app';
import openApi from '../../src/server/openapi.json';

jestOpenApi(openApi);

const request = superTest(app);

test('GET /api/products matches spec', async () => {

    const res = await request
        .get('/api/products')
        .send();

    expect(res).toSatisfyApiSpec();
});

test('GET /api/products?ingredient=1 matches spec', async () => {

    const res = await request
        .get('/api/products?ingredient=1')
        .send();

    expect(res).toSatisfyApiSpec();
});

test('GET /api/products?ingredient=1 returns only products that contain an ingredient_id of 1', async () => {

    const res = await request
        .get('/api/products?ingredient=1')
        .send();

    res.body.forEach((row) => {
        expect(row.ingredients.some(({id}) => id === 1)).toBe(true);
    });
});

test('GET /api/products?ingredient=1&ingredient=4 returns only products that contain an ingredient_id of 1 OR 4', async () => {

    const res = await request
        .get('/api/products?ingredient=1&ingredient=4')
        .send();

    res.body.forEach((row) => {
        expect(row.ingredients.some(({id}) => [1, 4].includes(id))).toBe(true);
    });
});

test('GET /api/products?ingredient=100 returns an empty array', async () => {

    const res = await request
        .get('/api/products?ingredient=100')
        .send();

    expect(res.body).toEqual([]);
});


test('GET /api/products?ingredient=A returns a validation error', async () => {

    const res = await request
        .get('/api/products?ingredient=A')
        .send();

    expect(res.status).toEqual(400);
    expect(res.error['message']).toEqual('cannot GET /api/products?ingredient=A (400)');
    expect(res.error['text']).toContain('Bad Request: request.query.ingredient[0] should be number');
});

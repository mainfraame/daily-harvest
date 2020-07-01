import jestOpenApi from 'jest-openapi';
import superTest from 'supertest';

import app from '../../src/server/app';
import openApi from '../../src/server/openapi.json';

jestOpenApi(openApi);

const request = superTest(app);

test('GET /api/ingredients matches spec', async () => {

    const res = await request
        .get('/api/ingredients')
        .send();

    expect(res).toSatisfyApiSpec();
});

test('GET /api/ingredients?id=A returns a validation error', async () => {

    const res = await request
        .get('/api/ingredients?id=A')
        .send();

    expect(res.status).toEqual(400);
    expect(res.error['message']).toEqual('cannot GET /api/ingredients?id=A (400)');
    expect(res.error['text']).toContain('Bad Request: Unknown query parameter');
});

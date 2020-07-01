import { urlencoded } from 'body-parser';
import express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import swagger from 'swagger-ui-express';

import ingredientsRoutes from './controllers/ingredientsCtrl';
import productsRoutes from './controllers/productsCtrl';

import config from './openapi.json';

const openApi = new OpenApiValidator({
    apiSpec: config as OpenAPIV3.Document,
    coerceTypes: true,
    ignorePaths: new RegExp('/api/docs'),
    validateRequests: true,
    validateResponses: true
});

const app = express();

app.use(urlencoded({extended: true}));

openApi
    .install(app)
    .then(() => {
        app.use('/api/docs', swagger.serve, swagger.setup(config));
        app.use('/api/ingredients', ingredientsRoutes);
        app.use('/api/products', productsRoutes);
    });

export default app;

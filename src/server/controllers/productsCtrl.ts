import express, { Request } from 'express';

import { getProducts } from '../services/productsService';

export default express.Router()
    .get('/', (req: Request<any, any, any, { ingredient?: string[] }>, res) => {
        res.json(
            getProducts(
                req.query.ingredient
            )
        );
    });

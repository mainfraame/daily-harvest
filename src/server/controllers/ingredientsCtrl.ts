import express from 'express';

import { orderedIngredients } from '../services/ingredientsService';

export default express.Router()
    .get('/', (req, res) => {
        res.json(
            orderedIngredients
        );
    });

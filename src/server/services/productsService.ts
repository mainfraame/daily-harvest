import { sortBy } from 'lodash';

import { ingredientsHash } from './ingredientsService';

import images from '../fixtures/images.json';
import { products } from '../fixtures/products.json';

const productsWithIngredientsAndImages = sortBy(
    products.reduce((acc, {ingredient_ids, ...product}) => ([
        ...acc,
        {
            ...product,
            images: images[product.id],
            ingredients: sortBy(ingredient_ids.map((id) => ingredientsHash[id]), 'name')
        }
    ]), []),
    'name'
);

export function getProducts(ingredients?: string[]) {
    return ingredients.length
        ? productsWithIngredientsAndImages.filter((product) => (
            product.ingredients.some(({id}) => ingredients.includes(id))
        ))
        : productsWithIngredientsAndImages;
}

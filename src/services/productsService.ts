import { ingredients } from '../fixtures/ingredients.json';
import { products } from '../fixtures/products.json';

export function filterProductsByIngredient(ingredientName: string) {

    const ingredient = ingredients.find(({name}) => name === ingredientName);

    return products.filter((product) => (
        product.ingredient_ids.includes(ingredient?.id)
    ));
}

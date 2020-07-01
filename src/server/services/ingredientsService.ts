import { sortBy } from 'lodash';

import { ingredients } from '../fixtures/ingredients.json';

export const orderedIngredients = sortBy(ingredients, ['name']);

export const ingredientsHash = ingredients.reduce((acc, ingredient) => ({
    ...acc,
    [ingredient.id]: ingredient
}), {});

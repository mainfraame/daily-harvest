import { Ingredient } from './ingredient';

export type Product = {
    id: number;
    collection: string;
    ingredient_ids: number[];
    ingredients: Ingredient[];
    images: string[];
    name: string;
};

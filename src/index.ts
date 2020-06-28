import { filterProductsByIngredient } from './services/productsService';

process.stdout.write(
    JSON.stringify(
        filterProductsByIngredient('Organic Banana'),
        null,
        2
    )
);

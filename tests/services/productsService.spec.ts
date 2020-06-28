import { filterProductsByIngredient } from '../../src/services/productsService';

test('filterProductsByIngredient returns an empty array when ingredient does not exist', () => {

    const result = filterProductsByIngredient('Foo Bar Apple');

    expect(result).toEqual([]);
});

test('filterProductsByIngredient returns all products with given ingredient when that ingredient exists', () => {

    const result = filterProductsByIngredient('Avocado');

    expect(result)
        .toEqual([
            {
                id: 3,
                name: 'Beet + Avocado Poke',
                collection: 'harvest bowl',
                ingredient_ids: [
                    10,
                    16,
                    7,
                    17
                ]
            },
            {
                id: 6,
                name: 'Ginger + Greens',
                collection: 'smoothie',
                ingredient_ids: [
                    10,
                    7,
                    3,
                    11,
                    12
                ]
            }
        ]);
});

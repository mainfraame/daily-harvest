import * as productsService from '../src/services/productsService';

let findSpy;
let jsonSpy;
let stdOutSpy;

beforeAll(() => {
    findSpy = jest.spyOn(productsService, 'filterProductsByIngredient');
    jsonSpy = jest.spyOn(JSON, 'stringify');
    stdOutSpy = jest.spyOn(process.stdout, 'write')
        // prevent actual output
        .mockImplementationOnce(() => void 0);

    require('../src/index');
});

afterAll(() => {
    findSpy.mockRestore();
    jsonSpy.mockRestore();
    stdOutSpy.mockRestore();
});

test('process.stdout.write is called with all products that contain "Organic Banana" as an ingredient', () => {

    const expectedResult = [
        {
            id: 1,
            name: 'Acai + Cherry',
            collection: 'smoothie',
            ingredient_ids: [
                1,
                2,
                3,
                4,
                5
            ]
        },
        {
            id: 2,
            name: 'Chocolate + Blueberry',
            collection: 'smoothie',
            ingredient_ids: [
                3,
                4,
                26,
                5,
                12
            ]
        },
        {
            id: 4,
            name: 'Cinnamon + Banana',
            collection: 'oat bowl',
            ingredient_ids: [
                19,
                3,
                22,
                26,
                21,
                20
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
    ];

    expect(productsService.filterProductsByIngredient)
        .toHaveBeenCalledWith('Organic Banana');

    expect(jsonSpy)
        .toHaveBeenCalledWith(jasmine.arrayContaining(expectedResult), null, 2);

    expect(JSON.parse(stdOutSpy.mock.calls[0][0]))
        .toEqual(expectedResult);
});

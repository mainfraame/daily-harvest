import '@testing-library/jest-dom';
import { setWorldConstructor } from 'cucumber';
import { MockXHR } from 'jest-runner-cucumber/dist/mocks/MockXHR';

import ingredients from './fixtures/ingredients.json';
import products from './fixtures/products.json';
import { waitFor } from '@testing-library/react';

// this is an axios dep that causes mem leaks in jest
jest.mock('follow-redirects', () => ({
    http: function () {
    },
    https: function () {
    }
}));

setWorldConstructor(
    class TestWorld {
        $mockServer = new MockXHR([
            {
                url: '/api/products',
                method: 'get',
                status: 200,
                response: (req) => {

                    if (req.params?.ingredient) {

                        const ingredients = (
                            Array.isArray(req.params.ingredient)
                                ? req.params.ingredient
                                : [req.params.ingredient]
                        ).map((id) => +id);

                        return products.filter((product) => (
                            product.ingredients.some(({id}) => (
                                ingredients.includes(id)
                            ))
                        ));
                    }

                    return products;
                }
            },
            {
                url: '/api/ingredients',
                method: 'get',
                status: 200,
                response: ingredients
            }
        ]);

        async waitForApiCall() {

            // this prevents jest from complaining about updating react updating outside of act();

            const initialCallCount = this.$mockServer.spy.mock.calls.length;

            await waitFor(() => {
                expect(this.$mockServer.spy.mock.calls.length).toBeGreaterThan(initialCallCount);
            });
        }
    }
);

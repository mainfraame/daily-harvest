import { Given, Then, When } from 'cucumber';
import { flatten, isEmpty } from 'lodash';
import { fireEvent, waitFor } from '@testing-library/react';

import { noProductsAlert, productCard, search } from './selectors';

Given(/^the application is rendered$/, async () => {

    await waitFor(() => {
        expect(document.querySelectorAll(productCard.root()).length).toBeGreaterThan(0);
    });
});

When(/^the (.*) card's (next|prev) nav button is clicked$/, async (name, type) => {

    await fireEvent.click(
        document.querySelector(productCard.root(name))
            .querySelector(productCard[type === 'next' ? 'navNextBtn' : 'navPrevBtn'])
    );
});

When(/^the (.*) card's (\d+) nav index button is clicked$/, async (name, index) => {

    await fireEvent.click(
        document.querySelector(productCard.root(name))
            .querySelector(productCard.navIndexBtn(+index + 1))
    );
});

When(/^the (.*) card's ingredients are shown$/, async (name, index) => {

    await fireEvent.click(
        document.querySelector(productCard.root(name))
            .querySelector(productCard.ingredientsNavBtn)
    );
});

When(/^the previous search is cleared$/, async function () {

    this.$mockServer.spy.mockClear();

    await fireEvent.click(
        document.querySelector(
            search.clearBtn
        )
    );

    await this.waitForApiCall();
});

When(/^a search is conducted for products with (.*)$/, async function (values) {

    const options = values.split(', ');

    if (document.querySelector(search.clearBtn)) {

        await fireEvent.click(
            document.querySelector(
                search.clearBtn
            )
        );

        await this.waitForApiCall();

        this.$mockServer.spy.mockClear();
    }

    for (let value of options) {

        await fireEvent.change(
            document.querySelector(search.root),
            {
                target: {
                    value
                }
            }
        );

        await fireEvent.click(
            Array.from(document.querySelectorAll(search.options())).find(($option) => (
                $option.textContent === value
            ))
        );

        await this.waitForApiCall();
    }
});

Then(/^the (.*) card's navigation index is updated to (\d+)$/, async (name, position) => {

    expect(document.querySelector<HTMLDivElement>(productCard.root(name)).dataset.navIndex)
        .toEqual(position);
});

Then(/^the (.*) card's ingredients are:$/, async (name, table) => {

    const $card = document.querySelector<HTMLDivElement>(productCard.root(name));

    const ingredients = Array.from($card.querySelectorAll(productCard.ingredient)).map(($ingredient) => (
        $ingredient.textContent
    ));

    expect(ingredients).toEqual(flatten(table.raw()));
});

Then(/^GET (\S+) is called$/, function (url) {

    expect(this.$mockServer.spy).toHaveBeenCalledWith({
        method: 'GET',
        url
    });
});

Then(/^GET (\S+) is called with params:$/, function (url, params) {

    expect(this.$mockServer.spy).toHaveBeenCalledWith({
        method: 'GET',
        ...isEmpty(params) ? {} : {params},
        url
    });
});

Then(/^the product cards are rendered:$/, (table) => {

    const cards = Array.from(document.querySelectorAll(productCard.root())).map(($card) => ({
        name: $card.querySelector(productCard.name).textContent,
        collection: $card.querySelector(productCard.collection).textContent,
        images: $card.querySelectorAll(productCard.navIndexBtn()).length.toString()
    }));

    expect(table.hashes()).toEqual(cards);
});

Then(/^the no products alert is displayed$/, () => {
    expect(document.querySelector(noProductsAlert.root)).toBeInTheDocument();
});

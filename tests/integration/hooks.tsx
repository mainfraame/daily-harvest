import { After, AfterAll, BeforeAll } from 'cucumber';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from '@testing-library/react';

import App from '../../src/client/app';

const $root = document.createElement('main');

document.body.appendChild($root);

BeforeAll(function () {
    act(() => {
        ReactDOM.render(
            <App/>,
            $root
        );
    });
});

After(function () {
    this.$mockServer.spy.mockClear();
});

AfterAll(async function () {

    ReactDOM.unmountComponentAtNode($root);

    this.$mockServer.destroy();
});

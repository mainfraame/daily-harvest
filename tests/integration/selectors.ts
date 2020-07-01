export const loader = {
    root: '[data-testid="loader"]'
};

export const noProductsAlert = {
    root: '[data-testid="noProductsAlert"]'
};

export const productCard = {
    collection: 'span:nth-of-type(2)',
    ingredient: '[data-testid="ingredient"]',
    ingredientsNavBtn: '[data-testid="navIndexBtn"]:last-of-type',
    name: 'span:nth-of-type(1)',
    navIndexBtn: (index?) => (
        index
            ? `[data-testid="navIndexBtn"]:nth-of-type(${index})`
            : '[data-testid="navIndexBtn"]'
    ),
    navNextBtn: '[data-testid="navNextBtn"]',
    navPrevBtn: '[data-testid="navPrevBtn"]',
    root: (name?) => (
        name
            ? `[data-testid="productCard"][data-name="${encodeURIComponent(name)}"]`
            : '[data-testid="productCard"]'
    )
};

export const search = {
    clearBtn: '.MuiAutocomplete-clearIndicatorDirty',
    options: (index?) => (
        index
            ? `[data-option-index=${index}]`
            : '[data-option-index]'
    ),
    root: '[data-testid="search"] input'
};



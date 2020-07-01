module.exports = function (api) {

    api.cache(
        ['production', 'test'].includes(process.env.NODE_ENV)
    );

    return {
        ignore: [
            /node_modules/
        ],
        plugins: [
            'lodash',
            [
                '@babel/plugin-transform-typescript',
                {
                    isTSX: true
                }
            ],
            '@babel/plugin-transform-modules-commonjs'
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current'
                    },
                    modules: false
                }
            ],
            '@babel/preset-react',
            '@babel/preset-typescript'
        ]
    };
};

module.exports = {
    plugins: ['vue'],
    config: {
        export: [
            './scripts/main.js',
            './styles/main.css'
        ],
        modifyWebpackConfig: function(baseConfig) {
            // edit ykit's Webpack configs
            return baseConfig;
        }
    },
    hooks: {},
    commands: []
};

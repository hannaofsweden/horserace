const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
    modifyVars: {},
    lessVarsFilePath: './src/styles/variables.less',
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {},

    webpack(config) {
        return config;
    },

    future: {
        // if you use webpack5
        webpack5: true,
    },
});

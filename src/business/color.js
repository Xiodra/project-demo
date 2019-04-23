const path = require('path');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const options = {
    stylesDir: path.join(__dirname, './style'),
    antDir: path.join(__dirname, '../../node_modules/antd'),
    varFile: path.join(__dirname, './style/resources.less'),
    mainLessFile: path.join(__dirname, './style/main.less'),
    themeVariables: [
        '@primary-color',
        '@menu-dark-bg',
        '@menu-dark-color',
        // '@layout-header-background',
        // '@layout-body-background'
    ],
    indexFileName: 'index.html',
    outputFilePath: path.join(__dirname, '../../public/color.less'),
};

generateTheme(options)
    .then(less => {
        console.log('Theme generated successfully');
    })
    .catch(error => {
        console.log('Error', error);
    });
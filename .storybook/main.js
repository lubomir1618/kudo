// import '../dist/client/css/style.css';

const Path = require('path');
const AppSourceDir = Path.join(__dirname, '..', 'src');

module.exports = {
  stories: ['../src/client/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/preset-typescript'],
  webpackFinal: async (config) => {
    // Disable the Storybook internal-`.svg`-rule for components loaded from our app.
    const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
    svgRule.exclude = [AppSourceDir];

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{ loader: require.resolve('ts-loader') }, { loader: require.resolve('react-docgen-typescript-loader') }]
    });

    config.module.rules.push({
      test: /\.svg$/,
      include: [AppSourceDir],
      use: [{ loader: 'babel-loader' }, { loader: 'react-svg-loader' }]
    });

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};

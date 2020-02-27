module.exports = {
  stories: ['../src/client/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/preset-typescript'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader')
        },
        {
          loader: require.resolve('react-docgen-typescript-loader')
        }
      ]
    });

    config.module.rules.push({
      test: /\.(scss|sass|css)$/,
      use: [
        {
          loader: 'string-replace-loader',
          options: {
            search: '%PUBLIC_URL%',
            replace: '',
            flags: 'g'
          }
        }
      ]
    });

    config.module.rules.push({
      test: /\.(svg)$/,
      use: [{ loader: 'babel-loader' }, { loader: 'react-svg-loader' }]
    });

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};

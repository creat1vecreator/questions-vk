const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  webpack: {
    configure: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.json',
      },
    },
  ],
};

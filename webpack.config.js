const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
              transpileOnly: false, // Ensures type checking
          },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

module.rules = {
    test: /\.css$/i,
        use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                esModule: false,
                modules: {
                    localIdentName: '[local]--[name]--[hash:base64:5]'
                }
            }
        }
    ]
};
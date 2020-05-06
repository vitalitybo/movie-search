const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

console.log(isDev)

const optimization = () => {
  const config = {}

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3200,
    hot: isDev,
    contentBase: path.join(__dirname, 'dist')
  },
  devtool: isDev ? 'source-map' : '',
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets', 
        to: 'assets',
        test: /\.jpg$/,
      }
    ]),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        },
        'css-loader']
      },
      {
        test: /\.jpg$|\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['./node_modules']
              },
            }
          }
        ],
      },
      {
        test: /\.(eot|ttf|gif|woff)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
}
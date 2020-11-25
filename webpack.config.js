var path = require("path");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var browsers = ['Chrome 41'];

module.exports = {
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
      }),
    ],
    entry: './app.js',
    output: {
        filename: 'out.js',
        path: path.resolve(__dirname, 'build'),
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
          {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                  ['env', {
                  targets: {
                    browsers: browsers
                  }
                }]
              ]
            }
          }
        },
        {
          test: /\.css/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  // publicPath is the relative path of the resource to the context
                  // e.g. for ./css/admin/main.css the publicPath will be ../../
                  // while for ./css/main.css the publicPath will be ../
                  return path.relative(path.dirname(resourcePath), context) + '/';
                },
              },
            },
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  // publicPath is the relative path of the resource to the context
                  // e.g. for ./css/admin/main.css the publicPath will be ../../
                  // while for ./css/main.css the publicPath will be ../
                  return path.relative(path.dirname(resourcePath), context) + '/';
                },
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  new require('autoprefixer')({
                    browsers: browsers
                  })
                ]
              }
            },
            'sass-loader']
        },
        {
          test: /\.(jpg|jpeg|gif|png|csv)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'images',
              outputPath: 'images'
            }
          }
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'fonts',
              outputPath: 'fonts'
            }
          }
        }
      ]
    }
}

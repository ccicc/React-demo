/**
 *
 * webpack开发配置
 *
 * */

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: path.resolve(__dirname, './src/js/index.jsx'),
    output: {
        filename: 'bundle.jsx',
        path: path.join(__dirname, '/dist'),
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, '/dist'),
        publicPath: '/',
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [ 'babel-loader', 'eslint-loader' ],
                exclude: /node_modules/
            }, 
            // 组件私有样式
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[local]__[hash:base64:5]'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }
                ],
                include: path.join(__dirname, '/src/js')
            },
            // 公有样式
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, 
                    {
                        loader: 'css-loader'
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }
                ],
                include: path.join(__dirname, '/src/styles')
            }, 
            // 依赖库样式
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, 
                    {
                        loader: 'css-loader'
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }
                ],
                include: path.join(__dirname, '/node_modules')
            }, 
            
            {
                test: /\.svg$/i,
                loader: 'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
                    path.resolve(__dirname, './src')
                ]
            },

            {
                test: /\.(otf|eot|ttf|woff|woff2).*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }, 
            
            {
                test: /\.(img|jpg|png|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ],
                exclude: /node_modules/
            },

        ]
    },
    resolve: {
        extensions: [
            '.web.js',
            '.js',
            '.jsx',
            '.css',
            '.scss',
            '.json',
            '*'
        ],
        modules: [
            'node_modules', path.join(__dirname, '../node_modules')
        ],
        alias: {
            styles: path.resolve(__dirname, './src/styles'),
            app: path.resolve(__dirname, './src/js')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('devlopment'),
            __DEV__: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'index.html',
            favicon: './favicon.ico',
            template: 'src/index.html',
            hash: true,
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
};

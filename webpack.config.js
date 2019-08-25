// var HtmlWebpackPlugin = require('html-webpack-plugin');
var JavaScriptObfuscator = require('webpack-obfuscator');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: './public/app.js',
    entry: {
        main: "./public/app.js"
    },
    output: {
        path: __dirname + '/public/dist',
        filename: "[hash][id].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./public/template.html" }),
        new MiniCssExtractPlugin({ filename: "[hash][id].css" }),
        new FixStyleOnlyEntriesPlugin(),
        new OptimizeCSSAssetsPlugin({}),
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        }, ['excluded_bundle_name.js']),
        new CleanWebpackPlugin()
    ]
    // optimization: {
    //     minimize: true,
    //     minimizer: [new UglifyJsPlugin({
    //         include: /\.min\.js$/
    //     })]
    // },
    // plugins: [
    //     new JavaScriptObfuscator({
    //         rotateUnicodeArray: true
    //     }, ['excluded_bundle_name.js'])
    // ]
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         hash: true,
    //         filename: './index.html' //relative to root of the application
    //     })
    // ]
}
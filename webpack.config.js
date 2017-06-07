const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    polyfills: './polyfills.ts',
    vendor: './vendor.ts',
    dashboard:'./index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'] 
  },
  module: {
    rules: [{ 
        //Hanlde files ending in '.ts(x)'. import/require()
        //Find angular component property templateUrl and styleUrls and surround path with required()
        //Complile typescript file.
        test: /\.tsx?$/, 
        use: ['ts-loader', 'angular2-template-loader'] 
      },{
        //Hanlde files ending in '.scss' but not ending in '.component.scss'
        //Compile sass file.
        //Load raw content to file
        //Extract css to file
        test: /\.scss$/,
        exclude: [/\.component\.scss$/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },{
        //Hanld files ending in '.component.scss'. import/require()
        //Compile all sass file
        //Load the raw content into file.
        test: /\.component\.scss$/,
        use: ['raw-loader', 'sass-loader']
      },{
        //Handle files ending in '.html'. import/require()
        //Load raw content into file.
        test: /\.html$/,
        use: ['raw-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html'}), // Creates index.html and adds link and script tags.
    new ExtractTextPlugin("styles.[hash:8].css"), //Creates css file.
    new webpack.ContextReplacementPlugin(  //Removes warning from the command panle coming from angular  
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src')
    )
  ]
};

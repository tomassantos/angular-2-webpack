module.exports = {
  entry: './src/main.ts',
  output: {
    filename: './src/bundle.js'
 },
 resolve: {
    extensions: ['.ts', '.tsx', '.js'] 
 },
 module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
 }
};
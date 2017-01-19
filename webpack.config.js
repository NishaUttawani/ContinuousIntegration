var config = {
   entry: './js/main.js',

   output: {
      path:'./js/',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   node: {
     fs: "empty",
     net: "empty",
     tls: "empty",
     dns: "empty"
  },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;

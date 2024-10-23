import path from 'path'; // Use ES6 import
import HtmlWebpackPlugin from 'html-webpack-plugin'; // Use ES6 import
import webpack from 'webpack'; // Use ES6 import

const config = (env, argv) => {
  console.log('argv', argv.mode);

  // Define the backend URL based on the mode(production)
  const backend_url = argv.mode === 'production'
    ? 'https://notes-backend-black-darkness-8420.fly.dev/' // will hv to change this in the future
    : 'http://localhost:3001/notes';

  return {
    entry: './src/index.js', // Entry point
    output: {
      path: path.resolve('dist'), // Output path
      filename: 'bundle.js', // Bundle name
    },
    devServer: {
      static: path.resolve('dist'), // Dev server static files path
      compress: true,
      port: 3000, // Port for dev server
    },
    devtool: 'source-map', // Source maps for debugging
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Transpile JS and JSX files
          exclude: /node_modules/, // Exclude node_modules
          use: {
            loader: 'babel-loader', // Use Babel loader
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // Load styles (including Sass)
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // Load images and fonts
          use: {
            loader: 'url-loader',
            options: { limit: false }, // No size limit for files
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html', // Path to HTML template
      }),
      // use DefinePlugin to define a global constant used in all the files of our proj
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url), // Global constant for backend URL
      }),
    ],
  };
};

export default config; // Use ES6 export syntax

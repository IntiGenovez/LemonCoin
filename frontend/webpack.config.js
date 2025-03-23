const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    // ...existing code...
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ]
    // ...existing code...
};
/* global __dirname */

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "dist/dapp.js"
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json" }
        ]
    }
};
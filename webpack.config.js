/* global __dirname */
module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "dist/app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
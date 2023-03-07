const path = require('path'); 
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require('fs');


// Webpack entry points. Mapping from resulting bundle name to the source file entry.
const entries = {};

// Loop through subfolders in the "Samples" folder and add an entry for each one
const samplesDir = path.join(__dirname, "src/Features");
fs.readdirSync(samplesDir).filter(dir => {
    if (fs.statSync(path.join(samplesDir, dir)).isDirectory()) {
        entries[dir] = "./" + path.relative(process.cwd(), path.join(samplesDir, dir, dir));
    }
});


module.exports = {
    entry: entries,
    output: {
        filename: '[name]/[name].js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk")
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "azure-devops-ui/buildScripts/css-variables-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
           patterns: [ 
               { from: "**/*.html", context: "src/Features" }
           ]
        })
    ]
}
const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
    entry: { index: "./public/js/index.js", idb: "./public/js/idb.js" },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/public",
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name(file) {
                                return "[path][name].[ext]";
                            },
                            publicPath(url) {
                                return url.replace("../", "/public/icons/");
                            },
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new WebpackPwaManifest({
            name: "Budget Tracker",
            short_name: "Budget_Tracker",
            description:
                "An app that allows you to enter debits and credits to track a budget.",
            icons: [
                {
                    src: path.resolve("public/icons/icon-512x512.png"),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: "icons",
                },
            ],
            theme_color: "#000000",
            background_color: "#ffffff",
            start_url: "./index.html",
            display: "standalone",
        }),
    ],
    mode: "development",
};
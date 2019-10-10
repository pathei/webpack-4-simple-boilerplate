const path = require("path");
const glob = require("glob-all");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");


module.exports = {
	/* Only outputs errors and warnings in console */
	stats: "errors-warnings",
	/* Disables warning output if assets > 250kb in dev mode */
	performance: {
		hints: process.env.NODE_ENV === "production" ? "warning" : false,
	},
	/* Defines entry point for dev and output path for build */
	entry: {
		main: "./src/app.js",
	},
	output: {
		/* Path for e.g. image assets in build/dist */
		path: `${__dirname}/dist`,
		filename: "app.js",
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				sourceMap: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					loader: "eslint-loader",
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						/* true to minimize HTML */
						options: {
							minimize: false,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "./assets/fonts/[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							outputPath: "assets/images",
							/* If bigger fallback to file-loader */
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			/* If needed include .[contenthash] - e.g. 'app.[contenthash].css' to prevent caching */
			filename: "app.css",
			chunkFilename: "[id].css",
		}),
		new PurifyCSSPlugin({
			/* Give paths to parse for rules. These should be absolute! */
			paths: glob.sync(path.join(__dirname, "./src/*.html")),
		}),
		new CleanWebpackPlugin(),
		/*
		//Use late rfor statics
		new CopyWebpackPlugin([{
			from: "src/assets",
			to: "assets",
		},
		]),*/
		new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
		new ProgressBarPlugin(),
		/*
     * --- Only use/enable once for prod to generaet favicons ---
     * new FaviconsWebpackPlugin('./src/assets/images/favicon.png'
     */
	],
};

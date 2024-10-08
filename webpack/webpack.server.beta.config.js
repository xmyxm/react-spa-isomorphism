const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const packageFilePath = path.join(__dirname, '../dist/server')
const BuildDonePlugin = require('./plugins/builddone')

module.exports = {
	entry: {
		app: ['./src/app/app-server.tsx'],
	},
	output: {
		clean: true,
		path: packageFilePath,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		publicPath: '/',
	},
	mode: 'development',
	cache: true,
	devtool: 'source-map',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.(es6|jsx|js|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env', // 用于将现代 JavaScript 转换为兼容旧版环境的代码
								'@babel/preset-react',
								'@babel/preset-typescript', // 用于处理 TypeScript
							],
							plugins: [
								// 这里可以添加 Babel 插件，例如：
								'@babel/plugin-proposal-class-properties', // 用于支持类属性语法
								'@babel/plugin-transform-runtime', // 避免重复引入辅助代码
							],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							// 关闭类型检查，即只进行转译
							transpileOnly: true,
							// 让 Webpack 使用多线程进行构建的插件
							happyPackMode: true,
							// 使用指定的 tsconfig
							configFile: './tsconfig/tsconfig.server.json',
						},
					},
				],
			},
			{
				test: /\.woff|ttf|woff2|eot$/,
				use: {
					loader: 'ignore-loader',
				},
			},
			{
				test: /\.(less|css)$/,
				use: {
					loader: 'ignore-loader',
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: {
					loader: 'ignore-loader',
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.jsx', '.tsx', '.js'],
		// 别名设置,主要是为了配和webpack.ProvidePlugin设置全局插件;
		alias: {
			// 绝对路径;特别注意这里定义的路径和依赖的包名不能重名
			'@component': path.resolve(__dirname, '../src/component'),
		},
		// 当从 npm 包中导入模块时（例如，import * as D3 from 'd3'），此选项将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同。
		mainFields: ['module', 'main'],
	},
	externals: [nodeExternals()], // 将 Node.js 核心模块排除在打包之外,以减小打包体积。
	plugins: [
		new BuildDonePlugin({ text: '编译完成' }),
		new webpack.HotModuleReplacementPlugin(),
		//    new webpack.BannerPlugin('@web-little'),
	],
}

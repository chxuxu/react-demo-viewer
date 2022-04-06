# react-wp5-demo
webpack5 react demo
#install
```js
cnpm install webpack webpack-cli webpack-dev-server typescript ts-loader -D
cnpm install less less-loader css-loader style-loader url-loader file-loader -D
cnpm install html-webpack-plugin copy-webpack-plugin clean-webpack-plugin -D
cnpm install babel-loader @babel/cli @babel/core  @babel/preset-env @babel/preset-react @babel/preset-typescript -D

cnpm install jest @types/jest @types/node @types/react @types/react-dom -D

cnpm install react react-dom -S
cnpm install antd -S
cnpm install react-router react-router-dom -S
cnpm install @types/react-router @types/react-router-dom -D
```
#webpack.config.js
##loader
模块 loader 可以链式调用。链中的每个 loader 都将对资源进行转换。链会逆序执行。第一个 loader 将其结果（被转换后的资源）传递给下一个 loader，依此类推。最后，webpack 期望链中的最后的 loader 返回 JavaScript。应保证 loader 的先后顺序：'style-loader' 在前，而 'css-loader' 在后。如果不遵守此约定，webpack 可能会抛出错误。

##要注意正则写法是否合法

##静态资源
###资源模块类型(asset module type) 不好用
###当在 webpack 5 中使用旧的 assets loader
（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。否则在less里使用 background-image,会把图片打包为一个非图片的文件，内容是：“export default __webpack_public_path__ +”


#.babelrc
用于配置基础的语法转义依赖。如果不配置 jsx语法不识别的错误。类似loader不全。

#tsconfig
只要使用ts语法，必须配置此文件，否则会有明确的提示tsconfig不存在。
##ts代码直接引入静态资源文件，需要预定义文件类型，并包含到include里面。比如css,image文件.
```js
declare module '*.css';
declare module '*.jpg';
```
否则ide报错，编译也通不过

#dev-server
webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。
webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 devMiddleware.publicPath 选项进行修改。

#html-webpack-plugin
在webpack5下。此插件默认把js注入到head里，需要手动设置为body
```js
new htmlWebpackPlugin({
  template: "./src/page1/index.html",
  inject: "body"
})
```

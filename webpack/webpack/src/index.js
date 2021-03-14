// webpack 模块打包工具

// ES Module 模块引入方式
// import Header from './header.js';
// import Sidebar from './sidebar.js';
// import Content from './content.js';

// Commonjs 模块引入规范
var Header = require('./header.js')
var Sidebar = require('./sidebar.js')
var Content = require('./content.js')
// CMD
// AMD


new Header();
new Sidebar();
new Content();

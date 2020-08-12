// ES5只有两种声明变量的方法: 使用var和function命令

// ES6除了添加了let和const命令,important命令和class命令(共6钟);


// 顶层对象的属性

var a = 1;
window.a;//1

let b = 1;
window.b//undefined

// global对象

// 获取顶层对象
// 方法1
(typeof window !== 'undefined' ? window : (typeof process === 'object' &&
 typeof require === 'function' &&
 typeof global === 'object')
 ? global : this);
// 方法2
var getGlobal = function() {
    if(typeof self !== 'undefined') { return self; }
    if(typeof window !== 'undefined') { return window; }
    if(typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
}

// 在所有环境下拿到global

// CommonJS的写法
require('system.global/shim')();

// ES6模块的写法
import shim from 'system.global/shim'; shim();

// 将顶层对象仿佛变量global中

// CommonJS的写法
var global = require('system.global')();

// ES6模块的写法

import getGlobal from 'system.global';
const global = getGlobal();
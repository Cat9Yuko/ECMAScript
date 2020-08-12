/*
 * @Author: Cat9Yuko.Chen 
 * @Date: 2019-12-04 09:25:11 
 * @Last Modified by: Cat9Yuko.Chen
 * @Last Modified time: 2019-12-04 13:38:23
 */


function f() { console.log('I am outside!'); }
(function () { 
    if (false) {
        console.log('I am inside!');        
    }
    f();
 }());
 /* 以上代码在ES5环境中运行会得到 "I am inside!",因为在if内声明的函数f会被提升到函数头部 */
//  ES5环境
function f() { console.log('I am outside!'); }
(function() {
    function f() { console.log('I am inside!'); }
    if(false) {

    }
    f();
}());

// 浏览器ES6环境
/*  1.允许在块级作用域内声明函数
    2.函数声明类似于var, 即会提升到全局作用域或函数作用域的头部
    3.同时, 函数声明还会提升到所在的块级作用域的头部
    以上3条规则只对ES6浏览器实现有效,其他环境的实现不用遵守,仍旧将块级作用域的函数声明当做let处理即可 */
function f() { console.log('I am outside!'); }
(function f() {
    if (false) {
        // 重复声明一次函数f
        function f() {
            console.log('I am inside!');
        }
    }
    f();
}());
// Uncaught TypeError: f is not a function
// 在ES6浏览器中实际运行的代码:
function f() {
    console.log('I am outside!');
}
(function f() {
    var f = undefined;
    if(false) {
        function f() {
            console.log('I am inside!');
        }
    }
    f();
}());

// 函数声明语句
{
    let a = 'secret';
    function f() { 
        return a;
     }
}

// 函数表达式
{
    let a = 'secret';
    let f = function () {
        return a;
    };
}

/* ES6的块级作用域允许声明函数的规则只在使用大括号的情况下成立,如果没有使用大括号,就会报错 */
//严格模式
'use strict';
// 不报错
if(true) {
    function f() { }
}
// 报错
'use strict';
if(true) 
    function f() {  }

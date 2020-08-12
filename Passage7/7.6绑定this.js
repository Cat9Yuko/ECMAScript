/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 13:39:57 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 15:19:05
 */


/*  箭头函数可以绑定this对象, 大大减少了显示绑定this对象的写法(call、apply、bind). 
    但是,箭头函数并非适合用于所有场所, 所以ES7提出了 "函数绑定"(function bind)运算符,
    用来取代call、apply、bind调用. 虽然该语法还是ES7的一个提案, 但是Babel转码器已经支持.
 */

//  函数绑定运算符是并排的双冒号(::), 双冒号左边是一个对象, 右边是一个函数. 该运算符会自动将左边的对象作为上下文环境(即this对象)绑定到右边的函数上.

foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return obj::hasOwnProperty(key);
}

// 如果双冒号左边为空, 右边是一个对象的方法, 则等于将该方法绑定在对象上.

var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);

// 由于双冒号运算符返回的还是原对象, 因此可以采用链式写法.
// 例一
import {map, takeWhile, forEach} from "iterlib";
getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));

// 例二
let { find, html} = jake;
document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");
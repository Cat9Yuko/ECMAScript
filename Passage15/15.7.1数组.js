/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-21 11:30:28 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-21 11:57:21
 */

// ES6借鉴C++、Java、C#、和Python语言, 引用了for...of循环作为遍历所有数据结构的统一的方法
/* 
    一个数据结构只要部署了Symbol.iterator属性, 就被视为具有iterator接口, 就可以用for...of循环遍历它的成员. 也就是说, for...of循环内部调用的是数据结构的Symbol.iterator方法.
    for...of循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象(比如arguments对象、DOMNodeList对象)、后文的Generator对象, 以及字符串.
*/

// 数组原生具备iterator接口(即默认部署了Symbol.iterator属性), for...of循环本质上就是调用这个接口产生的遍历器, 可以用下面的代码证明.
const arr = ['red', 'green', 'blue'];

for (let v of arr) {
    console.log(v); // red green blue
}
const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for (let v of obj) {
    console.log(v) // red green blue
}

// 上面的代码中, 空对象obj部署了数组arr的Symbol.iterator属性, 结果obj的for...of循环产生了与arr完全一样的结果.
// for...of循环可以代替数组实例的forEach方法.
const arr = ['red', 'green', 'blue'];
arr.forEach(function (element, index) {
    console.log(element); // red green blue
    console.log(index) // 0 1 2
});
// JavaScript原有的for...in循环只能获得对象的键名, 不能直接获取键值. ES6提供的for...of循环允许遍历获得键值.
var arr = ['a', 'b', 'c', 'd'];
for (let a in arr) {
    console.log(a); // 0 1 2 3
}

for (let a of arr) {
    console.log(a); // a b c d
}

/* 上面的代码表名, for...in循环读取键名, for...of循环读取键值. 如果要通过for...of循环获取数组的索引, 可以借助数组实例的entries方法 */
// for...of循环调用遍历器接口, 数组的遍历器接口只返回具有数字索引的属性.这一点跟for...in循环也不一样.
let arr = [3, 5, 7];
arr.foo = 'hello';
for (let i in arr) {
    console.log(i);
    /* 0
    1
    2
    foo */
}

for(let i of arr) {
    console.log(i); // "3", "5", "7"
}
// 上面的代码中, for...of循环不会返回数组arr的foo属性
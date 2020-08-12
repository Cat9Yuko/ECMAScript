/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-11 14:06:22 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-11 15:36:24
 */


//  扩展运算符(spread)是三个点(...), 它如同rest参数的逆运算, 将一个数组转为用逗号分隔的参数序列.
console.log(...[1, 2, 3]);
// 1 2 3
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

// [...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

// 该运算符主要用于函数调用.

function push(array, ...items) {
    array.push(...items);
}

function add(x, y) {
    return x + y;
}
var numbers = [4, 38];
add(...numbers);// 42


// 上面的代码中, array.push(...items) 和 add(...numbers)这两行都是函数的调用, 它们都使用了扩展运算符. 该运算符可以将一个数组变为参数序列.
// 扩展运算符与正常的函数参数课可以结合使用, 非常灵活.
function f(v, w, x, y, z) {
    var args = [0, 1];
    f(-1, ...args, 2, ...[3]);
}
// 扩展运算符后面还可以放置表达式.
const arr = [
    ...f(x > 0 ? ['a'] : []),
    'b',
];

// 如果扩展运算符后面是一个空数组, 则不产生任何效果.
[...[], 1]
// [1]
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-11 11:11:22 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-11 16:07:46
 */


//  ES6提出了两个新的生命变量命令: let和const. 其中, let完全可以取代var, 因为两者语义相同, 而且let没有副作用.

'use strict';
if (true) {
    let x = 'hello';
}
for (let i = 0; i < 10; i++) {
    console.log(i);
}
// 上面的代码如果用var代替let, 实际上就声明了一个全局变量, 这显然不是本意.变量应该只在其声明的代码块内有效, var 命令做不到这一点.
// var 命令存在变量提升效用, let命令没有这个问题.

if (true) {
    console.log(x);
    // ReferenceError: Cannot access 'x' before initialization
    let x = 'hello';
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const itemsCopy = [...items];

console.log(itemsCopy);
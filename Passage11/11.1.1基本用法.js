/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-06 16:19:36 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-07 08:45:11
 */


//  ES6提供了新的数据结构————Set.它类似于数组, 但是成员的值都是唯一的, 没有重复.
// set 本身是一个构造函数, 用来生成Set数据结构.
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}
/* 
2
3
5
4
*/
// 上面的代码通过add方法向Set结构加入成员, 结果表明Set结构不会添加重复的值.
// Set函数可以接受一个数组(或者具有iterable接口的其他数据结构) 作为参数, 用来初始化.
// 例一
const set = new Set([1, 2, 3, 4, 4]);
console.log([...set]);
// [ 1, 2, 3, 4 ]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size);
// 5

// 例三
function divs() {
    return [...document.querySelectorAll('div')];
}
const set = new Set(divs());
console.log(set.size);
// 类似于
divs().forEach(div => set.add(div));
set.size 

/* 
    上面的代码中, 例一和例二是Set函数接受数组作为参数, 例三是接受类似数组的对象作为参数.
    上面的代码中也展示了一种去除数组重复成员的方法.
*/
// 去除数组的重复成员
[{...new Set(array)}];

// 向Set加入值时不会发生类型转换, 所有5 和 "5"是两个不同的值. Set内部判断两个值是否相同时使用的算法叫作 "Same-value equality",
// 它类似于精确相等运算符(===), 主要的区别是NaN等于自身, 而精确相等运算符认为NaN不等于自身.

let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
console.log(set);
// Set { NaN }

// 上面的代码向Set实例添加了两个NaN, 但是实际上只能添加一个. 这表明, 在Set内部, 两个NaN是相等的.
// 另外， 两个对象总是不相等的。
let set = new Set();
set.add({});
set.size // 1
set.add({});
set.size // 2
// 上面的代码表示, 由于两个空对象不是精确相等, 所以它们被视为两个值.

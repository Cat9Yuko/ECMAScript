/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-07 11:33:07 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-10 10:05:11
 */


 /* 
    Set结构的实例有4个遍历方法, 可用于遍历成员.

        keys(): 返回键名的遍历器.
        values(): 返回键值的遍历器.
        entries(): 返回键值对的遍历器.
        forEach(): 使用回调函数遍历每个成员.

        需要特别指出的是, Set的遍历顺序就是插入顺序. 这个特性有时非常有用, 比如使用Set保存一个回调函数列表, 调用时就能保证按照添加顺序调用.
 */
/* 
    keys()、values()、entries()
    keys方法、values方法、entries方法返回的都是遍历器对象.由于Set结构没有键名, 只有键值(或者说键名和键值都是同一个值), 所以keys方法和values方法的行为完全一致.
*/

let set = new Set(['red', 'green', 'blue']);
for(let item of set.keys()) {
    console.log(item);
}
// red
// green
// blue

for(let item of set.values()) {
    console.log(item);
}
// red// green// blue

for (const item of set.entries()) {
    console.log(item);
}

// [ 'red', 'red' ][ 'green', 'green' ][ 'blue', 'blue' ]

// 上面的代码中, entries方法返回的遍历器同时包括键名和键值, 所以每次输出一个数组, 其两个成员完全相等.
// Set结构的实例默认可遍历, 其默认遍历器生成函数就是它的values方法.
Set.prototype[Symbol.iterator] === Set.prototype.values
// true

// 这意味着, 可以省略values方法, 直接用for...of循环遍历Set
let set = new Set(['red', 'green', 'blue']);
for(let x of set) {
    console.log(x);
}

// forEach()
// Set结构实例的forEach方法用于对每个成员执行某种操作, 没有返回值.
let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2))
// 2
// 4
// 6

// 上面的代码说明, forEach方法的参数就是一个处理函数. 该函数的参数一次为键值、键名、集合本身. 另外, forEach方法还可以有第二参数, 表示绑定的this对象.
// 遍历的应用
// 扩展运算符(...) 内部使用for...of循环, 所以也可以用于Set结构.
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
console.log(arr);
// [ 'red', 'green', 'blue' ]

// 扩展运算符和Set结构相结合就可以去除数组的重复成员.
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
console.log(unique);
// [ 3, 5, 2 ]

// 而且, 数组的map和filter方法也可以用于Set
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
console.log(set);
// Set { 2, 4, 6 }

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
console.log(set);
// Set { 2, 4 }

// 因此使用Set可以很容易地实现并集(Union)、交集(Intersect) 和差集(Difference).
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);


// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference);
// Set { 1 }

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
console.log(intersect);
// Set { 2, 3 }

// 并集
let union = new Set([...a, ...b]);
console.log(union);
// Set { 1, 2, 3, 4 }

// 如果想在遍历操作中同步改变原来的Set结构, 目前没有直接的方法, 但有两种变通方法.
// 一种是利用原Set结构映射出一个新的结构, 然后赋值给原来的Set结构;另一种是利用Array.form方法.

// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
console.log(set);
// Set { 2, 4, 6 }

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
console.log(set);
// Set { 2, 4, 6 }
// 上面的代码提供了两种方法, 直接在遍历操作中改变了原来的Set结构.
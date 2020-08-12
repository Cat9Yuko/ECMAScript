/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-11 15:59:09 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-11 17:07:04
 */


/* 合并数组
        扩展运算符提供了数组合并的新写法. 
*/

// ES5
[1, 2].concat(more);
// ES6
[1, 2, ...more];

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
console.log(arr1.concat(arr2, arr3))
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
// [...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

// 与解构赋值结合
// 扩展运算符可以与解构赋值结合起来, 用于生成数组.

// ES5
a = list[0], rest = list.slice(1)

// ES6
// [a, ...rest] = list;

// 下面是另外一些例子.
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest // [2, 3, 4, 5]

const [first, ...rest] = [];
rest // []

// 如果将扩展运算符用于数组赋值, 则只能将其放在参数的最后一位, 否则会报错.
const [...butLast,lat] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错

// 函数的返回值
// JavaScript的函数只能返回一个值, 如果需要返回多个值, 只能返回数组或对象. 扩展运算符提供了解决这个问题的一种变通方法.

var dateFields = readDateFields(database);
var d = new Date(...dateFields);
// 上面的代码从数据库取出一行数据, 通过扩展运算符, 直接将其传入构造函数Date.

// 字符串
// 扩展运算符还可以将字符串转为真正的数组.

console.log([...'hello'])
[ 'h', 'e', 'l', 'l', 'o' ]

// 上面的写法有一个重要的好处: 能够正确识别32位的Unicode字符.
'x\uD83D\uDE80y'.length // 4
([...'x\uD83D\uDE80y'].length) // 3

// 以上代码的第一种写法中, JavaScript会将32位Unicode字符识别为2个字符, 采用扩展运算符就没有这个问题. 因此, 正确返回字符串长度的函数可以像下面这样写.
function length(str) {
    return [...str].length;
}

length('x\uD83D\uDE80y') // 3
// 凡是涉及操作32位Unicode字符的函数都有这个问题, 因此, 最好都用扩展运算符改写.
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('');
// 'y\uDE80\uD83Dx';

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
// 上面的代码中, 如果不用扩展运算符, 字符串的reverse操作就不正确.

// 实现了Iterator接口的对象
// 任何Iterator接口的对象都可以用扩展运算符转为真正的数组.

var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
// 上面的代码中, querySelectorAll方法返回的是一个nodeList对象. 它不是数组, 而是一个类似数组对象. 这时, 扩展运算符可以将其转为真正的数组, 原因在于NodeList对象实现了Iterator.
// 对于那些没有部署Iterator接口的类似数组的对象, 扩展运算符就无法将其转为真正的数组了.

let arrayLike = {
    '0' :'a',
    '1':'b',
    '2':'c',
    length: 3
};

let arr = [...arrayLike];
// TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
// 上面的代码中, arrayLike是一个类似数组的对象, 但是没有部署Iterator接口, 扩展运算符就会报错. 这时, 可以改为使用Array.from方法将arrayLike转为真正的数组.

// Map和Set结构、Generator函数
// 扩展运算符内部调用的是数据结构的Iterator接口, 因此只要具有Iterator接口的对象, 都可以使用扩展运算符, 如Map结构.

let map = new Map([
    [1,'one'],
    [2,'two'],
    [3,'three'],
])
let arr = [...map.keys()];
console.log(arr)
// [ 1, 2, 3 ]

// Generator函数运行后会返回一个遍历器对象, 因此可以使用扩展运算符.
var go = function*() {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...go()])
// [ 1, 2, 3 ]

// 上面的代码中, 变量go是一个Generator函数, 执行后返回的是一个遍历器对象, 对这个遍历器对象执行扩展运算符即可将内部遍历得到的值转为一个数组.
// 对于没有Iterator接口的对象, 使用扩展运算符将会报错.

var obj = {a : 1, b: 2};
let arr = [...obj];
// TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
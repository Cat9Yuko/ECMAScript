/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-11 17:07:42 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-12 10:03:34
 */


//  Array.from方法用于将两类对象转为真正的数组: 类似数组的对象(array-like object) 和可遍历(iterable) 对象(包括ES6新增的数据结构Set和Map).
// 下面是一个类似数组的对象， Array.from将它转为真正的数组.

let arrayLike = {
    '0':'a',
    '1':'b',
    '2':'c',
    length:3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike);
console.log(arr1)
// [ 'a', 'b', 'c' ]

// ES6的写法
let arr2 = Array.from(arrayLike);
console.log(arr2)
// [ 'a', 'b', 'c' ]
// 实际应用中, 常见的类似数组的对象时DOM操作返回的NodeList集合, 以及函数内部的arguments对象. Array.from都可以将它们转为真正的数组.

// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function(p) {
    console.log(p);
});

// arguments对象

function foo() {
    var args = Array.from(arguments);
    // ...
}
// 上面的代码中, querySelectorAll方法返回的是一个类似数组的对象, 只有将这个对象转为真正的数组, 才能使用forEach方法.
// 只要是部署了Iterator接口的数据结构, Array.from都能将其转为数组.
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a','b'])
Array.from(namesSet)// ['a', 'b']

// 上面的代码中, 字符串和Set结构都具有Iterator接口, 因此可以被Array.from转为真正的数组.
// 如果参数是一个真正的数组, Array.from会返回一个一模一样的新数组.

Array.from([1, 2, 3])
// [1, 2, 3]
// 值得提醒的是, 扩展运算符(...) 也可以将某些数据结构转为数组.
// arguments对象
function foo() {
    var args = [...arguments];
}
// NodeList对象
[...document.querySelectorAll('div')]
/* 
    扩展运算符背后调用的是遍历器接口(Symbol.iterator), 如果一个对象没有部署该接口, 就无法转换.
    Array.from方法还支持类似数组的对象.所谓类似数组的对象, 本质特征只有一点, 即必须有length属性.
    因此, 任何有length属性的对象, 都可以通过Array.from方法转为数组, 而这种情况扩展运算符无法转换.
*/
Array.from({length: 3});
// [undefined, undefined, undefined]

// 上面的代码中, Array.from返回了一个具有3个成员的数组, 每个位置的值都是undefined. 扩展运算符转换不了这个对象.
// 对于还没有部署该方法的浏览器, 可以用Array.prototy.slice方法替代.

const toArray = (() => 
    Array.from ? Array.from : obj => [].slice.call(obj)
)();

// Array.from还可以接受第二个参数, 作用类似数组的map方法, 用来对每个元素进行处理, 将处理后的值放入返回的数组.
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x);
// [1, 4, 9]
// 下面的例子是取出一组DOM节点的文本内容.
let spans = document.querySelectorAll('span.name');
//  map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)
// 下面的例子将数组中布尔值false的成员转为0.
Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

// 另一个例子是返回各种数据的类型.
function typesOf() {
    return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

// 如果map函数里面用到了this关键字, 还可以传入Array.from第三个参数, 用来绑定this.
/* 
    Array.from()可以将各种值转为真正的数组, 并且提供map功能. 这实际上意味着, 只要有一个原始的数据结构, 就可以先对它的值进行处理,
    然后转成规范的数组结构, 进而可以使用数量众多的数组方法.
*/

Array.from({length: 2}, () => 'jack')
// ['jack', 'jack']

// 上面的代码中, Array.from的第一个参数指定了第二个参数运行的次数. 这种特性可以让该方法的用法变得非常灵活.
// Array.from()的另一个应用是, 将字符串转为数组, 然后返回字符串的长度. 因为它能正确处理各种Unicode字符, 可以避免JavaScript将大于\uFFFF的Unicode字符串算作2个字符的bug.

function countSymbols(string) {
    return Array.from(string).length
}
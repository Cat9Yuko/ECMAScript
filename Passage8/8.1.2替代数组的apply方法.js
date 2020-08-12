/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-11 15:36:48 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-11 15:58:32
 */


//  由于扩展运算符可以展开数组, 所以不再需要使用apply方法将数组转为函数的参数.

// ES5的写法
function f(x, y, z) {
    // ...
}

var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
    // ...
}

var args = [0, 1, 2];
f(...args);

// 下面是扩展运算符取代apply方法的一个实际例子: 应用Math.max方法简化求出一个数组中的最大元素.
// ES5的写法
Math.max.apply(null, [14, 3, 77]);

// ES6的方法
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77);

// 上面的代码中, 由于JavaScript不提供求数组最大元素的函数, 所以只能套用Math.max函数将数组转为一个参数序列, 然后求最大值. 有了扩展运算符以后就可以直接使用Math.max了.

// 另一个例子是通过push函数将一个数组添加到另一个数组的尾部.
// ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1,arr2);
// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);

// 上面的ES5写法中, push方法的参数不可以是数组, 所以只好通过apply方法变通使用push方法. 有了扩展运算符, 可以直接将数组传入push方法.
// 下面是另一个例子

// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))

new Date(...[2015, 1, 1]);
 
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-12 10:06:10 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-12 10:20:20
 */


//  Array.of方法用于将一组值转换为数组.
Array.of(3, 11, 8) //[3, 11, 8]
Array.of(3) // [3]
Array.of(3).length // 1

// 这个方法的主要目的是弥补数组构造函数Array()的不足. 因为参数个数的不同会导致Array()的行为有差异.
Array() // []
Array(3) // [, , , ]
Array(3, 11, 8) // [3, 11, 8]

// 上面的代码中, Array方法没有参数、有1个参数或有3个参数时, 返回结果都不一样.只有当参数个数不少于2个时, Array()才会返回由参数组成的新数组. 参数个数只有1个时, 实际上是指定数组的长度.
// Array.of基本上可以用来替代Array()或new Array(), 并且不存在由于参数不同而导致的重载. 它的行为非常统一.
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]

Array.of // 总是返回参数值组成的数组.如果没有参数, 就返回一个空数组.
Array.of // 方法可以用下面的代码模拟实现.
function ArrayOf() {
    return [].slice.call(arguments);
}
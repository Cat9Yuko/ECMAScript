/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-08 14:41:22 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-08 15:45:00
 */

//  通常情况下, 定义了默认值的参数应该是函数的尾参数.因为这样比较容易看出到底省略了哪些参数.如果非尾部的参数设置默认值, 实际上这个参数是无法省略的.
// 例一
function f(x = 1,y) {
    return [x,y];
}
console.log(f());
// [ 1, undefined ]
console.log(f(2));
// [ 2, undefined ]
// console.log(f(,1));
// error
console.log(f(undefined, 1));
// [ 1, 1 ]

// 例二
function f(x, y=5,z) {
    return [x,y,z];
}
console.log(f());
// [ undefined, 5, undefined ]
console.log(f(1));
// [ 1, 5, undefined ]
// console.log(f(1,,2));
// error
console.log(f(1,undefined,2));
// [ 1, 5, 2 ]

// 上面的代码中, 有默认值的参数都不是尾参数. 这时, 无法只省略该参数而不省略其后的参数, 除非显示输入undefined.
// 如果传入undefined, 将触发该参数等于默认值, null则没有这个效果.
function foo(x = 5, y = 6) {
    console.log(x,y);
}

foo(undefined, null);
// 5 null
// 上面的代码中, x参数对应undefined, 结果触发了默认值, y参数等于null, 没有触发默认值.
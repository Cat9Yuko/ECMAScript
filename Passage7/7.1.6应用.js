/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-09 08:26:09 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-09 10:05:49
 */

//  利用参数默认值可以指定某一个参数不得省略, 如果省略就抛出一个错误.
function thorwIfMissing() {
    throw new Error('Missing parameter');
}

function foo(mustBeProvided = thorwIfMissing()) {
    return mustBeProvided;
}

foo();
// Error: Missing parameter
// 如果调用的时候没有参数, 以上代码中的foo函数就会调用默认值throwIfMissing函数,从而抛出一个错误.
// 从上面的代码还可以看到, 参数mustBeProvided的默认值等于throwIfMissing函数的运行结果(即函数名之后有一对圆括号), 这表明参数的默认值不是定义时执行, 而是运行时执行. 如果参数已经赋值, 默认值中的函数就不会运行.
// 另外, 可以将参数默认值设为undefined, 表明这个参数是可以省略的.

function foo(optional = undefined) {
    // ...
}

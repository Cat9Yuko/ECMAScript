/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-13 15:09:20 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-13 15:30:52
 */



//  apply方法拦截函数的调用、call和apply操作.
// apply方法可以接受3个参数, 分别是目标对象、目标对象的上下文对象(this) 和 目标对象的参数数组.
var handler = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments);
    }
};
// 下面是一个例子.
var target = function () {
    return 'I am the target';
};
var handler = {
    apply: function () {
        return 'I am the proxy';
    }
};
var p = new Proxy(target, handler);
console.log(p());
// I am the proxy

// 上面的代码中, 变量p是Proxy的实例, 作为函数调用时(p())就会被apply方法拦截, 返回一个字符串.
// 下面是另外一个例子.
var twice = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments) * 2;
    }
};
function sum(left, right) {
    return left + right;
}
var proxy = new Proxy(sum, twice);
console.log(proxy(1, 2)); // 6
console.log(proxy.call(null, 5, 6)); // 22
console.log(proxy.apply(null, [7, 8])); // 30

// 上面的代码中 每当执行proxy函数(直接调用或call和apply调用) 就会被apply方法拦截.
// 另外, 直接调用Reflect.apply方法也会被拦截.

Reflect.apply(proxy, null, [9, 10]) // 38

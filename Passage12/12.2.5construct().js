/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-13 18:14:58 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-13 18:22:02
 */



// construct方法用于拦截new命令, 下面是拦截对象的写法.
var handler = {
    construct(target, args, newTarget) {
        return new target(...args);
    }
};
// construct方法可以接受两个参数.
// target: 目标
// args: 构建函数的参数对象
// 下面是一个例子.

var p = new Proxy(function () {}, {
    construct: function (target, args) {
        console.log('called: ' + args.join(', '));
        return {
            value: args[0] * 10
        };
    }
});
(new p(1)).value
// "called: 1"
// 10

// construct 方法返回的必须是一个对象, 否则会报错.
var p = new Proxy(function () {  }, {
    construct: function(target, argumentsList) {
        return 1;
    }
});
new p();
// TypeError: 'construct' on proxy: trap returned non-object ('1')
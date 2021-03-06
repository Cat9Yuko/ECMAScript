/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 09:45:13 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 10:42:37
 */



//  有时需要将现有对象转为Promise对象, Promise.resolve方法就起到这个作用.
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
// 上面的代码将JQuery生成的deferred对象转为新的Promise对象.
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
// Promise.resolve方法的参数分成以下4种情况.
/* 
    参数是一个Promise实例
        如果参数是Promise实例, 那么Promise.resolve将不做任何修改,  原封不动地返回这个实例.
    
    参数是一个thenable对象
        thenable对象指的是具有then方法的对象, 如下面这个对象.
*/
let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
}
// Promise.resolve方法会将这个对象转为Promise对象, 然后立即执行thenable对象的then方法.
let thenable = {
    then: function (resolve, reject) { 
        resolve(42);
     }
};
let p1 = Promise.resolve(thenable);
p1.then(function (value) { 
    console.log(value); // 42
 });

 /* 上面的代码中, thenable对象的then方法执行后, 对象p1的状态就变为resolved, 从而立即执行最后的then方法指定的回调函数, 输出42

    参数不是具有then方法的对象或根本不是对象
    如果参数是一个原始值, 或者是一个不具有then方法的对象, 那么Promise.resolve方法返回一个新的Promise对象, 状态为Resolved.
 */
var p = Promise.resolve('Hello');
p.then(function(s) {
    console.log(s);
});
// Hello

/* 上面的代码生成一个新的Promise对象的实例p. 由于字符串Hello不属于异步操作(判断方法是字符串对象不具有then方法), 返回Promise实例的状态从生成起就是Resolved, 
所以回调函数会立即执行. Promise.resolve方法的参数会同时传给回调函数.

不带有任何参数
    Promise.resolve方法允许在调用时不带有参数, 而直接返回一个Resolved状态的Promise对象.
    所以, 如果希望得到一个Promise对象, 比较方便的方法就是直接调用Promise.resolve方法.
*/
var p = Promise.resolve();
p.then(function(){
    // ...
});

// 上面的代码中的变量就是一个Promise对象.
// 需要注意的是, 立即resolve的Promise对象是在本轮 "事件循环" (event loop) 结束时, 而不是在下一轮 "事件循环" 开始时.
setTimeout(function(){
    console.log('three');
}, 0);
Promise.resolve().then(function(){
    console.log('two');
});
console.log('one');
// one
// two
// three

// 上面的代码中, setTimeout(fn, 0) 是在下一轮 "事件循环" 开始是执行的, Promise.resolve() 在本轮 "事件循环" 结束时执行, console.log('one') 则是立即执行, 因此最先输出.
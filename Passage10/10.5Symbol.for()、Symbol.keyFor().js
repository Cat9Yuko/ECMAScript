/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-03 14:57:00 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-03 15:51:16
 */


 /* 
    有时, 我们希望重新使用同一个Symbol值, Symbol.for方法可以做到这一点. 它接受一个字符串作为参数, 然后搜索又没有以该参数作为名称的Symbol值.
 */
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2 // true
// 上面的代码中, s1和s2都是Symbol值, 但它们都是同样参数的Symbol.for方法生成的, 所以实际上是同一个值.
// Symbol.for()与Symbol()这种写法都会生成新的Symbol.它们的区别是, 前者会被登记在全局环境中供搜索, 而后者不会. Symbol.for()不会在每次调用时都返回一个新的Symbol类型的值, 而是会先检查给定的key是否已经存在, 如果不存在才会新建一个值.
// 比如调用Symbol.for("cat") 30次, 每次都会返回同一个Symbol值, 但是调用Symbol("cat") 30次则会返回30个不同的Symbol值.
Symbol.for("bar") === Symbol.for("bar")
// true
Symbol("bar") === Symbol("bar")
// false

// 上面的代码中, 由于Symbol()写法没有登记机制, 所以每次调用都会返回一个不同的值.Symbol.keyFor方法返回一个已登记的Symbol类型值的key.
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
// 上面的代码中, 变量s2属于未登记的Symbol值, 所以返回undefined.

/* 注意!
    Symbol.for为Symbol值登记的名字是全局环境的, 可以在不同的iframe或service worker中取到同一个值. */
    
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo');
// true
// 上面的代码中, iframe窗口生成的Symbol值可以在主页面得到.
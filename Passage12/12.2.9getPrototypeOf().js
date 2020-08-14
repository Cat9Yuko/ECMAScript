/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 10:12:40 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 10:19:21
 */



//  getPrototypeOf方法主要用来拦截获取对象原型. 具体来说, 用于拦截以下操作.
/* 
    Object.prototype.__proto__
    Object.prototype.isPrototypeOf()
    Object.getPrototypeOf()
    Reflect.getPrototypeOf()
    instanceof 
*/
// 下面是一个例子.
var proto = {};
var p = new Proxy({}, {
    getPrototypeOf(target) {
        return proto;
    }
});
Object.getPrototypeOf(p) === proto // true
// 上面的代码中, getPrototypeOf方法拦截Object.getPrototypeOf(), 返回proto对象.

/* 注意!
    getPrototypeOf方法的返回值必须是对象或者null, 否则会报错. 另外, 如果目标对象不可扩展(extensible), getPrototypeOf方法必须返回目标对象的原型对象. */
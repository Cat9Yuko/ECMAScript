/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-09 09:59:24 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-09 10:17:28
 */


//  extends关键字后面可以跟多种类型的值.
class B extends A {}
// 上面代码的A只要是一个有prototype属性的函数, 就能被B继承.由于函数都有prototype属性 (除了Function.prototype函数), 因此A可以是任意函数.
// 下面, 讨论3种特殊情况.

// 第一种特殊情况, 子类继承Object类.
class A extends Object {}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
// 这种情况下, A其实就是构造函数Object的复制, A的实例就是Object的实例.
// 第二种特殊情况, 不存在任何继承.
class A {}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
// 这种情况下, A作为一个基类 (即不存在任何继承) 就是一个普通函数, 所以直接继承Function.prototype. 但是, A调用后返回一个空悐 (即Object实例), 所以A.prototype.__proto__指向构造函数 (Object) 的prototype属性.
// 第三种特殊情况, 子类继承null.
class A extends null {}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true

// 这种情况与第二种情况非常像. A也是一个普通函数, 所以直接继承Function.prototype. 但是, A调用后返回的对象不继承任何方法, 所以它的__proto__指向Function.prototype, 即实质上执行了下面的代码.
class C extends null {
    constructor() {
        return Object.create(null);
    }
}
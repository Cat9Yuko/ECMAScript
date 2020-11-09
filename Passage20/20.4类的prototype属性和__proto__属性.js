/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-09 09:06:33 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-09 09:48:32
 */


/* 在大多数浏览器的ES5实现之中, 每一个对象都有__proto__属性, 指向对应的构造函数的prototype属性. Class作为构造函数的语法糖, 同时有prototype属性和__proto__属性, 因此同时存在两条继承链.

    子类的__proto__属性表示构造函数的继承, 总是指向父类.
    子类prototype属性的__proto__属性表示方法的继承, 总是指向父类的prototype属性.*/
class A {}
class B extends A {}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true

// 上面的代码中, 子类B的__proto__属性指向父类A, 子类B的prototype属性的__proto__属性指向父类A的prototype属性.
// 造成这样的结果是因为类的继承是按照下面的模式实现的.
class A {}
class B {}
// B的实例继承A的实例
Object.setPrototypeOf(B, A);
const b = new B();

// Object.setPrototypeOf方法的实现.
Object.setPrototypeOf = function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
// 因此可以得到上面的结果
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
// 这两条继承链可以这样理解: 作为一个对象, 子类(B)的原型(__proto__ 属性) 是父类(A); 作为一个构造函数, 子类(B) 的原型(prototype属性) 是父类的实例.
Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
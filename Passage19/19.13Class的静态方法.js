/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-04 09:53:34 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-04 10:09:13
 */


//  类相当于实例的原型, 所有在类中定义的方法都会被实例继承. 如果在一个方法前加上static关键字, 就表示该方法不会被实例继承, 而是直接通过类调用, 成为 "静态方法".
class Foo {
    static classMethod() {
        return 'hello';
    }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod();

// TypeError: foo.classMethod is not a function
Foo.classMethod();
// 上面的代码中, Foo类的classMethod方法前有static关键字, 表明该方法是一个静态方法, 可以直接在Foo类上调用(Foo.classMethod()), 而不是在Foo类的实例上调用.
// 如果在实例上调用静态方法, 会抛出一个错误, 表示不存在该方法.

// 父类的静态方法可以被子类继承.
class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {}
Bar.classMethod() // 'hello'
// 上面的代码中, 父亲Foo有一个静态方法, 子类Bar可以调用这个方法.
// 静态方法也可以从super对象上调用.

class Foo {
    static classMethod() {
        return 'hello';
    }
}
class Bar extends Foo {
    static classMethod() {
        return super.classMethod() + ', too';
    }
}
console.log(Bar.classMethod());
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-10-28 17:56:11 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-10-30 10:25:06
 */

//  与函数一样. Class也可以使用表达式的形式定义.
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};

// 上面的代码使用表达式定义了一个类. 需要注意的是, 这个类的名字MyClass而不是Me, Me只在Class的内部代码可用, 指代当前类.
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

// 上面的代码表示, Me只在Class内部有定义.
// 如果Class内部没有用到, 那么可以省略Me, 也就是可以写成下面的形式.
const MyClass = class {
    /**... */ }
// 采用Class表达式, 可以写出立即执行的Class.
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('张三');
person.sayName();
// 上面的代码中, person是一个立即执行的Class的实例.
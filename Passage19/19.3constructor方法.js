/*
 * @Author: Cat9Yuko 
 * @Date: 2020-10-28 16:56:19 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-10-28 17:08:38
 */

//  constructor方法是类的默认方法,通过new命令生成对象实例时自动调用该方法. 一个类必须有constructor方法, 如果没有显示定义, 一个空的constructor方法会被默认添加.
class Point {}
// 等用于
class Point {
    constructor() {}
}
// 上面的代码中定义了一个空的类Point, JavaScript引擎会自动为它添加一个空的constructor方法.
// constructor方法默认返回实例对象(即this), 不过完全可以指定返回另一个对象.
class Foo {
    constructor() {
        return Object.create(null);
    }
}
new Foo() instanceof Foo
// false
// 上面的代码中, constructor函数返回一个全新的对象, 结果导致实例对象不是Foo类的实例.
// 类必须使用new来调用, 否则会报错.这是它跟普通构造函数的一个主要区别, 后者不用new也可以执行.
class Foo {
    constructor() {
        return Object.create(null);
    }
}
Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
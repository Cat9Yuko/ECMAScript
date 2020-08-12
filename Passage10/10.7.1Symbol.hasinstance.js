/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-04 16:08:16 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-04 16:23:43
 */


//  对象的Symbol.hasInstance属性指向一个内部方法, 对象使用instanceof运算符时会调用这个方法, 判断该对象是否为某个构造函数的实例. 
// 比如, foo instanceof Foo在语言内部实际调用的是Foo[Symbol.hasInstance](foo).

class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
}

[1, 2, 3] instanceof new MyClass(); 
// 上面的代码中, MyClass是一个类, new MyClass()会返回一个实例. 该实例的Symbol.hasInstance方法会在进行instanceof运算时自动调用, 
// 判断左侧的运算子是否为Array的实例.
// 下面是另一个例子.
class Even {
    static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}

1 instanceof Even; // false
2 instanceof Even; // true
12345 instanceof Even; // false
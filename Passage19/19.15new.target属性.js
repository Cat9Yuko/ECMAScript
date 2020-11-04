/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-04 11:24:27 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-04 12:57:03
 */



//  new是从构造函数生成实例的命令. ES6位new命令引入了new.target属性, (在构造函数中) 返回new 命令所作用的构造函数. 如果构造函数不是通过new命令调用的, 那么new.target会返回undefined, 因此这个属性可用于确定构造函数是怎么调用的.

function Person(name) {
    if(new.target !== undefined) {
        this.name = name;
    }else {
        throw new Error('必须使用new生成实例!');
    }
}

// 另一种写法
function Person(name) {
    if(new.target === Person) {
        this.name = name;
    }else {
        throw new Error('必须使用 new 生成实例!!');
    }
}

var person = new Person('cat9yuko');
var notAPerson = Person.call(person, '张三');
// 上面的代码确保了构造函数只能通过new命令调用.
// Class内部调用new.target, 返回当前Class.

class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

var obj = new Rectangle(3, 4); // 输出true
// 需要注意的是, 子类继承父类时, new.target会返回子类.
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        // ...
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}

var obj = new Square(3);
// 上面的代码中, new.target会返回子类.
// 利用这个特点, 可以写出不能独立使用而必须继承后才能使用的类.
class Shape {
    constructor() {
        if(new.target === Shape) {
            throw new Error('本类不能实例化!');
        }
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        // ...
    }
}

var x = new Shape(); // 报错
var y = new Rectangle(3,4); // 正确

// 上面的代码中, Shape类不能被实例化, 只能用于继承.
// 注意, 子啊函数外部, 使用new.target会报错.
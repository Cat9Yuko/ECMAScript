/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-05 14:24:05 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-09 08:59:43
 */


//  super这个关键字既可以当作函数使用, 也可以当作对象使用.在这两种情况下, 它的用法完全不同.
// 第一种情况, super作为函数调用时代表父类的构造函数. ES6要求, 子类的构造函数必须执行一次super函数.
class A {}
class B extends A {
    constructor() {
        super();
    }
}
// 上面的代码中, 子类B的构造函数中的super()代表调用父类的构造函数. 这是必须的, 否则JavaScript引擎会报错.
// super虽然代表了父类A的构造函数, 但是返回的是子类B的实例, 即super内部的this指的是B, 因此super()在这里相当于A.prototype.constructor.call(this).
class A {
    constructor() {
        console.log(new.target.name)
    }
}
class B extends A {
    constructor() {
        super();
    }
}
new A() // A
new B() // B

// 上面的代码中, new.target指向当前正在执行的函数. 可以看到, 在super()执行时, 它指向的是子类B的构造函数, 而不是父类A的构造函数. 也就是说, super()内部的this指向的是B.
// 作为函数时, super()只能用在子类的构造函数之中, 用在其他地方就会报错.
class A {}

class B extends A {
    m() {
        super(); // SyntaxError: 'super' keyword unexpected here
    }
}

// 上面的代码中, super()用在B类的m方法之中就会造成句法错误.
// 第二种情况, super作为对象时在普通方法中指向父类的原型对象; 在静态方法中指向父类.

class A {
    p() {
        return 2;
    }
}

class B extends A {
    constructor() {
        super();
        console.log(super.p()); // 2
    }
}

let b = new B();
// 上面的代码中, 子类B中的super.p()就是将super当作一个对象来使用. 这时, super在普通方法之中指向A.prototype, 所以super.p()就相当于A.prototype.p().
/* 注意!
    由于super指向父类的原型对象, 所以定义在父类实例上的方法或属性是无法通过super调用的. */

class A {
    constructor() {
        this.p = 2;
    }
}
class B extends A {
    get m() {
        return super.p;
    }
}
let b = new B();
b.m // undefined

// 上面的代码中, p是父类A实例的属性, 因此super.p就引用不到它.
// 如果属性定义在父类的原型对象上, super就可以取到.

class A {}
A.prototype.x = 2;

class B extends A {
    constructor() {
        super();
        console.log(super.x);
    }
}

let b = new B();
// 上面的代码中, 属性x是定义在A.prototype上面的, 所以super.x可以取到它的值.
// ES6规定, 通过super调用父类的方法时, super会绑定子类的this.

class A {
    constructor() {
        this.x = 1;
    }
    print() {
        console.log(this.x);
    }
}

class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    m() {
        super.print();
    }
}
let b = new B();
b.m() // 2
/* 上面的代码中, super.print()虽然调用的是A.prototype.print(), 但是A.prototype.print()会绑定子类B的this, 导致输出的是2, 而不是1.
    也就是说, 实际上执行的是super.print.call(this).
    由于绑定子类的this, 因此如果通过super对某个属性赋值, 这时super就是this, 赋值的属性会变成子类实例的属性. */

class A {
    constructor() {
        this.x = 1;
    }
}
class B extends A {
    constructor() {
        super()
        this.x = 2;
        super.x = 3;
        console.log(super.x); // undefined
        console.log(this.x); // 3
    }
}

let b = new B();
// 上面的代码中, super.x被赋值为3, 等用于对this.x赋值为3. 当读取super.x时, 相当于读取的是A.prototype.x, 所以返回undefined.
// 如果super作为对象用在静态方法之中, 这时super将指向父类, 而不是父类的原型对象.

class Parent {
    static myMethod(msg) {
        console.log('static', msg);
    }
    myMethod(msg) {
        console.log('instance', msg);
    }
}

class Child extends Parent {
    static myMethod(msg) {
        super.myMethod(msg)
    }
    myMethod(msg) {
        super.myMethod(msg)
    }
}
Child.myMethod(1); //  static 1
var child = new Child();
child.myMethod(2); //  instance 2
// 上面的代码中, super在静态方法之中指向父类, 在普通方法之中指向父类的原型对象.
// 使用super的时候, 必须显示指定是作为函数韩式作为对象使用, 否则会报错.

class A {}
class B extends A {
    constructor(props) {
        super(props)
        // console.log(super);
        // SyntaxError: 'super' keyword unexpected here
    }

}
// 上面的代码中, console.log(super) 当中的super无法看出是作为函数使用还是作为对象使用, 所以JavaScript引擎解析代码的时候会报错. 这时, 如果能清晰的表明super的数据类型, 就不会报错.

class A {}
class B extends A {
    constructor() {
        super();
        console.log(super.valueOf() instanceof B); // true
    }
}

let b = new B();
// 上面的代码中, super.valueOf() 表明super是一个对象, 因此不会报错. 同时, 由于super绑定B的this, 所以super.valueOf()返回的是一个B的实例.
// 最后, 由于对象总是继承其他对象的, 所以可以在任意一个对象中使用super关键字
var obj = {
    toStrinig() {
        return "MyObject: " + super.toStrinig();
    }
};
obj.toStrinig();
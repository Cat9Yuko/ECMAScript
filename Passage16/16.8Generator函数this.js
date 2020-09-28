/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-28 11:06:07 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-28 11:47:55
 */



//  Generator函数总是返回一个遍历器, ES6规定这个遍历器是Generator函数的实例, 它也继承了Generator函数的prototype对象上的方法
function* g() {}
g.prototype.hello = function () { return 'hi!'; }

let obj = g();
obj instanceof g // true
obj.hello() // 'hi!'

// 上面的代码表名, Generator函数g返回的遍历器obj是g的实例, 而且继承了g.prototype. 但是, 如果把g当作普通的构造函数, 则并不会生效, 因为g返回的总是遍历器对象, 而不是this对象.

function* g() {
    this.a = 11;
}
let obj = g();
obj.a // undefined
// 上面的代码中, Generato函数g在this对象上添加了一个属性a, 但是obj对象拿不到这个属性.
// Generator函数也不能跟new命令一起用, 否则会报错.
function* F() {
    yield this.x = 2;
    yield this.y = 3;
}

new F();
// TypeError: F is not a constructor

// 上面的代码中, new命令更构造函数F一起使用, 结果报错, 因为F不是构造函数.
// name, 又没有办法让Generator函数返回一个正常的对象实例, 既可以用next方法, 又可以获得正常的this呢?
// 下面是一个变通方法. 首先, 生成一个空对象, 使用call方法绑定Generator函数内部的this. 这样, 构造函数调用以后, 这个空对象就是Generator函数的实例对象了.
function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}

var obj = {};
var f = F.call(obj);

f.next();
f.next();
f.next();
obj.a
obj.b
obj.c
// 上面的代码中, 首先是F内部的this对象绑定obj对象, 然后调用它, 返回一个Iterator对象, 然后调用它, 返回一个Iterator对象.这个对象执行3次next方法(因为F内部有两个yield表达式),
// 完成F内部所有代码的运行. 这时, 所有内部属性都绑定在obj对象上了, 因此obj对象也就成了F的实例.
// 上面的代码执行的是遍历器对象f, 但是生成的对象实例是obj,  又没有办法将这两个对象统一呢?
// 一个方法就是将obj换成F.prototype
function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}
var f = F.call(F.prototype);
f.next();
f.next();
f.next();

f.a
f.b
f.c
// 再将F改成构造函数, 就可以对它执行new命令了.
function* gen() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}
function F() {
    return gen.call(gen.prototype);
}
var f = new F();
f.next();
f.next();
f.next();

f.a
f.b
f.c

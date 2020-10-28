/*
 * @Author: Cat9Yuko 
 * @Date: 2020-10-28 17:28:17 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-10-28 17:55:39
 */


//  生成实例对象的写法与ES5完全一样, 也是使用new命令. 如果忘记加上new, 像函数那样调用Class将会报错.
class Point {
    // ...
}
// 报错
var point = Point(2, 3);
// 正确
var point = new Point(2, 3);
// ES5一样, 实例的属性除非显示定义在其本身(即this对象) 上, 否则都是定义在原型(Class)上.
// 定义类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }
}
var point = new Point(2, 3);
console.log(point.toString());
console.log(point.hasOwnProperty('x'));
console.log(point.hasOwnProperty('y'));
console.log(point.hasOwnProperty('toString'));
console.log(point.__proto__.hasOwnProperty('toString'));
// (2,3)
// true
// true
// false
// true

// 上面的代码中, x 和y都是实例对象point自身的属性 (因为定义在this变量上), 所以hasOwnProperty方法返回true, 而toString是原型对象的属性(因为定义在Point类上), 所以hasOwnProperty方法返回false. 这些都与ES5的行为保持一致.
// 与ES5一样, 类的所有实例共享一个原型对象.
var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
p1.__proto__ === p2.__proto__
// true
// 上面的代码中, p1和p2都是Point的实例, 它们的原型都是Pointprototype, 所以__proto__属性是相等的.
// 这也意味着, 可以通过实例的__proto__属性为"类"添加方法.

/* 注意!
    __proto__并不是语言本身的特性, 而是各大厂商具体实现时添加的私有属性, 虽然目前很多现代浏览器的js引擎中都提供了这个私有属性, 但依旧不建议在生产中使用该属性, 避免对环境产生依赖. 生产环境中, 我们可以使用Object.getPrototypeOf方法来获取实例对象的原型, 然后再来为原型添加方法/属性.
*/

var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
p1.__proto__.printName = function(){return 'Oops'};

p1.printName()
p2.printName()

var p3 = new Point(4, 2);
p3.printName()

// 上面的代码在p1的原型上添加了一个printName方法, 由于p1的原型就是p2的原型, 因此p2也可以调用这个方法. 而且, 此后新建的实例p3也可以调用这个方法. 这意味着, 使用实例的__proto__属性改写原型必须相当谨慎, 不推荐使用, 因为这会改变Class的原始定义, 影响到所有实例.
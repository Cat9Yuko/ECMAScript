/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-09 10:20:37 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-09 10:26:18
 */


// 子类实例的__proto__属性的__proto__属性指向父类实例的__proto__属性.也就是说, 子类的原型的原型是父类的原型.
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
// 上面的代码中, ColorPoint继承了Point, 导致前者原型的原型是后者的原型.
// 因此, 可以通过子类实例的__proto__.__proto__属性修改父类实例的行为.
p2.__proto__.__proto__.printName = function () {
    console.log('Ha');
}
p1.printName() // "Ha"
// 上面的代码在ColorPoint的实例p2上向Point类中添加方法, 结果影响到了Point的实例p1.
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-03 14:09:41 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-03 14:11:52
 */


//  本质上, 由于ES6的类只是ES5的构造函数的一层包装, 所以函数的许多特性都被class继承, 包括name属性.
class Point{}
console.log(Point.name)
// Point
// name属性总是返回紧跟在class关键字后面的类名.
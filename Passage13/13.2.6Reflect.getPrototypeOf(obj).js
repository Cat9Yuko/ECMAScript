/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 08:54:22 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 09:08:14
 */




//  Reflect.getPrototypeOf 方法用于读取对象的__proto__属性, 对应Object.getPrototypeOf(obj).
const myObj = new FancyThing();
// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;

// Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是, 如果参数不是对象, Object.getPrototype会先将这个参数转为对象, 然后再运行, 而Reflect.getPrototypeOf会报错.
console.log(Object.getPrototypeOf(1));
// [Number: 0]
Reflect.getPrototypeOf(1)
// TypeError: Reflect.getPrototypeOf called on non-object

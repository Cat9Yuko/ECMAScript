/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 09:09:23 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 09:16:15
 */



//  Reflect.setPrototypeOf 方法用于设置对象的__proto__属性, 返回第一个参数对象, 对应Object.setPrototypeOf(obj, newProto).
const myObj = new FancyThing();

// 旧写法
Object.setPrototypeOf(myObj, OtherThing.prototype);

// 新写法
Reflect.setPrototypeOf(myObj, OtherThing.prototype);
// 如果第一个参数不是对象, Object.setPrototypOf会返回第一个参数本身, 而Reflect.setPrototypeOf会报错.
Object.setPrototypeOf(1, {})
// 1
Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object
// 如果第一个参数是undefined或null, Object.setPrototypeOf和Reflect.setPrototypeOf都会报错

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object

/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 09:52:36 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 09:57:04
 */



//  Reflect.preventExtensions对应Object.preventExtensions方法, 用于使一个对象变为不可扩展的. 它返回一个布尔值, 表示是否操作成功.
var myObject = {};

// 旧写法
Object.preventExtensions(myObject) // Object{}

// 新写法
Reflect.preventExtensions(myObject) //  true
// 如果参数不是对象, Object.preventExtensions在ES5环境下将报错, 在ES6环境下将返回传入的参数, 而Reflect.preventExtensions会报错.

// ES5 环境
Object.preventExtensions(1) // 报错

// ES6 环境
Object.preventExtensions(1) // 1

// 新写法
Reflect.preventExtensions(1) // 报错

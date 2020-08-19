/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 09:58:53 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 10:03:10
 */


//  Reflect.ownKeys方法用于返回对象的所有属性, 基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和.

var myObject = {
    foo: 1,
    bar: 2,
    [Symbol.for('baz')]: 3,
    [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
// [Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 09:44:18 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 09:50:25
 */


//  Reflect.isExtensible方法对应Object.isExtensible, 返回一个布尔值, 表示当前对象是否可扩展.
const myObject = {};

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true

// 如果参数不是对象, Object.isExtensible会返回false(因为非对象本来就是不可扩展的), 而Reflect.isExtensible会报错.
Object.isExtensible(1) //  false
Reflect.isExtensible(1) // TypeError: Reflect.isExtensible called on non-object
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 08:38:40 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 08:42:20
 */



// Reflect.has方法对应name in obj中的in运算符.
var myObject = {
    foo: 1,
};
// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
// 如果第一个参数不是对象, Reflect.has 和 in运算符都会报错.
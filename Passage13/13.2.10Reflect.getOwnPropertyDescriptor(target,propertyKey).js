/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 09:31:31 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 09:38:52
 */



//  Reflect.getOwnPropertyDescriptor基本等用于Object.getOwnPropertyDescriptor, 用于获得指定属性的描述对象, 将来回替代后者.
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
    value: true,
    enumerable: false,
});

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');

// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
// Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是, 如果第一个参数不是对象, Object.getOwnPropertyDescriptor(1, 'foo')不会报错,
// 并返回undefined, 而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误, 表示参数非法.
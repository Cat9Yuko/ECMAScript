/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-10 14:30:42 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-10 16:09:55
 */


//  除了指定加载某个输出值, 还可以使用整体加载(即星号*) 来指定一个对象, 所有输出值都加载在这个对象上.
// import {area, circumference } from './circle.js';
import * as circle from './circle.js';
console.log('圆面积:' + circle.area(4));
console.log('圆周长: ' + circle.circumference(14));

// 下面两行都是不允许的
// TypeError: Cannot add property foo, object is not extensible
circle.foo = 'hello';
// TypeError: Cannot assign to read only property 'area' of object '[object Module]'
circle.area = function () {}
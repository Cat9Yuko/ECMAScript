/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 09:17:02 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 09:25:00
 */



 /* Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args), 用于绑定this对象后执行给定函数.
    一般来说, 如果要绑定一个函数的this对象, 可以写成fn.apply(obj, args)的形式, 但是如果函数定义了自己的apply方法, 
    那么久只能写成Function.prototype.apply.call(fn, obj, args)的形式, 采用Reflect对象可以简化这种操作.
 */
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);

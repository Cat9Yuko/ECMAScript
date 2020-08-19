/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 09:26:20 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 09:31:23
 */


 /* Reflect.defineProperty方法基本等同于Object.defineProperty,  用来为对象定义属性. 今后, 后者会被逐渐废除, 因此从现在开始请使用Reflect.defineProperty来代替它. */
 function MyDate() {
     /* ... */
 }
//  旧写法
Object.defineProperty(MyDate, 'now', {
    value: () => Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
    value: () => Date.now()
});
// 如果Reflect.defineProperty的第一个参数不是对象, 就会抛出错误, 比如Reflect.defineProperty(1, 'foo').

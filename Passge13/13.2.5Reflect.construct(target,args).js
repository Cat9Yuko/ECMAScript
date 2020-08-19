/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 08:50:11 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 08:53:32
 */


//  Reflect.construct 方法等同于 new EventTarget(...args), 提供了一种不使用new来调用构造函数的方法.
function Greeting(name) {
    this.name = name;
}
// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
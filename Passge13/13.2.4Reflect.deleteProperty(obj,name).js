/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 08:43:08 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 08:49:02
 */



//  Reflect.deleteProperty 方法等同于 delete obj[name], 用于删除对象的属性
const myObj = { foo: 'bar'};

// 旧写法
delete myObj.foo;
// 新写法
Reflect.deleteProperty(myObj, 'foo');

// 该方法返回一个布尔值. 如果删除成功或者被删除的属性不存在, 就返回true;如果删除失败或者被删除的属性依然存在, 则返回false.
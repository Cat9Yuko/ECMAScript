/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-06 09:31:56 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 11:14:50
 */


//  对象的Symbol.replace属性指向一个方向, 当对象被String.prototype.replace方法调用时会返回该方法的返回值.
String.prototype.replace(searchValue, replaceValue);
// 等同于
searchValue[Symbol.replace](this, replaceValue)

// 下面是一个例子.
const x = {};
x[Symbol.replace] = (...s) => console.log(s);
'Hello'.replace(x, 'World') // ["Hello", "World"]

// Symbol.replace方法会受到两个参数, 第一个参数是replace方法正在作用的对象, 在上面例子中是Hello, 第二个参数是替换后的值, 在上面例子中是World.
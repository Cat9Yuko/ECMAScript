/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-18 16:11:04 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-18 16:23:41
 */



//  Reflect.get方法查找并返回target对象的name属性, 如果没有该属性, 则返回undefined.
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
}
console.log(Reflect.get(myObject, 'foo')); // 1
console.log(Reflect.get(myObject, 'bar')); // 2
console.log(Reflect.get(myObject, 'baz')); // 3

// 如果name属性部署了读取函数(getter), 则读取函数的this绑定receiver.
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
};
var myReceiverObject = {
    foo: 4,
    bar: 4,
};
console.log(Reflect.get(myObject, 'baz', myReceiverObject)); // 8
// 如果第一个参数不是对象, Reflect.get方法会报错.
Reflect.get(1, 'foo');
Reflect.get(false, 'foo')
// TypeError: Reflect.get called on non-object
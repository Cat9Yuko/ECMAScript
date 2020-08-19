/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-18 16:27:03 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 08:18:17
 */



//  Reflect.set方法设置target对象的name属性等于value.
var myObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    },
}
myObject.foo // 1
Reflect.set(myObject, 'foo', 2);
myObject.foo // 2
Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
// 如果name属性设置了赋值函数， 则赋值函数的this绑定receiver。
var myObject = {
    foo: 4,
    set bar(value) {
        return this.foo =  value;
    },
};
var myReceiverObject = {
    foo: 0,
};
Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1

// 如果第一个参数不是对象, Reflect.set会报错.
Reflect.set(1, 'foo', {}) 
Reflect.set(false, 'foo', {})
// TypeError: Reflect.set called on non-object

// 注意, Reflect.set会触发Proxy.defineProperty拦截.
let p = {
    a: 'a'
};

let handler = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver)
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};
let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
// 上面的代码中, Proxy.set拦截使用了Reflect.set, 导致触发了Proxy.defineProperty拦截.
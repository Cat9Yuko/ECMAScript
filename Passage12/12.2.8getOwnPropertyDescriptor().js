/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 10:05:22 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 10:12:07
 */


//  getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor(), 返回一个属性描述对象或者 unfettered.
var handler = {
    getOwnPropertyDescriptor(target, key) {
        if(key[0] === '_') {
            return ;
        }
        return Object.getOwnPropertyDescriptor(target, key);
    }
};

var target = { _foo: 'bar', baz: 'tar'};
var proxy = new Proxy(target, handler);
console.log(Object.getOwnPropertyDescriptor(proxy, 'wat'));
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy, '_foo'));
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy, 'baz'));
// { value: 'tar', writable: true, enumerable: true, configurable: true }

// 上面的代码中, handler.getOwnPropertyDescriptor方法对于第一个字符为下画线的属性名会返回undefined.
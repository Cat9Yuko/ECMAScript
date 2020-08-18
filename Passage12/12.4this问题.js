/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 13:57:33 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 15:16:08
 */




//  虽然Proxy可以代理针对目标对象的访问, 但它不是目标对象的透明代理, 即不做任何拦截的情况下也无法保证与目标对象的行为一致.主要原因就是
// 在Proxy代理的情况下, 目标对象内部的this关键字会指向Proxy代理.
const target = {
    m: function() {
        console.log(this === proxy);
    }
};
const handler = {};
const proxy = new Proxy(target, handler);
target.m() // false
proxy.m() //  true

// 上面的代码中, 一旦proxy代理target.m, 后者内部的this就指向proxy, 而不是target.
// 下面是一个例子, 由于this指向的变化导致Proxy无法代理目标对象.
const _name = new WeakMap();
class Person {
    constructor(name) {
        _name.set(this, name)
    }
    get name() {
        return _name.get(this);
    }
}

const jane = new Person('Jane');
console.log(jane.name);// Jane
const proxy = new Proxy(jane, {});
proxy.name // undefined

/* 上面的代码中, 目标对象jane的name属性实例保存在外部WeakMap对象_name上面,
    通过this键区分.由于通过proxy.name访问时, this指向proxy, 导致无法取到值, 所以返回undefined.
    此外, 有些原生对象的内部属性只有通过正确的this才能获取, 所以Proxy也无法代理这些原生对象的属性. */
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);
proxy.getDate();
// TypeError: this is not a Date object.
// 上面的代码中, getDate方法只能在Date对象实例上面获取, 如果this不是Date对象实例就会报错. 这时, this绑定原始对象就可以解决这个问题.

const target = new Date('2015-01-01');
const handler = {
    get(target, prop) {
        if(prop === 'getDate') {
            return target.getDate.bind(target);
        }
        return Reflect.get(target, prop);
    }
};
const proxy = new Proxy(target, handler);
console.log(proxy.getDate()); // 1
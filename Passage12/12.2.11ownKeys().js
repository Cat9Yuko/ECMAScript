/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 11:03:24 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 11:45:57
 */



//  ownKeys方法用来拦截对象自身属性的读取操作. 具体来说, 拦截以下操作.
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()

// 下面是拦截Object.keys()的例子.
let target = {
    a: 1,
    b: 2,
    c: 3
};
let handler = {
    ownKeys(target) {
        return ['a'];
    }
};

let proxy = new Proxy(target, handler);
Object.keys(proxy)
// ['a']

// 上面的代码拦截了对于target对象的Object.keys()操作, 只返回a、b、c三个属性之中的a属性.
// 下面的例子是拦截第一个字符为下画线的属性名.
let target = {
    _bar: 'foo',
    _prop: 'bar',
    prop: 'baz'
};
let handler = {
    ownKeys(target) {
        return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    }
};

let proxy = new Proxy(target, handler);
for(let key of Object.keys(proxy)) {
    console.log(target[key]);
}
// "baz"
// 需要注意的是, 使用Object.keys方法时 有三类属性会被ownKeys方法自动过滤, 不会返回.
// 目标对象上不存在的属性.
// 属性名为Symbol值.
// 不可遍历(enumerable)的属性.

let target = {
    a: 1, 
    b: 2,
    c: 3,
    [Symbol.for('secret')]: '4',
};
Object.defineProperty(target, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
});

let handler = {
    ownKeys(target) {
        return ['a', 'd', Symbol.for('secret'), 'key'];
    }
};
let proxy = new Proxy(target, handler);
Object.keys(proxy);
// ['a']
// 上面的代码中, ownKeys方法显示返回不存在的属性(d)、Symbol值(Symbol.for('secret'))、不可遍历的属性(key),结果都被自动过滤掉了.
// ownKeys方法还可以拦截Object.getOwnPropertyNames().
var p = new Proxy({}, {
    ownKeys: function (target) { 
        return ['a','b','c'];
     }
});
console.log(Object.getOwnPropertyNames(p));
// [ 'a', 'b', 'c' ]

// ownKeys方法返回的数组成员只能是字符串或Symbol值. 如果有其他类型的值, 或者返回的根本不是数组, 就会报错.

var obj = {};
var p = new Proxy(obj, {
    ownKeys: function(target) {
        return [123, true, undefined, null, {}, []];
    }
});
console.log(Object.getOwnPropertyNames(p));
// TypeError: 123 is not a valid property name
// 上面的代码中, ownKeys方法虽然返回一个数组, 但是每一个数组成员都不是字符串或Symbol值, 因此就会报错.
// 如果目标对象自身包含不可配置的属性, 则该属性必须被ownKeys方法返回, 否则会报错.

var obj = {};
Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    value: 10
})
var p = new Proxy(obj, {
    ownKeys: function(target) {
        return ['b'];
    }
});
console.log(Object.getOwnPropertyNames(p));
// TypeError: 'ownKeys' on proxy: trap result did not include 'a'

// 上面的代码中, obj对象的a属性是不可配置的, 这时ownKeys方法返回的数组之中必须包含a, 否则会报错.
// 另外, 如果目标对象是不可扩展的(non-extensition), 这时ownKeys方法返回的数组之中必须包含原对象的所有属性, 否则会报错.
var obj = {
    a: 1
};
Object.preventExtensions(obj);
var p = new Proxy(obj, {
    ownKeys: function(target) {
        return ['a', 'b'];
    }
});

console.log(Object.getOwnPropertyNames(p));
// TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
// 上面的代码中, obj对象是不可扩展的, 这时ownKeys方法返回的数组之中包含了obj对象的多余属性b, 所以导致了出错.
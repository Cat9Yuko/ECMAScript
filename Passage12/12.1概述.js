/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-12 16:34:06 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-13 10:12:20
 */



/* 
   Proxy用于修改某些操作的默认行为, 等同于在语言层面作出修改, 所以属于一种 "元编程" (meta programming). 即对编程语言进行编程.
   Proxy可以理解成在目标对象前架设一个 "拦截" 层, 外界对该对象的访问都必须先通过这层拦截, 因此提供了一种机制可以对外界的访问进行过滤和改写.
   Proxy这个词的愿意是代理, 用在这里表示由它来 "代理"  某些操作, 可以译为 "代理期"
   */
var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}`);
        return Reflect.set(target, key, value, receiver);
    }
});
/* 
上面的代码对一个空对象进行了一层拦截, 重定义了属性的读取(get)和设置(set)行为.这里暂时先不解释具体的语法, 只看运行结果. 读取设置了拦截行为的对象obj
的属性会得到下面的结果.
*/
obj.count = 1;

++obj.count;

// 上面的代码说明, Proxy实际上重载(overlord) 了点运算符, 即用自己的定义覆盖了语言的原始定义.
// ES^原生提供Proxy构造函数, 用于生成Proxy实例.

var proxy = new Proxy(target, handler);
// Proxy对象的所有用法都是上面这种形式,  不同的只是handler参数的写法. 其中, new Proxy()表示生成一个Proxy实例, target参数表示索要拦截的目标对象, handler参数也是一个对象, 用来定制拦截行为.
// 下面是另一个拦截读取属性行为的例子.
var proxy = new Proxy({}, {
    get: function (target, property) {
        return 35;
    }
});

console.log(proxy.time); // 35
console.log(proxy.name); // 35
console.log(proxy.title); // 35

/* 
    上面的代码中, 构造函数Proxy接受两个参数; 第一个参数是所要代理的目标对象(上例中是一个空对象), 即如果没有Proxy介入, 操作原来要访问的就是这个对象;
    第二个参数是一个配置对象, 对于每一个被代理的操作, 需要提供一个对应的处理函数, 该函数将拦截对应的操作. 比如, 上面的代码中, 配置对象由一个get方法用来拦截对目标对象属性的访问请求.
    get方法的两个参数分别是目标对象和所要访问的属性. 可以看到, 由于拦截函数总是返回35,
    所以访问任何属性都将得到35.
    
    注意!
        要使Proxy起作用, 必须针对Proxy实例(上例中是Proxy对象)进行操作, 而不是针对目标对象(上例中是空对象)进行操作.
*/
// 如果handler没有设置任何拦截, 那就等同于直接通向原对象.
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
// 上面的代码中, handler是一个空对象, 没有任何拦截效果, 访问handler就等同于访问target.
// 一个技巧是将Proxy对象设置object.proxy属性, 从而可以在object对象上调用.
var object = {
    proxy: new Proxy(target, handler)
};
// Proxy实例也可以作为其他对象的原型对象.
var proxy = new Proxy({}, {
    get: function (target, property) {
        return 35;
    }
});
let obj = Object.create(proxy);
obj.time // 35

// 上面的代码中, proxy对象是obj对象的原型, obj对象本身并没有time属性, 所以根据原型链会在proxy对象上读取该属性, 导致被拦截.
// 同一个拦截器函数可以设置拦截多个操作.

var handler = {
    get: function (target, name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello, ' + name;
    },
    apply: function (target, thisBinding, args) {
        return args[0]
    },
    construct: function (target, args) {
        return {
            value: args[1]
        };
    }
}

var fproxy = new Proxy(function (x, y) {
    return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
console.log(fproxy.cat);
// "Hello, foo"

//  下面是Proxy支持的所有拦截操作, 则直接落在目标对象上, 按照原先的方式产生结果.

/* get(target, propKey, receiver)
    拦截对象属性的读取, 比如proxy.foo和proxy['foo']. 最后一个参数receiver是一个可选对象, 参见下面Reflect.get的部分.

    set(target, propKey, value, receiver)
    拦截对象属性的设置, 比如proxy.foo = v 或proxy['foo'] = v, 返回一个布尔值.

    has(target, propKey)
        拦截propKey in proxy的操作, 返回一个布尔值.
        
    deleteProperty(target, propKey)
        拦截delete proxy[propKey]的操作, 返回一个布尔值.
    
    ownKeys(target)
        拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy), 返回一个数组.
        该方法返回目标对象所有自身属性的属性名, 而Object.keys()的返回结果仅包括目标对象自身的可遍历属性.

    getOwnPropertyDescriptor(target, propKey)
        拦截object.getOwnPropertyDescriptor(proxy, propKey), 返回属性的描述对象.
    
    defineProperty(target, propKey, propDesc)
        拦截Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs), 返回一个布尔值.

    preventExtensions(target)
        拦截Object.preventExtensions(proxy), 返回一个布尔值.
    
    getPrototypeOf(target)
        拦截Object.getPrototypeOf(proxy), 返回一个对象.

    isExtensible(target)
        拦截Object.isExtensible(proxy), 返回一个布尔值.

    setPrototypeOf(target, proto)
        拦截Object.setPrototypeOf(proxy, proto), 返回一个布尔值. 如果目标对象是函数, 那么还有两种额外操作可以拦截.
    
    apply(target, object, args)
        拦截Proxy实例, 并将其作为函数调用的操作, 比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...).

    construct(target, args)
        拦截Proxy实例作为构造函数调用的操作, 比如new proxy(...args).
*/
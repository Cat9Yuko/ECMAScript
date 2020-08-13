/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-13 10:16:40 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-13 14:35:22
 */


//  get 方法用于拦截某个属性的读取操作. 前面已经有一个例子, 下面是另一个拦截读取操作的例子.
var person = {
    name: "张三"
};
var proxy = new Proxy(person, {
    get: function (target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});

console.log(proxy.name);
// 张三
console.log(proxy.age);
// ReferenceError: Property "age" does not exist.

// 上面的代码表示, 如果访问目标对象不存在的属性, 会抛出一个错误. 如果没有这个拦截函数, 访问不存在的属性只会返回undefined.
// get 方法可以继承.
let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('GET' + propertyKey);
        return target[propertyKey];
    }
});

let obj = Object.create(proto);
console.log(obj.xxx);

// 上面的代码中, 拦截操作定义在Prototype对象上, 所以如果读取obj对象继承的属性, 拦截会生效.
// 下面的例子使用get拦截实现数组读取负数索引.
function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    };
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}
let arr = createArray('a', 'b', 'c');
arr[-1] // c

// 上面的代码中, 如果数组的位置参数是-1, 就会输出数组的最后一个成员.
// 利用Proxy, 可以将读取属性的操作(get)转变为执行某个函数, 从而实现属性的链式操作.
var pipe = (function () {
    return function (value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function (pipeObject, fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    }, value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });
        return oproxy;
    }

}());

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
pipe(3).double.pow.reverseInt.get; // 63

// 上面的代码设置Proxy后达到了链式使用函数名的效果.
// 下面的例子则是利用get拦截实现一个生成各种DOM节点的通用函数dom
const dom = new Proxy({},{
    get(target, property) {
        return function(attrs = {}, ...children) {
            const el = document.createElement(property);
            for(let prop of Object.keys(attrs)) {
                el.setAttribute(prop, attrs[prop]);
            }
            for(let child of children) {
                if(typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
            return el;
        }
    }
});

const el = dom.div({},
    'Hello, my name is ',
    dom.a({href:'///example.com'}, 'Mark'),
    '. I like:',
    dom.url({},
        dom.li({}, 'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '...actually that\'s it')
    )
);

document.body.appendChild(el);

// 如果一个属性不可配置(configurable) 或不可写(writable), 则该属性不能被代理, 通过Proxy对象访问该属性将会报错.
const target = Object.defineProperties({}, {
    foo: {
        value: 123,
        writable: false,
        configurable: false
    },
});
const handler = {
    get(target, propKey) {
        return 'abc';
    }
};
const proxy = new Proxy(target, handler);
proxy.foo
// TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got 'abc')
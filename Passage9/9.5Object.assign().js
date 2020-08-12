/*
 * @Author: Cat9Yuko 
 * @Date: 2020-07-07 11:08:00 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-07 15:14:31
 */



//  Object.assign方法用于将源对象(source)的所有可枚举属性赋值到目标对象(target).
var target = {
    a: 1
};
var source1 = {
    b: 2
};
var source2 = {
    c: 3
};

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// Object.assign方法的第一个参数是目标对象, 后面的参数都是源对象.
// 注意目标对象与源对象有同名属性, 或多个源对象有同名属性, 则后面的属性会覆盖前面的属性.

var target = {
    a: 1,
    b: 1
};
var source1 = {
    b: 2,
    c: 2
};
var source2 = {
    c: 3
};

Object.assign(target, source1, source2);
target // {a: 1, b:2, c:3}

// 如果只有一个参数, Object.assign会直接返回该参数.
var obj = {
    a: 1
};
Object.assign(obj) === obj //true

// 如果该参数不是对象, 则会先转成对象, 然后返回.
typeof Object.assign(2) // "object"

// 由于undefined和null无法转成对象, 所以如果将它们作为参数, 就会报错.
console.log(Object.assign(undefined)) // TypeError: Cannot convert undefined or null to object
console.log(Object.assign(null)) // TypeError: Cannot convert undefined or null to object

/* 如果非对象参数出现在源对象的位置(即非首参数), 那么处理规则将有所不同. 首先, 这些参数都会转成对象,
    如果无法转成对象便会跳过. 这意味着, 如果undefined和null不在首参数便不会报错. */

let obj = {
    a: 1
};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
// 其他类型的值(即数值、字符串和布尔值) 不在首参数也不会报错, 但是, 除了字符串会以数组形式复制到对象, 其他值都不会产生效果

var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj);
// { '0': 'a', '1': 'b', '2': 'c' }
/* 以上的代码中, v1、v2、v3分别是字符串、布尔值和数值,结果只有字符串合入目标对象(以字符数组的形式), 数值和布尔值都会被忽略.
    这是因为只有字符串的包装对象会产生可枚举属性. */

console.log(Object(true)) // [Boolean: true]
console.log(Object(10)) // [Number: 10]
console.log(Object('abc')) // [String: 'abc']

// 上面的代码中, 布尔值、数值、字符串分别转成对应的包装对象, 可以看到它们的原始值都在包装对象的内部属性上面,
// 这个属性是不会被Object.assign赋值的.只有字符串的包装对象会产生可枚举的实义属性, 那些属性则会被拷贝.
// Object.assign赋值的属性是有限的, 只赋值源对象的自身属性(不复制继承属性), 也不复制不可枚举的属性(enumerable: false).

Object.assign({
        b: 'c'
    },
    Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
    })
)

// {b: 'c'}
// 上面的代码中, Object.assign要复制的对象只有一个不可枚举属性invisible, 这个属性并没有被复制进去.
// 属性名为Symbol值的属性也会被Object.assign复制.
console.log(Object.assign({
    a: 'b'
}, {
    [Symbol('c')]: 'd'
}))
// { a: 'b', [Symbol(c)]: 'd' }

/* 
    Object.assign方法实行的是浅复制, 而不是深复制.也就是说, 如果源对象某个属性的值是对象, name目标对象复制得到的是这个对象的引用.
*/
var obj1 = {a: {b:1}};
var obj2 = Object.assign({}, obj1);
obj1.a.b =2;
obj2.a.b // 2

// 上面的代码中, 源对象obj1的a属性的值是一个对象, Object.assign复制得到的是这个对象的引用.这个对象的任何变化都会反映到目标对象上面.
// 对于这种嵌套的对象, 一旦遇到同名属性, Object.assign的处理方法是替换而不是添加.

var target = {a: {b:'c',d:'e'}}
var source = {a:{b:'hello'}}
Object.assign(target, source)
// {a: {b: 'hello'}}
/* 上面的代码中, target对象的a属性被source对象的a属性整个替换掉了, 而不会得到{a:{b:'hello', d: 'e'}}的结果.
    这通常不是开发者想要的, 需要特别小心.有一些函数库提供Object.assign的定制版本(比如Lodash的_.defaultsDeep方法),
    可以解决浅复制的问题, 得到深复制的合并. */
// 注意, Object.assign可以用来处理数组, 但是会把数组视为对象来处理.
console.log(Object.assign([1, 2, 3], [4, 5]))
// [ 4, 5, 3 ]

// 上面的代码中, Object.assign把数组视为属性名为0、1、2的对象, 因此目标数组的0号属性4覆盖了原数组的0号属性1

// Object.assign方法有很多用处.
// 为对象添加属性
class Point {
    constructor(x, y) {
        Object.assign(this, {x, y});
    }
}
// 上面的方法通过assign方法将x属性和y属性添加到了Point类的对象实例中.

// 为对象添加方法
Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {
        // ...
    },
    anotherMethod() {
        // ...
    }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) { 
    // ...
 };
SomeClass.prototype.anotherMethod = function () { 
    // ...
 };
//  上面的代码使用了对象属性的简洁表示法, 直接将两个函数放在大括号中, 再使用assign方法添加到SomeClass.prototype中.

// 克隆对象

function clone(origin) {
    return Object.assign({}, origin);
}
// 上面的代码将原始对象复制到一个空对象中, 就得到了原始对象的克隆.
// 不过, 采用这种方法只能克隆原始对象自身的值, 不能克隆它集成的值.如果要想保持继承链, 可以采用下面的代码.

function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto),origin);
}

// 合并多个对象
// 将多个对象合并到某个对象
const merge = (target, ...sources) => Object.assign(target, ...sources);
// 如果希望合并后返回一个新对象, 可以改写上面的函数, 对一个空对象合并.
const merge = (...sources) => Object.assign({}, ...sources);

// 为属性指定默认值
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};
function processContent(options) {
    options = Object.assign({},DEFAULTS, options);
    console.log(options);
    // ...
}

/* 
    上面的代码中, DEFAULTS对象时默认值, options对象是用户提供的参数.Object.assign方法将DEFAULTS和options合并成一个新对象, 如果两者有同名函数,
    则option的属性值会覆盖DEFAULTS的属性值. */

/* 注意:
    由于存在深复制的问题, DEFAULTS对象和options对象的所有属性的值都只能是加你单类型, 而不能指向另一个对象, 否则将导致DEFAULTS对象的该属性不起作用. */

const DEFAULTS = {
    url: {
        host: 'example.com',
        port: 7070
    },
}
console.log(processContent({url: {port: 8000}}))
// { url: { port: 8000 } }

// 上面代码的愿意是将url.port改成8000, 而url.host保持不变. 实际结果却是options.url覆盖了DEFAULTS.url, 所以url.host就不存在了.
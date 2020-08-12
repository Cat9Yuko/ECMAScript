/*
 * @Author: Cat9Yuko 
 * @Date: 2020-07-31 14:49:21 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-31 16:19:35
 */


//  ES5的Object.getOwnPropertyDescriptor方法用来返回某个对象属性的描述对象(descriptor)
var obj = {p: 'a'};
console.log(Object.getOwnPropertyDescriptor(obj, 'p'));
// { value: 'a', writable: true, enumerable: true, configurable: true }

// ES2017引入了Object.getOwnPropertyDescriptors方法, 返回指定对象所有自身属性(非继承属性) 的描述对象.
const obj = {
    foo: 123,
    get bar() { return 'abc'}
};

console.log(Object.getOwnPropertyDescriptors(obj));
/* 
    {
  foo: { value: 123, writable: true, enumerable: true, configurable: true },
  bar: {
    get: [Function: get bar],
    set: undefined,
    enumerable: true,
    configurable: true
  }
*/

// 上面的代码中, Object.getOwnPropertyDescriptors方法返回一个对象, 所有原对象的属性名都是该对象的属性名, 对象的属性值就是该属性的描述对象.
// 该方法的实现非常容易.
function getOwnPropertyDescriptors(obj) {
    const result = {};
    for (let key of Reflect.ownKeys(obj)) {
        result[key] = Object.getOwnPropertyDescriptor(obj, key);
    }
    return result;
}
// 该方法的引入主要是为了解决Object.assign()无法正确复制get属性和set属性的问题.
const source = {
    /**
     * @param {any} value
     * @description this is a text
     */
    set foo(value) {
        console.log(value)
    }
};

const target1 = {};
Object.assign(target1, source);

console.log(Object.getOwnPropertyDescriptor(target1, 'foo'));
/* 
{
  value: undefined,
  writable: true,
  enumerable: true,
  configurable: true
} */
// 上面的代码中, source对象的foo属性值是一个赋值函数, Object.assign方法将这个属性复制给了target1对象, 结构该属性的值变成了undefined. 这是因为Object.assign方法总是复制一个属性的值, 而不会复制它背后的赋值方法或取值方法.

// Object.getOwnPropertyDescriptors方法 Object.defineProperties方法就可以实现正确复制
const souce = {
    set foo(value) {
        console.log(value);
    }
};

const target2 = {}
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(souce));
console.log(Object.getOwnPropertyDescriptor(target2, 'foo'));
/* 
{
  get: undefined,
  set: [Function: set foo],
  enumerable: true,
  configurable: true
}
*/
// 上面的代码中, 将两个对象合并的逻辑提炼出来便会得到以下代码.
const shallowMerge = (target, souce) => Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(souce)
);

// Object.getOwnPropertyDescriptors方法的另一个用处是, 配合 Object.create方法将对象属性克隆到一个新对象. 这属于浅复制.
const clone = Object.create(Object.getPrototypeOf(obj),
Object.getOwnPropertyDescriptors(obj));

// 或者

const shallowClone = (obj) => Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
);

// 上面的代码会克隆对象obj.
// 另外, Object.getOwnPropertyDescriptors 方法可以实现一个对象继承另一个对象. 以前, 继承另一个对象尝尝写成下面这样.
const obj = {
    __proto__: prot,
    foo: 123,
};

// ES6规定__proto__只需要部署浏览器, 无需部署其他环境. 如果去除__proto__, 上面的代码就要改成下面这样.
const obj = Object.create(prot);
obj.foo = 123;

// 或者
const obj = Object.assign(
    Object.create(prot),
    {
        foo: 123,
    }
);

// 有了 Object.getOwnPropertyDescriptors, 我们就有了另一种写法.
const obj = Object.create(
    prot,
    Object.getOwnPropertyDescriptors({
        foo: 123,
    })
);

// Object.getOwnPropertyDescriptors也可以用来实现Mixin(混入)模式.
let mix = (object) => ({
    with: (...mixins) => mixins.reduce(
        (c, mixin) => Object.create(
            c, Object.getOwnPropertyDescriptors(mixin)
        ),object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {a: 'b'};
let c = {a: 'c'};
let d = mix(c).with(a, b);

d.c // "c"
d.b // "b"
d.a // "a"

// 上面的代码返回一个新的对象d, 代表了对象a和b被混入了对象c的操作.
// 出于完整性考虑, Object.getOwnPropertyDescriptors 进入标准以后还会有Reflect.getOwnPropertyDescriptors方法.

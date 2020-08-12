/*
 * @Author: Cat9Yuko 
 * @Date: 2020-07-28 10:02:14 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-31 15:04:05
 */

/* 结构赋值:
    解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。 */

let {x,y,...z} = {x: 1, y: 2, a: 3, b:4}
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// 上面的代码中, 变量z是结构赋值所在的对象. 它获取等号右边的所有尚未读取的键(a和b), 将它们连同值一起复制过来.
// 由于结构赋值要求等号右边是一个对象, 所以如果等号右边是undefined或null就会报错, 因为它们无法转为对象.
let { x, y, ...z} = null;
// TypeError: Cannot destructure property 'x' of 'null' as it is null.

let { x, y, ...z} = undefined;
// TypeError: Cannot destructure property 'x' of 'undefined' as it is undefined.

// 解构赋值必须是最后一个参数, 否则报错.
let { ... x, y, z} = obj;
let {x, ...y, ...z} = obj;
// SyntaxError: Rest element must be last element

/* 结构赋值的复制是浅复制, 即如果一个键的值是复合类型的值(数组、对象、函数), 那么结构赋值复制的是这个值的引用, 而不是这个值的副本. */

let obj = {a: {b: 1}};
let { ...x} = obj;
obj.a.b = 2;
console.log(x.a.b); // 2
// 上面的代码中, x 是结构赋值所在的对象, 复制了对象的obj的a属性. a属性引用了一个对象, 修改这个对象的值会影响到解构赋值对它的引用.
// 另外, 结构赋值不会赋值继承自原型对象的属性.

let o1 = {a: 1};
let o2 = {b: 2};
o2.__proto__ = o1;
let {...o3} = o2;
console.log(o3);
// { b: 2 }
console.log(o3.a);
// undefined

// 上面的代码中, 对象o3复制了o2, 但是只复制了o2自身的属性, 没有复制它的原型对象o1的属性.
// 下面是另一个例子.
var o = Object.create({x: 1, y: 2});
o.z = 3;
// let {x,...{y,z}} = o;
x // 1
y // undefined
z // 3

// 上面的代码中, 变量x是单纯的解构赋值, 所以可以读取对象o继承的属性; 变量y和z是双重结构赋值, 只能读取对象o自身的属性, 所以只有变量z可以赋值成功.

// 写法一
const clone1 = {
    __proto__: Object.getPrototypeOf(obj),
};
// 写法二
const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
)


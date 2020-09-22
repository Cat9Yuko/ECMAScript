/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-22 10:28:51 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-22 10:50:13
 */



/* 上一章说过, 任意一个对象的Symbol.iterator方法等于该对象的遍历器对象生成函数, 调用该函数会返回该对象的一个遍历器对象.
   由于Generator函数就是遍历器生成函数, 因此可以把Generator赋值给对象的Symbol.iterator属性, 从而使得该对象具有Iterator接口. */
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]

// 上面的代码中, Generator函数赋值给Symbol.iterator属性, 从而使得myIterable对象具有了Iterator接口, 可以被...运算符遍历.
// Generator函数执行后, 返回一个遍历器对象. 该对象本身也具有Symbol.Iterator属性, 执行后返回自身.
function* gen() {
    // some code
}

var g = gen();
g[Symbol.iterator]() === g
// true

// 上面的代码中, gen是一个Generator函数, 调用它会生成一个遍历器对象g. 它的Symbol.iterator属性也是一个遍历器对象生成函数, 执行后返回它自己.
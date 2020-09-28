/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-22 16:34:11 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-28 10:55:17
 */



//  如果在Generator函数内部调用另一个Generator, 默认情况下是没有效果的.
function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    foo();
    yield 'y';
}

for (let v of bar()) {
    console.log(v);
}
// "x"
// "y"

// 上面的代码中, foo和bar都是Generator函数, 在bar里面调用foo是不会有效果的.
// 这时就需要用到yield*语句, 用来一个Generator函数里面执行另一个Generator函数.
function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    for (let v of foo()) {
        yield v;
    }
    yield 'y';
}

for (let v of bar()) {
    console.log(v);
}
// "x"
// "a"
// "b"
// "y"

// 再来看一个对比的例子.
function* inner() {
    yield 'hello!';
}

function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
}
var gen = outer1()
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
/* open
Object [Generator] {}
close */

function* outer2() {
    yield 'open'
    yield* inner()
    yield 'close'
}

var gen = outer2();
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
/* open
hello!
close */

// 上面的例子中, outer2使用了yield*, outer1没有使用. 结果就是outer1返回一个遍历器对象, outer2返回该遍历器对象的内部值.
// 从语法角度看, 如果yield命令后面跟的是一个遍历器对象, name需要在yield命令后面加上星号, 表明返回的是一个遍历器对象. 这被称为yield* 语句.

let delegatedIterator = (function* () {
    yield 'Hello!';
    yield 'Bye!';
}());

let delegatingIterator = (function* () {
    yield 'Greetings!';
    yield* delegatedIterator;
    yield 'OK, bye.';
}());

for (let value of delegatingIterator) {
    console.log(value);
}
// Greetings!
// Hello!
// Bye!
// OK, bye.

// 上面的代码中, delegatingIterator是代理者, delegatedIterator是被代理者. 由于yield* delegatedIterator语句得到的值是一个遍历器, 所以要用星号表示.运行结果就是使用一个遍历器遍历了多个Generator函数, 有递归的效果.
// yield* 后面的Generator函数(没有return语句时) 等同于在Generator函数内部部署一个for...of循环.
function* concat(iter1, iter2) {
    yield* iter1;
    yield* iter2;
}
// 等同于

function* concat(iter1, iter2) {
    for (var value of iter1) {
        yield value;
    }
    for (var value of iter2) {
        yield value;
    }
}
/* 上面的代码说明, yield*后面的Generator函数(没有return语句时)不过是for...of的一种简写形式, 完全可以用后者代替. 反之, 在有return语句时则需要用var value = yield* iterator的形式获取return语句的值.
    如果yield* 后面跟着一个数组, 由于数组原生支持遍历器, 因此就会遍历数组成员. */
function* gen() {
    yield*["a", "b", "c"];
}
console.log(gen().next());
// { value: 'a', done: false }

// 上面的代码中, yield命令后面如果不加星号, 返回的是整个数组, 加了星号就表示返回的是数组的遍历器对象.
// 实际上, 任何数据结构只要有Iterator接口, 就可以被yield*遍历.

let read = (function* () {
    yield 'hello';
    yield*'hello';
})();
read.next().value // "hello"
read.next().value // "h"

// 上面的代码中, yield语句返回整个字符串, yield* 语句返回单个字符. 因为字符串具有Iterator接口, 所以用yield*遍历.
// 如果被代理的Generator函数有return语句, 那么便可以向代理它的Generator函数返回数据.
function* foo() {
    yield 2;
    yield 3;
    return "foo";
}

function* bar() {
    yield 1;
    var v = yield* foo();
    console.log("v: " + v);
    yield 4;
}

var it = bar();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
/* { value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
v: foo
{ value: 4, done: false }
{ value: undefined, done: true } */

// 在上面的代码第四次调用next方法时, 屏幕上会有输出, 这是因为函数foo的return语句向函数bar提供了返回值.
// 再看一个例子.
function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
}

function* logReturned(genObj) {
        let result = yield* genObj;
        console.log(result);
    }
    [...logReturned(genFuncWithReturn())]
// The result
// 值为['a', 'b']

/* 上面的代码中, 存在两次遍历. 第一次是扩展运算符遍历函数logReturned返回的遍历器对象, 第二次时yield*语句遍历函数genFuncWithReturn返回的遍历器对象.
这两次遍历的效果是叠加的, 最终表现为扩展运算符遍历函数genFuncWitchReturn返回的遍历器对象. 所以, 最后的数据表达式得到的值等于['a', 'b'].
但是, 函数genFuuncWitchReturn的return语句的返回值TheResult会返回给函数logReturned了内部的result变量, 因此会有终端输出. */
// yield*命令可以很方便地取出嵌套数组的所有成员.
function* iterTree(tree) {
    if(Array.isArray(tree)) {
        for(let i = 0; i< tree.length; i++) {
            yield* iterTree(tree[i]);
        }
    }else {
        yield tree;
    }
}

const tree = ['a', ['b', 'c'], ['d', 'e']];
for (let x of iterTree(tree)) {
    console.log(x)
}
// a
// b
// c
// d
// e

// 下面是一个稍微复杂的例子, 使用yield*语句遍历完全二叉树.
// 下面是二叉树的构造函数,
// 3个参数分别是左树、当前节点和右树
function Three(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
}
// 下面是中序(inorder) 遍历函数.
// 由于返回的是一个遍历器, 所以要用generator函数.
// 函数体内采用递归算法, 所以左树和右树要用yield*遍历
function* inorder(t) {
    if(t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}
// 下面生成二叉树
function make(array) {
    // 判断是否为叶节点
    if(array.length == 1) return new TreeWalker(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd',[['e'],'f',['g']]]);

// 遍历二叉树
var result = [];
for(let node of inorder(tree)) {
    result.push(node);
}
result;
// ['a', 'b', 'c', 'd', 'e', f', 'g']
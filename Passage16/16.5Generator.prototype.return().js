/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-22 15:56:40 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-22 16:26:12
 */



//  Generator函数返回的遍历器对象还有一个return方法, 可以返回给定的值, 并终结Generator函数的遍历.
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();
console.log(g.next())
console.log(g.return('foo'))
console.log(g.next())
/* { value: 1, done: false }
{ value: 'foo', done: true }
{ value: undefined, done: true } */
// 上面的代码中, 遍历器对象g调用return方法后, 返回值的value属性就是return方法的参数foo.同时, Generator函数的遍历终止, 返回值done属性为true, 以后再调用next方法, done属性总是返回true.
// 如果return方法调用时不提供参考, 则返回值的value属性为undefined.
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();
g.next();
g.return();
// 如果Generator函数内部有try...finally代码块, 那么return方法会推迟到finally代码块执行完再执行.
function* numbers() {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
console.log(g.next())
console.log(g.next())
console.log(g.return(7))
console.log(g.next())
console.log(g.next())
/* { value: 1, done: false }
{ value: 2, done: false }
{ value: 4, done: false }
{ value: 5, done: false }
{ value: 7, done: true }
 */
// 上面的代码中, 调用return方法后就开始执行finally代码块, 然后等到finally代码块执行完再执行return方法.
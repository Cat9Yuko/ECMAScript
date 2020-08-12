/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-08 10:17:53 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-08 11:19:30
 */

//  在ES6之前, 不能直接为函数的参数指定默认值, 只能采用变通的方法.
function log(x, y) {
    y = y || 'World';
    console.log(x, y);
}

log('Hello');
log('Hello', 'China');
log('Hello', '');
/* Hello World
Hello China
Hello World 
*/

// 上面的代码检查函数log的参数y又没有赋值, 如果没有, 则指定默认值为World. 这种写法的缺点在于, 如果参数y赋值了, 但是对应的布尔值为false, 则该赋值不起作用.
// 就像以上代码的最后一行, 参数y等于空字符, 结果被改为默认值.

// 为了避免这个问题, 通常需要先判断一下参数y是否被赋值, 如果没有, 再令其等于默认值.
if(typeof y === 'undefined') {
    y = 'World';
}

// ES6允许为函数的参数设置默认值, 即直接写在参数定义的后面.
function log(x, y ='World') {
    console.log(x, y);
}

log('Hello');
log('Hello', 'China');
log('Hello', '');
/* Hello World
Hello China
Hello  */

// 可以看到, ES6的写法比ES5简洁许多, 而且非常自然. 下面是另一个例子.
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
var p = new Point();
console.log(p);
/* Point { x: 0, y: 0 } */

// 参数变量是默认声明的, 所以不能用let或const再次声明
function foo(x = 5) {
    // let x = 1;
    const x  = 2;
    // SyntaxError: Identifier 'x' has already been declared
}

// 使用参数默认值时, 函数不能有同名参数
function foo (x, x ,y = 1) {
    // ...
    // SyntaxError: Duplicate parameter name not allowed in this context
}

// 另外有一个容易忽略的地方是, 参数默认值不是传值的, 而是每次都重新计算默认值表达式的值. 也就是说, 参数默认值时惰性求值的.
let x = 99;
function foo(p =  x +1) {
    console.log(p);
}
foo();
// 100

x = 100;
foo();
// 101
// 上面的代码中, 参数p的默认值时x+1. 这时, 每次调用函数foo都会重新计算x+1,而不是默认p等于100.
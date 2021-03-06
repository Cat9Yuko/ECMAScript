/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-04 09:47:17 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-04 09:52:33
 */


//  如果某个方法之前加上星号(*), 就表示该方法是一个Generator函数.
class Foo {
    constructor(...args) {
        this.args = args;
    }

    * [Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}
for(let x of new Foo('hello', 'world')) {
    console.log(x);
}
// hello
// world

// 上面的代码中, Foo类的Symbol.iterator方法前有一个星号, 表示该方法是一个Generator函数. Symbol.iterator方法返回一个Foo类的默认遍历器, for...of循环会自动调用这个遍历器.
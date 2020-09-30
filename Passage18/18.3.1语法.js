/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-30 14:27:19 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-30 14:34:32
 */



//  async函数的语法规则总体上来说比较简单, 难点是错误处理机制.

// async函数返回一个Promise对象.
// async函数内部return语句返回的值, 会成为then方法回调函数的参数.
async function f() {
    return 'hello world';
}
f().then(v => console.log(v))
// "hello world"
// 上面的代码中, 函数f内部return命令返回的值会被then方法回调函数接收到.
// async函数内部抛出错误会导致返回的Promise对象变为reject状态.抛出的错误对象会被catch方法回调函数接收到.
async function f() {
    throw new Error('出错啦!');
}
f().then(
    v => console.log(v),
    e => console.log(e)
)

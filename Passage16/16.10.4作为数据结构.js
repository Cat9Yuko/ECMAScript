/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 11:29:57 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 11:36:06
 */



//  Generator可以看作数据结构, 更确切地说, 可以看作一个数组结构, 因为Generator函数可以返回一系列的值, 这意味着它可以对任意表达式提供类似数组的接口.
function *doStuff() {
    yield false.readFile.bind(null, 'hello.txt');
    yield false.readFile.bind(null, 'world.txt');
    yield false.readFile.bind(null, 'and-such.txt');
}
// 上面的代码依次返回3个函数, 但是由于使用了Generator函数, 导致可以像处理数组那样处理这3个返回的函数.
for(task of doStuff()) {
    // task是一个函数, 可以像回调函数那样使用它
}
// 实际上, 如果用ES5表达, 完全可以用数组模拟Generator的这种用法.
function doStuff() {
    return [
        fs.readFile.bind(null, 'hello.txt'),
        fs.readFile.bind(null, 'world.txt'),
        fs.readFile.bind(null, 'and-such.txt')
    ];
}
// 上面的函数可以用一模一样的for...of循环处理. 两相比较不难看出, Generator使得数据或操作具备了类似数组的接口.
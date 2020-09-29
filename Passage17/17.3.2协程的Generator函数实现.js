/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 15:35:46 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 15:43:42
 */




//  Generator函数是协程在ES6中的实现, 最大特点就是可以交出函数的执行权 (即暂停执行) .
// 整个Generator函数就是一个封装的异步任务, 或者说是异步任务的容器. 异步操作需要暂停的地方都用yield语句注明. Generator函数的执行方法如下.
function* gen(x) {
    var y = yield x + 2;
    return y;
}
var g = gen(1);
g.next() // {value: 3, done: false }
g.next() // {value: undefined, done: true }

// 上面的代码中, 调用Generator函数会返回一个内部指针 (即遍历器) g. 这是Generator函数不同于普通函数的另一个地方, 即执行它不会返回结果, 而是返回指针对象. 调用指针g的next方法可以移动内部指针 (即执行异步任务的第一段), 指向第一个遇到的yield语句, 上例是执行到x + 2 为止.
// 换言之, next方法的作用是分阶段执行Generator函数. 每次调用next方法都会返回一个对象, 表示当前阶段的信息 (value属性和 done属性). value属性是yield语句后面表达式的值, 表示当前阶段的值: done属性一个布尔值, 表示Generator函数是否执行完毕, 即是否还有下一个阶段.
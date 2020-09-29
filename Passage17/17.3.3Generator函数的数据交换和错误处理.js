/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 15:44:29 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 16:17:45
 */



//  Generator函数可以暂停执行和恢复执行, 这是它能封装异步任务的根本原因. 除此之外, 还有两个特性使它可以作为异步编程的完整解决方案: 函数体内外的数据交换和错误处理机制.
// next返回值的value属性是Generator函数向外输出数据; next方法还可以接受参数, 向Generator函数体内输入数据.
function* gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
g.next();
g.next(2);

// 上面的代码中, 第一个next方法的value属性返回表达式x+2的值3, 第二个next方法带有参数2, 这个参数可以传入Generator函数, 作为上个阶段异步任务的返回结果, 被函数体内的变量y接收. 因此, 这一步的value属性返回的就是2 (变量y的值).
// Generator函数内还可以部署错误处理代码, 捕获函数体外抛出的错误.
function* gen(x) {
    try {
        var y = yield x + 2;
    } catch(e) {
        console.log(e);
    }
    return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
// 出错了
// 上面代码的最后一行中, Generator函数体外使用指针对象的throw方法抛出的错误可以被函数体内的try...catch代码块捕获. 这意味着, 出错的代码与处理错误的代码实现了时间和空间上的分离, 这对于异步编程无疑是很重要的.
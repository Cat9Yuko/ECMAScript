/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 09:24:00 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 09:43:56
 */



 /* Promise.race方法同样是将多个Promise实例包装成一个新的Promise实例. */
 var p = Promise.race([p1, p2, p3]);
 /* 上面的代码中, 只要p1, p2, p3中有一个实例率先改变状态, p的状态就跟着改变.那个率先改变的Promise实例的返回值就传递给p的回调函数.
    Promise.race方法的参数与Promise.all方法一样, 如果不是Promise实例, 就会先调用下面讲到的Promise.resolve方法, 将参数转为Promise实例, 再进一步下面是一个例子, 如果指定时间内没有获得结果, 就将Promise的状态变为Rejected, 否则变为Resolved */
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function(resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000);
    })
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
// 上面的代码中, 如果5秒之内fetch方法无法返回结果, 变量p的状态就会变为Rejected, 从而触发catch方法指定的回调函数.
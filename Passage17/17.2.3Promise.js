/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 13:53:38 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 15:15:29
 */


//  回调函数本身没有问题, 它的问题出现在多个回调函数嵌套上. 假定读取A文件之后再读取B文件, 代码如下.
fs.readFile(fileA, 'utf-8', function(err, data) {
    fs.readFile(fileB, 'utf-8', function(err, data) {
        // ...
    });
});

// 不难想象, 如果依次读取以上两个文件, 就会出现多重嵌套. 代码不是纵向发展, 而是横向发展, 很快就会乱成一团, 无法管理. 因为多个异步操作形成了强耦合, 只要有一个操作需要修改, 它的上层回调函数和下层回调函数就都要跟着修改. 这种情况就称为 "回调函数地狱" (callback hell)
// Promise对象就是为了解决这个问题而被提出的. 他不是新的语法功能, 而是一种新的写法, 允许将回调函数的嵌套改写成链式调用. 采用Promise连续读取多个文件的写法如下.
var readFile = require('fs-readfile-promise');
readFile(fileA)
.then(function(data){
   console.log(data.toString()); 
})
.then(function() {
    return readFile(fileB);
})
.then(function(data) {
    console.log(data.toString());
})
.catch(function(err) {
    console.log(err);
});

// 上面的代码中, 笔者使用了fs-readfile-promise模块, 它的作用就是返回一个Promise版本的readFile函数.Promise提供then方法加载回调函数, catch方法捕捉执行过程中抛出的错误.
// 可以看到, promise的写法只是回调函数的改进, 使用then方法以后, 异步任务的两段执行更清楚了, 除此之外, 并无新意.
// Promise的最大问题是代码冗余, 原来的任务被Promise包装之后, 无论什么操作, 一眼看去都是许多then的堆积, 原来的语义变得很不清楚.
// 那么, 又没有更好的写法呢?

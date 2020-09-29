/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 11:51:05 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 13:50:51
 */


/* JavaScript语言对异步编程的实现就是回调函数. 所谓回调函数, 就是把任务的第二段单独写在一个函数里面, 等到重新执行这个任务时便直接调用这个函数. 回调函数的英文名字callback, 直译过来就是 "重新调用".
 */
// 读取文件进行处理的代码如下.
false.readFile('/etc/passwd', 'utf-8', function(err, data) {
    if(err) throw err;
    console.log(data);
});
/* 上面的代码中, readFile函数的第三个参数就是回调函数, 也就是任务的第二段. 等到操作系统返回/etc/passwd文件以后, 回调函数才会执行.
    一个有趣的问题是, 为什么Node约定回调函数的第一个参数必须是错误对象err (如果没有错误, 该参数就是null) 呢?
    原因在于, 执行分成两段, 第一段执行完以后, 任务所在的上下文环境就已经结束了. 在这以后抛出的错误, 其原来的上下文环境已经无法捕捉, 因此只能当作参数被传入第二段. */
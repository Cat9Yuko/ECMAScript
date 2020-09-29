/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 16:18:08 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 16:25:58
 */


//  下面看看如何使用Generator函数执行一个真实的异步任务.
var fetch = require('node-fetch');
function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}

// 上面的代码中, Generator函数封装了一个异步操作, 该操作先读取有一个远程接口与, 然后从JSON格式的数据中解析信息. 就像前面说过的, 这段代码非常像同步操作, 除增加了yield命令以外.
// 执行这段代码的方法如下.
var g = gen();
var result = g.next();

result.value.then(function(data) {
    return data.json();
}).then(function(data) {
    g.next(data);
});

/* 上面的代码中首先执行Generator函数获取遍历器对象, 然后使用next方法(第二行) 执行异步任务的第一阶段. 由Fetch模块返回的是一个Promise对象, 因此要用then方法调用下一个next方法.
    可以看到, 虽然Generator函数将异步操作表示得很简洁, 但是流程管理却不方便 (即何时执行第一阶段、何时执行第二阶段).  */
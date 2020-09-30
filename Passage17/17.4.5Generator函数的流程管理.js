/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-30 10:32:59 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-30 10:49:08
 */



//  大家可能会问, Thunk函数有什么作用? 回答是, 以前确实没有什么用, 但是ES6中有了Generator函数, Thunk函数可以用于Generator函数的自动流程管理.
// Generator函数可以自动执行.
function* gen() {
    // ...
}
var g = gen();
var res = g.next();

while(!res.done) {
    console.log(res.value);
    res = g.next();
}

// 上面的代码中, Generator函数gen会自动执行完所有步骤.
// 但是, 这不适合异步操作. 如果必须保证前一步执行完才能执行后一步, 上面的自动执行就不可能. 这时, Thunk函数就能派上用处. 以读取文件为例, 下面的Generator函数封装了两个异步操作.
var fs = require('fs');
var thunkfify = require('thunkify');
var readFileThunk = thunkfify(fs.readFile);

var gen = function* () {
    var r1 = yield readFileThunk('/etc/fstab');
    console.log(r1.toString());
    var r2 = yield readFileThunk('/etc/shells');
    console.log(r2.toString());
};

// 上面的代码中, yield命令用于将程序的执行权移出Generator函数, name就需要一种方法将执行权再交还给Generator函数.
// 这种方法就是使用Thunk函数, 因为它可以在回调函数里将执行权交还给Generator函数. 为了便于理解, 我们先来看一下如何手动执行上面的Generator函数.

var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
    if(err) throw err;
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if(err) throw err;
        g.next(data);
    });
});

// 上面的代码中, 变量g是Generator函数的内部指针, 标明目前执行到哪一步. next方法负责将指针移动到下一步, 并返回该步的信息 (value属性和done属性).
// 仔细查看上面的代码, 可以发现Generator函数的执行过程其实是将同一个回调函数反复传入next方法的value属性. 这使得我们可以用递归来自动完成这个过程.
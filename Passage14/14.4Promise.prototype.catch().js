/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-17 13:55:50 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-17 16:33:02
 */



//  Promise.prototype.catch方法是.then(null, rejection)的别名, 用于指定发生错误时的回调函数
getJSON('/posts.json').then(function (posts) {
    // ...
}).catch(function (error) {
    //  处理getJSON和前一个回调函数运行时发生的错误
    console.log('发生错误!', error);
})
/* 上面的代码中, getJSON方法返回一个Promise对象, 如果该对象状态变为Resolved, 则会调用then方法指定的回调函数; 如果异步操作抛出错误, 状态就会变为Rejected, 然后调用catch方法指定的回调函数处理这个错误.另外, then方法指定的坏掉函数如果在运行中抛出错误, 也会被catch方法捕获. */
p.then((val) => console.log('fulfilled:', val)).catch((err) => console.log('rejected', err));
//  等同于
p.then((val => console.log('fulfilled:', val)).then(null, (err) => console.log("rejected:", err)));
// 下面是一个例子.
var promise = new Promise(function (resolve, reject) {
    throw new Error('test');
});
promise.catch(function (error) {
    console.log(error);
});
// Error: test
/* 上面的代码中, Promise抛出一个错误就被catch方法指定的回调函数所捕获. 注意, 上面的写法与下面两种写法是等价的. */
// 写法一
var promise = new Promise(function (resolve, reject) {
    try {
        throw new Error('test');
    } catch (e) {
        reject(e);
    }
});
promise.catch(function (error) {
    console.log(error);
});

// 写法二
var promise = new Promise(function (resolve, reject) {
    reject(new Error('test'));
});
promise.catch(function (error) {
    console.log(error);
});
/* 比较上面两种写法, 可以发现reject方法作用等同于抛出错误. 如果Promise状态已经变成Resolved, 再抛出错误时无效的. */
var promise = new Promise(function (resolve, reject) {
    resolve('ok');
    throw new Error('test');
});
promise.then(function (value) {
        console.log(value)
    })
    .catch(function (error) {
        console.log(error)
    });
// ok
/* 上面的代码中, Promise在resolve语句后面再抛出错误, 并不会被捕获, 等于没有抛出.因为Promise的状态一旦改变, 就会永久保持该状态, 不会再改变了.
    Promise对象的错误具有 "冒泡"性质, 会一直向后传递, 直到被捕获为止. 也就是说, 错误总是会被下一个catch语句捕获. */
getJSON('/post/1.json').then(function (post) {
    return getJSON(post.commentURL);
}).then(function (comments) {
    // some code
}).catch(function (error) {
    // 处理前面3个Promise产生的错误
});

/* 上面的代码中, 一共3个Promise对象: 一个由getJSON产生, 两个由then产生.其中任何一个抛出的错误都会被最后一个catch捕获.
    一般说来, 不要在then方法中定义Rejected状态的回调函数(即then的第二个参数), 而应总是使用catch方法. */

// bad
promise.then(function (data) {
    // success
}, function (err) {
    // error
});

// good
promise.then(function (data) {
    // success
}).catch(function (err) {
    // error
});
/* 上面的代码中, 第二种写法要好于第一种写法, 理由是第二种写法可以捕获前面then方法执行中的错误, 也更接近同步的写法(try/catch).
    因此, 建议使用catch方法, 而不是用then方法的第二个参数.
    跟传统的try/catch代码块不同的是, 如果没有使用catch方法指定错误处理的回调函数, Promise对象抛出的错误不会传递外层, 即不会有任何反应 */
var someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        // 下面一行会报错, 因为x没有声明
        resolve(x + 2);
    });
};
someAsyncThing().then(function () {
    console.log('everything is great');
});
/* 上面的代码中, someAsyncThing函数产生的Promise对象会报错, 但是由于没有指定catch方法, 因而这个错误不会被捕获, 也不会传递到外层代码.正常情况下, 运行后不会有任何输出,
    但是浏览器此时会打印出错误 "ReferenceError: x is not define", 不过不会终止脚本执行, 如果这个脚本放在服务器中执行, 退出码就是0(即表示执行成功). */
var promise = new Promise(function (resolve, reject) {
    resolve('ok');
    setTimeout(function () {
        throw new Error('test')
    }, 0);
})
promise.then(function (value) {
    console.log(value)
});
// ok
// Uncaught Error: test

/* 上面的代码中, Promise指定在下一轮 "事件循环" 再抛出错误. 到了那个时候, Promise的运行已经结束, 所以这个错误是在Promise函数体外抛出的, 会冒泡到最外层, 成了未捕获的错误. */
// Node有一个unhandledRejection事件, 专门监听未捕获的reject错误.
ProcessingInstruction.on('unhandledRejection', function (err, p) {
    console.log(err.stack)
});
/* 上面的代码中, unhandledRejection事件的监听函数有两个参数, 第一个是错误对象, 第二个是报错的Promise实例, 可用于了解发生错误的环境信息.
    需要注意的是, catch方法返回的还是一个Promise对象, 因此后面还可以接着调用then方法. */
var someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        // 下面一行会报错, 因为x没有声明
        resolve(x + 2);
    })
}
someAsyncThing()
    .catch(function (error) {
        console.log('on no', error);
    }).then(function () {
        console.log('carry on');
    });
// oh no [ReferenceError: x is not defined]
// carry on
// 上面的代码运行完catch方法指定的回调函数后接着运行后面那个then方法指定的回调函数.如果没有报错, 则会跳过catch方法.
Promise.resolve().catch(function (error) {
    console.log('on no', error)
}).then(function () {
    console.log('carry on')
});
// carry on
/* 上面的代码因为没有报错而跳过catch方法, 直接执行了后面的then方法.此时要then方法里面报错, 就与前面的catch无关了. */
// catch方法中还能再抛出错误.
var someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
        // 下面一行会报错, 因为x没有声明
        resolve(x + 2);
    });
};

someAsyncThing().then(function () {
    return someOtherAsyncThing();
}).catch(function (error) {
    console.log('oh no', error);
    //  下面一行会报错, 因为y没有声明
    y + 2;
}).then(function () {
    console.log('carry on')
});
// oh no [ReferenceError: x is not defined]
// 上面的代码中, catch方法抛出一个错误, 因为后面没有别的catch方法, 导致这个错误不会被捕获, 也不会传递到外层. 如果改写一下, 结果就不一样了.
someAsyncThing().then(function () {
    return someOtherAsyncThing();
}).catch(function (error) {
    console.log('oh no', error);
    // 下面一行会报错, 因为y没有声明
    y + 2;
}).catch(function(error) {
    console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
// 上面的代码中, 第二个catch方法用来捕获前一个catch方法抛出的错误.
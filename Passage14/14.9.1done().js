/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 11:17:14 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 11:24:51
 */



 /* 无论Promise对象的回调链以then方法还是catch方法结尾, 只要最后一个方法抛出错误, 都有可能无法捕捉到(因为Promise内部的错误不会冒泡到全局). 只要最后一个方法抛出错误, 
    都有可能无法捕捉到(因为Promise内部的错误不会冒泡到全局). 为此, 我们可以提供一个done方法, 它总是处于回调链的尾端, 保证抛出任何可能出现的错误. */
    asyncFunc().then(f1).catch(r1).then(f2).done();
    // 它的实现代码相当简单.
    Promise.prototype.done = function(onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected)
        .catch(function(reason) {
            // 抛出一个全局错误
            setTimeout(() => {throw reason}, 0)
        })
    }

    // 由上可见, done方法可以像then方法那样使用, 提供Fulfilled和Rejected状态的回调函数, 也可以不提供任何参数. 但不管怎样, done方法都会捕捉到任何可能出现的错误, 并全局抛出
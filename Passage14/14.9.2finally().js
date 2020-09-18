/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 11:25:37 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 11:37:07
 */



 /* finally方法用于指定不管Promise对象最后状态如何都会执行的操作. 它与done方法的最大却别在于,它接受一个普通的回调函数作为参数, 该函数不管怎样都必须执行.
    下面是一个例子, 服务器使用Promise处理请求, 然后使用finally方法关掉服务器 */
server.listen(0).then(function(){
    // run test
}).finally(server.stop);
// 它的实现也简单.
Promise.prototype.finally = function(callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {throw reason})
    );
};

// 上面的代码中, 不管前面的Promise是fulfilled还是rejected, 都会执行回到函数 callback.
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 10:42:56 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 11:16:29
 */


//  Promise.reject(reason)方法也会返回一个新的Promise实例, 状态为Rejected.
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function(s){
    console.log(s)
});
// 出错了
// 上面的代码生成一个Promise对象的实例p, 状态为Rejected, 回调函数会立即执行.
/* 注意!
    Promise.reject()方法的参数会原封不动地作为reject的理由变成后续方法的参数. 这一点与Promise.resolve方法不一致. */
const thenable = {
    then(resolve, reject) {
        reject('出错了')
    }
};
Promise.reject(thenable).catch(e => {
    console.log(e === thenable)
})
// true

// 上面的代码中, Promise.reject方法的参数是一个thenable对象, 执行以后, 后面catch方法的参数不是reject抛出的 "出错了" 这个字符串, 而是thenable对象.

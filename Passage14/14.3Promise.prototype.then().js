/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-17 11:34:08 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-17 13:53:35
 */


 /* Promise实例具有then方法, 即then方法是定义在原型对象Promise.prototype上的. 它的作用是为Promise实例添加状态改变时间的回调函数.前面说过, then方法的第一个参数是Resolved状态的回调函数, 第二个参数(可选)是Rejected状态的回调函数.
 then方法返回的是一个新的Promise实例(注意, 不是原来那个Promise实例). 因此可以采用链式写法, 即then方法后面再调用另一个then方法. */
 getJSON("/posts.json").then(function(json) {
     return json.post;
 }).then(function(post){
    //  ...
 });

 /* 上面的代码使用then方法一次指定了两个回调函数. 第一个回调函数完成以后, 会将返回结果作为参数传入第二个回调函数.
    采用链式的then可以指定一组按照次序调用的回调函数. 这时, 前一个回调函数有可能返回的还是一个Promise对象( 即有异步操作),
    而后一个回调函数就会等待该Promise对象的状态发生变化, 再被调用. */
getJSON("/post/1.json").then(function(post) {
    return getJSON(post.commentURL);
}).then(function funcA(comments) {
    console.log("Resolved: ", comments);
}, function funcB(err) {
    console.log("Rejected: ", err)
});

/* 上面的代码中, 第一个then方法指定的回调函数返回的是另一个Promise对象. 这时, 第二个then方法指定的回调函数就会等待这个新的Promise对象状态发生变化.如果变为Resolved,
    就调用funcA; 如果状态变为Rejected, 就调用funcB */
getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
).then(
    comments => console.log("Resolved: ", comments),
    err => console.log("REjected:", err)
)
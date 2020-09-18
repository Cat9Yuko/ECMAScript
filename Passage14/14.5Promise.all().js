/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-17 16:38:32 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 09:22:55
 */



/* Promise.all方法用于将多个Promise实例包装成一个新的Promise实例. */
var p = Promise.all([p1, p2, p3]);

/* 上面的代码中, Promise.all方法接受一个数组作为参数, p1、p2、p3都是Promise对象的实例： 如果不是，就会先调用下面讲到的Promise.resolve方法
   ,将参数转为Promise, 再进一步处理(Promise.all方法的参数不一定是数组, 但是必须具有Iterator接口, 且返回的每个成员都是Promise实例).
   p的状态由p1、p2、p3、决定,分成两种情况.
   1.只有p1、p2、p3的状态都变成Fulfilled, p的状态才会变成Fulfilled, 此时p1、p2、p3的返回值组成一个数组,传递给p的回调函数.
   2.只要p1、p2、p3中有一个被Rejected,p的状态就变成Rejected, 此时第一个被Rejected的实例返回值会传递给p的回调函数. */
// 下面是一个具体的例子.
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
    return getJSON('/post/' + id + ".json")
});
Promise.all(promise).then(function(posts) {
    // ...
}).catch(function(reason){
    // ...
});

/* 上面的代码中, promises是包含6个Promise实例的数组, 只有这6个实例的状态都变成fulfilled, 或者其中有1个变为rejected, 才会调用Promise.all方法后面的回调函数. */
// 下面是另一个例子.
const databasePromise = connectDatabase();

const booksPromise = databasePromise.then(findAllBook);

const userPromise = databasePromise.then(getCurrentUser);

Promise.all([
    booksPromise,
    userPromise
]).then(([books, user]) => pickTopRecommentations(books, user));

// 上面的代码中, booksPromise和userPromise是两个异步操作, 只有它们的结果都返回, 才会触发pickTopRecommentations回调函数.

/* 注意: 
    如果作为参数的Promise实例自身定义了catch方法, name它被rejected时并不会触发Promise.all()的catch方法. */
    const p1 = new Promise((resolve, reject) => {
        resolve('hello');
    }).then(result => result)
    .catch(e => e);

    const p2 = new Promise((resolve, reject) => {
        throw new Error('报错了');
    }).then(result => result)
    .catch(e => e);

    Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e));
    // ["hello", Error: 报错了]

    /* 
        上面的代码中, p1会resolved, p2首先会rejected, 但是p2有自己的catch方法, 该方法返回的是一个新的Promise实例, p2实际上指向的是这个实例.该实例执行完catch方法后也会变成resolved, 导致Promise.all()方法参数里面的两个实例都会resolved, 因此会调用then方法指定的回调函数, 而不会调用catch方法指定的回调函数.
        如果p2没有自己的catch方法, 就会调用Promise.all()的catch方法.
    */
   const p1 = new Promise((resolve, reject) => {
       resolve('hello');
   }).then(result => result);

   const p2 = new Promise((resolve, reject) => {
       throw new Error('报错了');
   }).then(result => result);

   Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e));
//    Error: 报错了
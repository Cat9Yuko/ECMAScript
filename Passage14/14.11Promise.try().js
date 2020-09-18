/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 13:49:22 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 14:37:56
 */


 /* 
    实际开发中经常遇到一种情况: 不知道或者不想区分函数f是同步函数还是异步操作, 但是想用Promise来处理它.因为这样就可以不管f是否包含异步操作, 都用then方法指定下一步流程,
    用catch方法处理f抛出的错误.一般的写法如下
    */
    Promise.resolve().then(f)
// 上面的写法有一个缺点: 如果f是同步函数, 那么它会在本轮事件循环的末尾执行.

const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now

/* 事实上, Promise.try存在已久, Promise库Bluebird、Q和when早就提供了这个方法.
    由于Promise.try为所有操作提供了统一的处理机制, 所以如果想用then方法管理流程, 最好都用Promise.try包装下. 这样有许多好处, 其中一点就是可以更好地管理异常. */

function getUsername(userId) {
    return database.users.get({id: userId})
    .then(function(user){
        return user.name;
    });
}

// 上面的代码中, database.users.get()返回一个Promise对象, 如果抛出异步操作, 可以用catch方法捕获, 写法如下.
database.users.get({id: userId}).then().catch()

// 但是databse.users.get()可能还会抛出同步错误(比如数据库连接错误, 具体要看实现方法), 这时就不得不用try...catch去捕获了.
try {
    database.users.get({id: userId})
    .then()
    .catch()
} catch (e) {
    // ...
};
// 上面的写法很笨拙, 这时可以统一用promise.catch()捕获所有同步和异步的错误.
Promise.try(database.users.get({id: userId})).then().catch()
// 事实上, Promise.try是模拟了try代码, 就像promise.catch模拟catch代码块一样.
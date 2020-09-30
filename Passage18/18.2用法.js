/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-30 11:13:18 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-30 14:26:45
 */



//  async函数返回一个Promise对象, 可以使用then方法添加回调函数. 当函数执行的时候, 一旦遇到await就会先返回, 等到异步操作完成, 再接着执行函数体内后面的语句.
// 下面是一个例子。
async function getStockPriceByName(name) {
    var symbol = await getStockSymbol(name);
    var stockPrice = await getStockPriceByName(symbol);
    return stockPrice;
}

getStockPriceByName('goog').then(function(result) {
    console.log(result);
});
// 上面的代码是一个获取股票报价的函数, 函数前面的async关键字表明该函数内部有异步操作. 调用该函数会立即返回一个Promise对象.
// 下面是另一个例子, 指定多少毫秒后输出一个值.
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
asyncPrint('hello world', 50);
// 上面的代码指定50ms以后输出hello world.
// 由于async函数返回的是Promise对象, 可以作为await命令的参数. 所以, 上面的例子也可以写成下面的形式.

async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
asyncPrint('hello wolrd', 50);
// async函数有多种使用形式.
// 函数声明
async function foo() {}
// 函数表达式
const foo = async function() {}
// 对象的方法
let obj = { async foo() {}}
obj.foo().then();
// Class的方法
class Storage {
    constructor() {
        this.cachePromise = caches.open('avatars');
    }
    async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
    }
}

const storage = new Storage();
storage.getAvatar('jake').then();

// 箭头函数
const foo = async () => {};
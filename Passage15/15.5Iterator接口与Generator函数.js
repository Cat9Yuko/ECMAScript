/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-21 11:08:29 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-21 11:12:16
 */



//  Symbol.iterator方法的最简单实现还是使用下一章要介绍的Generator函数
var myIterable = {};

myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]
// 或者采用下面的简洁写法
let obj = {
    *[Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
};
for(let x of obj) {
    console.log(x);
}
// hello
// world

// 上面的代码中, Symbol.iterator方法几乎不用部署任何代码, 只要用yield命令给出每一步的返回值即可.
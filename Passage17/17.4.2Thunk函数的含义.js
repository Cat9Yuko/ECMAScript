/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 16:43:52 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 16:47:46
 */



//  编译器的 "传名调用" 的实现往往是将参数放到一个临时函数之中, 再将这个临时函数传入函数体. 这个临时函数就称为Thunk函数.
function f(m) {
    return m * 2;
}
f(x + 5);
// 等同于
var thunk = function() {
    return x + 5;
};

function f(thunk) {
    return thunk() * 2;
}

// 上面的代码中, 函数f的参数x+5被一个函数替换了. 凡是用到原参数的地方, 对Thunk函数求值即可.
// 这就是Thunk函数的定义, 它是 "传名调用" 的一种实现策略, 可以用来替换某个表达式.
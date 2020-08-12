/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 16:28:00 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 16:49:48
 */


 /* 
    尾递归的实现往往需要改写递归函数, 确保最后一步只调用自身. 做到这一点的方法, 就是把所有用到的内部变量改写为函数的参数.比如上面的例子, 阶乘函数factorial需要用到一个中间变量total, 那就把这个中间变量改写成函数的参数. 这样做的缺点是不太直观, 第一眼很难看出来, 为什么计算5的阶乘需要传入两个参数5和1?
    有两个方法可以解决这个问题. 方法一是在尾骶骨函数之外再提供一个正常形式的函数.
 */
function tailFactorial(n, total) {
    if(n === 1) return total;
    return tailFactorial(n -1, n * total);
}

function factorial(n) {
    return tailFactorial(n ,1);
}

console.log(factorial(5));
// 120

// 上面的代码通过一个正常形式的阶乘函数factorial调用尾递归函数tailFactorial, 看起来就正常多了.
// 函数式编程有一个概念, 叫作柯里化(currying), 意思是将多参数的函数转换成单参数形式. 这里也可以使用柯里化.
function currying(fn, n) {
    return function (m) {
        return fn.call(this, m, n);
    };
}

function tailFactorial(n, total) {
    if(n === 1) return total;
    return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

console.log(factorial(5));
// 120

// 上面的代码通过柯里化将尾递归函数tailFactorial变为只接受1个参数的factorial.
// 第二种方法就简单多了, 那就是采用ES6的函数默认值.
function factorial(n, total = 1) {
    if(n === 1) return total;
    return factorial(n - 1, n * total);
}
factorial(5); //120
// 上面的代码中, 参数total有默认值1, 所以调用时不能提供这个值.
/* 
    总结一下, 递归本质上时一种循环操作. 纯粹的函数式编程语言没有循环操作命令, 所有的循环都用递归实现, 这就是为什么尾递归对这些语言极其重要. 对于其他支持 "尾调用优化" 的语言(比如Lua、ES6), 只需要知道循环可以用递归代替, 而一旦使用递归, 就最好使用尾递归.
*/
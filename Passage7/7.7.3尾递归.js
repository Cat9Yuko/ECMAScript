/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 16:08:59 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 16:27:33
 */


 /* 
      函数调用自身称之为递归. 如果调用自身就称为尾递归.
      递归非常耗费内存, 因为需要同时保存成百上千个调用帧, 很容易发生 "栈溢出" 错误(stack overflow).
      但对于尾递归来说, 由于只存在一个调用帧, 所以永远不会发生 "栈溢出" 错误.  
*/
function factorial(n) {
    if(n === 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5));
// 120

/*  上面的代码是一个阶乘函数, 计算n的阶乘, 最多需要保存n个调用记录, 复杂度为O(n).
    如果改写为尾递归, 只保留一个调用记录, 则复杂度为O(1).
 */

 function factorial(n, total) {
     if(n  === 1) return total;
     return factorial(n - 1, n * total);
 }

 console.log(factorial(5, 1));
//  120

// 还有一个比较著名的例子————计算Fibonacci数列, 也能充分说明尾递归优化的重要性.
// 非尾递归的Fibonacci数列实现如下.
function Fibonacci(n) {
    if( n <= 1) {return 1};
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
console.log(Fibonacci(500));
// 堆栈溢出
console.log(Fibonacci(100));
// 堆栈溢出
console.log(Fibonacci(10));
// 89


// 尾递归优化的Fibonacci数列实现如下.
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
    if( n <= 1) {return ac2};
    return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
console.log(Fibonacci2(10000));
// RangeError: Maximum call stack size exceeded
console.log(Fibonacci2(1000));
// 7.0330367711422765e+208
console.log(Fibonacci2(100));
// 573147844013817200000

// 由此可见, "尾调用优化" 对递归操作意义重大, 所以一些函数式编程语言将其写入了语言规格. ES6也是如此, 第一次明确规定, 所有ECMAScript的实现都必须部署 "尾调用优化". 这就是说, 在ES6中, 只要使用尾递归, 就不会发生栈溢出, 相对节省内存.
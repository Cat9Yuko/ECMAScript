/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 15:20:08 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 15:51:46
 */


//  尾调用(TailCall)是函数式编程的一个重要概念, 本身非常简单那, 一句话就能说清楚, 就是指某个函数的最后一步调用另一个函数.
function f(x) {
    return g(x);
}
// 上面的代码中, 函数f的最后一步是调用函数g, 这就叫尾调用.
// 以下情况不属于尾调用.

// 情况一
function f(x) {
    let y = g(x);
    return y;
}

// 情况二
function f(x) {
    return g(x) + 1;
}

// 情况三
function f(x) {
    g(x);
}

// 上面的代码中, 情况一是调用函数g之后还有赋值操作, 所以不属于尾调用, 即使语义完全一样;情况二也属于调用后还有操作, 即使写在一行内;情况三等同于下面的代码.
function f(x) {
    g(x);
    return undefined;
}
// 尾调用不一定出现在函数尾部, 只要是最后一步操作即可.
function f(x) {
    if(x > 0) {
        return m(x);
    }
    return n(x);
}
// 上面的代码中, 函数m和n都属于尾调用, 因为它们都是函数f的最后一步操作.
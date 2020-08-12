/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 16:56:10 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 17:31:55
 */


 /* 
    尾递归优化只在严格模式下生效, 那么在正常模式下, 或者在那些不支持该功能的环境中, 没有办法使用尾递归优化呢? 回答是肯定的————自己实现尾递归优化。
    原理非常简单. 尾递归之所以需要优化, 原因是调用栈太多造成溢出, 那么只要减少调用栈就不会溢出. 怎么做可以减少调用栈呢? 答案是采用 "循环" 替换 "递归".
 */
// 下面是一个正常的递归函数.
function sum(x, y) {
    if(y > 0) {
        return sum(x + 1, y - 1);
    }else {
        return x;
    }
}

sum(1, 100000)
// RangeError: Maximum call stack size exceeded6

// 上面的代码中, sum是一个递归函数, 参数x是需要累加的值, 参数y控制递归次数.一旦指定sum递归100000次, 就会报错, 提示超出调用栈的最大次数.
// 蹦床函数(trampoline) 可以将递归执行转为循环执行.
function trampoline(f) {
    while(f && f instanceof Function) {
        f = f();
    }
    return f;
}
// 以上代码就是蹦床函数的一个实现, 它接受函数f作为参数. 只要f执行后返回一个函数, 就继续执行.
// 这里是返回一个函数, 然后执行该函数, 而不是在函数里面调用函数, 这样既避免了递归执行, 从而消除了调用栈过大的问题
// 然后要做的是将原来的递归函数改写为每一步返回另一个函数.
function sum(x, y) {
    if(y > 0) {
      return sum.bind(null, x + 1, y - 1);  
    } else {
        return x;
    }
}
// 上面的代码中, sum函数的每次执行都会返回自身的另一个版本.
// 现在, 使用蹦床函数执行sum 就不会发生调用栈溢出.
trampoline(sum(1, 100000))

// 蹦床函数并不是真正的尾递归优化, 下面的实现是.
function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if(!active) {
            active = true;
            while(accumulated.length) {
                value = f.apply(this, accumulated.shift())
            }
            active = false;
        }
    };
}
var sum = tco(function (x, y) {
    if(y > 0) {
        return sum(x + 1, y -1)
    }else {
        return x;
    }
});

sum(1, 100000)
// 100001
/* 
    上面的代码中, tco函数是尾递归优化的实现, 它的奥妙就在于状态变量active. 默认情况下, 
    这个变量是不被激活的. 一旦进入尾递归优化的过程, 这个变量就被激活了. 然后, 每一轮递归sum返回的都是undefined, 所以就避免了递归执行;而accumulated数组存放每一轮
    sum执行的参数, 总是有值的, 这就保证了accumulator函数内部的while循环总会执行, 很巧妙将 "递归" 改成了循环, 
    而后一轮的参数会取代前一轮的参数, 保证了调用栈只有一层.
*/
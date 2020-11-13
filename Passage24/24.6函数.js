/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-12 08:45:47 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-12 09:16:05
 */


//  立即执行函数可以写成箭头函数的形式.

(() => {
    console.log('Welcome to the Internet');
})();

// 那些需要使用函数表达式的场合, 尽量用箭头函数替代. 因为这样更简洁, 而且绑定了this.

// bad
[1, 2, 3].map(function (x) {
    return x * x;
});

// good
[1, 2, 3].map((x) => {
    return x * x;
});

// best
[1, 2, 3].map(x => x * x);
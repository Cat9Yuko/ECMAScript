/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-09 10:06:41 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-09 15:37:21
 */


//  ES6引入了rest参数(形式为"...变量名"), 用于获取函数的多余参数, 这样就不需要使用arguments对象了. rest参数搭配的变量是一个数组, 该变量将多余的参数放入其中.

function add(...values) {
    let sum = 0;
    for(var val of values) {
        sum+= val;
    }
    return sum;
}

console.log(add(1,2,3,4,5,6));
// 21

// 以上代码中的add函数是一个求和函数, 利用rest参数可以向该函数传入任意数目的参数. 下面是一个rest参数代替arguments变量的例子.
// arguments变量的写法
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}
// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
// 比较上面的两种写法可以发现, rest参数的写法更自然也更简洁.
// rest参数中的变量代表一个数组, 所以数组特有的方法都可以用于这个变量. 下面是一个利用rest参数改写数组push方法的例子.
function push(array,...items) {
    items.forEach(function(item) {
        array.push(item);
        console.log(item);
    });
}

var a = [];
push(a,1,2,3);
// 1,2,3

// 注意rest参数之后不能再有其他参数(即只能是最后一个参数),否则会报错.
// 报错
function f(a, ...b,c) {
    // ...
}
f();
// SyntaxError: Rest parameter must be last formal parameter

// 函数的length属性不包括rest参数.
console.log((function(a) {}).length);
// 1
console.log((function(...a){}).length);
// 0
console.log((function(a,...b){}).length);
// 1
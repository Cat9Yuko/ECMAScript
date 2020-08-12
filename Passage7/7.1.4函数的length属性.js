/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-08 15:45:49 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-08 16:57:43
 */

//  指定了默认值以后, 函数的length属性将返回没有指定默认值的参数个数. 也就是说,制定了默认值后, length属性将失真.

console.log((function(a){}.length));
// 1

console.log((function(a = 5) {}).length);
// 0

console.log((function(a,b,c=5){}).length);
// 2

// 上面的代码中, length属性的返回值等于函数的参数个数减去指定了默认值的参数个数.比如, 上面的最后一个函数定义了3个参数,其中一个参数c指定了默认值, 因此length属性等于3减去1, 即2.
// 这是因为length属性的含义是该函数预期传入的参数个数. 某个参数指定默认值以后, 预期传入的参数个数就不包括这个参数了. 同理, rest参数也不会计入length属性.

console.log((function(...args){}).length);
// 0

// 如果设置了默认值的 参数不是尾参数, 那么length属性也不再计入后面的参数.
console.log((function(a=0,b,c){}).length);
// 0
console.log((function(a,b=1,c){}).length);
// 1



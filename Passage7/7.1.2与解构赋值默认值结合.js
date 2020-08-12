/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-08 11:21:25 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-08 14:40:28
 */

//  参数默认值可以与结构赋值的默认值结合起来使用.
function foo({x, y = 5}) {
    console.log(x, y);   
}
foo()
// TypeError: Cannot destructure property 'x' of 'undefined' as it is undefined.

foo({x:1,y:2})
// 1 2

foo({x:1})
// 1 5

foo({})
// undefined 5

// 上面的代码使用了对象的结构赋值默认值, 而没有使用函数参数的默认值. 只有当函数参数foo的参数是一个对象时, 变量x和y才会通过解构赋值而生成.
// 如果函数foo调用时参数不是对象, 变量x和y就不会生成, 从而报错.只有参数对象没有y属性时, y的默认值5才会生效.

// 下面是另一个对象的结构赋值默认值的例子.

function fetch(url, {body = '', method = 'GET', headers = {}}) {
    console.log(method);
}
fetch('http://example.com',{});
// GET

fetch('http://example.com');
// TypeError: Cannot read property 'body' of undefined

// 上面的代码中,如果函数fetch的第二个参数是一个对象, 就可以为它的3个属性设置默认值.
// 上面的写法不能省略第二个参数, 如果结合函数参数的默认值, 就可以省略第二个参数. 这时, 就出现了双重默认值.
function fetch(url, {method= 'GET'}={}) {
    console.log(method);
}

fetch('http://example.com');
// GET

// 上面的代码中, 函数fetch没有第二个参数时, 函数参数的默认值就会生效, 然后猜猜是解构赋值的默认值生效, 变量method取到默认值GET.
// 那么两种写法有什么差别呢?

// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
}

// 写法二
function m2({x, y} = {x: 0, y: 0}) {
    return [x, y];
}

// 上面两种写法都对函数的参数设定了默认值, 区别在于, 写法一中函数参数的默认值时空对象, 但是设置了对象解构赋值的默认值; 写法二中函数参数的默认值是一个有具体属性的函数, 但是没有设置对象解构赋值的默认值.

// 函数没有参数的情况
console.log(m1());
// [ 0, 0 ]
console.log(m2());
// [ 0, 0 ]

// x 和 y都有值的情况
console.log(m1({x:3,y:8}));
// [ 3, 8 ]
console.log(m2({x:3,y:8}));
// [ 3, 8 ]

// x有值, y无值的情况
console.log(m1({x:3}));
// [ 3, 0 ]
console.log(m2({x:3}));
// [ 3, undefined ]

// x 和 y都无值的情况
console.log(m1({}));
// [ 0, 0 ]
console.log(m2({}));
// [ undefined, undefined ]

console.log(m1({z:3}));
// [ 0, 0 ]
console.log(m1({z:3}));
// [ undefined, undefined ]
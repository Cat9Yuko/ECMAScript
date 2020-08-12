/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-09 17:51:15 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 09:01:39
 */


//  ES6允许使用 "箭头"(=>)定义函数.
var f = v => v;

// 上面的箭头函数等同于以下代码.

var f = function(v) {
    return v;
};

// 如果箭头函数不需要参数或需要多个参数, 就使用括号代表参数部分.

var f = () => 5;
// 等同于

var f = function(){return 5};

var sum = (num1,num2) => num1+num2;
// 等同于
var sum = function(num1, num2) {
    return num1+num2;
};

// 如果箭头函数的代码块部分多于一条语句, 就要使用大括号将其括起来, 并使用 return 语句返回.

var sum = (num1, num2) => {return num1 + num2;}
// 由于大括号被解释为代码块, 所以如果箭头函数直接返回一个对象, 必须在对象外面加上括号.

var getTempItem = id => ({id: id, name: "Temp"});

// 箭头函数可以与变量解构结合使用
const full = ({first, last}) => first + '' +last;
// 等同于
function full(person) {
    return person.first + '' +person.last;
}

// 箭头函数使得表达更加简洁.
const isEven = n => n % 2 == 0;
const square = n => n * n;

// 上面的代码只用了两行就定义了两个简单的工具函数. 如果不用箭头函数, 可能就要占用多行, 而且不如现在这样写醒目.
// 箭头函数的一个用处是简化回调函数.

[1,2,3].map(function(x) {
    return x * x;
});

[1,2,3].map(x => x * x);

// 下面是另一个例子.
// 正常函数写法
var result = values.sort(function (a,b) {
    return a - b;
});

// 箭头函数写法
var result = values.sort((a,b) => a -b);
// 下面是rest参数与箭头函数结合的例子.

const numbers = (...nums) => nums;

console.log(numbers(1,2,3,4,5,6));
// [ 1, 2, 3, 4, 5, 6 ]

const headAndTail = (head, ...tail) =>[head, tail];
console.log(headAndTail(1,2,3,4,5,6));
// [ 1, [ 2, 3, 4, 5, 6 ] ]
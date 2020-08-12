/*
 * @Author: Cat9Yuko.Chen 
 * @Date: 2019-12-16 10:05:12 
 * @Last Modified by: Cat9Yuko.Chen
 * @Last Modified time: 2019-12-16 15:33:24
 */

//  不能使用圆括号的情况
// 1.变量声明语句
// 全部报错,因为他们都是变量声明语句, 模式不能使用圆括号
let [(a)] = [1];
let {x: (c)} = {}
let {(x: c)} = {}
let {(x): c} = {}

let {o: ({p: p }) } = {o: { p: 2}};

// 2.函数参数
function f([(z)]) { return z; }
function f([z, (x)]) { return x; }

// 3赋值语句模式
// 全部报错
// 将整个模式放在圆括号之中
({p: a}) = {p: 42};
([a]) = [5];

// 将一部分模式放在圆括号之中
[({p: a}), {x: c}] = [{}, {}];

// 可以使用圆括号的情况
// 可以使用圆括号的情况只有一种: 赋值语句的非模式部分可以使用眼括号
[(b)] = [3]; // 正确
({p: (d)} = {}) // 正确
[(parseInt).prop] = [3]; //正确

// 上面3行语句都可以正确执行, 因为它们都是赋值语句, 而不是声明语句, 另外它们的圆括号都不属于模式的一部分

// 用途
// 交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];

// 从函数返回多个值
// 1.返回一个数组
function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();

// 2.返回一个对象
function example () {
    return {
        foo: 1,
        bar: 2
    };
}
let {foo, bar} = example();

// 函数参数的定义
// 1.参数是一组有次序的值
function f([x, y, z]) {  }
f([1, 2, 3]);

// 2.参数是一组无次序的值
function f({x, y, z}) {}
f({z: 3, y: 2, x: 1 });

// 提取JSON数据

let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};
let { id, status, data: number} = jsonData;

console.log(id, status, number);
// 42 "OK" [ 867, 5309 ]

// 函数参数的默认值
// 指定参数的默认值, 这样就避免了在函数体内再写 var foo = config.foo|| 'default foo'
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function(){},
    cache = true,
    complete = function(){},
    crossDomain = false,
    global = true
    // ... more config
}) { 
    // ... do stuff
 };

//  遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for(let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for(let [,key] of map) {
    // ...
}

// 获取键值
for(let [value] of map) {
    // ...
    console.log(value);
}

// 输入模块的指定方法

const { SourceMapConsumer, SourceNode } = require("source-map");
/*
 * @Author: Cat9Yuko.Chen 
 * @Date: 2019-12-14 23:16:29 
 * @Last Modified by: Cat9Yuko.Chen
 * @Last Modified time: 2019-12-15 23:40:19
 */

/* 对象的结构与数组有一个重要的不同,数组的元素是按次序排列的,变量的取值由它的位置决定
    对象的属性没有次序,变量必须与属性同名才能取到正确的值
*/
let {foo, bar} = {foo: "aaa", bar: "bbb"};
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb"};
baz // undefined

// 如果变量名与属性名不一致，必须写成下面这样

var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f//  'hello'
l // 'world'

// 对象的解构赋值是下面形式的简写
let { foo: foo, bar: bar} = {foo: "aaa", bar: "bbb" };

// 对象的解构赋值的内部机制是先找到同名属性, 然后再赋值给对应的变量,真正被赋值的是后者而不是前者
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined  

// 上面的代码中, foo是匹配的模式, baz才是变量, 真正被赋值的是变量baz, 而不是模式foo

// 嵌套
let obj = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
// 这时p是模式, 不是变量, 因此不会被赋值

let obj = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};
//这时p可以被赋值
let { p, p: [x, { y }] } = obj;
x // 'Hello'
y // 'World'
p //['Hello' , {y: 'World'}]

// 例子
var node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};
var { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc // Object { start: Object}
start // Object { line: 1, column: 5}

// 嵌套赋值例子
let obj = {};
let arr = {};

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // { prop: 123}
arr // [true]

// 指定默认值
var { x = 3 } ={};
x // 3

var { x, y = 5 } = {x: 1};
x // 1
y // 5

var { x: y = 3} = {};
y //3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went Wrong'} = {};
msg // 'Something went Wrong'

// 默认值生效的条件是, 对象的属性值严格等于 undefined

var {x=3} = {x:undefined};
x //3

var {x=3} = {x:null};
x//null
console.log(x);


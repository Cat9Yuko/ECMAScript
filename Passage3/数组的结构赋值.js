// 基本用法
// ES6允许按照一定模式从数组和对象中提取值, 然后对变量进行赋值, 这被称为结构(Destructuring)

// 以前
let a = 1;
let b = 2;
let c = 3;

// ES6
// 这种写法属于"模式匹配", 只要等号两边的模式相同, 左边的变量就会被赋予对应的值
let [d, e, f] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(d+'-'+e+'-'+f);
console.log(foo);
console.log(bar);
console.log(baz);

let [ , , third] = ["foo", "bar", "baz"];

third //"baz"

let [x, , y] = [1, 2, 3];
x//1
y//3

let [head, ...tail] = [1, 2, 3, 4];
head //1
tail //[2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// 如果结构不成功, 变量的值就等于undefined
let [foo] = []; // undefined
let [bar, foo] = [1]; //undefined

// 另一种情况是不完全结构, 即等号左边的模式只匹配一部分的等号右边的数组,这种情况下,结构依然可以成功
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

// 如果等号的右边不是数组, 那么将会报错

// 报错
let [foo] = 1;
let [foo] = false;
let [foo] =  NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

/* 上面的语句都会报错, 因为等号右边的值或是转为对象以后不具备Iterator接口(前五个表达式),
    或是本身就不具备Iterator接口(最后一个表达式)
*/

// 对于Set结构, 也可以使用数组的解构赋值
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"

// 事实上, 只有某种数据结构具有Iterator接口, 都可以采用数组形式的解构赋值
function* fibs() {
    let a = 0;
    let b = 1;
    while(true) {
        yield a;
        [a, b] = [b, a +b];
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

// 上面的代码中fibs是一个Generator函数, 原生具有Iterator接口,解构赋值会依次从这个接口中获取值


// 默认值


// 解构赋值允许指定默认值
let [foo = true] = [];
foo //  true
let [x, y = 'b'] = ['a']; // x = 'a', y = 'b'
let [x, y = 'b'] = ['a', undefined]; // x = 'a', y = 'b'

// ES6内部使用严格相等运算符(===)判断一个位置是否有值, 所以,如果一个数组成员不严格等于undefined, 默认值是不会生效的
let [x = 1] = [undefined];
x // 1
let [x = 1] = [null];
x // null
//如果一个数组成员是null, 默认值就不会生效, 因为null不严格等于undefined


// 如果默认值是一个表达式, name这个表达式是惰性求值的, 只有在用到时才会求值
function f() {
    console.log('aaa');
}
let [x = f()] = [1];
// 上面的代码中, 因为x能取到值, 所以函数f根本不会执行
// 等价于下面的代码
let x;
if([1][0] === undefined) {
    x = f();
}else {
    x = [1][0];
}

// 默认值可以引用解构赋值的其他变量,但该变量必须已经声明

let [x = 1, y = x] = []; //x = 1; y = 1;
let [x = 1, y = x] = [2]; //x = 2; y = 2;
let [x = 1, y = x] = [1, 2]; //x = 1; y = 2;
let [x = y, y = 1] = []; //ReferenceError

/* ES6允许为函数的参数设置默认值, 即直接写在参数定义的后面 */
function log(x, y = 'world') {
    console.log(x, y);
}

log('Hello'); //Hello world
log('Hello','China') //Hello China
log('Hello','') //Hello 

// ep:
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
var p = new Point();
p // {x: 0, y: 0}

// 参数变量是默认声明的, 所以不能用let或const再次声明
function foo(x = 5) {
    let x = 1; //error
    const x = 2; //error
}

// 使用参数默认值时, 函数不能有相同的名参数
function foo(x, x, y =1) {
    //...
}

// 参数默认值不是传值的, 而是每次都重新计算默认值表达式的值,参数默认值是惰性求值的

let x = 99;
function foo(p = x +1) { 
    console.log(p);
    
 }
 foo();
 x = 100;
 foo();

 /* 解构赋值默认值结合使用 */
 function foo({x, y = 5}) {
     console.log(x, y);     
 }

 foo({}) // undefined, 5
 foo({x: 1}) // 1, 5
 foo({x:1, y: 2}) // 1,2
 foo()//TypeError: Cannot destructure property `x` of 'undefined' or 'null'.

//  ep2
function fetch(url, {body = '', method = 'GET', headers = {} }) {
    console.log(method);
}

fetch('http://example.com',{})
// GET
fetch('http://example.com')
// TypeError: Cannot destructure property `body` of 'undefined' or 'null'.

/* 上面的代码中,如果函数fetch的第二个参数是一个对象, 就可以为它的3个属性设置默认值,
    上面的写法不能省略第二个参数, 如果结合函数参数的默认值, 就可以省略第二个参数, 这时就出现了双重默认值 */

function fecth(url, { method = 'GET'} = {}) {
    console.log(method);
}

fetch('http://example.com');
// "GET"

// 上面的代码中, 函数fetch没有第二个参数时, 函数参数的默认值就会生效, 然后才是结构赋值的默认值生效, 变量method取到默认值GET

// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
}

// 写法二
function m2({x, y} = {x: 0, y: 0}) {
    return [x, y];
}


/* 上面两种写法都对函数的参数设定了默认值, 区别在于, 写法一中函数参数的默认值是空对象, 但是设置了对象解构赋值;
    写法二中函数参数的默认值是一个有具体属性的函数, 但是没有设置对象解构赋值的默认值. */

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}) //[3, 8]
m2({x: 3, y: 8}) //[3, 8]

// x有值, y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3,undefined]

// x和y都无值的情况
m1({}) // [0, 0]
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) //[undefined, undefined]


// 参数默认值的位置
// 通常情况下, 定义了默认值的参数应该是函数的尾参数, 因为这样比较容易看出到底省略了哪些参数, 如果非尾部的参数设置默认值, 实际上这个参数是无法省略的

// 例一
function f(x = 1, y) {
    return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // SyntaxError: Unexpected token ','
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
    return [x, y ,z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]

// 上的代码中, 有默认值的参数都不是尾参数, 这时, 无法只省略该参数而不省略其后的参数, 除非显示输入undefined
// 如果传入undefined, 将触发该参数等于默认值, null则没有这个效果

function foo(x = 5, y = 6) {
    console.log(x, y);
}

foo(undefined, null); // 5 null

// 上面的代码中, x参数对应undefined, 结果触发了默认值, y参数等于null, 没有触发默认值

// 函数的length属性

// 指定了默认值以后, 函数的length属性将返回没有指定默认值的参数个数, 也就是说, 指定了默认值后, length属性将失真
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {  }).length // 2

// 上面的代码中, length属性的返回值等于函数的参数个数减去指定了默认值的参数个数;上面的最后一个函数定义了3个参数, 其中有一个参数c指定了默认值, 因此length属性等于3减去1, 即2 
// 因为length属性的含义是该函数预期传入的参数个数, 某个参数指定默认值以后, 预期传入的参数个数就不包括这个参数了,同理rest参数也不会计入length属性

(function (...args) {  }).length // 0

// 如果设置了默认值的参数不是尾参数, 那么length属性也不再计入后面的参数

(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {  }).length // 1

// 作用域

/* 一旦设置了参数的默认值, 函数进行声明初始化时, 参数会形成一个单独的作用域(context);等到初始化结束, 
    这个作用域就会消失;这种语法行为在不设置参数值时是不会出现的 */

var x = 1;
function f(x, y = x) {
    console.log(y);
}

f(2) // 2
/* 上面的代码中, 参数y的默认值等于变量x;调用函数f时,参数形成了一个单独的作用域;
这个作用域里面, 默认值变量x指向第一个参数x, 而不是全局变量x, 所以输出的是2 */

let x = 1;
function f(y = x) {
    let x = 2;
    console.log(y);
}

f() // 1

/* 上面的代码中, 函数f调用时, 参数y = x 形成一个单独的作用域;在这个作用域里面, 变量x本身没有定义, 所以指向外层的全局变量x;
    函数调用时, 函数体内部的局部变量x影响不到默认值变量x;
    如果此时全局变量x不存在, 就会报错
    */

function f(y = x) {
    let x = 2;
    console.log(y);
}

f() // ReferenceError: x is not defined

var x = 1;
function foo(x = x) {
    let x = 2;
    console.log(x);
}

foo() // ReferenceError: Cannot access 'x' before initialization

// 如果参数的默认值是一个函数, 该函数的作用域也遵守这个规则

let foo = 'outer';

function bar(func = x => foo) {
    let foo = 'inner';
    console.log(func());
}

bar(); // outer

/* 上面代码中, 函数bar的参数func的默认值是一个匿名函数, 返回值为变量foo; 函数参数形成的单独作用域里面并没有定义变量foo
    ,所以foo指向外层的全局变量foo, 因此输出outer */

// 如果写成下面这样会报错
function bar(func = () => foo) {
    let foo = 'inner';
    console.log(func())
}
bar() // ReferenceError: foo is not defined

// 上面的代码中, 匿名函数里的foo指向函数外层, 但是函数外层并没有声明变量foo,所以报错

// 复杂的列子
var x = 1;
function foo(x, y = function(){x = 2;}) {
    var x = 3;
    y();
    console.log(x);
}
foo() // 3
x // 1

// 上面的代码中, 函数foo的参数形成一个单独作用域;这个作用域中首先声明了变量x, 然后声明了变量y;
// y的默认值是一个匿名函数, 这个匿名函数内部的变量x指向同一个作用域的第一个参数x;函数foo内部又声明了一个内部变量x
// 该变量与第一个参数x由于不是同一个作用域, 所以不是同一个变量, 因此执行y后, 内部变量x和外部全局变量x的值都没变

// 如果将var x = 3的var去除, 函数foo的内部变量x就指向第一个参数x,与匿名函数内部的x是一致的, 所以最后输出的就是2,而外层的全局变量x依然不受影响

var x = 1;
function foo(x, y = function(){ x = 2;}) { 
    x = 1;
    y();
    console.log(x);
 }

 foo() // 2
 x // 1

//  应用
// 利用参数默认值可以指定某一个参数不得省略, 如果省略就抛出一个错误
function throwIfMissing() {
    throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;   
}

foo(1) //Error: Missing parameter

/* 如果调用的时候没有参数, 以上代码中的foo函数就会调用默认值throwIfMissing函数, 从而抛出一个错误
    从上面的代码还可以看到, 参数mustBeProvided的默认值等于 throwIfMissing函数的运行结果(即函数名之后又一对圆括号),
    这表明参数的默认值不是在定义时执行, 而是在运行时执行; 如果参数已经赋值, 默认值中的函数就不会运行;
*/
// 另外, 可以将参数默认值设置为undefined, 表明这个参数是可以省略的

function foo(optional = undefined) {  }

// rest参数

/* ES6引入了rest参数(形式为"...变量名"), 用于获取函数的多余参数, 这样就不需要使用arguments对象了;
    rest参数搭配的变量是一个数组, 该变量将多余的参数放入其中 */
    function add(...values) {
        let sum = 0;

        for (var val of values) {
            sum += val;
        }
        return sum;
    }

    add(2, 5, 3) // 10

    // 以上代码的add函数是一个求和函数, 利用rest参数可以向该函数传入任意数目的参数

    // rest参数代替arguments变量的例子
    // arguments变量的写法
    function sortNumbers() {
        return Array.prototype.slice.call(arguments).sort();
    }
// rest参数的写法

    const sortNumbers = (...numbers) => numbers.sort();

// rest参数中的变量代表一个数组, 所以数组特有的方法都可以用于这个变量

function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
        console.log(item);
    });
}

var a = [];
push(a, 1, 2, 3);

// rest参数之后不能再有其他参数(即只能是最后一个参数), 否则会报错

// SyntaxError: Rest parameter must be last formal parameter
function f(a, ...b, c) {
    
}


// 函数的length属性不包括rest参数
(function (a) {  }).length; //1
(function (...a) {  }).length; //0
(function (a, ...b) {  }).length // 1


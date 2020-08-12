/* 基本用法
    ES6允许使用 "箭头"(=>) 定义函数 */

    var f = v => v;
    // 以上的箭头函数等同于以下代码

    var f = function (v) { return v; }

    // 如果箭头函数不需要参数或需要多个参数, 就使用圆括号代表 参数部分

    var f = () => 5;
    // 等同于
    var f = function () { return 5 };

    var sum = (num1, num2) => num1 + num2;
    // 等同于
    var sum = function (num1, num2) { return num1 + num2; };

    // 如果箭头函数的代码部分多于一条语句, 就要使用大括号将其括起来, 并使用 return语句返回

    var sum = (num1, num2) => { return num1 + num2; }
    // 由于大括号被解释为代码块, 所以如果箭头函数直接返回一个对象, 必须在对象外面加上括号
    var getTempItem = id => ({id: id, name: "Temp" });

    // 箭头函数可以与变量解构结合使用
    const full = ({ first, last }) => first + ' ' + last;
    // 等同于
    function full(person) {
        return person.first + ' ' + person.last;
    }

    // 箭头函数使得表达更简洁
    const isEven = n => n % 2 == 0;
    const square = n => n * n;

    // 箭头函数的一个用处是简化回调函数

    // 正常函数写法
    [1, 2, 3].map(function (x) {
        return x * x;
    });

    // 箭头函数写法
    [1, 2, 3].map(x => x * x);

    // 正常函数写法
    var result = values.sort(function (a, b) {
        return a - b;
    });

    // 箭头函数
    var result = values.sort((a, b) => a - b);

    // 下面是rest参数与箭头函数结合的例子

    const numbers = (...nums) => nums;

    numbers(1, 2, 3, 4, 5) 
    // [1, 2, 3, 4, 5]

    const headAndTail = (head, ...tail) => [head, tail];

    headAndTail(1, 2, 3 ,4, 5)
    // [1, [2, 3, 4, 5]]


/* 注意事项
    1.函数体内的this对象就是定义时所在的对象, 而不是使用时所在的对象;
    2.不可以当作构造函数;也就是说, 不可以使用new 命令, 否则会抛出一个错误;
    3.不可以使用arguments对象, 该对象在函数体内不存在; 如果要用, 可以使用rest参数代替
    4.不可以使用yield命令, 因此箭头函数不能用作Generator函数;
*/

// 其中, 第一点尤其值得注意;this对象的指向是可变的, 但在箭头函数中它是固定的

function foo() {
    setTimeout(() => {
        console.log('id:',this.id);
    }, 100);
}

var id = 21;
foo.call({id: 42});
// id: 42

/* 上面的代码中, setTimeout的参数是一个箭头函数, 这个箭头函数的定义时在foo函数生成时生效的 */


// 例子
function Timer() {
    this.s1 = 0;
    this.s2 = 0;

    // 箭头函数
    setInterval(function () {
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1:', timer.s1), 3100);
setTimeout(() => console.log('s2:', timer.s2), 3100);

// s1: 3
// s2: 0

// DOM事件的回调函数封装在一个对象里面

var handler = {
    id: '123456',
    init: function () { 
        document.addEventListener('click',event => this.doSomething(event.type), false);
    },
    doSomething: function (type) { 
        console.log('Handling '+ type + ' for ' + this.id);
     }
};

/* 以上代码的init 方法中使用了箭头函数, 这导致箭头函数里面的this 总是指向handler对象, 否则, 回调函数运行时, 
    this.doSomething一行会报错, 因为此时this指向document对象
    this指向的固定化并不是因为箭头函数内部绑定this的机制, 实际原因是箭头函数根本没有自己的this, 导致内部的this
    就是外层代码块的this;正是因为它没有this, 所以不能用作构造函数;
    */

// 箭头函数转成ES5的代码如下
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

// ES5
function foo() {
    var _this = this;
    setTimeout(function () {
        console.log('id:', _this.id);
    }, 100);
}

// 例子: 请问下面的代码之中有几个this?
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()();// id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
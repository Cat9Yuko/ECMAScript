/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-03 11:34:00 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-03 14:00:31
 */


 /* 由于每一个Symbol值都是不相等的, 这意味着Symbol值可以作为标识符用于对象的属性名, 保证不会出现同名的属性.
    这对于一个对象由多个模块构成的情况非常有用, 能防止某一个键被不小心改写或覆盖. */
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
    [mySymbol] : 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!'});

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

// 上面的代码通过方括号结构和Object.defineProperty将对象的属性名指定为一个Symbol值.
// 注意, Symbol值作为对象属性名时不能使用点运算符.
var mySymbol = Symbol();
var a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

// 上面的代码中, 因为点运算符后面总是字符串, 所以不会读取mySymbol作为标识名所指代的值, 导致a的属性名实际上是一个字符串, 而不是一个Symbol值.
// 同理, 在对象的内部, 使用Symbol值定义属性时, Symbol值必须放在方括号中.

let s = Symbol();
let obj = {
    [s] : function(arg) { }
};

obj[s](123);
// 上面的代码中, 如果s不放在方括号中, 该属性的键名就是字符串s, 而不是s所代表的的Symbol值.
// 采用增强的对象写法, 上面的obj对象可以写得更简洁一些.
let obj = {
    [s](arg) {}
};

// Symbol类型还可用于定义一组常量, 保证这组常量的值都是不相等的.
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
log(log.levels.DEBUG,'debug Message');
log(log.levels.INFO,'info Message');

// 下面是另一个例子.
const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();

function getComplement(color) {
    switch(color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default: 
            throw new Error('Undefined color');
    }
}
// 常量使用Symbol值的最大好处就是, 其他任何值都不可能有相同的值了, 因此可以保证上面的switch语句按设计的方式工作.
// Symbol值作为属性名时, 该属性还是公开属性, 不是私有属性.
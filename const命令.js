// const声明一个只读的常量, 一旦声明, 常量的值就不能改变

const PI = 3.1415;

PI = 3;
// TypeError: Assignment to constant variable.

// const 一旦声明常量, 就必须立即初始化, 不能留到以后赋值
const foo;
// SyntaxError: Missing initializer in const declaration

// const 的作用域与let命令相同: 只在声明所在的块级作用域内有效
//const 命令声明的常量也不会提升, 同样存在暂时性死区, 只能在声明后使用
if(true) {
    const MAX = 5;
}
console.log(MAX);
// ReferenceError: MAX is not defined

// 不可重复声明

var message = "Helo!";

let age = 25;

// 以下两行都会报错
const message = "GoodBye!";
const age = 30;
// SyntaxError: Identifier 'message' has already been declared

// 冻结对象函数
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, i) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    });
};
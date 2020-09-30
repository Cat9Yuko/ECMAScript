/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 16:48:48 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-30 08:39:24
 */


//  JavaScript语言是传值调用, 它的Thunk函数含义有所不同. 在JavaScript语言中, Thunk函数替换的不是表达式, 而是多参数函数, 将其替换成一个只接受回调函数作为参数的单参数函数.

// 正常版本的readFile (多参数版本)
false.readFile(fileName, callback);

// Thunk版本的readFile(单参数版本)
var Thunk = function(fileName) {
    return function(callback) {
        return fs.readFile(fileName, callback);
    }
}

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
// 上面的代码中, fs模块的readFile方法是一个多参数函数, 两个参数分别为文件名和回调函数. 经过转换器处理, 它变成了一个单参数函数, 只接受回调函数作为参数. 这个单参数版本就叫作Thunk函数.
// 任何函数, 只要参数有回调函数, 就能写成Thunk函数的形式. 下面是一个简单的Thunk函数转换器的例子.
// ES5版本
var Thunk = function(fn) {
    return function(callback) {
    var args = Array.prototype.slice.call(arguments);
        return function(callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    };
};

// ES6版本
const Thunk = function(fn) {
    return function(...agrs) {
        return function(callback) {
            return fn.call(this, ...args, callback);
        }
    }
}

// 使用上面的转换器, 生成fs.readFile的Thunk函数.
var readFildThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
// 下面是另一个完整的例子.

function f(a, cb) {
    cb(a);
}
const ft = Thunk(f);
ft(1)(console.log) // 1
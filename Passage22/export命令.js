/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-09 15:51:48 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-09 16:52:53
 */


//  模块功能主要由两个命令构成: export和import. export命令用于规定模块的对外接口, import命令用于输入其他模块提供的功能.
// 一个模块就是一个独立的文件. 该文件内部的所有变量, 外部无法获取. 如果希望外部能够读取模块内部的某个变量, 就必须使用export关键字输出该变量. 下面是一个JS文件, 里面使用export命令输出了变量.
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 上面的代码是profile.js文件, 保存了用户信息. ES6将其视为一个模块, 里面用export命令对外部输出了3个变量.
// export的写法, 除了像上面这样, 还有另一外一种.
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {
    firstName,
    lastName,
    year
};

export function multiply(x, y) {
    return x * y;
}
// 写法1
export var m = 1;
// 写法2
var m = 1;
export {
    m
}
// 写法3
var n = 1;
export {
    n as m
};

export function f() {}

function f() {}
export {
    f
}
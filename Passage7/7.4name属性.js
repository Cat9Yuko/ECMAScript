/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-09 17:05:30 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-09 17:50:03
 */


//  函数的name属性返回该函数的函数名.

function foo() {}

console.log(foo.name);
// foo

// 这个属性早就被浏览器广泛支持, 但是知道ES6才写入了标准.
// 需要注意的是, ES6对这个属性的行为作出了一些修改. 如果将一个匿名函数赋值给一个变量, ES5的name属性会返回空字符串, 而ES6的name属性会返回实际的函数名.

var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

// 上面的代码中, 变量func1等于一个匿名函数, ES5和ES6的name属性返回的值不一样.
// 如果将一个具名函数赋值给一个变量, 则ES5和ES6的name属性都返回这个具名函数原本的名字.

const bar = function baz() {};

// ES5
bar.name // "baz"
// ES6
console.log(bar.name);
// "baz"

// Function构造函数返回的函数实例, name属性的值为anonymous.

console.log((new Function).name);
// anonymous

// bind返回的函数, name属性值会加上bound前缀
function foo() {};

console.log(foo.bind({}).name);
// bound foo

console.log((function(){}).bind({}).name);
// bound 



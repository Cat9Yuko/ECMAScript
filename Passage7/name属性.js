// 函数的name属性返回该函数的函数名

function foo() {  }

console.log(foo.name);
 // "foo"

//  需要注意的是, ES6对这个属性的行为作出了一些修改, 如果将一个匿名函数赋值给一个变量, ES5的name属性会返回空字符串, 而ES6的name属性会返回实际的函数名

var f = function () {  }
console.log(f.name);
// ""

// 如果将一个具有名函数赋值给一个变量, 则ES5和ES6的name属性都返回这个具名函数原本的名字

const bar = function baz() {  }

console.log(bar.name);
// "baz"

// Function构造函数返回的函数实例, name属性的值为anonymous
(new Function).name // "anonymous"

// bind返回的函数, name属性值会加上bound前缀

function foo() {  }
foo.bind({}).name //"bound foo"

(function () {}).bind({}).name // "bound"

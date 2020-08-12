/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-06 15:53:03 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 16:19:10
 */



//  对象的Symbol.unscopables属性指向一个对象, 指定了使用with关键字时那些属性会被with环境排除.
console.log(Array.prototype[Symbol.unscopables]);
/* 
[Object: null prototype] {
  copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  flat: true,
  flatMap: true,
  includes: true,
  keys: true,
  values: true
}
*/

console.log(Object.keys(Array.prototype[Symbol.unscopables]));
/* 
    [
  'copyWithin', 'entries',
  'fill',       'find',
  'findIndex',  'flat',
  'flatMap',    'includes',
  'keys',       'values'
]
*/
// 上面代码说明, 数组有7个属性会被with命令排除.
// 没有unscopables时
class MyClass {
    foo() { return 1; }
}

var foo = function () { return 2; }
with (MyClass.prototype) {
    foo(); // 1
}

// 有unscopables时
class MyClass {
    foo() { return 1; }
    get [Symbol.unscopables]() {
        return { foo: true };
    }
}
var foo = function () { return 2; }
with (MyClass.prototype) {
    foo(); // 2
}

// 上面的代码通过指定Symbol.unscopables属性使with语法块不会在当前作用域寻找foo属性, 即foo将指向外层作用域的变量.

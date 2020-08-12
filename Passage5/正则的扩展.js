/* RegExp构造函数 */

// ES5中, RegExp构造函数的参数有两种情况
// 1. 参数是字符串, 这时第二个参数表示正则表达式的修饰符(flag)

var regex = new RegExp('xyz','i');

// 等价于

var regex = /xyz/i;

// 2. 参数是一个正则表达式, 这时会返回一个原有正则表达式的拷贝

var regex = new RegExp(/xyz/i);

// 等价于

var regex = /xyz/i;

// 但是, ES5不允许此时使用第二个参数添加修饰符, 否则会报错

var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags
// when constructing one RegExp from another

/* ES6改变了这种行为, 如果RegExp构造函数第一个参数是一个正则对象,
   name可以使用第二个参数指定修饰符, 返回的正则表达式会忽略原有正则表达式的修饰符,
   只使用新指定的修饰符 */

   new RegExp(/abc/ig, 'i').flags;
// i


// 字符串的正则表达式

// 字符串对象共有4个方法可以使用正则表达式: match(), replace(), search()和 split().

// ES6使这4个方法在语言内部全部调用RegExp的实例方法, 从而做到所有与正则相关的方法都定义在RegExp对象上

String.prototype.match //调用RegExp.prototype[Symbol.match]

String.prototype.replace //调用RegExp.prototype[Symbol.replace]

String.prototype.search //调用RegExp.prototype[Symbol.search]

String.prototype.split //调用RegExp.prototype[Symbol.split]

// 3.u修饰符 ES6对正则表达式添加了u修饰符, 含义为 "Unicode 模式", 用来正确处理大于\uFFFF的Unicode字符.也就是说, 可以正确处理4个字符的UTF-16编码
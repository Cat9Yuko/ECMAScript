/*
 * @Author: Cat9Yuko 
 * @Date: 2020-07-06 15:55:10 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-06 17:20:29
 */


//  JavaScript语言定义对象的属性有两种方法.
// 方法一
obj.foo = true;
obj['a'+ 'bc'] = 123;
// 上面的方法一是直接用标识符作为属性名; 方法二是用表达式作为属性名, 这时要将表达式放在方括号内.
// 但是, 如果使用字面量方式定义对象 (使用大括号), 则在ES5中只能使用方法一(标识符)定义属性.
var obj = {
    foo: true,
    abc: 123
};
// ES6允许字面量定义对象时用方法二 (表达式作为对象的属性名), 即把表达式放在方括号内.
let propKey = 'foo';
let obj = {
    [propKey] : true,
    ['a' + 'bc'] : 123
};

// 下面是另一个例子.
var lastWord = 'last word';

var a = {
    'first word': 'hello',
    [lastWord] : 'world'
};
a['first word'] // "hello"
a[lastWord] //  "world"
a['last word'] // "world"

// 表达式还可以用于定义方法名.
let obj = {
    ['h', 'ello'](){
        return 'hi';
    }
};
obj.hello() //hi

// 注意, 属性名表达式与简洁表示法不能同时使用, 否则会报错.
// 报错

var foo = 'bar';
var bar = 'abc';
// var baz = {[foo]};

// 正确
var foo = 'baz';
var baz = {[foo]: 'abc'};

// 注意, 属性名表达式如果是一个对象, 默认情况下会自动将对象转为字符串[object Object],这一点要特别小心.
const keyA = {a: 1};
const keyB = {b: 2};
const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
// 上面的代码中, [keyA]和[keyB]得到的都是[object Object], 所以[keyB]会把[keyA]覆盖掉, 而myObject最后一个[object Object]属性

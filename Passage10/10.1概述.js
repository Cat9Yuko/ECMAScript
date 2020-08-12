/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-03 10:38:44 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-03 11:33:21
 */


 /* 
    ES5的对象属性名都是字符串, 这容易造成属性名的冲突. 比如, 我们使用了一个他人提供的对象,  但又想为这个对象添加新的方法(mixin模式), 新方法的名字就有可能与现有方法产生冲突. 
    如果有一种机制, 能够保证每个属性的名字都是独一无二的就好了, 这样就能从根本上防止属性名冲突. 这就是ES6引入类型Symbol的原因.
 */

 /* 
    ES6引入了一种新的原始数据类型Symbol, 表示第一无二的值. 它是JavaScript语言的第7种数据类型, 前6种分别是: Undefined、Null、布尔值(Boolean)、字符串(String)、数值(Number)和
    对象(Object).
 */
/* 
    Symbol值通过Symbol函数生成. 也就是说, 对象的属性名现在可以有两种类型: 一种是原来就有的字符串, 另一种就是新增的Symbol类型.只要属性名属于Symbol类型,
    就是独一无二的, 可以保证不会与其他属性名产生冲突.
*/
let s = Symbol();
console.log(typeof s );
// "symbol"
// 上面的代码中, 变量s就是一个独一无二的值.typeof运算符的结果表明变量s是Symbol数据类型, 而不是字符串之类的其他类型.

/* 注意!
    Symbol函数前不能使用new命令, 否则会报错. 这是因为生成的Symbol是一个原始类型的值, 不是对象. 也就是说, 由于Symbol值不是对象,
    所以不能添加属性.基本上, 它是一种类似于字符串的数据类型.
*/
// Symbol函数可以接受一个字符串作为参数, 表示对Symbol实例的描述, 主要是为了在控制台显示, 或者转为字符串时比较容易区分.
var s1 = Symbol('foo');
var s2 = Symbol('bar');
console.log(s1);
console.log(s2);
console.log(s1.toString())
console.log(s2.toString())
/* 
Symbol(foo)
Symbol(bar)
Symbol(foo)
Symbol(bar) */

// 上面的代码中, s1 和 s2是两个Symbol值.如果不加参数, 它们在控制台的输出都是Symbol(),不利于区分.有了参数以后, 就等于为它们加上了描述, 输出时就能够分清到底是哪一个值.
// 如果Symbol的参数是一个对象, 就会调用该对象的toString方法, 将其转为字符串, 然后才生成一个Symbol值.

const obj = {
    toString() {
        return 'bac';
    }
};
const sym = Symbol(obj);
console.log(sym);
// Symbol(bac)

/* 注意!
    Symbol 函数的参数只表示对当前Symbol值的描述, 因此相同参数的Symbol函数的返回值是不相等的.
 */

//  没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2);
// false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

console.log(s1 === s2);
// false

// 上面的代码中, s1和s2都是Symbol函数的返回值, 而且参数相同, 但是它们是不相等的.
// Symbol值不能与其他类型的值进行运算, 否则会报错.
var sym = Symbol('My symbol');
"your symbol is " + sym;
// TypeError: Cannot convert a Symbol value to a string
`your symbol is ${sym}`;
// TypeError: Cannot convert a Symbol value to a string

// 但是, Symbol值可以显示转为字符串.
var sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
// 另外, Symbol值也可以转为布尔值, 但是不能转为数值.
var sym = Symbol();
Boolean(sym) // true
!sym // false
if(sym) {
    // ...
}
Number(sym);
// TypeError: Cannot convert a Symbol value to a number
sym + 2
// TypeError: Cannot convert a Symbol value to a number
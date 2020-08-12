/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-04 10:13:29 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-04 10:22:33
 */


//  mod.js
const FOO_KEY = Symbol.for('foo')
function A() {
    this.foo = 'hello';
}

if(!global[FOO_KEY]) {
    global[FOO_KEY] = new A();
}
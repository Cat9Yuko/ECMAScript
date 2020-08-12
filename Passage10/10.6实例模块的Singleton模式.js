/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-03 15:52:27 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 08:33:08
 */


 /* Singleton模式指的是, 调用一个类并且在任何时候都返回同一个实例 */
//  对于Node来说, 模块文件可以看成是一个类. 怎么保证每次执行这个模块文件返回的都是同一个实例呢?
// 很容易想到, 可以把实例放到顶层对象global中.

module.exports = global[FOO_KEY];
// 然后, 加载上面的mod.js
var a = require('./mod.js');
console.log(a.foo)
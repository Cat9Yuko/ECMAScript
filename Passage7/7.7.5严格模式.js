/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 16:50:06 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 16:54:36
 */


 /* 
    ES6的尾调用优化只在严格模式下开启, 正常模式下是无效的.
    这是因为, 在正常模式下函数内部有两个变量, 可以跟踪函数的调用栈.

    func.arguments: 返回调用时函数的参数.
    func.caller: 返回调用当前函数的那个函数.
    尾调用优化发生时, 函数的调用栈会改写, 因此上面两个变量就会失真. 严格模式禁用这两个变量, 所以尾调用模式仅在严格模式下生效.
 */

 function restricted() {
     'use strict';
     restricted.caller;
     restricted.arguments;
 }
 restricted();
//  TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
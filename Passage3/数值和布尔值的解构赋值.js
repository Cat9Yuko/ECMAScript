/*
 * @Author: Cat9Yuko.Chen 
 * @Date: 2019-12-15 23:53:26 
 * @Last Modified by: Cat9Yuko.Chen
 * @Last Modified time: 2019-12-16 09:18:57
 */

//  结构赋值时, 如果等号右边是数值和布尔值, 则会先转为对象

let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

// 解构赋值的规则是, 只要等号右边的值不是对象或数组, 就闲将其转为对象,由于undefined和null无法转为对象,所以对它们进行解构赋值时都会报错

let { prop: x} = undefined; //TypeError
let { prop: y} = null;      //TypeError
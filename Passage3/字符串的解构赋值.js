/*
 * @Author: Cat9Yuko.Chen 
 * @Date: 2019-12-15 23:41:20 
 * @Last Modified by: Cat9Yuko.Chen
 * @Last Modified time: 2019-12-15 23:51:58
 */
 
const [a, b, c, d, e] = 'hello';
a // 'h'
b // 'e'
c // 'l'
d // 'l'
e // 'o'

// 类似数组的对象有一个length属性,因此可以对这个属性进行解构赋值
let {length: len} = 'hello';
lent // 5
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-07-07 10:43:08 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-07 11:07:38
 */

 /* ES5比较两个值是否相等, 只有两个运算符: 相等运算符(==) 和严格相等运算符(===).
    它们都有缺点,前者会自动转换数据类型, 后者的NaN不等于自身, 以及+0等于--0. JavaScript缺乏这样一种运算: 在所有环境中, 
    只要两个值时一样的, 它们就应该相等.
    ES6提出了 "Same-value equality" (同值相等) 算法用来解决这个问题. Object.is就是部署这个算法的新方法. 它用来比较两个值是否严格相等,
    与严格相等运算符(===) 的行为基本一致.
 */

console.log( Object.is('foo','foo'))
// true

console.log(Object.is({},{}))
// false

// 不同之处只有两个: 一是+0不等于-0. 二是NaN等于自身.
+0 === -0 // true
NaN === NaN // false

console.log(Object.is(+0,-0)) // false

console.log(Object.is(NaN,NaN)) // true

// ES5可以通过下面的代码部署Objec.is.
Object.defineProperty(Object, 'is', {
    value: function(x, y) {
        if(x === y) {
            // 针对+0不等于 -0的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
})
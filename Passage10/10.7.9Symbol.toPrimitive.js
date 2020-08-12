/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-06 11:39:28 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 15:36:40
 */


//  对象的Symbol.toPrimitive属性指向一个方法, 对象被转为原始类型的值时会调用这个方法, 返回该对象对应的原始类型.
// Symbol.toPromitive被调用时会接受一个字符串参数, 表示当前运算的模式. 一共有3种模式.
/* 
    Number: 该场合需要转为数值.
    String: 该场合需要转成字符串.
    Default: 该场合可以转成数值, 也可以转成字符串.
*/

let obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'str';
            case 'default':
                return 'default';
            default:
                throw new Error();
        }
    }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'


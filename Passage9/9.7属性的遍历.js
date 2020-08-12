/*
 * @Author: Cat9Yuko 
 * @Date: 2020-07-08 11:11:43 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-27 10:25:45
 */


/* 
    ES6一共有5种方法可以遍历对象的属性.
    1.for...in
    for...in循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).

    2.Object.keys(obj)
    Object.keys返回一个数组, 包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性).

    3.Object.getOwnPropertyNames(obj)
    Object.getOwnerPropertyNames返回一个数组, 包含对象自身的所有属性(不含Symbol属性, 但是包括不可枚举属性)

    4.Object.getOwnPropertySymbol(obj)
    Object.getOwnPropertySymbol返回一个数组, 包含对象自身的所有Symbol属性.

    5.Reflect.ownKeys(obj)
    Reflect.ownKeys返回一个数组, 包含对象自身的所有属性, 不管属性名是Symbol还是字符串, 也不管是否可枚举.
    以上5种方法遍历对象的属性时都遵守同样的属性遍历次序规则.
        首先遍历所有属性名为数值的属性, 按照数字排序.
        其次遍历所有属性名为字符串的属性, 按照生成时间排序.
        最后遍历所有属性名为Symbol值的属性, 按照生成时间排序.
*/
    console.log(Reflect.ownKeys({[Symbol()]:0, b: 0, 10: 0,2:0,a: 0}))
    // [ '2', '10', 'b', 'a', Symbol() ]

    // 上面的代码中, Reflect.ownKeys方法返回一个数组, 包含了参数对象的所有属性. 这个数组的属性次序是这样的, 首先是数值属性2和10, 其次是字符串属性b和a, 最后是Symbol属性.
    


/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-21 14:36:48 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-21 14:42:56
 */



//  有些数据结构是在现有数据结构的基础上计算生成的. 比如, ES6的数组、Set、Map都部署了一下3个方法,调用后都返回遍历器对象.
// · entries()返回一个遍历器对象, 用于遍历[键名, 键值]组成的数组. 对于数组, 键名就是索引; 对于Set, 键名与键值相同. Map结构的iterator接口默认就是调用entries方法.
// · keys()返回一个遍历器对象, 用于遍历所有的键名.
// · values() 返回一个遍历器对象, 用于遍历所有的键值.
// 这3个方法调用后生成的遍历器对象所遍历的都是计算生成的数据结构.
let arr = ['a', 'b','c'];
for(let pair of arr.entries()) {
    console.log(pair);
    /* 
        [ 0, 'a' ]
        [ 1, 'b' ]
        [ 2, 'c' ]
    */
}
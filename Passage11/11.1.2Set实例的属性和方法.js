/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-07 08:45:28 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-07 11:32:50
 */


 /* 
    Set结构的实例有以下属性.
    Set.prototype.constructor: 构造函数, 默认就是Set函数.
    Set.prototype.size: 返回Set实例的成员总数.
    Set实例的方法分为两大类: 操作方法(用于操作数据) 和遍历方法 (用于遍历成员). 下面先介绍4个操作方法.
        add(value): 添加某个值, 返回Set结构本身.
        delete(value): 删除某个值, 返回一个布尔值, 表示删除是否成功.
        has(value): 返回一个布尔值, 表示参数是否为Set的成员.
        clear(): 清除所有成员, 没有返回值.
 */

//  上面这些属性和方法的实例如下.
s.add(1).add(2).add(2);
// 注意2被加入了两次
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
// 下面是一个对比, 判断是否包括一个键上Object结构和Set结构的写法不同.

const properties = {
    'width': 1,
    'height': 1
};
if(properties[someName]){
    // do something
}
// Set的写法
const properties = new Set();
properties.add('width');
properties.add('height');

if(properties.has(someName)) {
    // do something
}
// Array.from方法可以将Set结构转为数组.
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
// 这就提供了一种去除数组重复元素的方法.
function dedupe(array) {
    return Array.from(new Set(array));
}
console.log(dedupe([1, 1, 2, 3]));
// [ 1, 2, 3 ]
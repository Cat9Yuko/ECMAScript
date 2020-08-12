/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-11 15:46:55 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-12 09:45:56
 */



//  Map结构的实例有以下几个属性和操作方法.
/* 
    size属性

    size属性返回Map结构的成员总数.
*/
const map = new Map();
map.set('foo', true);
map.set('bar', false);

console.log(map.size); // 2

// set(key, value)
// set 方法设置key所对应的键值, 然后返回整个Map结构.  如果key已经有值, 则键值会被更新, 否则就新生成改建.
const m = new Map();
m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是undefined

// set方法返回的是当前的Map对象, 因此可以采用链式写法.
let map = new Map().set(1, 'a').set(2, 'b').set(3, 'c');
console.log(map);
// Map { 1 => 'a', 2 => 'b', 3 => 'c' }

// get(key)
// get方法读取key对应的键值, 如果找不到key, 则返回undefined.
const m = new Map();
const hello = function() { console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello)  // Hello ES6!

// has(key)
// has方法返回一个布尔值, 表示某个键是否在Map数据结构中.
const m = new Map();
m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition') //  true
m.has('years') // false
m.has(262) // true
m.has(undefined) // true

// delete(key)
// delete方法删除某个键, 返回true. 如果删除失败, 则返回false.
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false

// clear()
// clear方法清除所有成员, 没有返回值.
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2
map.clear();
map.size // 0
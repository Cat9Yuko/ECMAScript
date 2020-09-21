/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-21 11:58:06 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-21 14:32:19
 */


//  Set和Map结构原生具有Iterator接口, 可以直接使用for...of循环.
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
    console.log(e)
};
// Gecko
// Trident
// Webkit
var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
    console.log(name + ": " + value);
    /* 
    edition: 6
    committee: TC39
    standard: ECMA-262
    */
}
// 上面的代码演示了如何遍历Set结构和Map结构. 值得注意的地方有两个: 首先, 遍历的顺序是按照各个成员被添加进数据结构的顺序; 其次, Set结构遍历时返回的是一个值, 而Map结构遍历时返回的是一个数组, 该数组的两个成员分别为当前Map成员的键名和键值.
let map = new Map().set('a', 1).set('b', 2);
for(let pair of map) {
    console.log(pair);
}
// ['a', 1]
// ['b', 2]

for(let [key, value] of map) {
    console.log(key + ': '+ value);
}
// a: 1
// b: 2
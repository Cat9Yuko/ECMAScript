/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-12 10:45:32 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-12 14:36:35
 */



//  Map转为数组
// 前面已经提过, Map转为数组最方便的方法就是使用扩展运算符(...).
const myMap = new Map()
    .set(true, 7)
    .set({foo: 3}, ['abc']);
console.log([...myMap]);
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// 数组转为Map
// 将数组传入Map构造函数就可以转为Map.
console.log(new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
]));
// Map { true => 7, { foo: 3 } => [ 'abc' ] }

// Map转为对象
// 如果Map的所有键都是字符串, 则可以转为对象.
function strMapToObj (strMap) {
    let obj = Object.create(null);
    for(let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
const myMap = new Map()
    .set('yes', true)
    .set('no', false);
strMapToObj(myMap)
// {yes: true, no: false}

// 对象转为Map
function objToStrMap(obj) {
    let strMap = new Map();
    for(let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
console.log(objToStrMap({yes: true, no: false}));
// Map { 'yes' => true, 'no' => false }

// Map转为JSON
// Map转为JSON要区分两种情况. 一种情况是, Map的键名都是字符串, 这时可以选择转为对象JSON.
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes": true, "no": false}'

// 另一种情况是, Map的键名有非字符串, 这时可以选择转为数组JSON.
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo: 3},['abc']);
console.log(mapToArrayJson(myMap));
// [[true,7],[{"foo":3},["abc"]]]

// JSON转为Map
// JSON转为Map, 正常情况下所有键名都是字符串.
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
// 但是, 有一种特殊情况: 整个JSON就是一个数组, 且每个数组成员本身又是一个具有两个成员的数组.这时, 它可以一一对应的转为Map.这往往是数组转为JSON的逆操作.
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}
console.log(jsonToMap('[[true,7],[{"foo":3},["abc"]]]'));
// Map { true => 7, { foo: 3 } => [ 'abc' ] }
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-06 15:37:02 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 15:52:19
 */



/* 
   对象的Symbol.toStringTag属性指向一个方法, 在对象上调用Object.prototype.toString方法时, 如果这个属性存在, 其返回值会出现toString方法返回的
   字符串中, 表示对象的类型. 也就是说, 这个属性可用于定制[object Object] 或 [object Array] 中object后面的字符串.
*/

//  例一
console.log(({
    [Symbol.toString]: 'Foo'
}.toString()));
// [object Object]

// 例二
class Collection {
    get[Symbol.toStringTag]() {
        return 'xxx';
    }
}

var x = new Collection();
console.log(Object.prototype.toString.call(x));
// [object xxx]

// ES6新增内置对象的Symbol.toStringTag属性值如下.
/* 
    JSON[Symbol.toStringTag]: 'JSON'
    Math[Symbol.toStringTag]: 'Math'
    Module对象M[Symbol.toStringTag]: 'Module'
    ArrayBuffer.prototype[Symbol.toStringTag]: 'ArrayBuffer'
    DataView.prototype[Symbol.toStringTag]: 'DataView'
    Map.prototype[Symbol.toStringTag]: 'Map'
    Promise.prototype[Symbol.toStringTag]: 'Promise'
    Set.prototype[Symbol.toStringTag]: 'Set'
    %TypedArray%.prototype[Symbol.toStringTag] : 'Uint8Array'等
    WeakMap.prototype[Symbol.toStringTag]: 'WeakMap'
    WeakSet.prototype[Symbol.toStringTag]: 'WeakSet'
    %MapIteratorPrototype%[Symbol.toStringTag]: 'Map Iterator'
    %SetIteratorPrototype%[Symbol.toStringTag]: 'Set Iterator'
    %StringIteratorPrototype%[Symbol.toStringTag]: 'String Iterator'
    Symbol.prototype[Symbol.toStringTag]: 'Symbol'
    GeneratorFunction.prototype[Symbol.toStringTag]: 'GeneratorFunction'
*/

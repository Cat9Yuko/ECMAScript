/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-03 14:19:03 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-03 14:56:05
 */


//  Symbol作为属性名, 该属性不会出现在在for...in、for...of循环中, 也不会被Object.keys()、Object.getOwnPropertyName()返回.
// 但它也不是私有属性, 有一个Object.getOwnPropertySymbols方法可以获取指定对象的所有Symbol属性名.
// Object.getOwnPropertySymbols方法返回一个数组, 成员是当前对象的所有用作属性名的Symbol值.

var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols)
// [ Symbol(a), Symbol(b) ]

// 下面是另一个例子, 将Object.getOwnPropertySymbols 方法与 for...in循环、Object.getOwnPropertyNames方法进行了对比.
var obj = {};
var foo = Symbol("foo");
Object.defineProperty(obj, foo, {
    value: "foobar",
});

for(var i in obj) {
    console.log(i);//  无输出
}
console.log(Object.getOwnPropertyNames(obj));
// []

console.log(Object.getOwnPropertySymbols(obj));
// [ Symbol(foo) ]

// 上面的代码中, 使用Object.getOwnPropertyNames方法得不到Symbol属性名, 需要使用Obejct.getOwnPropertySymbols方法.
// 另一个新的API---------Reflect.ownKeys方法可以返回所有类型的键名, 包括常规键名和Symbol键名.
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};

console.log(Reflect.ownKeys(obj));
// [ 'enum', 'nonEnum', Symbol(my_key) ]

// 以Symbol值作为名称的属性不会被常规方法遍历得到. 我们可以利用这个特性为对象定义一些非私有但又希望只用于内部的方法.
var size = Symbol('size');

class Collection {
    constructor() {
        this[size] = 0;
    }
    add(item) {
        this[this[size]] = item;
        this[size]++;
    }
    static sizeOf(instance) {
        return instance[size];
    }
}

var x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]

// 上面的代码中, 对象x的size属性是一个Symbol值, 所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它.这就造成了一种非私有的内部方法的效果.
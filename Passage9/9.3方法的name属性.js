/*
 * @Author: Cat9Yuko 
 * @Date: 2020-07-07 10:23:11 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-07 10:42:34
 */


//  函数的name属性返回函数名. 对象方法也是函数, 因此也有name属性.

const person = {
    sayName() {
        console.log('hello!');
    },
};

person.sayName.name // "sayName"

// 上面的代码中, 方法的name属性返回函数名(即方法名).
// 如果对象的方法使用了取值函数(getter)和存值函数(setter), 则name属性不是在该方法上面, 而是在该方法属性的描述对象的get和set属性上面, 返回值是方法名前加上get和set.

const obj = {
    get foo(){},
    set foo(x){}
};

// console.log(obj.foo.name)
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(descriptor.get.name);
console.log(descriptor.set.name);
// get foo
// set foo

// 有两种特殊情况: bind方法创造的函数, name属性返回 "bound"加上原函数的名字;Function构造函数创造的函数, name属性返回"anonymous".
console.log((new Function()).name) // "anonymous"
var doSomething = function() {
    // ...
};

doSomething.bind().name // "bound doSomething"

// 如果对象的方法是一个Symbol, 那么name属性返回的是这个Symbol值的描述.
const key1 = Symbol('description');
const key2 = Symbol();

let obj = {
    [key1](){},
    [key2](){},
};

console.log(obj[key1].name);    // [description]
console.log(obj[key2].name);    // ""

// 上面的代码中, key1对应的Symbol值有描述, key2 没有.
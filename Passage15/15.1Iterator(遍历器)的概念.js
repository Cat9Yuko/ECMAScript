/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 14:51:58 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-18 15:40:06
 */



 /* JavaScript原有的表示 "集合" 的数据结构主要是数组 (Array) 和对象 (Object), ES6又添加了Map 和 Set. 这样就有了4种数据集合, 用户还可以组合使用它们, 定义自己的数据结构,
 比如数组的成员是Map, Map的成员是对象. 这样就需要一种统一的接口机制来处理所有不同的数据结构.
    遍历器(iterator)就是这样一种机制.它是一种接口, 为各种不同的数据结构提供统一的访问机制. 任何数据结构只要部署Iterator接口, 就可以完成遍历操作(即依次处理该数据结构的所有成员).
    Iterator的作用有3个: 一是为各种数据结构提供一个统一的、简便的访问接口;二是使得数据结构的成员能够按某种次序排列;三是ES6创造了一种新的遍历命令————for...of循环,
    Iteartor接口主要供for...of消费.
    Iterator的遍历过程如下.
    1.创建一个指针对象, 指向当前数据结构的起始位置. 也就是说, 遍历器对象本质上就是一个指针对象.
    2.第一次调用指针对象的next方法, 可以将指针指向数据结构的第一个成员.
    3.第二次调用指针对象的next方法, 指针就是向数据结构的第二个成员.
    4.不断调用指针对象的next方法, 知道它指向数据结构的结束位置.
    每次调用next方法都会返回数据结构的当前成员的信息. 具体来说, 就是返回一个包含value和done两个属性的对象. 其中, value属性是当前成员的值, done属性是一个布尔值, 表示遍历是否结束.
    下面是一个模拟next方法返回值的例子.
 */
var it = makeIterator(['a', 'b']);
it.next() // {value: "a", done: false}
it.next() // {value: "b", done: false}
it.next() // {value: undefined, done: true}

function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function(){
            return nextIndecx < array.length ? {
                value: array[nextIndex], done: false
            } :
            {
                value: undefined, done: true
            };
        }
    };
}

// 上面的代码定义了一个makeIterator函数, 它是一个遍历器生成函数, 作用就是返回一个遍历器对象. 对象组['a','b']执行这个函数, 就会返回该数组的遍历器对象(即指针对象) it.
/* 
    指针对象的next方法用于移动指针. 开始时, 指针指向数组的开始位置.然后, 每次调用next方法, 指针就会指向数组的下一个成员. 第一次调用, 指向a; 第二次调用, 指向b.
    next方法返回一个对象, 表示当前数据成员的信息. 这个对象具有value和done两个属性: value属性返回当前位置的成员; done属性是一个布尔值, 表示遍历是否结束, 即是否还有必要再一次调用next方法.
    总之, 调用指针对象的next方法可以遍历事先给定的数据结构.
    对于遍历器对象来说, done: false和value: undefined属性都可以省略的, 因此上面的makeIterator函数可以简写成下面的形式.
*/
function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function(){
            return nextIndex < array.length ? {value: array[nextIndex++]} : {done: true};
        }
    };
}

/* 由于Iterator只是把接口规格加到了数据结构上, 所以, 遍历器与所遍历的数据结构实际上是分开的, 完全可以写出没有对应数据结构的遍历器对象, 或者说用遍历器对象模拟出数据结构.下面是一个无限运行的遍历器对象的例子. */
var it = idMaker();
it.next().value // '0'
it.next().value // '1'
it.next().value // '2'
// ...
function idMaker() {
    var index = 0;
    return {
        next: function () {
            return {value: index++, done: false};
        }
    };
}

// 上面的例子中, 遍历器生成函数IDMaker返回一个遍历器对象 (即指针对象). 但是并没有对应的数据结构, 或者说, 遍历器对象自己描述了一个数据结构.
// 如果使用TypeScript的写法, 遍历器接口(Iterable)、指针对象(Iterator) 和 next方法返回值的规格可以描述如下.
/* interface Iterable {
    [Symbol.iterator]() : Iterator,
}
interface Iterator {
    next(value?:any) : IteratorResult,
}
interface IterationResult {
    value: any,
    done: boolean,
} */
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-18 15:41:13 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-21 10:23:38
 */


/* Iterator接口的目的是为所有数据结构提供一种统一的访问机制, 即for...of循环. 当使用 for...of循环遍历某种数据结构时, 该循环会自动去寻找Iterator接口.
   数据结构只要部署了Iterator接口, 我们就称这种数据结构为 "可遍历" (iterable) 的.
   ES6规定, 默认的Iterator接口部署在数据结构的 Symbol.iterator属性, 或者说, 一个数据结构只要具有Symbol.iterator属性, 就可以认为是 "可遍历的" (iterable). 调用
   Symbol.iterator方法, 我们就会得到当前数据结构默认的遍历器生成函数.
   Symbol.iterator本身是一个表达式, 返回Symbol对象的iterator属性, 这是一个预定义好的、类型为Symbol的特殊值, 所以要放在括号中.
*/
const obj = {
    [Symbol.iterator]: function () {
        return {
            next: function () {
                return {
                    value: 1,
                    done: true
                };
            }
        };
    }
};

/* 上面的代码中, 对象obj是可遍历的(iterable), 因为其具有Symbol.iterator属性.执行这个属性会返回一个遍历器对象.该对象的根本特征就是具有next方法. 每次调用next方法都会返回一个代表当前成员信息对象, 具有value和done两个属性.
    ES6的有些数据结构原生具备Iterator接口(比如数组), 即不用任何处理就可以被for...of循环遍历. 原因在于, 这些数据结构原生部署了Symbol.Iterator属性, 另外一些数据结构没有(比如对象).
    所有部署了Symbol.iterator属性的数据结构都成为部署了遍历器接口. 调用这个接口就会返回一个遍历器对象.
    原生具备Iterator接口的数据结构如下.
    · Array
    · Map
    · Set
    · String
    · TypedArray
    · 函数的arguments对象
    · NodeList对象
    下面的例子是数组的Symbol.Iterator属性.
*/
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next() // {value: 'a', done: false}
iter.next() // {value: 'b', done: false}
iter.next() // {value: 'c', done: false}
iter.next() // {value: undefined, done: true}

/* 上面的代码中, 变量arr是一个数组, 其原生具有遍历器接口, 部署在arr的Symbol.iterator属性上. 所以, 调用这个属性就会得到遍历器对象.
    对于原生部署Iterator接口的数据结构, 我们不用自己编写遍历器生成函数, for...of循环会自动遍历它们.除此之外,其他数据结构(主要是对象)的Iterator接口都需要自己在Symbol.iterator属性上面部署, 这样才会被for...of循环遍历.
    对象(Object) 之所以没有默认部署Iterator接口, 是因为对象属性的遍历先后顺序是不确定的, 需要开发者手动指定. 本质上, 遍历器是一种线性处理, 对于任何非线性的数据结构, 部署遍历器接口就等于部署一种线性转换. 不过, 严格地说, 对象部署遍历器接口并不是很必要,
    因为这时对象实际上被当做Map结构使用, ES5没有Map结构, 而ES6原生提供了.
    一个对象如果要具备可悲for..of循环调用的Iterator接口, 就必须在Symbol.Iterator的属性上部署遍历器生成方法(原型链上的对象具有该方法也可).
     */
class RangeIterator {
    constructor(start, stop) {
            this.value = start;
            this.stop = stop;
        }
        [Symbol.iterator]() {
            return this;
        }
    next() {
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return {
                done: false,
                value: value
            };
        }
        return {
            done: true,
            value: undefined
        };
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
    console.log(value);
}

/* 0
1
2 */

// 上面的代码是一个类部署Iterator接口的写法. Symbol.iterator属性对象一个函数,执行后返回当前对象的遍历器对象.
// 下面是通过遍历器实现指针结构的例子.
function Obj(value) {
    this.value = value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
    var iterator = {
        next: next
    };
    var current = this;

    function next() {
        if (current) {
            var value = current.value;
            current = current.next;
            return {
                done: false,
                value: value
            };
        } else {
            return {
                done: true
            };
        }
    }
    return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;
for (var i of one) {
    console.log(i);
    // 1, 2, 3
}

// 下面的代码首先在构造函数的原型链上部署Symbol.iterator方法, 调用该方法会返回遍历器对象iterator, 调用该对象的next方法, 在返回一个值的同时自动将内部指针移到下一个实例.
// 下面是另一个为对象添加Iterator接口的实例.
let obj = {
    data: ['hello', 'world'],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        };
    }
};

// 对于类似数组的对象 (存在数值键名和length属性), 部署Iterator接口有一个简便方法, 即使用Symbol.iterator方法直接引用数组的Iterator接口.
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
[...document.querySelectorAll('div')] // 可执行
// NodeList对象是类似数组的对象, 本来就具有遍历接口, 可以直接遍历. 上面的代码中, 我们将它的便利借口改成数组的Symbol.iterator属性, 没有任何影响.
// 下面是另一个类似数组的对象调用数组的Symbol.iterator方法的例子.
let iterator = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item);
    // 'a', 'b', 'c'
}

// 注意, 普通对象部署数组的Symbol.iterator方法并无效果.
let iterable = {
    a: 'a',
    b: 'b',
    c: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

for (let item of iterable) {
    console.log(item);
    /*  undefined
        ndefined
        undefined */
}
// 如果Symbol.iterator方法对应的不是遍历器生成函数(即会返回一个遍历器对象), 解释引擎将报错.
var obj = {};
obj[Symbol.iterator] = () => 1;
[...obj] // TypeError: Result of the Symbol.iterator method is not an object
// 上面的代码中, 变量obj的Symbol.iterator方法对应的不是遍历器生成函数, 因此报错.
// 有了遍历器接口, 数据结构就可以使用for...of循环遍历, 也可以使用while循环遍历.
var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
    var x = $result.value;
    // ...
    $result = $iterator.next();
}
// 上面的代码中, ITERABLE代表某种可遍历的数据结构, $iterator是它的遍历器对象. 遍历器对象每次移动指针(next方法)都检查一下返回值的done属性, 如果遍历尚未结束, 就移动遍历器对象的指针到下一步(next方法), 不断循环.
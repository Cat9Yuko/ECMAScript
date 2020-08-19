/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-19 10:04:22 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-19 10:17:45
 */



//  观察者模式(Observer mode)指的是函数自动观察数据对象的模式, 一旦对象有变化, 函数就会自动执行.
const person = observable({
    name: '张三',
    age: 20
});

function print() {
    console.log(`${person.name}, ${person.age}`)
}

observable(print);
person.name = '李四';

// 输出
// 李四, 20

// 上面的代码中, 数据对象person是观察目标, 函数print是观察者. 一旦数据对象发生变化, print就会自动执行.

// 下面使用Proxy编写一个观察者模式的最简单实现, 即实现observable和observe这两个函数. 思路是, observable函数返回一个原始对象的Prox代理, 拦截赋值操作, 触发充当观察者的各个函数.
const queuedObservers = new Set();
const observe = fn =>queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}

// 上面的代码先定义了一个Set集合, 所有观察者函数都放进这个集合中. 然后, observable函数返回原始对象的代理, 拦截赋值操作. 拦截函数set会自动执行所有观察者.
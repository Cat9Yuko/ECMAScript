/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-22 11:31:51 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-22 13:55:15
 */



//  for...of循环可以自动遍历Generator函数生成的Iterator对象, 且此时不再需要调用next方法.
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for (let v of foo()) {
    console.log(v);
}
// 1 2 3 4 5

// 上面的代码使用for...of循环依次显示5条yield语句的值.
/* 注意!
    一旦next方法的返回对象的done属性为true, for...of循环就会终止, 且不包含该返回对象, 所以上面的return语句返回的6不包括在for...of循环中.
    下面是一个利用Generator函数和for...of循环实现斐波那契数列的例子. */
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for(;;) {
        [prev,curr] = [curr, prev + curr];
        yield curr;
    }
}

for(let n of fibonacci()) {
    if(n > 1000) break;
    console.log(n);
}
/* 1
2
3
5
8
13
21
34
55
89
144
233
377
610
987 */
// 由此可见, 使用for...of语句时不需要使用next方法.
// 利用for...of循环, 可以写出遍历任意对象(object)的方法. 原生的JavaScript对象没有遍历接口, 无法使用for...of循环, 通过Generator函数为它叫上这个接口后就可以用了.

function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for(let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
let jane = {first: 'Jane', last: 'Doe'};

for(let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

// 上面的代码中, 对象jane原生不具备Iterator接口, 无法用for...of遍历. 这时, 我们通过Generator函数objectEntries为它加上遍历器接口, 这样就可以用for...of遍历了.
// 加上遍历器接口的另一种写法是, 将Generator函数加到对象的Symbol.iterator属性上.
function* objectEntries() {
    let propKeys = Object.keys(this);

    for(let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}
let jane = {first: 'Jane', last: 'Doe'};
jane[Symbol.iterator] = objectEntries;

for(let [key,value] of jane) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

// 除了for...of循环, 扩展运算符(...)、结构赋值和Array.from方法内部调用的都是遍历器接口. 这意味着, 它们都可以将Generator函数返回的Iterator对象作为参数.
function* numbers() {
    yield 1
    yield 2
    yield 3
    return 3
    yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of循环
for(let n of numbers()) {
    console.log(n);
}

// 1
// 2
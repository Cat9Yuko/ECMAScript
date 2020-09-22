/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-22 09:04:49 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-22 10:28:24
 */



/* 由于Generator函数返回的遍历器对象只有调用next方法才会遍历下一个内部状态, 所以其实提供一种可以暂停执行的函数.yield语句就是暂停标志.
   遍历器对象的next方法的运行逻辑如下.
   1.遇到yield语句就暂停执行后面的操作, 并将紧跟在yield后的表达式的值作为返回的对象value属性值.
   2.下一次调用next方法时再继续往下执行, 直到遇到下一条yield语句.
   3.如果没有再遇到新的yield语句,就一直运行到函数结束, 直到return语句为止, 并将return语句后面的表达式的值作为返回对象的value属性值.
   4.如果该函数没有return语句, 则返回对象的value属性为undefined.
   注意!
       只有调用next方法且内部指针指向该语句时才会执行yield语句后面的表达式, 因此等于为JavaScript提供了手动的 "惰性求值"(Lazy Evaluation)的语法功能. */
function* gen() {
    yield 123 + 456;
}
// 上面的代码中, yield后面的表达式123 + 456不会立即求值, 只会在next方法将指针移到这一句时才求值.

/* yield语句与return语句既有相似之处, 又有区别.相似之处在于都能返回紧跟在语句后面的表达式的值.区别在于每次遇到yield函数暂停执行, 下一次会从
该位置继续向后执行, 而return语句不具备位置记忆的工程. 一个函数里面只能执行一次(或者说有一条) return语句, 但是可以执行多次 (或者说多条) yield语句.
正常函数只能返回一个值, 因为只能执行一次return语句; Generator函数可以返回一系列的值, 因为可以有任意多条yield语句从另一个角度看,
也可以说Generator生成了一些列的值, 也就是其名称的来历(在英语中, "generator"这个词是 "生成器" 的意思).
Generator函数可以不用yield语句, 这时就变成了一个单纯的暂缓执行函数. */

function* f() {
    console.log('执行了!')
}

var generator = f();
setTimeout(function () {
    generator.next()
}, 2000);

// 上面的代码中, 函数f如果是普通函数, 在为变量generator赋值时就会执行. 但是函数f是一个Generator函数, 于是就变成只有调用next方法时才会执行.
// 另外需要注意, yield表达式只能用在Generator函数里面, 用在其他地方都会报错.
(function () {
    yield 1;
})()
// SyntaxError: Unexpected number
// 上面的代码在一个普通函数中使用yield语句, 结果产生一个句法错误.
// 下面是另外一个例子.
var arr = [1, [
        [2, 3], 4
    ],
    [5, 6]
];
var flat = function* (a) {
    a.forEach(function (item) {
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    });
};
for (var f of flat(arr)) {
    console.log(f);
}
// 上面的代码也会产生句法错误, 因为forEach方法的参数是一个普通函数, 但是在里面使用了yield表达式(这个函数里面还使用了yield*表达式).一种修改方法是改用for循环.
var arr = [1, [
        [2, 3], 4
    ],
    [5, 6]
];
var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    }
};

for(var f of flat(arr)) {
    console.log(f);
}
// 1, 2, 3, 4, 5, 6
// 另外, yield表达式如果用在另一个表达式之中, 必须放在圆括号里面.
function* demo() {
    // console.log('Hello' + yield);    // 报错
    // console.log('Hello' + yield 123); // 报错

    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
}
// yield表达式用作函数参数或放在赋值表达式的左右, 可以不加括号.
function* demo() {
    foo(yield 'a', yield 'b');
    let input = yield;
}
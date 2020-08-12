/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 09:03:44 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-10 11:10:44
 */

//  箭头函数有以下几个使用注意事项.
/*  1. 函数体内的this对象就是定义时所在的对象, 而不是使用时所在的对象.
    2. 不可以当作构造函数. 也就是说, 不可以使用new命令, 否则会抛出一个错误.
    3. 不可以使用arguments对象, 该对象在函数体内不存在. 如果使用, 可以用rest参数代替.
    4. 不可以使用yield命令, 因此箭头函数不能用作Generator函数.
 */

// 其中, 第一点尤其值得注意. this对象的指向是可变的, 但在箭头函数中它是固定的.
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    },100);
}

var id = 21;
foo.call({id: 42});
// id: 42

// 上面的代码中, setTimeout的参数是一个箭头函数, 这个箭头函数的定义是在foo函数生成时生效的, 而它真正执行要等到100ms后. 如果是普通函数, 执行时this应该指向全局对象window, 这时应该输出21. 但是, 箭头函数导致this总是指向函数定义生效时所在的对象(本例是{id: 42}), 所以输出的是42.
// 箭头函数可以让setTimeout里面的this绑定定义时所在的作用域, 而不是指向运行时所在的作用域. 下面是另一个例子.
function Timer () {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function(){
        this.s2++;
    },1000);
}

var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1:  3
// s2:  0

// 上面的代码中, Timer函数内部设置了两个定时器, 分布使用了箭头函数和普通函数. 前者的this绑定定义时所在的作用域(即Timer函数), 后者的this指向运行时所在的作用域(即全局对象). 所以, 3100ms, timer.s1被更新了3次, 而timer.s2一侧都没更新.
// 箭头函数可以让this指向固定化, 这种特性非常有利于封装回调函数.下面是一个例子, DOM事件的回调函数封装在一个对象里面.

var handler = {
    id: '123456',
    init: function() {
        document.addEventListener('click',
            event => this.doSomething(event.type), false);
    },
    doSomething: function(type) {
        console.log('Handling '+ type + ' for '+ this.id);
        
    }
};
// 以上代码的init方法中使用了箭头函数, 这导致箭头函数里面的this总是指向handler对象. 否则, 回调函数执行时, this.doSomething一行会报错, 因为此时this指向document对象.
// this指向的固定化并不是因为箭头函数内部有绑定this的机制, 实际原因是箭头函数根本没有自己的this, 导致内部的this就是外层代码块的this, 正是因为它没有this, 所以不能用作构造函数.

// 箭头函数转成ES5的代码如下.
// ES6
function foo() {
    setTimeout(() => {
        console.log('id: ', this.id);
    }, 100);
}

// ES5
function foo()  {
    var _this = this;
    setTimeout(function() {
        console.log('id: ', _this.id);
    }, 100);
}

// 上面的代码中, 转换后的ES5版本清除说明了箭头函数里面根本没有自己的this, 而是引用外层的this.
// 请问下面的代码之中有几个this?
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id: ', this.id);
            };
        };
    };
}

var f = foo.call({id: 1});
var t1 = f.call({id: 2})()();
var t2 = f().call({id: 3})();
var t3 = f()().call({id: 4});
/* 
    id:  1
    id:  1
    id:  1
 */

// 上面的代码中只有一个this, 就是函数foo的this, 所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。
// 除了this，以下3个变量在箭头函数中也是不存在的， 分别指向外层函数的对应变量：arguments、super、和new.target。

function foo() {
    setTimeout(() => {
        console.log('args:', arguments);
    }, 100);
}

foo(2,4,6,8);
// args: [Arguments] { '0': 2, '1': 4, '2': 6, '3': 8 }

// 上面的代码中, 箭头函数内部的变量arguments其实是函数foo的arguments变量.
// 另外, 由于箭头函数没有自己的this, 当然也就不能用call()、apply()、bind()这些方法去改变this的指向.
(function() {
    return [
        (() => this.x).bind({x: 'inner'})()
    ];
}).call({x: 'outer'});
// [ 'outer' ]
// 上面的代码中, 箭头函数没有自己的this, 所以bind方法无效, 内部的this指向外部的this.
// 长期以来, JavaScript语言的this对象一直是一个令人头痛的问题, 在对象方法中使用this必须非常小心. 箭头函数 "绑定" this, 很大程度上解决了整个困扰.
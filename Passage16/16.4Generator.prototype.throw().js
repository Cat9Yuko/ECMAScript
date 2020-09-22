/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-22 13:56:18 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-22 15:46:44
 */



//  Generator函数返回的遍历器对象都有一个throw方法, 可以在函数体外抛出错误, 然后在Generator函数体内捕获.
var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log('内部捕获', e);
    }
};
var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
} catch (e) {
    console.log('外部捕获', e);
}

// 内部捕获 a
// 外部捕获 b

// 上面的代码中, 遍历器对象i连续抛出两个错误. 第一个错误被Generator函数体内的catch语句捕获. i第二次抛出错误, 由于Generator函数内部的catch语句已经执行过了, 不会再捕捉到这个错误了, 所以这个错误就被抛出了Generator函数体, 被函数体外的catch语句捕获.
// throw方法可以接受一个参数, 该参数会被catch语句接收, 建议抛出Error对象的实例.
var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log(e);
    }
};

var i = g();
i.next();
i.throw(new Error('出错了! '));
// Error: 出错了! 

/* 注意!
    不要混淆遍历器对象的throw方法和全局的throw命令. 上面的错误是用遍历器对象的throw方法抛出的, 而不是用throw命令抛出的. 后者只能被函数体外的catch语句捕获. */
var g = function* () {
    while (true) {
        try {
            yield;
        } catch (e) {
            if (e != 'a') throw e;
            console.log('内部捕获', e);
        }
    }
};
var i = g();
i.next();
try {
    throw new Error('a');
    throw new Error('b');
} catch (e) {
    console.log('外部捕获', e);
}

// 外部捕获 Error: a

// 上面的代码之所以只捕获了a, 是因为函数体外的catch语句块捕获了抛出的a错误后, 就不会再执行try语句块了.
// 如果Generator函数内部没有部署try...catch代码块, 那么throw方法抛出的错误将被外部try...catch代码块捕获.
var g = function* () {
    while (true) {
        yield;
        console.log('内部获取', e);
    }
};
var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
} catch (e) {
    console.log('外部捕获', e);
}

// 外部捕获 a
// 上面的代码中, 遍历器函数g内部没有部署try...catch代码块, 所以抛出的错误直接被外部catch代码块捕获.
// 如果Generator函数内部部署了try...catch代码块, 那么遍历器的throw方法抛出的错误不影响下一次遍历, 否则遍历直接终止.
var gen = function* gen() {
    yield console.log('hello');
    yield console.log('world');
}

var g = gen();
g.next();
// hello
g.throw();
// undefined

// 上面的代码中, g.throw抛出错误以后, 没有任何try...catch代码块可以捕获这个错误, 导致程序报错, 中断执行.
// throw方法被捕获以后会附带执行下一条yield表达式, 即附带执行一次next方法.
var gen = function* gen() {
    try {
        yield console.log('a');
    } catch (e) {
        // ...
    }
    yield console.log('b');
    yield console.log('c');
}

var g = gen();
g.next();
g.throw();
g.next();
// a
// b
// c

/* 上面的代码中, g.throw方法被捕获以后会自动执行一次next方法, 所以打印b. 另外, 也可以看到, 只要Generator函数内部部署了try...catch代码块, 那么遍历器的throw方法抛出的错误便不会影响下一次遍历.
    另外, throw命令与g.throw方法是无关的, 两者互不影响. */
var gen = function* () {
    yield console.log('hello');
    yield console.log('world');
}

var g = gen();
g.next();
try {
    throw new Error();
} catch (e) {
    g.next();
}

// hello
// world

// 上面的代码中, throw命令抛出的错误不会影响到遍历器的状态, 所以两次执行next方法都完成乐正确的操作.
/* 这种函数体内捕获错误的机制大大方便了对错误的处理. 对于多个yield表达式, 可以只用一个try...catch代码块来捕获错误. 如果使用回调函数的写法
想要捕获多个错误, 就不得不每个函数写一个错误处理语句, 而现在只在Generator函数内部写一次catch语句就可以了.
    Generator函数体外抛出的错误可以在函数体内捕获;反过来, Generator函数体内抛出的错误也可以被函数体外的catch捕获. */
function* foo() {
    var x = yield 3;
    var y = x.toUpperCase();
    yield y;
}
var it = foo();

it.next(); // { value: 3, done: false }

try {
    it.next(42);
} catch (err) {
    console.log(err);
}

// 上面的代码中, 第二个next方法向函数体内传入一个参数42, 数值是没有toUpperCase方法, 所以会抛出一个TypeError错误, 被函数体外的catch捕获.
// 一旦Generator执行过程中抛出错误, 就不会再执行下去了. 如果此后还调用next方法, 将返回一个value属性等于undefined、done属性等于true的对象,即JavaScript引擎认为这个Generator已经运行结束.
function* g() {
    yield 1;
    console.log('throwing an exception');
    throw new Error('generator broke!');
    yield 2;
    yield 3;
}

function log(generator) {
    var v;
    console.log('starting generator');
    try {
        v = generator.next();
        console.log('第一次运行next方法', v);
    } catch (err) {
        console.log('捕获错误', v);
    }
    try {
        v = generator.next();
        console.log('第二次运行next方法',v);
    } catch(err) {
        console.log('捕获错误', v);
    }
    try {
        v = generator.next();
        console.log('第三次运行next方法', v);
    } catch (err) {
        console.log('捕捉错误', v);
    }
    console.log('caller done');
}

log(g());
/* starting generator
第一次运行next方法 { value: 1, done: false }
throwing an exception
捕获错误 { value: 1, done: false }
第三次运行next方法 { value: undefined, done: true }
caller done */

// 上面的代码一共运行3次next方法, 第二次运行时会抛出错误, 人后第三次运行时 Generator函数就已结束, 不再执行下去.
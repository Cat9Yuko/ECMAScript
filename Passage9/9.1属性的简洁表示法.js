/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-15 15:21:02 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-07-06 15:54:17
 */


//  ES6允许直接写入变量和函数作为对象的属性和方法. 这样的书写更加简洁.
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}

// 等同于
var baz = {foo: foo};

// 上面的代码表名, ES6允许在对象中只写属性名, 不写属性值. 这时, 属性值等于属性名所代表的变量. 下面是另一个例子.
function f(x, y) { 
    return {x, y};
 }

//  等同于
function f(x, y) {
    return {x: x, y: y};
}
f(1, 2) // Object{x: 1, y: 2}

// 除了属性简写, 方法也可以简写.
var o = {
    method() {
        return "Hello";
    }
};

// 等同于
var o =  {
    method: function () {
        return "Hello";
    }
}
// 下面是一个实际的例子.
var birth = '2000/01/01';

var Person = {
    name: '张三',
    // 等同于birth:birth
    birth,
    // 等同于hello:function()...
    hello() {
        console.log('我的名字是', this.name);
    }
};
// 这种写法用于函数的返回值会非常方便.
function getPoint() {
    var x = 1;
    var y = 10;
    return {x, y};
}
console.log(getPoint());
// { x: 1, y: 10 }

// CommonJS木块输出变量就非常适合使用简洁写法.
var ms = {};
function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}

function clear() {
    ms = {};
}

module.exports = {getItem, setItem, clear};
// 等同于
module.exports = {
    getItem: getItem,
    setItem: setItem,
    clear: clear
};
// 属性的赋值器(setter) 和取值器(getter) 事实上也采用了这种写法.
var cart = {
    _wheels: 4,
    get wheels() {
        return this._wheels;
    },
    set wheels(value) {
        if(value < this._wheels) {
            throw new Error('数值太小了! ');
        }
        this._wheels = value;
    }
}
// 注意, 简洁写法中属性名总是字符串, 这回导致一些看上去比较奇怪的结果.
var obj = {
    class() {}
};

// 等同于
var obj = {
    'class': function () {}
};
// 上面的代码中, class是字符串, 所以不会因为它属于关键字而导致语法解析错误.
// 如果某个方法的值是一个Generator函数, 则其前面需要加上星号.
var obj = {
    *m() {
        yield 'hello world';
    }
}
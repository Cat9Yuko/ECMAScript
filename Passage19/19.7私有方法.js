/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-02 11:23:44 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-02 11:39:13
 */


//  私有方法是常见需求, 但ES6不提供, 只能通过变通方法来模拟实现.
// 一种做法是在命名上加区别.
class Widget {
    // 公有方法
    foo(baz) {
        this._bar(baz);
    }
    // 私有方法
    _bar(baz) {
        return this.snaf = baz;
    }
    // ...
}
// 上面的代码中, _bar方法前面的下画线表示这是一个只限于内部使用的私有方法. 但是, 这种命名是不保险的, 在类的外部依然可以调用这个方法.
// 另一种方法是索性将私有方法移出模块, 因为模块内部的所有方法都是对外可见的.
class widget {
    foo(baz) {
        bar.call(this, baz);
    }
    // ...
}
function bar (baz) {
    return this.snaf = baz;
}

// 上面的代码中, foo是公有方法, 内部调用了bar.call(this, baz).这使得bar实际成为了当前模块的私有方法.
// 还有一种方法是利用Symbol值的唯一性将私有方法的名字命名为一个Symbol值.

const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
    // 公有方法
    foo(baz) {
        this[bar](baz);
    }
    // 私有方法
    [bar](baz) {
        return this[snaf] = baz;
    }
    // ...
};

// 上面的代码, bar和snaf都是Symbol值, 导致第三方无法获取到它们, 因此达到了私有方法和私有属性的效果.
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-10 10:05:21 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-10 11:06:38
 */



//  WeakSet结构与Set类似, 也是不重复的值的集合. 但是会, 它与Set有两个区别.
// 第一, WeakSet的成员只能是对象, 而不能是其他类型的值.
const ws = new WeakSet();
ws.add(1);
// TypeError: Invalid value used in weak set
ws.add(Symbol());
// TypeError: Invalid value used in weak set

/* 
    上面的代码识图向WeakSet添加一个数值Symbol值, 结构报错, 因为WeakSet只能放置对象.
    第二, WeakSet中的对象都是弱引用, 即垃圾回收机制不考虑WeakSet对该对象的引用, 也就是说, 如果其他对象都不再引用该对象, 那么垃圾回收机制会自动回收该对象所占用的内存,
    不考虑该对象是否还存在于WeakSet之中.
    这是因为垃圾回收机制依赖引用计数, 如果一个值的引用次数不为0, 垃圾回收机制就不会释放这块内存. 结束使用该值之后吗有时会忘记取消引用, 导致内存无法释放, 进而可能会
    引发内存泄漏. WeakSet里面的引用都不计入垃圾回收机制, 所以不存在这个问题. 因此, WeakSet适合临时存放一组对象, 以及存放跟对象绑定的信息. 只要这些对象在外部消失, 它在WeakSet里面的引用就会自动消失.
    由于上面这个特点, WeakSet的成员不适合引用的, 因为它会随时消失.另外, WeakSet内部有对少个成员取决于垃圾回收机制又没有运行, 运行前后很可能成员个数是不一样的,而
    垃圾回收机制何时运行是不可预测的, 因此 ES6规定WeakSet不可遍历.
    这些特点同样适用于WeakMap.
*/

// WeakSet是一个构造函数, 可以使用new命令创建WeakSet数据结构.
const ws = new WeakSet();
// 作为构造函数, WeakSet可以接受一个数组或类似数组的对象作为参数. 实际上, 任何具有iterable接口的对象都可以作为WeakSet的参数.该数组的所有成员都会自动成为WeakSet实例对象的成员.
const a = [[1,2], [3, 4]];
const ws = new WeakSet(a);
console.log(ws);
// WeakSet { <items unknown> }

// 上面的代码中, a是一个数组, 它有两个成员, 也都是数组. 将a作为WeakSet构造函数的参数, a的成员会自动成为WeakSet的成员.
/* 
    注意:
        成为WeakSet的成员的是a数组的成员, 而不是a数组本身.这意味着, 数组的成员只能是对象.
*/
const b = [3, 4];
const ws = new WeakSet(b);
// TypeError: Invalid value used in weak set

// 上面的代码中, 数组b的成员不是对象, 因此加入WeakSet就会报错.

// WeakSet结构有以下3个方法.
// WeakSet.prototype.add(value): 向WeakSet实例添加一个新成员.
// WeakSet.prototype.delete(value): 清除WeakSet实例的指定成员.
// WeakSet.prototype.has(value): 返回一个布尔值, 表示某个值是否在WeakSet实例中.

// 下面是一个例子.
const ws = new WeakSet();
const obj = {};
const foo = {};
/* ws.add(window);
ws.add(obj);
ws.has(window); //  true
ws.has(foo); // false

ws.delete(window);
ws.has(window); //  false */

// WeakSet没有size属性, 没有办法遍历器成员.

console.log(ws.size); // undefined
ws.forEach // undefined

ws.forEach(function(item){console.log('WeakSet has '+ item);})
// TypeError: ws.forEach is not a function

// 上面的代码识图获取size和forEach属性, 结果都不能成功.
// WeakSet不能遍历, 因为成员都是弱引用, 随时可能消失, 遍历机制无法保证成员存在, 很可能感刚刚遍历结束, 成员就取不到了. WeakSet的一个用处是储存DOM节点, 而不用担心这些节点从文档移除时会引发内存泄漏.
const foos = new WeakSet()
class Foo {
    constructor() {
        foo.add(this)
    }
    method () {
        if(!foos.has(this)){
            throw new TypeError('foo.prototype.method 只能在Foo的实例上调用! ');
        }
    }
}

// 上面的代码保证了Foo的实例方法只能在Foo的实例上调用. 这里使用WeakSet的好处是, 数组foos对实例的引用不会被计入内存回收机制, 所以删除实例的时候不用考虑foos, 也不会出现内存泄漏.

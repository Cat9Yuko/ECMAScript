/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-12 14:44:54 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-12 15:36:09
 */


//  WeakMap结构与Map结构类似, 也用于生成键值对的集合.
// WeakMap可以使用set方法添加成员
const wml = new WeakMap();
const key = {foo: 1};
wml.set(key, 2);
console.log(wml.get(key)); // 2

// WeakMap也可以接受一个数组, 组委构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[kl, 'foo'],[k2, 'bar']]);
wm2.get(k2) // "bar"
// WeakMap 与Map的区别有以下两点.
// 第一, WeakMap只接受对象作为键名(null除外), 不接受其他类型的值作为键名.
const map = new WeakMap();
map.set(1, 2)
// TypeError: Invalid value used as weak map key
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2);
// TypeError: Invalid value used as weak map key

// 上面的代码中, 如果将数值1和Symbol值作为WeakMap的键名, 都会报错.
// 第二, WeakMap的键名所指向的对象不计入垃圾回收机制.
// WeakMap的设计目的在于, 有时我们想在某个对象上面存放一些数据, 但是这回形成对这个对象的引用. 请看下面的例子.

const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
    [e1, 'foo元素'],
    [e2, 'bar元素'],
];

// 上面的代码中, e1和e2是两个对象, 我们通过arr数组对这两个对象添加一些文字说明, 这就形成了arr对e1和e2的引用.
// 一旦不再需要这两个对象, 我们必须手动删除这个引用 否则垃圾回收机制就不会释放e1和e2占用的内存.
// 不需要e1和e2的时候
// 必须手动删除引用
arr[0] = null;
arr[1] = null;

// 上面这样的写法显然很不方便. 一旦忘了写, 就会造成内存泄漏.
/* 
    WeakMap就是为了解决这个问题而诞生的, 它的键名所引用的对象都是弱引用, 即垃圾回收机制不将该引用考虑在内. 因此, 只要所引用的对象的其他引用都被清除, 垃圾回收机制就会释放该对象
    所占用的内存. 也就是说, 一旦不再需要, WeakMap里面的键名对象和所对应的键值对会自动消失, 不用手动删除引用. 基本上, 如果要向对象中添加数据不想干扰垃圾回收机制, 便可以使用
    WeakMap. 一个典型应用场景是, 在网页的DOM元素上添加数据时就可以使用WeakMap结构.当该DOM元素被清除, 其所对应的WeakMap记录就会自动被移除.
*/
const wm = new WeakMap();
const element = document.getElementById('example');
wm.set(element, 'some information');
wm.get(element) // "some information"

/* 
    上面的代码中首先新建了一个WeakMap实例, 然后一个DOM节点作为键名存入该实例, 并将一些附加信息作为键值一起存放在WeakMap里面. 这时, WeakMap里面对element的引用就是如引用, 不会被计入垃圾回收机制.
    上面的DOM节点对象的引用计数是1, 而不是2. 这时, 一旦消除对该节点的引用, 它占用的内存就会被垃圾回收机制释放. WeakMap保存的这个键值对也会自动消失.
    总之, WeakMap的专用场景就是它的键所对应的对象可能会在将来消失的场景. WeakMap结构有助于防止内存泄漏.
*/

const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(keym, obj)
obj = null;
wm.get(key)
// Object {foo: 1}
// 上面的代码中, 键值obj是正常引用的. 所以, 即使在WeakMap外部消除了obj的引用, WeakMap内部的引用依然存在.
/* 
    注意!
        WeakMap弱引用的只是键名而不是键值. 键值依然是正常引用的.
*/
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-10 11:07:42 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-11 15:45:59
 */


//  JavaScript的对象(Object) 本质上是键值对的集合 (Hash结构), 但是只能用字符串作为键. 这给它的使用带来了很大的限制.
const data = {};
const element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
// 上面的代码愿意是将一个DOM节点作为对象data的键, 但是由于对象只接受字符串作为键名 所以element被自动转为字符串 [Object HTMLDivElement].

// 为了解决这个问题ES6提供了Map数据结构. 它类似于对象, 也是键值对的集合, 但是 "键" 的范围不限于字符串, 各种类型的值 (包括对象) 都可以当做键. 也就是说, Object结构提供了 "字符串一值" 的对应, Map结构提供了 "值一值" 的对应, 是一种更完善的Hash结构. 如果需要 "键值对" 的数据结构, Map比Object更合适.
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content');
console.log(m.get(o));
// content
m.has(o); // true
m.delete(o) // true
m.has(o) //  false

// 上面的代码Map结构的set方法, 将对象o当作m的一个键, 然后又使用get方法读取这个键, 接着使用delete方法删除了这个键.
// 上面的例子展示了如何向Map添加成员. 作为构造函数, Map也可以接受一个数组作为参数. 该数组的成员是一个个表示键值对的数组.

const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title')
map.get('title')

// 上面的代码在新建Map实例时就指定了两个键————name和title.
// Map构造函数接受数组作为参数, 实际上执行的是下面的算法.

const itmes = [
    ['name', '张三'],
    ['title', 'Author']
];
const map = new Map();
itmes.forEach(
    ([key, value]) => map.get(key, value)
);
// 事实上, 不仅仅是数组, 任何具有Iterator接口且每个成员都是一个双元素数组的数据结构都可以当做Map构造函数的参数. 也就是说, Set和Map都可以用来生成新的Map.

const set = new Set([
    ['foo', 1],
    ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3

// 上面的代码中, 我们分别使用Set对象和Map对象当作Map构造函数的参数, 结果都生成了新的Map对象.
// 如果对同一个键多次赋值, 后面的值将覆盖前面的值.
const map = new Map();
map.set(1, 'aaa').set(1, 'bbb');

map.get(1) // "bbb"

// 上面的代码对键1连续赋值两次, 后一次的值覆盖了前一次的值.
// 如果读取一个未知的键, 则返回undefined

new Map().get('asdasdasd');
// undefined

/* 
    注意
    只有对同一个的引用, Map结构才将其视为同一个键. 这一点要非常小心.
*/

const map = new Map();
map.set(['a', 555]);
map.get(['a']) // undefined

//   上面的set个get方法表面上是针对同一个键, 实际上却是两个值, 内存地址不一样, 因此get方法无法读取该键, 返回undefined.

const map = new Map();
const k1 = ['a'];
const k2 = ['a'];

map.set(k1, 111).set(k2, 222);

console.log(map.get(k1)); // 111
console.log(map.get(k2)); // 222

// 上面的代码中, 变量k1和k2的值是一样的, 但它们在Map结构中被视为两个键.
// 由上可知, Map的键实际上是和内存地址绑定的, 只要内存地址不一样, 就视为两个键.这就解决了同名属性碰撞(clash) 的问题, 我们扩展别人的库时, 如果使用对象作为键名, 不用担心自己的属性与原作者的属性同名.
// 如果Map的键是一个简单类型的值(数字、字符串、布尔值),则只要两个值严格相等, Map就将其视为一个键, 包括0 和 -0.另外, 虽然NaN不严格等于自身, 但Map将其视为同一个键.

let map = new Map();
map.set(-0, 123);
map.get(+0); // 123
map.set(true, 1);
map.set('true', 2);
map.get(true) // 1
map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3
map.set(NaN, 123);
map.get(NaN) // 123
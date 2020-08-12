/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-04 16:42:37 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-04 16:57:07
 */



//  对象的Symbol.species属性指向当前对象的构造函数. 创造实例时默认会调用这个方法, 即使用这个属性返回的函数当作构造函数来创造新的实例对象.
class MyArray extends Array {
    // 覆盖父类Array的构造函数
    static get[Symbol.species]() {return Array;}
}

// 上面的代码中, 子类MyArray继承了父类Array.创建MyArray的实例对象时, 本来会调用它自己的构造函数(本例中被省略了), 但是由于定义Symbol.species属性, 所以会使用这个属性返回的函数来创建MyArray实例.
// 这个例子也说明, 定义Symbol.species属性要采用get读取器. 默认的Symbol.species属性等同于下面的写法.

// static get [Symbol.species] {
//     return this;
// }

class MyArray extends Array {
    static get [Symbol.species]() {return Array;}
}

var a = new MyArray(1, 2, 3);
var mapped = a.map(x => x * x);

mapped instanceof MyArray // false
mapped instanceof Array //  true

// 上面的代码中, 由于构造函数被替换成了Array, 所以, mapped对象不是MyArray的实例, 而是Array的实例.
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-04 10:14:24 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-04 10:25:29
 */


//  静态属性指的是Class本身的属性, 即Class.propname, 而不是定义在实例对象(this)上的属性.
class Foo {}
Foo.prop = 1;
Foo.prop // 1

// 上面的写法可以读/写Foo类的静态属性prop.
// 目前， 只有这种写法可行， 因为ES6明确规定， Class内部只有静态方法， 没有静态属性。
// 以下两种写法都无效
// class Foo {
//     写法一
//     prop: 2
//     写法二
//     static prop: 2
// }
// Foo.prop // undefined
// 目前有一个关于静态属性的提案(github.com/tc39/proposal-class-fields), 其中对实例属性和静态属性都规定了新的写法.
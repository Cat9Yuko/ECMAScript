/*
 * @Author: Cat9Yuko 
 * @Date: 2020-10-30 10:25:45 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-02 11:23:10
 */


//  类不存在变量提升 (hoist), 这一点与ES5完全不同.
new Foo(); // ReferenceError: Cannot access 'Foo' before initialization
class Foo {}

// 上面的代码中, Foo类使用在前, 定义在后, 这样会报错, 因为ES6不会把变量声明提升到代码头部. 这种规定的原因与下文要提到的继承有关, 必须保证子类在父类之后定义.
{
    let Foo = class {};
    class Bar extends Foo {

    }
}
// 上面的代码不会报错, 以为Bar继承Foo的时候, Foo已经有定义了. 但是, 如果存在class的提升, 上面的代码就会报错, 因为class会被提升到代码头部, 而let命令是不提升的, 所以导致Bar继承Foo的时候, Foo还没有定义.
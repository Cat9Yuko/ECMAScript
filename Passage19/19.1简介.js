/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-30 15:15:08 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-30 17:26:06
 */



//  JavaScript语言的传统方法是通过构造函数定义并生成新对象. 下面是一个例子
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);
// 上面这种写法与传统的面向对象语言 (比如C++和Java) 的写法差异很大, 很容易让新学习这门语言的程序员感到困惑.
// ES6提供了更接近传统语言的写法, 引入了Class (类) 这个概念作为对象的模板. 通过class关键字可以定义类.
// 基本上, ES6中的class可以看作只是一个语法糖, 它的绝大部分功能, ES5都可以做到, 新的class写法只是让对象原型的写法更加清晰, 更像面向对象编程的语法而已. 
// 上面的代码用ES6 "类" 改写, 就是下面这样.
// 定义类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
// 上面的代码定义了一个 "类", 可以看到里面有一个constructor方法, 这就是构造方法, 而this关键字则代表实例对象. 也就是说, ES5的构造函数Point对应ES6的Point类的构造方法.
// Point类除了构造方法, 还定义了一个toString方法.
/* 注意!
    定义 "类" 的方法时, 前面不需要加上function这个保留字, 直接把函数定义放进去就可以了. 另外, 方法之间不需要逗号分隔, 加了会报错 */

// ES6的类完全可以看作构造函数的另一种写法.
class Point {
    // ...
}
typeof Point 
Point === Point.prototype.constructor
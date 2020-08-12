/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-06 11:15:38 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 11:19:36
 */



//  对象的Symbol.search属性指向一个方法, 当对象被String.prototype.search方法调用时会返回该方法的值.
String.prototype.search(regexp);
// 等同于

regexp[Symbol.search](this)
class MySearch {
    constructor(value) {
        this.value = value;
    }
    [Symbol.search](string) {
        return string.indexOf(this.value);
    }
}
console.log('foobar'.search(new MySearch('foo')));// 0
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-04 16:57:25 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 09:31:13
 */


//  对象的Symbol.match属性指向一个函数, 当执行str.match(MyObject)时, 如果该属性存在, 会调用它返回该方法的返回值.

String.prototype.match(regexp);
// 等同于
regexp[Symbol.match](this);
class MyMatcher {
    [Symbol.match](string) {
        return 'hello world'.indexOf(string);
    }
}
console.log('e'.match(new MyMatcher()));
// 1
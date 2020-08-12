/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-06 11:22:39 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-06 11:32:35
 */



//  对象的Symbol.split属性指向一个方法, 当对象被String.prototype.split方法调用时会返回该方法的返回值.
String.prototype.split(separator, limit);
// 等同于
separator[Symbol.split](this, limit);

// 下面是一个例子
class MySplitter {
    constructor(value) {
        this.value = value;
    }
    [Symbol.split](string) {
        var index = string.indexOf(this.value);
        if(index === -1) {
            return string;
        }
        return [
            string.substr(0, index),
            string.substr(index + this.value.length)
        ];
    }
}

'foobar'.split(new MySplitter('foo'))
// ['','bar']

'foobar'.split(new MySplitter('bar'))
// ['foo', '']

'foobar'.split(new MySplitter('baz'))
// 'foobar'

// 上面的代码使用Symbol.split方法, 重新定义了字符串对象的split方法的行为.
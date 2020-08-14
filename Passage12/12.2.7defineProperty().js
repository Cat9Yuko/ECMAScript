/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-14 09:51:38 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 09:59:12
 */



//  defineProperty方法拦截了Object.defineProperty操作.

var handler = {
    defineProperty(target, key, descriptor){
        return false;
    }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar'

// 上面的代码中, defineProperty方法返回false, 导致添加新属性会抛出错误.

/* 
    注意!
        如果目标对象不可扩展(extensible), 则defineProperty不能增加目标对象中不存在的属性, 否则会报错. 另外, 如果目标对象的某个属性不可写(writable)
        或不可配置(configurable), 则defineProperty方法不得改变这两个设置.
*/

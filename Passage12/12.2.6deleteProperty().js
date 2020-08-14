/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-13 18:26:38 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-14 09:50:37
 */


//  deleteProperty方法用于拦截delete操作, 如果这个方法抛出错误或者返回false, 当前属性就无法被delete命令删除.

var handler = {
    deleteProperty(target, key) {
        invariant(key, 'delete');
        return true;
    }
};
function invariant(key, action) {
    if(key[0] === '_'){
        throw new Error(`Invalid attemp to ${action} private "${key}" property`);
    }
}
var target = { _prop: 'foo'};
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attemp to delete private "_prop" property

// 上面的代码中, deleteProperty方法拦截了delete操作符, 删除第一个字符为下画线的属性会报错.

/* 
    注意!
        目标对象自身的不可配置(configurable) 的属性不能被deleteProperty方法删除, 否则会报错.
        
*/
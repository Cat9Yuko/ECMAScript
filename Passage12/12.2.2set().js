/*
 * @Author: Cat9Yuko 
 * @Date: 2020-08-13 14:49:03 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-08-13 15:08:53
 */



//  set方法用于拦截某个属性的赋值操作.
// 假定Person对象有一个age属性, 该属性应该是一个不大于200的整数, 那么可以使用Proxy对象保证age的属性值复合要求.
let validator = {
    set: function(obj, prop, value) {
        if(prop === 'age') {
            if(!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if(value > 200) {
                throw new RangeError('The age seems invalid~~~~');
            }
        }
        // 对于age以外的属性, 直接保存
        obj[prop] = value;
    }
};
let person = new Proxy({}, validator);

console.log(person.age = 100); // 100
// person.age = 'young'; // TypeError: The age is not an integer
// person.age = 300; // The age seems invalid~~~~

/* 
    上面的代码中, 由于设置了存值函数set, 任何不符合要求的age属性赋值都会抛出一个错误, 这是数据验证的一种实现方法. 利用set方法还可以实现数据绑定, 即每当对象发生变化时, 会自动更新DOM.
    
    有时, 我们会在对象上设置内部属性, 属性名的第一个字符使用下画线开头, 表示这些属性不应该被外部使用. 结合get和set方法, 就可以做到防止这些内部属性被外部读/写.
*/
var handler = {
    get(target, key) {
        invariant(key, 'get');
        return target[key];
    },
    set(target, key, value) {
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
};
function invariant(key, action) {
    if(key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}

var target = {};
var proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property

// 上面的代码中, 只要读/写的属性名的第一个字符是下画线, 一律抛出错误, 从而达到禁止读/写内部属性的目的
/* 
    注意!
        如果目标对象自身的某个属性不可写也不可配置, 那么set不得改变这个属性的值, 只能返回同样的值, 否则报错.
*/
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-03 14:13:17 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-04 09:45:19
 */


//  与ES5一样, 在 "类" 的内部可以使用get和set关键字对某个属性设置存值函数和取值函数, 拦截该属性的存值行为.
class MyClass {
    constructor(){
        // ...
    }
    get prop(){

    }
    set prop(value) {
        console.log('setter' + value);
    }
}

let inst = new MyClass();
console.log(inst.prop = 123);
console.log(inst.prop);

// 上面的代码中, prop属性有对应的存值函数和取值函数, 因此赋值和读取行为都被自定义了.存值函数和取值函数是设置在属性Descriptor对象上的.
class CustomHTMLElement {
    constructor(element) {
        this.element =element;
    }
    get html(){
        return this.element.innerHTML;
    }
    set html(value){
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html"
);
console.log("get" in descriptor); // true
console.log("set" in descriptor); // true
// 上面的代码中, 存值函数和取值函数是定义在html属性的描述对象上面, 这与ES5完全一致.
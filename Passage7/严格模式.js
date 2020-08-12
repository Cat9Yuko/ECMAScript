// 严格模式
/* 从ES5开始, 函数内部可以设定为严格模式 */
function doSomething(a, b) {
    'use strict';
    // code
}

// ES2016做了一点修改,规定只要函数参数使用了默认值,解构赋值或者扩展运算符, name函数内部就不能显示设定为严格模式,否则就会报错

// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
function doSomething(a, b = a) {
    'use strict';
    // code
}

// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
const doSomething = function ({a, b}) { 
    'use strict';
    // code
 }

//  SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
 const doSomething = (...a) => {
     'use strict';
    //  code
 }

//  SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
const obj = {
    doSomething({a, b}) {
        'use strict';
        // code
    }
}

/* 这样规定的原因是, 函数内部的严格模式同时适用于函数体和函数参数;但是, 函数执行时, 先执行函数参数, 然后再执行函数体;
    这样就有一个不合理的地方: 只有从函数体之中才能知道参数是否应该以严格模式执行, 但是参数却应该先于函数体执行;
*/

// 有两种方法可以规避这种限制
// 第一种是设定全局性的严格模式, 这是合法的
'use strict';
function doSomething(a, b = a) {
    // code
}

// 第二种是把函数包在一个无参数的立即执行函数里面
const doSomething = (function () { 
    'use strict';
    return function (value = 42) { 
        return value;
     };
 }());
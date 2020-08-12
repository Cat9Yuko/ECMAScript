/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-09 15:38:23 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-09 17:04:44
 */


//  从ES5开始, 函数内部可以设定为严格模式.
function doSomething(a,b) {
    'use strict';
    // code
}
// ES2016做了一点修改, 规定只要函数参数使用了默认值、解构赋值或者扩展运算符， 那么函数内部就不能显示设定为严格模式, 否则就会报错.

// 报错
function doSomething(a,b = a) {
    'use strict';
    // code
}
// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list

// 报错
const doSomething = function({a,b}) {
    'use strict';
    // code
}
// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list

// 报错
const doSomething = (...a) => {
    'use strict';
    // code
};
// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list

const obj = {
    // 报错
    doSomething({a,b}) {
        'use strict';
        // code
    }
}
// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list

/* 这样规定的原因是, 函数内部的严格模式同时适用于函数体和函数参数. 但是, 函数执行时, 先执行函数参数, 然后再执行函数体. 这样就有一个不合理的地方: 只有从函数体之中才能知道参数是否应该以严格模式执行, 但是参数却应该先于函数体执行. */

// 报错
function doSomething(value = 070) {
    'use strict';
    return value;
}

/* 上面的代码中,参数value的默认值时八进制数070, 但是严格模式下不能用前缀0表示八进制, 所以应该报错. 但是实际上, JavaScript引擎会先成功执行value = 070, 然后进入函数体内部, 发现需要使用严格模式执行时才会报错 */

// 虽然可以先解析函数体代码, 再执行参数代码, 但是这样无疑增加了复杂性. 因此, 标准索性禁止了这种方法, 只要参数使用了默认值、解构赋值、扩展运算符， 就不能显示指定严格模式。

// 有两种方法可以规避这种限制. 第一种是设定全局性的严格模式, 这是合法的.
'use strict';
function doSomething(a,b = a) {
    // code
}
// 第二种是把函数包在一个无参数的立即执行函数里面.
const doSomething = (function () {
    'use strict';
    return function(value = 42){
        return value;
    };
}());
/* 二进制和八进制表示法
二进制: ob(或0B)
八进制: 0o(或0O)
*/

// 如果要将使用0b和0x前缀的字符串数值转为十进制数值, 要使用 Number方法

Number('0b111') //7
Number('0o10') //8

/* Number.isFinite()和Number.isNan()方法 */

// Number.isFinite() 检查一个数值是否为有限的(finite)

Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// ES5可以通过下面的代码部署Number.isFinite方法

(function(global) {
    var global_isFinite = global.isFinite;

    Object.defineProperty(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);

// Number.isNan() 用来检查一个值是否为Nan

Number.isNaN(NaN)   //  true
Number.isNaN(15)    //  false
Number.isNaN('15')  //  false
Number.isNaN(true)  //  false
Number.isNaN(9/NaN) //  true
Number.isNaN('true'/0) //true
Number.isNaN('true'/'true') //true

// ES5通过下面的代码部署Number.isNan()

(function (global) { 
    var global_isNaN = global.isNaN;

    Object.defineProperty(Number, 'isNaN', {
        value: function isNaN(value) {
            return typeof value === 'number' && global_isNaN(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
 })(this);

/* 这两个新方法与传统的全局方法isFinite()和isNaN()的区别在于, 传统方法先调用Number()将非数值转为数值, 再进行判断, 而新方法只对数值有效
对于非数值一律返回false.Number.isNaN()只有对于NaN才返回true,非NaN一律返回false
*/
isFinite(25) //true
isFinite("25") //true
Number.isFinite(25) //true
Number.isFinite("25") //false

isNaN(NaN) //true
isNaN("NaN") //true
Number.isNaN(NaN) //true
Number.isNaN("NaN") //false
Number.isNaN(1) //false

/* Numer.parseInt(), Number.parseFloat() */
/* ES6将全局方法parseInt()和parseFloat()移植到了Numer对象上面,行为完全保持不变 */

// ES5的写法
parseInt('12.34') //12
parseFloat('123.45#') //123.45

// ES6的写法
Number.parseInt('12.34') //12
Number.parseFloat('123.45#') //123.45

// 这样做的目的是逐步减少全局性方法, 使得语言逐步模块化
Number.parseInt === parseInt //true
Number.parseFloat === parseFloat //true

/* Number.isInteger() */
// Number.isInteger()用来判断一个值是否为整数, 在JavaScript内部, 整数和浮点数是同样的储存方法, 所以3和3.0被视为同一个值
Number.isInteger(25) //true
Number.isInteger(25.0) //true
Number.isInteger(25.1) //false
Number.isInteger("15") //false
Number.isInteger(true) //false

// ES5可以通过下面的代码部署Number.isInteger()
(function (global) {
    var floor = Math.floor,
    isFinite = global.isFinite;

    Object.defineProperty(Number,'isInteger',{
        value: function isInteger(value) {
            return typeof value ==='number' &&
            isFinite(value) && floor(value) ===value;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);

/* Number.EPSILON */
// ES6在Number对象上面新增一个极小的常量----Number.EPSILON
Number.EPSILON
// 2.220446049250313e-16

Number.EPSILON.toFixed(20)
// '0.00000000000000022204'

// 引入一个这么小的量, 目的在于为浮点数计算设置一个误差范围, 我们知道浮点数计算是不精确的
// 但是如果这个误差能够小于Numer.EPSOLON, 我们就可以认为得到了正确结果

5.551115123125783e-17  <   Number.EPSILON  
// true
// 因此,Number.EPSILON的实质是一个可以接受的误差范围
// 下面的代码为浮点数运算部署了一个误差检查函数

function withinErrorMargin(left, right) { 
    return Math.abs(left - right) < Number.EPSILON;
 }

 withinErrorMargin(0.1 + 0.2, 0.3)
//  true
withinErrorMargin(0.2+0.2, 0.3)
// false


/* 安全整数和Number.isSafeInteger() */
// JavaScript能够准确表示的整数范围在-2的53次方 - 2的53次方(不含两个端点),超过这个范围就无法精确表示

Math.pow(2, 53) === Math.pow(2, 53) + 1

// true 上面的代码中,超出2的53次方之后, 一个数就不精确了 
// ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER两个常量,用来表示这个范围的上下限

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) -1
// true


// Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内
Number.isSafeInteger('a') //false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) //false
Number.isSafeInteger(Infinity) //false
Number.isSafeInteger(-Infinity) //false


Number.isSafeInteger = function(n) {
    return (typeof n === 'number' &&
        Math.round(n) === n &&
        Number.MIN_SAFE_INTEGER <= n&&
        n <= Number.MAX_SAFE_INTEGER);
}

// 如果只验证运算结果是否为安全整数, 则很可能得到错误结果, 下面的函数可以同时验证两个运算数和运算结果
function trusty(left, right, result) { 
    if(
        Number.isSafeInteger(left) &&
        Number.isSafeInteger(right) &&
        Number.isSafeInteger(result)
    ) {
        return result;
    }
    throw new RangeError('Operation cannot be trusted!');
 }

 trusty(1, 2, 3);

//  3

/* Math对象的扩展 */

// ES6在Math对象上新增了17个与数学相关的方法, 所有方法都是静态方法, 只能在Math对象上调用

// Math.trunc方法用于去除一个数的小数部分, 返回整数部分

Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
// 对于非数值, Math.trunc内部使用Number方法将其先转为数值
// 对于空值和无法截取整数的值, 返回NaN

Math.trunc(NaN); //NaN
Math.trunc('foo'); //NaN
Math.trunc(); //NaN

// 模拟代码
Math.trunc = Math.trunc || function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};

/* Math.sign() 方法用来判断一个数到底是正数, 负数, 还是零 */
// 返回值有5种情况
// 参数为正数, 返回+1
// 参数为负数, 返回-1
// 参数为0, 返回-0
// 其他值, 返回NaN
Math.sign(-5); // -1
Math.sign(5); // +1
Math.sign(-0); // -0
Math.sign(NaN); //NaN
Math.sin('9'); //+1
Math.sign(); //NaN

// 模拟代码
Math.sign = Math.sign || function (x) {
    x = +x; // convert to a number
    if(x === 0 || isNaN(x)){
        return x;
    }
    return x > 0 ? 1 : -1;
};

// Math.cbrt() 用于计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0) // 0
Math.cbrt(1) // 1
Math.cbrt(2) // 1.2599210498948734

// 对于非数值, Math.cbrt方法内部也是先使用Number方法将其转为数值
Math.cbrt('8') // 2
Math.cbrt('hello') //NaN

// 模拟代码
Math.cbrt = Math.cbrt || function (x) {
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
}

// Math.clz32() JavaScript的整数使用32位二级制形式表示, 返回一个数的32位无符号整数形式有多少个前导0
// "count leading zero bits in 32-bit binary representations of a number" clz32的缩写
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

// Math.imul() 方法返回两个数以32位带符号整数形式相乘的结果, 返回的也是一个32位的带符号整数
Math.imul(2, 4) // 8
Math.imul(-1, 8) //-8
Math.imul(-2, -2) //4

// Math.fround()方法返回一个数的单精度浮点数形式
Math.fround(0) // 0
Math.fround(1) // 1
Math.fround(1.337) //1.3370000123977661
Math.fround(1.5) //1.5
Math.fround(NaN) // NaN

// 代码模拟
Math.fround = Math.fround || function (x) { 
    return new Float32Array([x])[0];
 }

//  Math.hypot方法返回所有参数的平方和的平方根
Math.hypot(3, 4); //5
Math.hypot(3, 4, 5); // 7.0710678118654755
Math.hypot(); //0
Math.hypot(NaN); //NaN
Math.hypot(3, 4, '5'); // NaN
Math.hypot(-3); //3

// 3的平方加上4的平方等于5的平方, 如果参数不是数值, Math.hypot方法会将其转为数值, 只要有一个参数无法转为数值, 就会返回NaN

// ES6新增了4个对数相关方法
Math.expm1(x)  // 返回e的x次方-1, 即Math.exp(x) - 1
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0) // 0
Math.expm1(1) // 1.718281828459045

// 模拟代码
Math.expm1 = Math.expm1 || function (x) { 
    return Math.exp(x) - 1;
 }

//  Math.log1p(x) 返回ln(1+x), 即Math.log(1+x),如果x小于-1,则返回NaN
Math.log1p(1) //
Math.log1p(0) //0
Math.log1p(-1) // -Infinity
Math.log1p(-2) //NaN

// 模拟代码
Math.log1p = Math.log1p || function (x) { 
    return Math.log(1+x);
 };

//  Math.log10(x)返回以10为底的x的对数, 如果x小于0, 则返回NaN
Math.log10(2) // 0.3010299956639812
Math.log10(1) // 0
Math.log10(0) //-Infinity
Math.log10(-2) //NaN
Math.log10(100000) // 5

// 模拟代码
Math.log10 = Math.log10 || function (x) {
    return Math.log(x) / Math.LN10;
};

// Math.log2()返回以2为底的x的对数, 如果x小于0,则返回NaN
Math.log2(3) //
Math.log2(2) //1
Math.log2(1) //0
Math.log2(0) //-Infinity
Math.log2(-2) // NaN
Math.log2(1024) // 10
Math.log2(1 << 29) //29

// 模拟代码
Math.log2 = Math.log2 || function (x) {
    return Math.log(x) / Math.LN2;
}

// 双曲函数方法
// ES6新增了6个双曲函数方法
/* 
    Math.sinh(x) 返回x的双曲正弦
    Math.cosh(x) 返回x的双曲余弦
    Math.tanh(x) 返回x的双曲正切
    Math.asinh(x) 返回x的反双曲正弦
    Math.acosh(x) 返回x的反双曲余弦
    Math.atanh(x) 返回x的反双曲正切
*/

// Math.sign()用来判断一个值的正负, 但是如果参数是-0, 它便会返回-0
Math.sign(-0) // -0

// 指数运算符
// ES2016新增了一个指数运算符( ** )
2 ** 2 // 4
2 ** 3 //8

// 指数运算符可以与等号结合, 形成一个新的赋值运算符(**=)
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
/*
 * @Author: Cat9Yuko.Chen 
 * @Date: 2019-12-16 15:35:05 
 * @Last Modified by: Cat9Yuko.Chen
 * @Last Modified time: 2019-12-30 09:50:34
 */

//  字符串的Unicode表示法
"\u0061" // a

// 这种表现法只限于码点在\u0000~\uFFFF之间的字符,超出这个范围的字符,必须用2个双字节的形式表达
"\uD842\udFB7" // "吉"


"\u20BB7"
// "7"
// 上面的代码表示,如果在\u后面跟上超过0xFFFF的数值,JavaScript会理解成\u20BB+7
// 由于u20BB是一个不可打印字符,所以只会显示一个空格,后面跟一个7

// ES6改进
"\u{20BB7}"
//"吉"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // o
console.log("\u{6F}");

'\u{1F680}' === '\uD83D\uDE80'
// true

// 上面的代码中, 最后一个列子表名, 大括号表示法与四字节的UTF-16编码是等价的
// JavaScript共有6中方法可以表示一个字符
'\z' === 'z'; // true
'\172' === 'z'; // true
'\x7A' === 'z'; // true
'\u007A' === 'z'; // true
'\u{7A}' === 'z'; // true


var s = '吉';
s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
// charCodeAt方法只能分别返回前2个字节和后2个字节的值

// ES6提供了codePointAt方法,能够正确处理4个字节储存的字符, 返回一个字符的码点
var ss = '吉a';

ss.codePointAt(0); // 21513

ss.codePointAt(1) // 57271

ss.codePointAt(2) // 97

// codePointAt 方法返回的是码点的十进制, 如果想要十六进制的值, 可以使用toString方法转换一下

var s = '吉a';
s.codePointAt(0).toString(16) // '20bb7'
s.codePointAt(2).toString(16); // "61"

// 字符a在字符串s中的正确位置序号应该是1,但是必须向charCodeAt方法传入2
// 解决这个问题的一个方法是使用for ... of 循环, 因为他会正确识别32位的UTF-16字符
var s = '吉a';
for (let ch of s) {
    console.log(ch.codePointAt(0).toString(16));
}


// codePointAt方法是测试一个字符是由2个字节还是4个字节组成的最简单办法
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

is32Bit("吉");// true
is32Bit("a"); // false

// String.fromCodePoint()

// ES5提供了String.fromCharCode方法, 用于从码点返回对应字符, 但是这个方法不能识别32位的UTF-16字符(Unicode编号大于0xFFFF)
String.fromCharCode(0x20BB7);

// 上面的代码中, String.fromCharCode不能识别大于0xFFFF的码点, 所以0x20BB7就发生了溢出, 最高位2被舍弃,最后返回码点U+0BB7对应的字符,而不是U+20BB7对应的字符

// ES6提供了 String.fromCodePoint方法, 可以识别大于0xFFFF的字符,在作用上, 正好与codePointAt方法相反
String.fromCodePoint(0x20BB7);
// "吉"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y' 
// true

// 如果String.fromCharCode方法有多个参数,则它们会被合成一个字符串返回

/* 
    注意:
        fromCodePoint方法定义在String对象上, 而codePointAt方法定义在字符串的实例对象上
*/

// 字符串的遍历器接口
// ES6为字符串添加了遍历器接口, 使得字符串可以由for... of 循环遍历
for (let condePoint of 'foo') {
    console.log(condePoint);
}

// 这个遍历器最大的优点是可以识别大于0xFFFF的码点,传统的for循环无法识别这样的码点

var text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
    console.log(text[i]);

    // 字符串text只有一个字符, 但是for循环会认为它包含2个字符(都不可打印) 
}

for (let i of text) {
    console.log(i);
    // 而for...of循环会正确识别出这个字符
}

// at()

// ES5对字符串对象提供了charAt方法, 返回字符串给定位置的字符,该方法不能识别码点0xFFFF的字符
'abc'.charAt(0) // "a"
'吉'.charAt(0) // "\uD842"

// 上面的代码中, charAt方法返回的是UTF-16编码的第一个字节,实际上是无法显示的

// 目前有一个提案提出字符串实例的at方法,可以识别Unicode编号大于0xFFFF的字符,返回正确的字符
'a'.at(0) // "a"
'吉'.at(0) // "吉"

// 这个方法可以通过垫片库(github.com/es-shims/String.prototype.at)实现


// normalize()
/* 
    许多欧洲语言有语调符号和重音符号, 为了表示它们, Unicode提供了两种方法.一种是直接带重音符号的字符
    另一种是提供合成符号,即原字符与重音符号合成一个字符
    这两种表示方法在视觉和语义上都等价,但是JavaScript无法识别
 */
'\u01D1' === '\u004F\u030C' //false

'\u01D1'.length //1
'\u004F\u030C'.length //2


// ES6为字符串实例提供了normalize方法, 用来将字符的不同表示方法同意为同样的形式,这称为Unicode正规化
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true

/* 
    normalize参数
    NFC(默认), 表示 "标准等价合成",返回多个简单字符的合成字符
    NFD, 表示 "标准等价分解" ,即在标准等价的前提下, 返回合成字符分解出的多个简单字符
    NFKC, 表示 "兼容等价" 指的是语义上的等价,但视觉上不等价
    NFKD, 表示 "兼容等价分解", 即在兼容等价的前提下, 返回合成字符分解出的多个简单字符

    不过, normalize方法目前不能识别3个或3个以上字符的合成, 这种情况下, 还是只能使用正则表达式, 通过Unicode编号区间判断
*/



/* includes(), startsWith(), endsWith() */ 

// 传统上, JavaScript中只有indexOf方法可用来确定一个字符串是否包含在另一个字符串中,ES6又提供了3种新方法

/* 
    includes(): 返回布尔值, 表示是否找打了参数字符串
    startsWith(): 返回布尔值, 表示参数字符串是否在源字符串的头部
    endsWith(): 返回布尔值, 表示参数数字符串是否在源字符串的尾部
 */

var s = 'Hello World!';

s.startsWith('Hello');  // true

s.endsWith('!'); // true

s.includes('o'); // true


// 这3个方法都支持第二个参数, 表示开始搜索的位置

var s = 'Hello world!';

s.startsWith('world', 6); //true
s.endsWith('Hello', 5); // true
s.includes('Hello', 6); // false

// endsWith的行为与其他两个方法有所不同, 它针对前n个字符, 而其他两个方法针对从第n个位置到字符串结束位置之间的字符


// repeat()

// repeat方法返回一个新字符串, 表示将原字符串重复n次

'x'.repeat(3); // 'xxx'

'hello'.repeat(2); // 'hellohello'

'na'.repeat(0); // ''

// 参数如果是小数, 会被取整

'na'.repeat(2.9); // 'nana'

// 如果repeat的参数是负数或者Infinity, 会报错

'na'.repeat(Infinity); //RangeError: Invalid count value

'na'.repeat(-1); //RangeError: Invalid count value

// 如果参数是0到-1之间的小数, 则等同于0, 这是因为会先进行取整运算, 0到-1之间的小数取整以后等于-0, repeat视同为0

'na'.repeat(-0.9); //''

// 参数NaN等同于0

'na'.repeat(NaN); // ''

// 如果repeat的参数是字符串, 则会先转换成数字

'na'.repeat('na'); // ''


/* padStart(), padEnd() */

// ES2017引入了字符串补全长度的功能,如果某个字符串不够指定长度,会在头部或尾部补全

// 头部补全
'x'.padStart(5, 'ab'); // 'ababx'
'x'.padStart(4, 'ab'); // 'abax'

// 尾部补全

'x'.padEnd(5, 'ab'); // 'xabab'
'x'.padEnd(4, 'ab'); // 'xaba'

// padStart 和 padEnd分别接受两个参数, 第一个参数用来指定字符串的最小长度, 第二个参数则是用来补全的字符串

//如果原字符串的长度等于或大于指定的最小长度, 则返回原字符串

'xxx'.padStart(2, 'ab'); // 'xxx'

'xxx'.padEnd(2, 'ab'); // 'xxx'


// 如果用来补全的字符串与原字符串的长度超过了指定的最小长度, 则会截去超出位数的补全字符串

'abc'.padStart(10, '0123456789');
// '0123456abc'

//如果省略第二参数, 则会用空格来补全

'x'.padStart(4); //'   x'
'x'.padEnd(4); // 'x   '

// padStart的常见用途是为数值补全指定位数

'1'.padStart(10, '0'); //'0000000001'
'12'.padStart(10, '0');  // '0000000012'
'123456'.padStart(10, '0'); // '0000123456'

// 另一个用途是提示字符串格式

'12'.padStart(10, 'YYYY-MM-DD'); // 'YYYY-MM-12'
'09-12'.padStart(10, 'YYYY-MM-DD'); // 'YYYY-09-12'


// 模板字符串 

// 传统的JavaScript输出模板通常是这样写的
$('#result').append(
    'Threr are <b>' + basket.count + '</b> ' +
    'items in your basket, '+
    '<em>' + basket.onSale +
    '</em> are on sale!'
);


// 上面这种写法相当繁琐且不方便, ES6引入了模板字符串来解决这个问题

$("#result").append(`
    There are <b>${basket.count}</b> items
    in your basket, <em>${basket.onSale}</em>
    are on sale!
`);

// 模板字符串(template string)是增强版的字符串, 用反引号(`)标识,它可以当作不同字符串使用,也可以用来定义多行字符串,或者在字符串中嵌入变量

// 普通字符串

`In JavaScript '\n'  is a line-feed.`

// 多行字符串

`In JavaScript this is
not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量

var name = "Bob", time = "today";

console.log(`Hello ${name}, how are you ${time}?`);

// 如果在模板字符串中引用反引号,需要转义
var greeting = `\`Yo\` World!`;

// 如果使用模板字符串表示多行字符串, 所有的空格和缩进都会被保留在输出中

$('#list').html(`
<ul>
    <li>first</li>
    <li>second</li>
</ul>
`);

// 如果不需要这个换行, 可以使用trim方法消除

$('#list').html(`
<ul>
    <li>first</li>
    <li>second</li>
</ul>
`.trim());

// 在模板字符串中嵌入变量, 需要将变量名写在${}中

function authorize(user, action) {
    if(!user.hasPrivilege(action)) {
        throw new Error(
            // 传统写法为
            'User '
            + user.name
            + ' is not authorized to do '
            + action
            + '.'

            // ES6
            `User ${user.name} is not authorized to do ${action}.`
        );
    }
}

// 大括号内可以放入任意的JavaScript表达式, 可以进行运算, 以及引用对象属性

var x = 1;
var y = 2;

`${x} + ${y} = ${ x + y}`

// "1 + 2 = 3"

`${x} +${y * 2} = ${x +y * 2}`
// "1 + 4 = 5"

var obj = { x: 1, y: 2};

console.log(`${obj.x + obj.y}`);

// 模板字符串还能调用函数

function fn() { 
    return "Hello World";
 }

 `foo ${fn()} bar`

//  foo Hello World bar

// 如果大括号中的值不是字符串, 将按照一般的跪着转为字符串. 比如, 大括号中是一个对象, 将默认调用对象的toString方法

// 如果模板字符串中的变量没有声明,将报错

var msg = `Hello, ${palce}`;

// ReferenceError: palce is not defined

// 由于模板字符串的大括号内部就是要执行的JavaScript代码, 因此如果大括号内部是一个字符串, 将会原样输出

`Hello ${'world'}`

// "Hello World"

// 模板字符串甚至还能嵌套

const tmpl = addrs => `
<table>
${addrs.map(addr => `
<tr><td>${addr.first}</td></tr>
<tr><td>${addr.last}</td></tr>
`).join('')}
</table>
`;

// 上面的代码中, 模板字符串的变量中又嵌入了另一个模板字符串, 使用方法如下

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>'},
];

console.log(tmpl(data));

/* 
<table>

<tr><td><Jane></td></tr>
<tr><td>Bond</td></tr>

<tr><td>Lars</td></tr>
<tr><td><Croft></td></tr>

</table>
 */

//  如果需要引用模板字符串本身, 可以像下面这样写

// 写法一

let str = 'return' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack'); //"Hello Jack!"


// 写法二
let str2 = '(name) => `Hello ${name}`';
let fun2c = eval.call(null, str2);
fun2c('Jack'); //"Hello Jack!"


// 实例: 模板编译

// 通过一个模板字符串生成正式模板的实例

var template = `
<ul>
    <% for(var i=0; i< data.supplies.length; i++){ %>
    <li><%= data.supplies[i] %></li>
    <% } %>
</ul>
`;

// 上面的代码在模板字符串中放置了一个常规模板,改模板使用<%...%>放置JavaScript代码,使用<%= ... %>输出JavaScript表达式

// 怎么编译这个模板字符串呢?

// 一种思路是将其转换为JavaScript表达式字符串

echo('<ul>');
for (var i = 0; i < data.supplies.length; i++) {
    echo('<li>');
    echo(data.supplies[i]);
    echo('</li>');
};
echo('</ul>');
// 这个转换使用正则表达式即可

function compile(template) {

    var evalExpr = /<%=(.+?)%>/g;
    var expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n echo( $1 ); \n echo(`')
        .replace(expr, '`); \n $1 \n echo(`');

    template = 'echo(`' + template + '`);';

    // 然后, 将template封装在一个函数里面返回

    var script =
        `(function parse(data){
    var output = "";

    function echo(html) {
        output += html;
    }

    ${template}

    return output;
})`;

    return script;

    // 将上面的内容拼成一个模板编译函数compile
}

// compile函数的用法如下

var parse = eval(compile(template));

div.innerHTML = parse({ supplies: ["broom", "mop", "cleaner"] });


// 标签模板

// 模板字符串的功能不仅仅是上面这些, 它可以紧跟在一个函数名后面, 该函数将被调用来处理这个模板字符串,这被称为 "标签模板"功能(tagged template)

alert `123`
// 等同于
alert(123)

// 标签模板起始不是模板, 而是函数调用的一种特殊形式, "标签"指的是函数, 紧跟在后面的模板字符串就是它的参数

// 但是, 如果模板字符串中有变量, 就不再是简单的调用了, 而是要将模板字符串先处理成多个参数, 再调用函数

var a = 5;

var b = 10;

tag`Hello ${a + b} world ${a * b}`;
// 等同于

tag(['Hello', 'world',''], 15,50);

// 上面的代码中, 模板字符串前面有一个标识符tag, 它是一个函数,整个表达式的返回值就是tag函数处理模板字符串后的返回值

function tag(stringArr, value1, value2) {
    // ...
}

// 等同于

function tag(stringArr, ...values) {
    // ...
}

var a = 5;
var b = 10;

function tag(s, v1, v2) {
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(v1);
    console.log(v2);
    
    return "OK";
}

tag`Hello ${a + b} world ${ a * b}`;

// 例子

var total = 30;
var msg = passthru`The total is ${total} (${total * 1.05} with tax)`;

function passthru(literals) {
    var result = '';
    var i = 0;

    while(i < literals.length) {
        result += literals[i++];
        if(i < arguments.length) {
            result += arguments[i];
        }
    }
    return result;
}

msg // "The total is 30 (31.5 with tax)"


function passthru(literals, ...values) {
    var output = "";
    for (var index = 0; index < values.length; index++) {
        output += literals[index] + values[index];        
    }
    output += literals[index];
    return output;
}

// "标签模板" 的一个重要应用就是过滤HTML字符串, 放置用于输入恶意内容

var sender = '<script>alert("abc")</script>'; // 恶意代码
var message = 
    SaferHTML`<p>${sender} has sent you a message.</p>`;

    function SaferHTML(templateData) {
        var s = templateData[0];
        for (var i = 0; i < arguments.length; i++) {
            var arg = String(arguments[i]);            

            // Escape special characters in the substitution.
            s += arg.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
            // Don't escape special characters in the template.
            s += templateData[i];
        }
        return s;
    }

    // 上面的代码中, sender变量往往是由用户提供的, 经过SaferHTML函数处理, 里面的特殊字符都会被转义
    console.log(message);
// <p>&lt;p&gt;, has sent you a message.&lt;/p&gt;<p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
    

// 标签模板的另一个应用是多语言转换(国际化处理)

il8n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`

// 下面的hashTemplate函数, 是一个自定义的模板处理函数

var libraryHtml = hashTemplate`
<ul>
    #for book in ${myBooks}
        <li><i>#{book.title}</i> by #{book.author}</li>
    #end
</ul>
`;

// 除此之外, 甚至可以使用标签模板在JavaScript语言之中 嵌入其他语言

jsx`
    <div>
        <input ref='input' onChange='${this.handleChange}'
        defaultValue='${this.StaticRange.value}' />
        ${this.StaticRange.value}
    </div>
`;

// 模板处理函数的第一个参数(模板字符串数组) 还有一个raw属性

console.log`123`;
// ["123", raw: Array[1]]

// 例子
tag`First line\nSecond line`;

function tag(strings) {
    console.log(strings.raw[0]);
    // First line\\nSecond line
}

// 上面的代码中tag函数的的哥参数strings有一个raw属性, 也指向一个数组, 该数组的成员与strings数组完全一致
// 两者唯一的区别就是字符串中的斜杠都被转义了.比如, strings.raw数组会将\n视为\\和n两个字符,而不是换行符


// String.raw()

// ES6还为原生的String对象提供了一个raw方法

// 返回一个反斜线都被转义的字符串

String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'

// 如果原字符串中的反斜线已经转义, 那么String.raw不会做任何处理

String.raw`Hi\\n`
// "Hi\\n"

// String.raw方法也可以作为正常的函数使用,这时, 其第一个参数应该是一个具有raw属性的对象,且raw属性的值应该是一个数组

String.raw({raw: 'test'}, 0, 1, 2);
// 't0e1s2t'

// 等同于
String.raw({raw: ['t','e','s','t']},0,1,2);


/* 模板字符串的限制 */

// 标签模板总可以内嵌其他语言, 但是, 模板字符串默认会将字符串转义, 导致无法嵌入其他语言.

function latex(strings) {
    // ...
}

let document = latex`
    \newcommand{\fun}{\textbf{Fun!}}  //正常
    \newcommand{\unicode}{\textbf{Unicode!}} //报错
    \newcommand{\xerxes}{textbf{King!}} ///报错

    Breve over the h goes \u{h}ere //报错
`

// 变量模板字符串对于LaTeX语言来说是完全合法的, 但是JavaScript引擎会报错,原因在于字符串的转义

// 模板字符串会将 \u00FF和\u{42}当作Unicode字符串进行转义, 所以\unicode解析时会报错; 而\x56会被当作十六进制字符串转义, 所以\xerxes会报错

// 为了解决这个问题, 有一个提案被提出: 放松对标签模板里面的字符串转义的限制. 如果遇到不合法的字符串转义, 就返回undefined,而不是报错,并且从raw属性上可以得到原始字符串

function tag(strs) {
    strs[0] === undefined
    strs.raw[0] === "\\unicode and \\u{55}";
}
tag`\unicode and \u{55}`

// 只对标签模板解析字符串时生效,.非标签模板的场合依然会报错
let bad = `bad escape sequence: \unicode`; //报错

/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-28 14:21:11 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-28 15:04:02
 */



//  Generator可以暂停函数执行, 返回任意表达式的值. 这种特点使得Generator有多种应用场景.

/* Generator函数的暂停执行效果, 意味着可以把异步操作写在yield语句里面, 等到调用next方法时再往后执行. 这实际上等用于不需要回调函数了, 因为异步操作的后续操作可以放在yield语句下面,
反正要等到调用next方法时再执行. 所以, Generator函数的一个重要实际意义就是用于处理异步操作, 改写回调函数. */
function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next();
// 卸载UI
loader.next();

/* 上面的代码中, 第一次调用loadUI函数时吗该函数不会执行, 仅返回一个遍历器. 下一次对该遍历器调用next方法, 则会显示Loading界面 (showLoadingScreen), 并且异步
加载数据(loadUIDataAsynchronsously). 等到数据加载完成, 再一次使用next方法, 则会隐藏Loading界面. 可以看到, 这种写法的好处是所有loading界面的逻辑, 都被封装在一个函数, 按部就班非常清晰.
AJAX是典型的异步操作, 通过Generator函数部署AJAX操作,可以用同步的方式表达. */
function* main() {
    var result = yield request('http://some.url');
    var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
    makeAjaxCall(url, function (response) {
        it.next(response);
    });
}

var it = main();
it.next();
// 上面的main函数就是通过AJAX操作获取视距. 可以看到, 除了多一个yield, 它几乎与同步操作的写法完全一样.
/* 注意!
    makeAjaxCall函数中的next方法必须加上response参数, 因为yield语句构成的表达式本身是没有值的, 总是等于undefined.  */
// 下面是另一个例子, 通过Generator函数逐行读取文本文件.
function* numbers() {
let file = new FileReader("numbers.txt");
try {
    while(!file.eof) {
        yield parseInt(file.readLine(), 10);
    }
} finally {
    file.close();
}
}
// 上面的代码打开文本文件, 使用yield语句可以手动逐行读取文件.
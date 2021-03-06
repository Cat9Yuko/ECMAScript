/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-21 11:13:34 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-21 11:29:46
 */



 /* 
    遍历器对象除了具有next方法, 还可以具有return方法和throw方法. 如果自己写遍历器对象生成函数, 那么next方法是必须部署的, return方法和throw方法则是可选部署.
    return方法的使用场景场合是, 如果for...of循环提前退出(通常是因为出错, 或者有break语句或continue语句), 就会调用return方法;如果一个对象在完成遍历前需要清理或
    释放资源, 就可以部署return方法.
 */

 function readLinesSync(file) {
     return {
         next() {
             return {done: true };
         },
         return() {
             file.close();
             return {done: true};
         },
     };
 }

//  上面的代码中, 函数readLinesSync接受一个文件对象作为参数, 返回一个遍历器对象, 其中除了next方法, 还部署了return方法. 下面, 我们让文件的遍历提前返回, 这样就会触发执行return方法.
for(let line of readLinesSync(fileName)) {
    console.log(line);
    break;
}
// 注意, return方法必须返回一个对象, 这是Generator规格决定的.
// throw方法主要配合Geneerator函数使用, 一般的遍历器对象用不到这个方法.
/*
 * @Author: Cat9Yuko 
 * @Date: 2020-06-10 17:32:25 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-06-11 11:35:37
 */


 /* ES2017中右一个提案, 允许函数的最后一个参数有尾逗号(trailing comma).
    此前, 函数定义和调用时都不允许最后一个参数有尾逗号.
 */
function clownsEverywhere(param1,param2) {
    // ...
}

clownsEverywhere('foo','bar');
/* 上面的代码中, 如果在param2或bar后面加一个都好, 就会报错.
    如果像上面这样将参数写成多行(即每个参数占一行), 那么以后修改代码时, 若想函数clownsEverywhere添加第三个参数, 
    或者调整参数的次序, 势必要在原来最后一个参数后面添加一个逗号. 这对于版本管理系统来说, 就会显示添加逗号的那一行发生了变动, 看上去有点冗余,因此新提案允许定义和调用时尾部有一个逗号.
 */

 function clownsEverywhere(param1,param2) {
    //  ...
 }
 clownsEverywhere('foo','bar',);
//  这样的规定也使得函数参数与数组和对象的尾逗号规则可以保持一致。
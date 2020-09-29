/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-29 11:41:19 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-29 11:46:04
 */


 /* 17chapter Generator函数的异步应用
    异步编程对JavaScript语言来说非常重要. JavaScript语言的执行环境是 "单线程"的, 如果没有异步编程, 根本无法使用, 不然会造成卡死. 本章主要介绍Generator函数如何完成异步操作. */

// ES6诞生以前, 异步编程的方法大概有下面4种.
// 回调函数
// 事件监听
// 发布/订阅
// Promise对象
// Generator函数将JavaScript异步编程带人了一个全新的阶段.

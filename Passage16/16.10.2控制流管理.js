/*
 * @Author: Cat9Yuko 
 * @Date: 2020-09-28 15:05:25 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-09-28 15:53:57
 */


//  如果有一个多步操作非常耗时, 采用回调函数可能会写成下面这样.
setp1(function (value1) {
    setp2(value1, function(value2) {
        setp3(value2, function(value3) {
            setp4(value3, function(value4) {
                // Do something with value4
            });
        });
    });
});

// 采用Promise改写上面的代码如下.
Promise.resolve(setp1)
.then(setp2)
.then(setp3)
.then(setp4)
.then(function (value4) {
    // Do something with value4
}, function (error) {
    // Handle any error from step1 through step4
})
.done();
// 上面的代码已经把回调函数改成了直线执行的形式, 但是加入了大量Promise的语法. Generator函数可以进一步改善代码运行流程.
function* longRunningTask(value1) {
    try {
        var value2 = yield setp1(value1);
        var value3 = yield setp1(value2);
        var value4 = yield setp1(value3);
        var value5 = yield setp1(value4);
        // Do something with value4
    } catch(e) {
        // Handle any error from step1 through step4
    }
}
// 然后, 使用一个函数按次序自动执行所有步骤.
scheduler(longRunningTask(initialValue));

function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束, 就继续调用
    if(!taskObj.done) {
        task.value = taskObj.value;
        scheduler(task);
    }
}

/* 注意!
    上面的这种做法只适合同步操作, 即所有的task都必须是同步的, 不能有异步操作. 因为这里的代码一得到返回值就继续往下执行, 没有判断异步操作何时完成.
    如果要控制异步的操作流程, 详见后文关于异步操作的内容.  */
// 下面, 利用for...of循环自动一次执行yield命令的特性, 提供一种更一般的控制流管理的方法.
let steps = [setp1Func, step2Func, step3Func];
function* iterateSteps(steps) {
    for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        yield step();
    }
}
// 上面的代码中, 数组steps封装了一个任务的多个步骤, Generator函数iteratorSteps则依次为这些步骤加上yield命令.
// 将任务分解成步骤之后, 还可以将项目分解成多个依次执行的任务.
let jobs = [job1, job2, job3];
function* iterateJobs(jobs) {
    for (var i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        yield* iterateSteps(job.steps);
    }
}

// 上面的代码中, 数组jobs封装了一个项目的多个任务, Generator函数iterateJobs则是依次为这些任务加上了yield*命令.
// 最后, 可以用for...of循环一次性依次执行所有任务的所有步骤.
for (var step of iterateJobs(jobs)) {
    console.log(step.id);
}
// 再次提醒大家, 上面的做法只能用于所有步骤都是同步操作的情况, 不能有异步操作的情况. 如果想要依次执行异步的操作, 必须使用后面第17章中介绍的方法.
// for...of本质上是一个while循环, 所以上面的代码实质上执行的是下面的逻辑.
var it = iterateJobs(jobs);
var res = it.next();

while(!res.done) {
    var result = res.value;
    // ...
    res = it.next();
}
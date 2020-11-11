/*
 * @Author: Cat9Yuko 
 * @Date: 2020-11-11 09:14:37 
 * @Last Modified by: Cat9Yuko
 * @Last Modified time: 2020-11-11 09:16:37
 */


const main = document.querySelector('main');
import(`./constants.js`).then(module => {
    module.loadPageInto(main);
}).catch(err => {
    main.textContent = err.message;
})
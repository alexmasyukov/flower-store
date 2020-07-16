const { resolve } = require("path");

const run = (cb) => new Promise(resolve => cb(resolve))


const a = (x, y) => cb => {
    const res = x + y
    cb(res)
}

run(a(5, 5))
    .then((res) => run(a(res, 5)))
    .then((res) => run(a(res, 5)))
    .then((res) => run(a(res, 5)))
    .then((res) => run(a(res, 5)))
    .then((res) => run(a(res, 5)))
    .then((res) => console.log(res))


// cb((res) => console.log(res))




// run(a(5, 5))
//     .then(() => {
//         console.log('Resolved after 2 seconds')
//         return run(1500);
//     })
    // .then(() => {
    //     console.log('Resolved after 1.5 seconds');
    //     return run(1500);
    // }).then(() => {
    //     console.log('Resolved after 3 seconds');
    //     return run(1000);
    // }).catch(() => {
    //     console.log('Caught an error.');
    // }).then(() => {
    //     console.log('Done.');
    // });
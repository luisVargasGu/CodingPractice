const services = {
        "1": new Promise(resolve => setTimeout(resolve(1), 1000)),
        "2": new Promise(resolve => setTimeout(resolve(2), 1000)),
        "3": new Promise(resolve => setTimeout(resolve(3), 1000))
};

const outputStuff = [];
const outputAll = Object.keys(services)?.map((serviceKey) => {
    services[serviceKey].then((value) => {
        // const stuff = await value;
        outputStuff.push(value);
        return outputStuff
        console.log('value', value);
    });
});
// return outputStuff
console.log('bad', outputStuff);
console.log('123', outputAll);

// async function test() {
//     const services = {
//         "1": new Promise(resolve => setTimeout(resolve(1), 1000)),
//         "2": new Promise(resolve => setTimeout(resolve(2), 1000)),
//         "3": new Promise(resolve => setTimeout(resolve(3), 1000))
//     };
//     const outputStuff = [];
//     for (const [key, value] of Object.entries(services)) {
//         const stuff = await value;
//         outputStuff.push(stuff);
//     };
//     console.log('done', outputStuff);
//     return outputStuff;
// }

// console.log('call', test());
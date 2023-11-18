function makeAddNumFunc(num) {
    const toAdd = num;

    return function (num) {
        return num + toAdd;
    };
}

const add5 = makeAddNumFunc(5);

console.log(add5(3)); // 8
console.log(add5(8)); // 13
console.log(add5(15)); // 20

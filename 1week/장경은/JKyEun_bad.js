// 굳이 함수형 코딩을 해야할까?
// 10000원 이상 배송비 무료, 5000원 이하 품목은 X로 리턴

const fs = require('fs');
const cartArr = fs.readFileSync('./input.txt').toString().split(' ').map(Number);

// 액션
function getTotalPriceAndExpensiveProduct() {
    let sum = 0;

    for (let i = 0; i < cartArr.length; i++) {
        sum += cartArr[i];
        if (cartArr[i] < 5000) {
            cartArr[i] = 'X';
        }
    }

    if (sum < 10000) {
        sum += 2500;
    }

    return [sum, cartArr];
}

console.log(getTotalPriceAndExpensiveProduct());
console.log('After Function Execution', cartArr);

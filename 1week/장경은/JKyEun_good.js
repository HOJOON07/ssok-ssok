// 함수형 코딩
// 10000원 이상 배송비 무료, 5000원 이하 품목은 X로 리턴

// 비즈니스 규칙에 의한 상수들
const DELIVERY_FEE = 2500;
const FREE_DELIVERY_COST = 10000;
const COST_TO_BE_X = 5000;

const fs = require('fs');
const cartArr = fs.readFileSync('./input.txt').toString().split(' ').map(Number);

// 계산
const addDeliveryFee = price => {
    const totalPrice = price >= FREE_DELIVERY_COST ? price + 0 : price + DELIVERY_FEE;
    return totalPrice;
};

// 계산
const getTotalPrice = cartArr => {
    const priceSum = cartArr.reduce((acc, item) => acc + item, 0);
    console.log('After reduce()', cartArr);
    return addDeliveryFee(priceSum);
};

// 계산
const getExpensiveProduct = cartArr => {
    const newCartArr = cartArr.map(el => {
        if (el < COST_TO_BE_X) {
            return 'X';
        } else {
            return el;
        }
    });
    console.log('After map()', cartArr);
    return newCartArr;
};

console.log([getTotalPrice(cartArr), getExpensiveProduct(cartArr)]);

// 이 코드가 빛을 발하는 상황들
// 유지보수 (큰 서비스) -> 큰 서비스의 legacy 코드를 처음 마주했을 때의 기분을 상상
// 테스트 상황
// 갑자기 마케팅 부서에서 15000원 이상 구매시 이벤트 진행 ... !! -> getTotalPrice를 가져다 사용 가능
// 원본 배열(cartArr)을 다시 사용해야 할 일이 발생할 경우

// map과 reduce 같은 메소드는 함수형 코딩에 사용하기 좋다 (copy on write)

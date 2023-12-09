# CH13, 함수형 도구 체이닝

### 연습문제 1

```js
const { reduce } = require("lodash");

const arr = [1, 2, 3, 4];
const objArr = [{ total: 1 }, { total: 2 }, { total: 3 }, { total: 4 }];

// 수업 코드와 비슷하게 맞추기 위해 Lodash reduce 함수 사용, 인자 순서 다름
function maxKey(arr, init, foo) {
  return reduce(
    arr,
    function (max, el) {
      if (foo(max) > foo(el)) return max;
      return el;
    },
    init
  );
}

function max(arr, init) {
  return maxKey(arr, init, function (x) {
    return x;
  });
}

// JS reduce 이용 버전
function maxKeyJS(arr, init, foo) {
  return arr.reduce((acc, cur) => {
    if (foo(acc) > foo(cur)) return acc;
    return cur;
  }, init);
}

function maxJS(arr, init) {
  return maxKeyJS(arr, init, (x) => x);
}

console.log("Lodash max", max(arr, 0));
console.log("JS max", maxJS(arr, 0));

// 객체 결과
const MIN = { total: 0 };
console.log(
  "Lodash maxKey",
  maxKey(objArr, MIN, (el) => el.total)
);
console.log(
  "JS maxKey",
  maxKeyJS(objArr, MIN, (el) => el.total)
);
```

### 연습문제 2

```js
function bigSpenders(customers) {
  const over100Customers = filter(customers, isOverHundred);
  const over100andPurchaseTwice = filter(over100Customers, isPurchaseMoreTwice);
  return over100andPurchaseTwice;
}

function isOverHundred(customer) {
  return customer.total >= 100;
}

function isPurchaseMoreTwice(customer) {
  return customer.purchases >= 2;
}
```

### 연습문제3

```js
// js 버전
function average(numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length;
}

// 책 버전
function average(numbers) {
  return reduce(numbers, 0, sum) / numbers.length;
}

function sum(a, b) {
  return a + b;
}
```

### 연습문제 4

```js
function averagePurcahseTotals(customers) {
  const customerPurchaseTotalArr = cutomers.map((cur, idx) => cur.total);
  return average(customerPurchaseTotalArr);
}
```

### 연습문제 5

```js
function shoesAndSocksInventory(products) {
  let inventory = 0;
  for (let p = 0; p < products.length; p++) {
    const product = products[p];
    if (product.type === "shoes" || product.type === "socks") {
      inventory += product.numberInInventory;
    }
  }
  return inventory;
}

// 함수형 도구 체인으로 변경하기
// 내 풀이
function shoesAndSocksInventory(products) {
  const onlyShoesAndSocks = products.filter(
    (product) => product.type === "shoes" || product.type === "socks"
  );
  const inventory = onlyShoesAndSocks.reduce(
    (acc, cur, idx) => (acc += cur.numberInInventoty),
    0
  );
  return inventory;
}

// 책 풀이
function shoesAndSocksInventory(products) {
  const onlyShoesAndSocks = products.filter(
    (product) => product.type === "shoes" || product.type === "socks"
  );
  // map 한번 더 쓰는게 맞는가? 배열 2번 도는데?
  const inventories = onlyShoesAndSocks.map((el) => el.numberInInventory);
  return inventories.reduce((acc, cur, idx) => (acc += cur), 0);
}
```

\*\* map 한번 더 쓰는게 맞을까? N 이 한번 더 도는데?

## 다양한 함수형 도구들

1. pluck() -> 특정 필드 값으로만 구성 된 배열 리턴
2. concat() -> 2차원 배열을 1차원 배열의 연결로 리턴 / 그런데 이건 JS 기본 함수랑 동작이 다른;;
3. freqenciesBy() / groupBy() -> 특정 필드의 개수 세기 / 배열을 그룹화

\*\* 그런데 이거 쓰는거 보신분?

### 연습문제 6

```js
const roster = evaluations.reduce((acc, cur, idx) => {
  const postion = cur.postion;
  if (roster[position]) return roster;
  return (roster[position] = cur.name);
}, {});
```

### 연습문제 7

```js
// 내 풀이
const recommendations = employeeNames.reduce((acc, cur, idx) => {
  acc.push({ name: cur, position: recommendPosition(cur) });
  return acc;
}, []);

// 책 풀이
const recommendations = employeeNames.map((name) => ({
  name,
  position: recommendPosition(name),
}));
```

### 연습문제 8

```js
const evaluations = recommendations.map((player) => {
  player["score"] = scorePlayer(player.name, player.position);
  return player;
});
```

### 연습문제 9

```js
const employeeListWithPostion = employeeNames.map((name) => ({
  name,
  position: recommendPosition(name),
}));

const employeeListWithEvaluation = employeeListWithPostion.map((player) => ({
  ...player,
  score: scorePlayer(player.name),
}));

const employeeListWithEvaluationAsc = sortBy(
  employeeListWithEvaluation,
  (player) => player.score
);

const employeeListWithEvaluationDesc = reverse(employeeListWithEvaluationAsc);
```

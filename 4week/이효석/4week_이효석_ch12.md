# CH12, 함수형 반복

## MAP 사용하기

1. map 은 계산이므로 map 을 돌려도 계산
2. 단, map 과정에서 액션이 들어가면 모든 맵의 과정이 액션이 되므로 주의 필요

### 연습문제 1

```js
map(customers, function (customer) {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    address: customer.address,
  };
});

customers.map((customer) => ({
    firstName: customer.firstName,
    lastName: customer.lastName,
    address: customer.address,
  };
));
```

## FILTER 사용하기

### 연습문제 2

```js
const testGroup = filter(customers, function (customer) {
  return customer % 3 === 0;
});

const nonTestGroup = customers.filter((customer) => customer.id % 3 !== 0);

// 근데 이건 걍 for 문 써서 바로 거르는게 훨 이득 일듯
```

## REDUCE 사용하기

### 연습문제 3

```js
function sum(numbers) {
  const sum = reduce(numbers, 0, function (sum, num) {
    return sum + num;
  });
}

function product(numbers) {
  return numbers.reduce((acc, cur, idx) => acc * cur, 1);
}
```

### 연습문제 4

```js
function min(numbers) {
  return reduce(numbers, min, function (acc, num) {
    if (num < acc) return num;
    return acc;
  });
}

function max(numbers) {
  return numbers.reduce((acc, cur, idx) => {
    if (cur > acc) return cur;
    return acc;
  }, Number.MIN_VALUE);
}
```

### 연습문제 5

```js
function map(arr, foo) {
  return reduce(arr, [], function (acc, cur) {
    acc.push(foo(cur));
    return acc;
  });
}

function filter(arr, foo) {
  return reduce(arr, [], function (acc, cur) {
    if (foo(cur)) acc.push(cur);
    return acc;
  });
}

// JS 버전
function map(arr, foo) {
  return arr.reduce((acc, cur) => {
    // push 는 배열의 길이를 리턴한다, 따라서 주의
    acc.push(foo(cur));
    return acc;
  }, []);
}

function filter(arr, foo) {
  return arr.reduce((acc, cur) => {
    if (foo(cur)) acc.push(cur);
    return acc;
  }, []);
}
```

# CH11, 일급 함수

## 배열에 대한 카피온라이트 리팩토링

- 카피온라이트의 경우 안전한 방법이지만 동작마다 배열이 카피가 되므로 성능상의 문제 초래
- 함수 콜백을 이용하여 해당 부분을 리팩토링하여 재사용성과 성능 문제 해결 가능

\*\* withArrayCopy 함수 이름이 좀 덜 직관적인듯? 다들 어찌 생각하시는지?

```js
function arraySet(arr, idx, val) {
  const copy = arr.slice();
  copy[idx] = val;
  return copy;
}

// 위의 코드를
function arraySet(arr, idx, val) {
  return withArrayCopy(arr, function (copy) {
    copy[idx] = val;
  });
}

function withArrayCopy(arr, modify) {
  const copy = arr.slice();
  modify(copy);
  return copy;
}
```

### 연습문제 1

```js
function push(arr, el) {
  const copy = arr.slice();
  copy.push(el);
  return copy;
}

// 풀이
function push(arr, el) {
  return withArrCopy(arr, function (copy) {
    copy.push(el);
  });
}

function drop_last(arr) {
  return withArrCopy(arr, function (copy) {
    copy.pop();
  });
}

function drop_first(arr) {
  return withArrCopy(arr, function (copy) {
    copy.shift();
  });
}
```

### 연습문제 2

```js
function objSet(obj, key, value) {
  const copy = Object.assign({}, obj);
  copy[key] = value;
  return copy;
}

function objDelete(obj, key, value) {
  const copy = Object.assign({}, obj);
  delete copy[key];
  return copy;
}

// 풀이
function doFuncOnCopyObj(obj, foo) {
  const copy = Object.assign({}, obj);
  foo(copy);
  return copy;
}

function objSet(obj, key, val) {
  return doFuncOnCopyObj(obj, function (copy) {
    copy[key] = val;
  });
}

function objDelete(obj, key) {
  return doFuncOnCopyObj(obj, function (copy) {
    delete copy[key];
  });
}
```

### 연습문제 3

```js
function tryCatch(func, errFunc) {
  try {
    func();
  } catch (err) {
    errFunc(err);
  }
}
```

### 연습문제 4

```js
if (arr.length === 0) {
  console.log("Array is empty");
}

if (hasItem(cart, "shoes")) {
  return setPriceByName(cart, "shoes", 0);
}

// 위의 if 문을 아래와 같이 리팩토링 했을 때, when() 만들기
when(arr.length === 0, function () {
  console.log("Array is empty");
});

when(hasItem(cart, "shoes"), function () {
  return setPriceByName(cart, "shoes", 0);
});

// 풀이
function when(test, func) {
  if (test) return func();
}
```

### 연습문제 5

```js
function IF(test, trueFunc, falseFunc) {
  if (test) return trueFunc();
  return falseFunc();
}
```

## 함수를 리턴하는 함수로 리팩토링

- 로그를 남기는 등의 액션을 가진 코드는 함수화 (= 슈퍼파워를 가진다)
- 하지만 로그를 남기는 모든 동작을 해당 함수로 감싸줘야하는 문제 발생
- 해당 기능을 가지는 함수를 만들어서 처리하고, 로그를 남기는 함수를 인자로 넘겨서 반복을 줄이는 리팩토링 가능

```js
// 기존 코드
try {
  saveUserData(user);
} catch (err) {
  // 슈퍼 파워를 가지는 부분
  logToSnapErr(err);
}

// 1차 리팩토링, 로그를 남기는 부분과 아닌 부분 분리 및 이름 바꾸기
try {
  saveUserDataNoLogging(user);
} catch (err) {
  logToSnapErr(err);
}

// 2차 리팩토링, 1차 리팩토링 try/catch 문은 로그를 남기므로 해당 구문을 함수화
function saveUserDataWithLogging(user) {
  try {
    saveUserDataNoLogging(user);
  } catch (err) {
    logToSnapErr(err);
  }
}

// 3차 리팩토링, err 를 보내는 구문이 중복 되므로 err 로그를 남기는 함수를 만들고 2차 리팩토링의 함수를 전달
// 리턴으로 함수 자체를 리턴해서 중복을 방지
function wrapLogging(func) {
  return function(arg) {
    try {
      func(arg);
    } catch (err {
      logToSnapErr(err);
    })
  };
}

const saveUserDataWithLogging = wrapLogging(saveUserDataNoLogging);
```

### 연습문제 6

```js
try {
  codeThatMightThrow();
} catch (e) {
  // 에러 무시
}

// 풀이
function wrapIgnoreErr(func) {
  return function (a1, a2, a3) {
    try {
      return func(a1, a2, a3);
    } catch (err) {
      return null;
    }
  };
}

function makeErr(a1, a2, a3) {
  console.log(...arguments);
  throw "ERR";
}

const ignoreFunc = wrapIgnoreErr(makeErr);
ignoreFunc(1, 2, 3);
```

### 연습문제 7

```js
let inc = makeAdder(1);

function makeAdder(n) {
  return function (x) {
    return n + x;
  };
}

const result = inc(10);
console.log(result);
```

\*\* 함수 선언과 변수 할당 부분의 인자 전달 관계 공부하기

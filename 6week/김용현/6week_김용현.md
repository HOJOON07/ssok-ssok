## 비동기 처리 사례 1

### ajax 코드

```js
function getData() {
  var tableData;
  $.get("https://domain.com/products/1", function (response) {
    tableData = response;
  });
  return tableData;
}

console.log(getData()); // undefined
```

$.get() 메서드는 비동기로 동작하기 때문에 getData() 함수가 반환하는 값은 의도한 대로 서버에서 응답을 받아올 때까지 기다리지 않고 바로 undefined를 반환한다.

이렇게 특정 로직의 실행이 끝날 떄까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기 처리이다.

## 비동기 처리 사례 2

### setTimeout 코드

```js
// #1
console.log("Hello");
// #2
setTimeout(function () {
  console.log("Bye");
}, 3000);
// #3
console.log("Hello Again");
```

비동기 처리에 대한 이해가 없는 상태에서 위 코드를 보고 예상하는 결과값

> 1.  ‘Hello’ 출력
> 2.  3초 있다가 ‘Bye’ 출력
> 3.  ‘Hello Again’ 출력

실제 결과 값

> 1.  ‘Hello’ 출력
> 2.  ‘Hello Again’ 출력
> 3.  3초 있다가 ‘Bye’ 출력

setTimeout() 역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아니라 일단 setTimeout()을 실행하고 나서 바로 다음 코드인 console.log('Hello Again');으로 넘어간다. 따라서, ‘Hello’, ‘Hello Again’를 먼저 출력하고 3초가 지나면 ‘Bye’가 출력된다.

## 콜백 함수로 비동기 처리 방식의 문제점 해결하기

```js
function getData(callbackFunc) {
  $.get("https://domain.com/products/1", function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

## 콜백 지옥

```js
$.get("url", function (response) {
  parseValue(response, function (id) {
    auth(id, function (result) {
      display(result, function (text) {
        console.log(text);
      });
    });
  });
});
```

콜백 지옥은 콜백 함수를 익명 함수로 전달하는 과정을 반복해서 코드의 깊이가 계속 깊어지는 현상을 말한다.

이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵다.

## 콜백 지옥을 해결하는 방법

```js
function parseValueDone(id) {
  auth(id, authDone);
}
function authDone(result) {
  display(result, displayDone);
}
function displayDone(text) {
  console.log(text);
}
$.get("url", function (response) {
  parseValue(response, parseValueDone);
});
```

위와 같은 코딩 패턴으로도 콜백 지옥을 해결할 수 있지만 Promise나 Async를 이용하면 더욱 간결하게 콜백 지옥을 해결할 수 있다.

## Promise

```js
function getData() {
  return new Promise(function (resolve, reject) {
    $.get("url 주소/products/1", function (response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData()
  .then(function (data) {
    console.log(data); // response 값 출력
  })
  .catch(function (err) {
    console.error(err); // Error 출력
  });
```

### 여러게의 Promise 연결하기

```js
function getData() {
  return new Promise({
    // ...
  });
}

// then() 으로 여러 개의 프로미스를 연결한 형식
getData()
  .then(function (data) {
    // ...
  })
  .then(function () {
    // ...
  })
  .then(function () {
    // ...
  });
```

### Promise 에러 처리

1.then()의 두 번째 인자로 에러를 처리하는 방법

```js
getData().then(handleSuccess, handleError);
```

2.catch()를 이용하는 방법

```js
getData()
  .then(function () {
    // ...
  })
  .catch(function (err) {
    console.error(err);
  });
```

1번보다는 2번을 사용하는 것이 더 권장된다.

```js
// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
  return new Promise(function (resolve, reject) {
    resolve("hi");
  });
}

getData().then(
  function (result) {
    console.log(result);
    throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
  },
  function (err) {
    console.log("then error : ", err);
  }
);
```

getData() 함수의 프로미스에서 resolve() 메서드를 호출하여 정상적으로 로직을 처리했지만, then()의 첫 번째 콜백 함수 내부에서 오류가 나는 경우 오류를 제대로 잡아내지 못한다. 따라서 코드를 실행하면 아래와 같은 오류가 난다.

> Uncaught (in promise) Error: Error in then()

이러한 오류를 잡아내기 위해서는 then()의 두 번째 콜백 함수를 사용해야 한다.

```js
// catch()로 오류를 감지하는 코드
function getData() {
  return new Promise(function (resolve, reject) {
    resolve("hi");
  });
}

getData()
  .then(function (result) {
    console.log(result); // hi
    throw new Error("Error in then()");
  })
  .catch(function (err) {
    console.log("then error : ", err); // then error :  Error: Error in then()
  });
```

위처럼 catch를 이용하면 발생한 에러를 콘솔로 출력한다.

따라서, 더 많은 예외 처리 상황을 위해 프로미스의 끝에 가급적 catch를 붙이는 것이 좋다.

## Async & Await란?

Async & Await는 Promise를 더욱 쉽게 사용할 수 있도록 ES7에 도입된 문법이다.

### Async & Await 사용하기

```js
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

먼저 함수의 앞에 async 라는 예약어를 붙인다. 그러고 나서 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 await를 붙인다. 여기서 주의해야 할 점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await가 의도한 대로 동작한다.

일반적으로 await의 대상이 되는 비동기 처리 코드는 Axios 등 프로미스를 반환하는 API 호출 함수이다.

### async & await 예외 처리

async & await에서 예외를 처리하는 방법은 try catch이다. 프로미스에서 에러 처리를 위해 .catch()를 사용했던 것처럼 async에서는 catch {} 를 사용하면 된다.

```js
async function logTodoTitle() {
  try {
    var user = await fetchUser();
    if (user.id === 1) {
      var todo = await fetchTodo();
      console.log(todo.title); // delectus aut autem
    }
  } catch (error) {
    console.log(error);
  }
}
```

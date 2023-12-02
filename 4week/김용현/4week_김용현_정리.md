## 코드 냄새

- 더 큰 문제를 가져올 수 있는 코드

### 함수 이름에 있는 암묵적 인자

- 함수 구현이 거의 같음
- 함수 이름이 구현의 차이를 만들어냄
- 해결방법 => 필드명을 일급으로 만들어 암묵적 인자를 드러낸다.

### 데이터 지향

- 이벤트와 엔티티에 대한 사실을 표현하기 위해 일반 데이터 구조를 사용하는 프로그래밍 형식

## 정적 타입 vs 동적 타입

```js
function times(a, b) {
  return a * b;
}

function minus(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}
```

### 고차 함수

- 함수를 인자로 받거나 함수를 반환하는 함수

### 리팩터링 단계

1. 함수 이름에 있는 암묵적 인자를 확인합니다.
2. 암묵적 인자를 명시적으로 표현합니다.
3. 함수 본문에 하드 코딩된 값을 새로운 인자로 바꿉니다.
4. 함수를 호출하는 곳을 고칩니다.

## 함수를 정의하는 방법

1. 전역으로 정의하기

```js
function saveCurrentUserData() {
  saveUserData(user);
}
```

2. 지역적으로 정의하기

```js
function someFunction() {
  var saveCurrentUserData = function () {
    saveUserData(user);
  };
  withLogging(saveCurrentUserData);
}
```

3. 인라인으로 정의하기

```js
withLogging(function () {
  saveUserData(user);
});
```

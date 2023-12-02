<aside>
📍 JS는 함수형 프로그래밍과 유연한 프로그래밍을 위해 일급 객체를 지원

</aside>

## 일급 함수

- 함수를 일급 객체로 취급하는 것

## 일급 객체

- 변수 할당 가능

  ```jsx
  let a = function () {
    return 'hi';
  };

  console.log(a()); //hi
  ```

- 파라미터로 전달 가능

  ```jsx
  let a = function () {
    let b = 10;
    return b;
  };

  let c = function (param) {
    console.log(param);
  };

  c(a()); //10
  ```

- 함수의 반환 값으로 사용 가능

  ```jsx
  function a() {
    return function () {
      console.log('hi');
    };
  }

  let b = a();
  b(); //hi
  ```

- 동적으로 프로퍼티 생성 가능

  ```jsx
  function a() {
    console.log('hi');
  }

  a.age = 23;
  a.skill = 'JS';

  console.log(a.age); //23
  console.log(a.skill); //JS
  ```

<aside>
📍 일급 객체: 언어의 객체에 대한 일반적인 특성
일급 함수: 함수를 일급 객체로 취급

</aside>

### 고차함수

- 함수를 인자로 전달받거나 함수를 반환하는 함수

  ```jsx
  //함수를 인자로 전달 받기
  const double = (num) => num * 2;
  const doubleNum = (func, num) => func(num);

  let a = doubleNum(double, 4); // 8

  -------------------------------------------------

  //함수 반환
  const adder = (added) => {
    return function(num) {
      return num + added;
    };
  };

  let a = adder(5)(3); //8
  let b = adder(3);
  let c = b(2); // 5

  ```

- JS에는 내장 고차함수도 존재
  → .filter(), .map(), .reduce()

### 콜백함수

- 파라미터로 함수를 전달해 호출 함수 내에서 해당 함수를 실행하는 것
  ```jsx
  const adder = (added) => {
    //콜백함수
    return function (num) {
      return num + added;
    };
  };
  ```

### + 클로저(Closure)

- MDN 정의:

  A clousre is the combination of a function and thee lexical environment within which that function was declared.

  함수와 함수가 선언된 어휘적 환경의 조합이다. 클로저를 이해하려면 자바스크립트가 어떻게 변수의 유효범위를 지정하는지(Lexical scoping)를 먼저 이해해야한다.

- 상위 스코프의 식별자를 참조하는 하위 스코프가 외부에서 지속적으로 참조되어 상위 스코프보다 더 오래 살아있는 것
  → 상위(부모) 스코프의 식별자를 하위 스코프가 지속적으로 참조
  ⇒ 하위 스코프가 살아있는 한 상위 스코프는 죽을 수 없음
  ⇒ 따지자면 하위 스코프가 더 오래 사는 것

```jsx
function outer() {
  const age = 23;
  console.log(name);
  return function inner() {
    const greeting = 'hi';
    console.log(greeting, name);
  };
}
const a = outer(); //23
a(); //hi23
```

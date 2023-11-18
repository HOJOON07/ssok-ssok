> `p.111` 하스켈이나 클로저 같은 언어도 카피-온-라이트 원칙을 쓰고 있습니다.
> 
> 
> `p.133` 클로저에서 지원하는 불변 데이터 구조는 다른 언어에서 참고할 만큼 효율적입니다.
> 

→ 클로저의 카피-온-라이트 원칙, 불변 데이터 구조

### [클로저](https://poiemaweb.com/js-closure)

- 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는 함수

- 반환된 내부함수가 자신이 선언됐을 때의 환경(lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수

- 자신이 생성될 때의 환경을 기억하는 함수

### 클로저의 데이터 불변성

```jsx
<!DOCTYPE html>
<html>
  <body>
  <p>클로저를 사용한 Counting</p>
  <button id="inclease">+</button>
  <p id="count">0</p>
  <script>
    var increaseBtn = document.getElementById('increase');
    var count = document.getElementById('count');

    var increase = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      var counter = 0;
      // 클로저를 반환
      return function () {
        return ++counter;
      };
    }());

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

- 스크립트 실행 시 **즉시실행함수** 호출
    
    → 변수 increase에 `function () { return ++counter; }`가 할당됨 (클로저)
    
    → 클로저는 자신이 선언됐을 때의 즉시실행함수의 지역 변수였던 counter를 기억함
    
    ⇒ 즉시실행함수의 변수 counter에 접근 가능
    
    ⇒ 변수 counter는 자신을 참조하는 함수가 소멸될 때까지 유지됨
    
- 즉시실행함수는 한 번만 실행되므로 increase가 호출될 때마다 counter가 초기화될 일은 없음
    
    ⇒ **의도치 않은 변경**을 피함
    
    ⇒ 상태 변경이나 가변 데이터를 피하고 **불변성을 지향**하는 함수형 프로그래밍에서 **부수 효과를 최대한 억제**하여 오류를 피하고 프로그램의 안정성을 높이기 위해 적극 사용됨
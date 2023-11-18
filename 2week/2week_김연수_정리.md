## 함수형 코딩

### 카피-온-라이트 원칙 3
- 복사본 만들기
- 복사본 변경하기
- 복사본 리턴하기

#### ex. 복사본 만들기
```javascript
function remove_item_by_name() {
  var new_cart = cart.slice();
  for(var i =0; i < cart.length; i++){
    if(cart[i].name === name)
  }
}
```


```javascript
function remove_item_by_name() {
  var new_cart = cart.slice();
  for(var i =0; i < new_cart.length; i++){
    if(new_cart[i].name === name)
  }
}
```


### 카피온라이트 vs 깊은복사

카피온라이트: 통제할 수 있는 데이터를 바꿀 때 , 안전지대 어디서나 가능
깊은복사: 신뢰할 수 없는 코드와 데이터를 주고받을 떄, 안전지대 경계

#### 문제
깊은 복사와 얕은 복사 내용

#### 풀이
1. 깊은
2. 얕은
3. 얕은
4. 깊은
5. 깊은



### 계층형 설계
소프트웨어를 계층으로 구성하는 기술임. 책에서는 그림으로 계층을 표현
1. 직접 구현 : 비슷한 계층에 있는 함수 호출함
    - 같은 계층에 있는 함수는 같은 목적을 가져야함
    - 일반적인 함수 많을수록 재사용 하기 좋음

2. 추상화 벽: 어떤꼐층은 중요한 세부 구현 감춤( 대칭적 ) , 어떤것을 신경쓰지 않아도 되지?
    - 데이터구조를 변형
    - 

3. 작은 인터페이스: 최소한의 인터페이스를 유지하면서 정의
    - 추상화 벽 위에 있는 계층에 구현하는것이 좋음
    
    ```javascript
    function getWatchDiscount() {
        var total = calcTotal(cart);
        var hasWatch = isInCart("watch");
        return total > 100 && hasWatch;
    }
    ```
    완전한 추상화벽과 최소한의 인터페이스 사이를 유연하게 조율해야함


4. 편리한 계층: 빠르고 고품질제공에 도움이 되는 계층에 더 투자해야함


### 리팩터링
함수 구현이 거의 같다, 함수이름이 구현의 차이를 만드는것 : 코드의 냄새 -> 리팩토링

```javascript
function setFieldByName(cart,name,field, value) {
  ...
}
cart = setFieldByName(cart, "shoe", 'price', 13);
cart = setFieldByName(cart, "shoe", 'shipping', 0);

```
-> 명시적인 , 일반적인 이름의 인자로 바꿈

#### 문제

```javascript
function multiplyByFour(x) {
  return x * 4;
}

function multiplyBySix(x) {
  return x * 6;
}
```

#### 풀이

```javascript
function multiply(x, y) {
  return x * y;
}
```

#### 문제
사칙연산 일급으로 만들어보기

#### 풀이
```javascript
function minus (x, y) {
  return x - y;
}
function plus (x, y) {
  return x + y;
}

```
### 함수형 코딩 1
액션과 계산,데이터 구분 할 줄 알아야함!
1. 액션 : 호출하는 시점과 횟수에 의존함(자원과 요리재료를 사용하는 것)
2. 계산 : 입력값으로 출력값을 만드는 것(어떤것을 결정하거나 계획하는 것): 순수함수, 수학함수
3. 데이터 : 이벤트에 대해 기록한 사실(결제,재고 등)


### 함수형 코딩 2
1. 액션 간 협력을 위해 타임라인 커팅을 이용하여 설계
2. 계층형 설계를 사용하기

### 함수형 코딩 3
액션, 계산, 데이터를 구분하는 예
* 계속 나누다 보면 복잡해질 수 있음 but 다른 액션이나 계산,데이터를 발견하기 위해 나눌수있을 만큼 나눠보기
* 데이터를 쉽게 해석할 수 있도록 표현하는 것 -> 함수형 프로그램에서 중요

    #### ex, 쿠폰 보내는 과정
    데이터 파악 -> 계산 + 추가 데이터 -> 액션으로 묶기
    1. 데이터 구현
    2. 계산 구현 : 테스트하기 쉬움 , 조합하기 좋음
    3. 액션 구현


### 함수형 코딩 4
[테스트 하기 쉽게]
1. DOM 업데이트와 비즈니스 규칙은 분리
2. 전역변수 없기
[재사용하기 쉽게]
1. 전역변수 의존 X
2. DOM을 사용할 수 있는 곳에서 실행된다고 가정 X
3. 함수가 결괏값 리턴

암묵적 입력: 전역변수를 읽는 것
암묵적 출력: 콘솔에 찍는 것, 전약변수를 바꾸는 것, return
=> 액션

#### 문제
```javascript
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}
```

#### 풀이
```javascript
const shopping_cart_total = 100;

function update_tax_dom() {
  set_tax_dom(cal_tax(shopping_cart_total));
}

function cal_tax(amount) {
  return amount * 0.1;
}
```
### 함수형 코딩 5
암묵적 입력과 출력은 적을수록 좋다 -> 액션이 적을수록 좋다
1. 재사용하기 쉽다
2. 유지보수
3. 테스트

#### 문제
```javascript
function update_shipping_icons() {
  ...
}
```

#### 풀이
```javascript
function update_shipping_icons(cart) {
  ...
}
function get_free_shipping_with_item(item) {
  ...
}
function get_free_shipping_with_icon(button,isShown) {
  ...
}

```







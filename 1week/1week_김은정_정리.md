# 4장. 액션에서 계산 빼내기

> **학습 목표**
>
> - 어떻게 함수로 정보가 들어가고 나오는지 살펴보기
> - 테스트하기 쉽고 재사용성이 좋은 코드를 만들기 위한 함수형 기술에 대해 알아보기
> - 액션에서 계산을 빼내는 방법

## 온라인 쇼핑몰 예제 코드 개선하기

- 장바구니에 담겨있는 제품의 금액 합계를 볼 수 있는 기능

- 구매 합계가 20달러 이상이면 무료 배송 아이콘을 띄우는 기능

- 세금 계산하기

### 개선 전 코드

```jsx
// 장바구니 구현하기
var shopping_cart = [];
var shopping_cart_total = 0;

function add_item_to_cart(name, price) {
  shopping_cart.push({
    name: name,
    price: price,
  });
  calc_cart_total();
}

function calc_cart_total() {
  shopping_cart_total = 0;
  for (var i = 0; i < shopping_cart.length; i++) {
    var item = shopping_cart[i];
    shopping_cart_total += item.price;
  }
  set_cart_total_dom();
}

// 무료 배송비 계산하기
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (item.price + shopping_cart_total >= 20)
      button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}

function calc_cart_total() {
  shopping_cart_total = 0;
  for (var i = 0; i < shopping_cart.length; i++) {
    var item = shopping_cart[i];
    shopping_cart_total += item.price;
  }
  set_cart_total_dom();
  update_shipping_icons();
}

// 세금 계산하기
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

function calc_cart_total() {
  shopping_cart_total = 0;
  for (var i = 0; i < shopping_cart.length; i++) {
    var item = shopping_cart[i];
    shopping_cart_total += item.price;
  }
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
```

### 코드 개선 목표

1. 테스트하기 쉽게 만들기

   → DOM 업데이트와 비즈니스 규칙을 분리하기

   → 전역변수 제거하기

2. 재사용하기 쉽게 만들기

   → 전역변수에 의존하지 않게

   → DOM을 사용할 수 있는 곳에서 실행한다고 가정하지 않기

   → 함수가 결과값을 리턴

### 계산 추출을 통해 코드 개선하기

1. 계산 코드를 찾아 빼내기
   - `서브루틴 추출하기 리팩토링` : 동작을 유지하며 코드를 바꾸는 것(지역 변수를 입력으로 받고 지역변수를 리턴)
   - `함수 추출하기 리팩토링`
2. 새 함수에 암묵적 입력과 출력 찾기
3. 암묵적 입력은 인자로 암묵적 출력은 리턴값으로 바꾸기

   ← 함수에 암묵적 입력과 출력이 있으면 액션이 되기 때문

```jsx
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

// 1. 코드를 선택하고 빼내기
// => 서브루틴 추출하기 (빼낸 코드를 새로운 함수로 만들고 이름 붙이기)
function update_tax_dom_ver1() {
  set_tax_dom(calc_tax());
}
function calc_tax_ver1() {
  return shopping_cart_total * 0.1;
}

// 2. 암묵적 입력과 출력 찾기
// (1) 암묵적 입력 : shopping_cart_total
// (2) 암묵적 출력 : X

// 3. 입력은 인자로 바꾸고 출력은 리턴값으로 바꾸기
function update_tax_dom_ver2() {
  set_tax_dom(calc_tax_ver2(shopping_cart_total));
}

function calc_tax_ver2(amount) {
  return amount * 0.1;
}

// -------------------------------------
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (item.price + shopping_cart_total >= 20)
      button.show_free_shopping_icon();
    else button.hide_free_shipping_icon();
  }
}

// 1. 코드를 선택하고 빼내기
// => 서브루틴 추출하기 (빼낸 코드를 새로운 함수로 만들고 이름 붙이기)
function update_shipping_icons_ver1() {
  var buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (gets_free_shipping_ver1()) button.show_free_shopping_icon();
    else button.hide_free_shipping_icon();
  }
}

function gets_free_shipping_ver1() {
  return item.price + shopping_cart_total >= 20;
}

// 2. 암묵적 입력과 출력 찾기
// (1) 암묵적 입력 : shopping_cart_total
// (2) 암묵적 출력 :

// 3. 입력은 인자로 바꾸고 출력은 리턴값으로 바꾸기
function update_shipping_icons_ver2() {
  var buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (gets_free_shipping_ver2(item.price, shopping_cart_total))
      button.show_free_shopping_icon();
    else button.hide_free_shipping_icon();
  }
}

function gets_free_shipping_ver2(item_price, total) {
  return item_price + total >= 20;
}
```

## keyPoint

- 액션은 암묵적인 입력 또는 출력을 가지고 있다.

- 계산의 정의에 따르면 계산은 암묵적인 입력이나 출력이 없어야 한다.

- 공유 변수(전역변수 같은)는 일반적으로 암묵적 입력 또는 출력이 된다.

- 암묵적 입력은 인자로 바꿀 수 있다.

- 암묵적 출력은 리턴값으로 바꿀 수 있다.

- 함수형 원칙을 적용하면 액션은 줄어들고 계산은 늘어난다.

<br/>

# 5장. 더 좋은 액션 만들기

> **학습 목표**
>
> - 암묵적 입력과 출력을 제거해서 재사용하기 좋은 코드를 만드는 방법 알아보기
> - 복잡하게 엉킨 코드를 풀어 더 좋은 구조로 만드는 방법 배우기

- 비즈니스 요구 사항과 설계 맞추기 : 요구 사항에 맞춰 더 나은 추상화 단계 선택하기

- 비즈니스 요구 사항과 함수 맞추기

- 암묵적 입력과 출력 줄이기

  → 암묵적 입력과 출력이 있는 함수는 아무 때나 실행할 수 없기 때문에 **테스트하기 어렵다.**

  ← 모든 입력값을 설정하고 테스트를 돌린 후 모든 출력값을 확인해야 하기 때문

## add_item 함수 개선하기

### 1. 계산을 분리해 더 좋은 설계 만들기

cart에 대한 동작 / item에 대한 동작 / 비즈니스 규칙에 대한 함수인지 표시해보기

```jsx
C  I
function add_item(cart, name, price) {
    var new_cart = cart.slice(); // 배열을 복사한다.
    new_cart.push( // 복사본에 item을 추가한다.
		{ // item 객체를 만든다.
        name: name,
        price: price
    });
    return new_cart; // 복사본을 리턴한다.
}
```

⇒ cart와 item으로 이루어진 함수에서, item에 관한 코드를 별도의 함수로 분리

```jsx
function add_item(cart, item) {
  var new_cart = cart.slice();
  new_cart.push(item);
  return new_cart;
}

function make_cart_item(name, price) {
  return {
    name: name,
    price: price,
  };
}

add_item(shopping_cart, make_cart_item("shoe", 3.45));
```

### 2. 카피-온-라이트 패턴을 빼내기

```jsx
function add_item(cart, item) {
  const new_cart = cart.slice();
  new_cart.push(item);
  return new_cart;
}
```

기존 계산 코드는 장바구니를 넘기는 상황에서만 쓸 수 있는 것처럼 보임.

⇒ 함수 이름과 인자 이름을 더 일반적인 이름으로 바꾸기

```jsx
function add_item(cart, item) {
  return add_element_last(cart, item);
}

function add_element_last(array, elem) {
  var new_array = array.slice();
  new_array.push(elem);
  return new_array;
}
```

이렇듯 어떤 배열이나 항목에도 쓸 수 있는, 재사용할 수 있는 함수를 `유틸리티 함수`라고 부름

## update_shipping_icons 함수 개선하기

```jsx
function update_shipping_icons(cart) {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    const new_cart = add_item(cart, make_cart_item("shoes", 3.45));
    if (gets_free_shipping(new_cart)) button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}
```

### 1. 함수가 하는 일 작성 및 분류하기

- 모든 버튼 가져오기 ← `구매하기 버튼`
- 버튼을 가져오고 반복하기 ← `구매하기 버튼`
- 버튼에 관련된 제품 가져오기 ← `구매하기 버튼`
- 가져온 제품을 가지고 새 장바구니 만들기 ← `cart와 item`
- 장바구니가 무료 배송이 필요한지 확인하기 ← `cart와 item`
- 아이콘 표시하거나 감추기 ← `DOM 관련 동작`

### 2. 관심사에 따라 함수 분리하기

```jsx
function update_shipping_icons(cart) {
  // 구매하기 버튼 관련 동작
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;

    var hasFreeShipping = gets_free_shipping_with_item(cart, item);

    set_free_shipping_icon(button, hasFreeShipping);
  }
}
function gets_free_shipping_with_item(cart, item) {
  // cart와 item 관련 동작
  var new_cart = add_item(cart, item);
  return gets_free_shipping(new_cart);
}
function set_free_shipping_icon(button, isShown) {
  // DOM 관련 동작
  if (isShown) button.show_free_shipping_icon();
  else button.hide_free_shipping_icon();
}
```

## keyPoint

- 일반적으로 암묵적 입력과 출력은 인자와 리턴값으로 바꿔 없애는 것이 좋다.

- 설계는 엉켜있는 것을 푸는 것이다. 언제든 다시 합칠 수 있다.

- 엉켜있는 것을 풀어 각 함수가 하나의 일만 하도록 하면, 개념을 중심으로 쉽게 구성할 수 있다.

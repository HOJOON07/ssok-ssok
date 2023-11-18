# 생각해보기

1. `서브루틴 추출하기`와 같이 동작을 유지하면서 코드를 바꾸는 것은 어떤 장점이 있을까?

<br/>

# 도전해보기

## 1. 코드를 계층별로 시각화하기

> 계산과 액션도 크게 스키마 / 비즈니스 로직 / 유틸 등 각자의 계층이 존재한다.

```jsx
// 데이터
let shopping_cart = [];

// 계산
const make_cart_item = (name, price) => ({ name, price });

// 계산
const add_item = (shopping_cart, item) => [...shopping_cart, item];

// 계산
const calc_cart_total = (shopping_cart) =>
  shopping_cart.reduce((total, item) => total + item.price, 0);

// 계산
const calc_tax = (shopping_cart_total) => shopping_cart_total * 0.1;

// 액션
const add_item_to_cart = (name, price) => {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);

  const total = calc_cart_total(shopping_cart);
  const tax = calc_tax(total);

  set_cart_total_dom(total);
  set_tax_dom(tax);

  update_shipping_icons(total);
};

// 계산
const is_free_shipping = (item_price, shopping_cart_total) =>
  item.price + shopping_cart_total >= 20;

// 액션
function update_shipping_icons(total) {
  var buy_buttons = get_buy_buttons_dom();

  for (var i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;
    if (is_free_shipping(item.price, total)) {
      button.show_free_shopping_icon();
    } else button.hide_free_shopping_icon();
  }
}
```

(1) 함수 이름을 따로 블록으로 만든 후, 콜 트리 생성하기

(2) 유사한 성격의 함수끼리 같은 위치에 배치해보기

(3) 계층을 한꺼번에 뛰어넘는 구간이 보이면 중간 계층의 적절한 함수 생각해보기

## 2. FE pipeline 이해하기

> 함수를 분리하는 것은 최종적으로 잘 조립하기 위함이고, 이를 위해선 함수의 대략적인 흐름을 잘 파악해야 한다.

(1) 맨 왼쪽에 사용자의 행동과 인자를 배치하기

(2) 맨 오른쪽에 화면에서 변경되어야 할 데이터를 적어보기

(3) INPUT -> f -> OUTPUT 의 개념으로 중간에 있어야 할 함수와 데이터를 적절히 배치하고 연결해보기

(4) 최종적인 파이프라인이 그려졌다면 유사한 성격을 가지는 계층을 만들어 시각적으로 구조를 이해해보기

<br/>

# 질문

1. 5강 예제 1 관련 질문

```jsx
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total();
}
```

위 코드를 개선하고자 함.

**[ 정답 풀이 ]**

```jsx
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total(shopping_cart);
}
```

**[내가 작성한 풀이]**

최대한 암묵적 입력을 피하기 위해선, `add_item_to_cart` 함수에서도 `shopping_cart`를 인자로 받을 수 있지 않을까?

그리고 지역 변수 `updated_shopping_cart`를 생성해 해당 값을 `calc_cart_total`의 인자로 넣어도 같을 값이 나올 것 같음.

```jsx
function add_item_to_cart(cart, name, price) {
  const updated_shopping_cart = add_item(cart, name, price);
  calc_cart_total(updated_shopping_cart);
}

function add_item(cart, name, price) {
  const new_cart = cart.slice();
  new_cart.push({
    name: name,
    price: price,
  });
  return new_cart;
}

function calc_cart_total(cart) {
  const total = calc_total(cart);
  set_cart_total_dom(total);
  update_shipping_icons(cart);
  update_tax_dom(total);
  return total;
}

function calc_total(cart) {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price;
  }
  return total;
}
```

2. 서브루틴 추출하기와 함수 추출하기의 큰 차이를 모르겠음

3. 도전해보기 - `코드를 계층별로 시각화하기` 의 3단계 부분에서 코드를 분리하는 **기준**을 아직 잘 모르겠음.

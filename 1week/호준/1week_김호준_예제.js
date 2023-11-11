//p 40
`
쿠폰 등급 정하기 - 계산
사용자 이메일 데이터 베이스 - 데이터
각 사용자가 추천한 친구 수 - 데이터 
특정 쿠폰을 보냈는지 안보냈는지 판단하기 - 계산 ? 액션 ?
어떤 쿠폰을 보냈었는지 - 데이터 
어떤 쿠폰을 보냈는지 기록하기 - 액션
이메일 보내기 - 액션
`;

// p.79
//before
function update_tax_dom() {
  set_tex_dom(shopping_cart_total * 0.1);
}
//분리하기

// 1. 총 가격 계산 그리고 세금 10 퍼 까지 - C
function calcTax(totalPrice) {
  return totalPrice * 0.1;
}

// 2. 예제에서는 세금을 계산하는 비즈니스 로직이 필요하다고 했지만

// 실제로 총가격을 구하게 된다면
// 이런식으로 되는걸까요?

function calc_totalPrice(amount, price) {
  return amount * price;
}
// 3. update tax dom - D

function update_tax_dom() {
  set_tex_dom(calcTax(totalPrice));
}

// p.82
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (item.price + shopping_cart_total >= 20)
      // 재사용 가능한 비즈니스 로직
      button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}

//1. 비즈니스 로직 분리하기

function showFreeIcon(price, total) {
  return price + total >= 20;
}

function test_update_shipping_icons() {
  // const buy_buttons = get_buy_buttons_dom();
  const buttons = [
    { item: "나이키", price: 100 },
    { item: "아디다스", price: 300 },
    { item: "뉴발란스", price: 500 },
  ];
  buttons.forEach((button) => {
    if (showFreeIcon(button.price, total))
      return button.show_free_shipping_icon();
    else return button.hide_free_shipping_icon();
  });

  buttons.forEach((button) => {
    showFreeIcon(button.price, total) >= 20
      ? button.show_free_shipping_icon()
      : button.hide_free_shipping_icon();
  });
}

// p.93

function add_item_to_cart(name, price) {
  // shopping_cart가 전역변수?
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total(shopping_cart); // 이렇게 넣어주면 되는거?
}

function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons(shopping_cart);
  update_tax_dom();
}

function set_cart_total_dom() {
  shopping_cart_total;
}

// p.104

// 1. 구매하기 버튼 동작

function update_shipping_icons(cart) {
  //버튼가져오고
  var buy_buttons = get_buy_buttons_dom();
  //반복하고,제품 가져오기?
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
  }
}

// 2. cart와 item 관련 동작
// 가져온 제품을 가지고 새 장바구니 만들고 무료 배송이 필요한지 확인?

function newCart(cart, item) {
  var newCartList = add_item(cart, item);
  return gets_free_shipping(newCartList);
}

// 3. DOM 관련동작
// 아이콘을 표시하거나 감추기
// 어쩌라고
function showFreeIcon(button) {
  if (button.item + button.price >= 20) show_free_shipping_icon();
  else hide_free_shipping_icon();
}

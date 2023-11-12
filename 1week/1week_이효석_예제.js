// #################### CH4 ###################
/* 문제 1 */
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

// 풀이
const shopping_cart_total = 100;

function update_tax_dom() {
  const new_tax = calculate_tax(shopping_cart_total);
  set_tax_total(new_tax);
}

function calculate_tax(total) {
  return total * 0.1;
}

/* 문제 2 */
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    if (item.price + shopping_cart_total >= 20) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

// 풀이
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();

  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    const factor = decide_shpping_icon(item.price, shopping_cart_total);
    if (factor) return button.show_free_shipping_icon();
    return button.hide_free_shipping_icon();
  }
}

function decide_shpping_icon(item_price, total) {
  return item_price + total >= 20;
}

// #############################################
// #################### CH5 ####################
/* 문제 1 */
// 전역 변수를 인자로 변경하기

function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total();
}

function calc_cart_total() {
  shopping_cart_total = calc_cart_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons(shopping_cart);
  update_tax_dom();
}

function set_cart_total_dom() {
  shopping_cart_total;
}

function update_shipping_icons(cart) {
  const buy_buttons = get_buy_buttons_dom();

  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    const new_cart = add_item(cart, { price: item.price, name: item.name });

    const factor = decide_shpping_icon(new_cart);
    if (factor) return button.show_free_shipping_icon();
    return button.hide_free_shipping_icon();
  }
}

function decide_shpping_icon(cart) {
  return calc_total(cart) >= 20;
}

function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
}

function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total));
}

// 풀이
const shopping_cart_total = 1000;

function add_item_to_cart(shopping_cart, name, price) {
  let new_shopping_cart = add_item(shopping_cart, name, price);

  // 책에서는 함수에서 전역변수에 바로 접근을 해줬지만 이런 형태가 더 안전하지 않을까?
  shopping_cart_total = calc_cart_total(new_shopping_cart);
}

function calc_cart_total(shopping_cart) {
  let new_shopping_cart_total = calc_total(shopping_cart);
  set_cart_total_dom(new_shopping_cart_total);
  update_shipping_icons(new_shopping_cart_total);
  update_tax_dom(new_shopping_cart_total);
  return new_shopping_cart_total;
}

function set_cart_total_dom(cart_total) {
  // dom 변경
}

function update_shipping_icons(cart) {
  const buy_buttons = get_buy_buttons_dom();

  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    const new_cart = add_item(cart, { price: item.price, name: item.name });

    const factor = decide_shpping_icon(new_cart);
    if (factor) return button.show_free_shipping_icon();
    return button.hide_free_shipping_icon();
  }
}

function decide_shpping_icon(cart) {
  return calc_total(cart) >= 20;
}

function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
}

function update_tax_dom(cart_total) {
  set_tax_dom(calc_tax(cart_total));
}

/* 문제 2 */
// update_shipping_icons 분리하기

// 기존 코드
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();

  // 해당 부분을 분리할 필요는 없음 -> 그래서 생각이 안떠올랐음
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    // 내가 미리 작업을 해서 분리가 안되었던 것!
    const factor = decide_shpping_icon(item.price, shopping_cart_total);
    if (factor) return button.show_free_shipping_icon();
    return button.hide_free_shipping_icon();
  }
}

// 분리 코드
function update_shipping_icons(cart) {
  const buy_buttons = get_buy_buttons_dom();

  // 가져오는 부분을 굳이 나눌 필요 X, 해당 부분을 처리하는 것을 나눠야 한다
  // 나누면 오히려 코드만 길어지고 복잡해 짐
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    // 특정 아이템이 포함 되었을 때, Free 버튼 보여줄지 여부를 결정하는 변수 설정
    const isShown = decide_free_shpping_with_item(cart, item);

    // 변수에 따라 free 버튼을 추가하거나 감추는 함수
    // 분기도 함수 내부에서 처리하도록 수정
    set_free_shipping_icon(button, isShown);
  }
}

// 기존 전역 카트를 복사한 다음, 아이템을 추가해서 프리쉬핑 여부를 결정하는 함수에 전달
// 원래 한큐에 하던거를 분리
function decide_free_shpping_with_item(cart, item) {
  const new_cart = add_item(cart, item);
  return decide_free_shpping(new_cart);
}

// 아이템이 추가된 카트를 인자로 전달 받아서, 총액의 값에 따라 free 아이콘을 보여줄지 말지 결정하는 함수
function decide_free_shpping(cart) {
  return calc_total(cart) >= 20;
}

// DOM 엘리먼트인 Button 과 factor 를 받아서 DOM 을 처리하는 부분은 하나의 함수로 처리
function set_free_shipping_icon(button, factor) {
  if (factor) return button.show_free_shipping_icon();
  return button.hide_free_shipping_icon();
}

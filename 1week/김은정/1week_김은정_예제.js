/** CHAP 04 문제 1 */
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

// 내 풀이
// 1. 코드를 선택하고 빼내기
function update_tax_dom_ver1() {
  set_tax_dom(calc_tax_ver1());
}
function calc_tax_ver1() {
  shopping_cart_total * 0.1;
}

// 2. 암묵적 입력은 인자로 바꾸고, 출력은 리턴으로 바꾸기
function update_tax_dom_ver2() {
  set_tax_dom(calc_tax_ver2(shopping_cart_total));
}
function calc_tax_ver2(amount) {
  return amount * 0.1;
}

/** CHAP 04 문제 2 */
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

// 내 풀이
// 1. 코드를 선택하고 빼내기
function update_shipping_icons_ver1() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (decide_free_shipping_ver1()) button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}

function decide_free_shipping_ver1() {
  item.price + shopping_cart_total >= 20;
}

// 2. 암묵적 입력은 인자로 바꾸고, 출력은 리턴으로 바꾸기
function update_shipping_icons_ver2() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (decide_free_shipping_ver1(item.price, shopping_cart_total))
      button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}

function decide_free_shipping_ver2(item_price, total) {
  item_price + total >= 20;
}

/** CHAP 05 문제 1 */

function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total();
}

function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons(shopping_cart);
  update_tax_dom();
}

function set_cart_total_dom() {
  // ...
  shopping_cart_total;
  // ...
}

function update_shipping_icons(cart) {
  var buttons = get_buy_buttons_dom();
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var item = button.item;
    var new_cart = add_item(cart, item.name, item.price);
    if (gets_free_shipping(new_cart)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total));
}

// 내 풀이
function add_item_to_cart(cart, name, price) {
  const updated_shopping_cart = add_item(cart, name, price);
  calc_cart_total(updated_shopping_cart);
}

function calc_cart_total(cart) {
  const total = calc_total(cart);
  set_cart_total_dom(total);
  update_shipping_icons(cart);
  update_tax_dom(total);
  return total;
}

function set_cart_total_dom(total) {
  // ...
  total;
  // ...
}

function update_shipping_icons(cart) {
  var buttons = get_buy_buttons_dom();
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var item = button.item;
    var new_cart = add_item(cart, item.name, item.price);
    if (gets_free_shipping(new_cart)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

function update_tax_dom(total) {
  set_tax_dom(calc_tax(total));
}

function add_item(cart, name, price) {
  const new_cart = cart.slice();
  new_cart.push({
    name: name,
    price: price,
  });
  return new_cart;
}

function calc_total(cart) {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    total += item.price;
  }
  return total;
}

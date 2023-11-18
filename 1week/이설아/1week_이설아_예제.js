// #######chap.04#######
// 문제 01 p.79
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

// 풀이
const shopping_cart_total = 10;

const calc_tax = (total) => total * 0.1;

const update_tax_dom = () => {
  const new_tax = calc_tax(shopping_cart_total);
  set_tax_total(new_tax);
};

// 문제 02 p.82
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;

    if (item.price + shopping_cart_total >= 20) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

// 풀이
const decide_shipping_icon1 = (itemPrice, total) => itemPrice + total >= 20;

const update_shipping_icons = () => {
  const buy_buttons = get_buy_buttons_dom();

  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    const isOver = decide_shipping_icon1(item.price, shopping_cart_total);

    return isOver
      ? button.show_free_shipping_icon()
      : button.hide_free_shipping_icon();
  }
};

// #####################
// #######chap.05#######
// 문제 01 p.93
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

const decide_shipping_icon2 = (cart) => calc_total(cart) >= 20;

const update_shipping_icons = () => {
  const buy_buttons = get_buy_buttons_dom();

  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    const isOver = decide_shipping_icon2(item.price, shopping_cart_total);

    return isOver
      ? button.show_free_shipping_icon()
      : button.hide_free_shipping_icon();
  }
};

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
const add_item_to_cart = (cart, name, price) => {
  const updated_shopping_cart = add_item(cart, name, price);
  calc_cart_total(updated_shopping_cart);
};

const calc_cart_total = (cart) => {
  const total = calc_total(cart);
  set_cart_total_dom(total);
  update_shipping_icons(cart);
  update_tax_dom(total);
  return total;
};

function set_cart_total_dom(total) {
  // ...
  total;
  // ...
}

const decide_shipping_icon = (cart) => calc_total(cart) >= 20;

const update_shipping_icons = (cart) => {
  const buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    const new_cart = add_item(cart, item.name, item.price);

    const isOver = decide_shipping_icon(new_cart);

    return isOver
      ? button.show_free_shipping_icon()
      : button.hide_free_shipping_icon();
  }
};

const update_tax_dom = (total) => set_tax_dom(calc_tax(total));

const add_item = (cart, name, price) => {
  const new_cart = cart.slice();
  new_cart.push({
    name: name,
    price: price,
  });
  return new_cart;
};

const calc_total = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
};

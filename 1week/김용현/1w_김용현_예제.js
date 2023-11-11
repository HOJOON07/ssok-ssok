// Chapter 4. 예제

// function update_tax_dom() {
//     set_tax_dom(shopping_cart_total * 0.10);
// }

function update_tax_dom() {
  set_tax_dom(caculate_total_tax(shopping_cart_total));
}

function caculate_total_tax(price) {
  return price * 0.1;
}

// function update_shipping_icons() {
//     var buy_buttons = get_buy_buttons_dom();
//     for(var i = 0; i < buy_buttons.length; i++) {
//         let button = buy_buttons[i];
//         let item = button.item;

//         if(item.price + shopping_cart_total >= 20)
//             button.show_free_shipping_icon();
//         else
//             button.hide_free_shipping_icon();
//     }
// }

function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;

    if (is_free_shipping(item, shopping_cart_total))
      button.show_free_shipping_icon();
    else button.hide_free_shipping_icon();
  }
}

function is_free_shipping(item, total) {
  return item.price + total >= 20;
}

// Chapter 5. 예제

// function update_shipping_icons (cart) {
//     var buy_buttons = get_buy_buttons_dom();
//     for(var i = 0; i < buy_buttons.length; i++) {
//         var buy_button = buy_buttons[i];
//         var item = button.item;
//         var new_cart = add_item(cart, item);
//         if(gets_free_shipping(new_cart))
//             button.show_free_shipping_icon();
//         else
//             button.hide_free_shipping_icon();
//     }
// }

// 구매하기 버튼 관련 동작
function update_shipping_icons(cart) {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;

    let is_free_shipping = gets_free_shipping_cart(cart, item);
    is_show_free_shipping_icon(button, is_free_shipping);
  }
}

// cart와 item 관련 동작
function gets_free_shipping_cart(cart, item) {
  let new_cart = add_item(cart, item);
  return gets_free_shipping(new_cart);
}

// DOM 관련 동작
function is_show_free_shipping_icon(button, is_free_shipping) {
  if (is_free_shipping) button.show_free_shipping_icon();
  else button.hide_free_shipping_icon();
}

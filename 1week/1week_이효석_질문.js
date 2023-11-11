/* PAGE 93, 연습문제 관련 질문 */

// ## 책에서의 정답 풀이 ## //
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);

  // # 의문1, 해당 함수를 호출해서 Line 17 번에서 직접 전역 변수에 할당하는 형태로 접근을 하는데
  // 이런 형태 보다는 해당 함수가 리턴 값을 전달해서 전역 변수에 할당하는 형태로 쓰는 것이
  // 협업자가 코드를 읽을 때 + 유지 보수 측면에서 좋지 않을까?

  // 협업자가 calc_cart_total 함수를 안본다면 전역 변수값이 변경 된다는 것을 모를 수 있음!
  calc_cart_total(new_shopping_cart);
}

function calc_cart_total(cart) {
  let total = calc_total(cart);
  set_cart_total_dom(total);
  update_shipping_icons(cart);
  update_tax_dom(total);
  shopping_cart_total = total;
}

// ## 직접 수정한 풀이 ## //
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);

  // calc_cart_total 함수가 값 리턴을 보내고 해당 값을 전역 변수에 할당하면, 협업자가 충분히 인지 가능
  shopping_cart_total = calc_cart_total(new_shopping_cart);
}

function calc_cart_total(cart) {
  let total = calc_total(cart);
  set_cart_total_dom(total);
  update_shipping_icons(cart);
  update_tax_dom(total);
  // 리턴 값을 줘서, 호출한 부분에서 할당하기
  return total;
}

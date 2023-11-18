/** CHAPTER 6 */
// p.120
function add_contact(email, list) {
  const copy = list.slice();
  copy.push();
  return copy;
}
function submit_form_handler(event) {
  var form = event.target;
  var email = form.elements["email"].value;
  mailing_list = add_contact(email, mailing_list);
}

// p.125
// (1) 읽기 함수와 쓰기 함수로 분리하기
function last_el(array) {
  const len = array.length;
  return array[len - 1];
}
function drop_last(array) {
  const copy = array.slice();
  copy.pop();
  return copy;
}

// (2) 값 두 개를 리턴하는 함수로 만들기
function pop(array) {
  const copy = array.slice();
  const last_el = copy.pop();
  return {
    last: last_el,
    array: copy,
  };
}

// p.128
function push(array, elem) {
  const copy = array.slice();
  copy.push(elem);
  return copy;
}

// p.129
function add_contact(mailing_list, email) {
  return push(mailing_list, email);
}

// p.130
function arraySet(array, idx, value) {
  const copy = array.slice();
  copy[idx] = value;
  return copy;
}

// p.136
function objectSet(object, key, value) {
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}

// p.137
function setPrice(item, new_price) {
  return objectSet(item, "price", new_price);
}

// p.138
function setQuantity(item, new_quantity) {
  return objectSet(item, "quantity", new_quantity);
}

// p.139
function objectDelete(object, key) {
  const copy = Object.assign({}, object);
  delete copy[key];
  return copy;
}

// p.144
function setQuantityByName(cart, name, quantity) {
  const cart_copy = cart.slice();
  for (var i = 0; i < cart_copy.length; i++) {
    if (cart_copy[i].name === name) {
      cart_copy[i] = objectSet(cart_copy, "quantity", quantity);
    }
  }
  return cart_copy;
}

/** CHAPTER 7 */
// p.154
function payrollCalcSafe(employees) {
  const copy = deepCopy(employees);
  const payrollChecks = payrollCalc(copy);
  return deepCopy(payrollChecks);
}

// p.155
userChange.subscribe(function (user) {
  const copy = deepCopy(user);
  processUser(copy);
});

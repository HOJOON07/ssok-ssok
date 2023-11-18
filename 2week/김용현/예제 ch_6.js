// 문제 p.120
var mailing_list = [];

function add_contact(email) {
  mailing_list.push(email);
}

function submit_form_handler(event) {
  var form = event.target;
  var email = form.elements["email"].value;
  add_contact(email);
}

// 카피온라이트로 변경
var mailing_list = [];

function add_contact(email) {
  let new_list = mailing_list.slice();
  new_list.push(email);
  return new_list;
}

function submit_form_handler(event) {
  var form = event.target;
  var email = form.elements["email"].value;
  mailing_list = add_contact(mailing_list, email);
}

// 문제 p.136
o["price"] = 37;

function objectSet(object, key, value) {
  let newObj = Object.assign({}, object);
  newObj[key] = value;
  return newObj;
}

// 문제 p.137
function setPrice(item, new_price) {
  var item_copy = Object.assign({}, item);
  item_copy.price = new_price;
  return item_copy;
}

// 리팩토링
function setPrice(item, new_price) {
  return objectSet(item, "price", new_price);
}

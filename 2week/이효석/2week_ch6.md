# CH5

#### 문제 1

```js
const mailing_list = [];

function add_contact(email) {
  mailing_list.push(email);
}

function submit_form_handler(event) {
  const form = event.target;
  const email = form.elemnt["email"].value;
  add_contact(email);
}

// 풀이
function add_contact(mailing_list, email) {
  const new_mailing_list = mailing_list.slice();
  new_mailing_list.push(email);
  return new_mailing_list;
}

function submit_form_handler(event) {
  const form = event.target;
  const email = form.elemnt["email"].value;
  mailing_list = add_contact(email);
}
```

#### 문제 2

```js
const a = [1, 2, 3, 4];
const b = a.pop();
console.log(b); // 4를 출력
console.log(a); // [1, 2, 3]을 출력

// 풀이 1, 읽기 쓰기 함수 나누기
function last_element(arr) {
  return arr[arr.length - 1];
}

function drop_last(arr) {
  arr.pop();
}

// 풀이 2, 값 2개를 리턴
function pop(arr) {
  const copy_arr = arr.slice();
  const last = copy_arr.pop();
  return {
    last,
    array: copy_arr,
  };
}
```

#### 문제 3

```js
function push(arr, el) {
  const copy_arr = arr.slice();
  copy_arr.push(el);
  return copy_arr;
}
```

#### 문제 4

```js
function add_contact(mailing_list, email) {
  const new_mailing_list = mailing_list.slice();
  new_mailing_list.push(email);
  return new_mailing_list;
}

// 풀이
function add_contact(mailing_list, email) {
  return push(mailing_list, email);
}

function push(arr, el) {
  const copy_arr = arr.slice();
  copy_arr.push(el);
  return copy_arr;
}
```

#### 문제 5

```js
a[15] = 2;
function arraySet(arr, idx, val) {
  const copy_arr = arr.slice();
  copy_arr[idx] = val;
  return copy_arr;
}
```

#### 문제 6

```js
o["price"] = 37;
function objectSet(obj, key, val) {
  const copy_obj = Object.assign({}, obj);
  copy_obj[key] = val;
  return copy_obj;
}
```

#### 문제 7

```js
function setPrice(item, new_price) {
  const copy_item = Object.assign({}, item);
  item_copy.price = new_price;
  return item_copy;
}

// 풀이
function setPrice(item, new_price) {
  return objectSet(item, "price", new_price);
}

function objectSet(obj, key, val) {
  const copy_obj = Object.assign({}, obj);
  copy_obj[key] = val;
  return copy_obj;
}
```

#### 문제 8

```js
function setQuantity(item, new_quantity) {
  return objectSet(item, "quantity", new_quantity);
}

function objectSet(obj, key, val) {
  const copy_obj = Object.assign({}, obj);
  copy_obj[key] = val;
  return copy_obj;
}
```

#### 문제 9

```js
const a = { x: 1 };
const delete a["x"];

// 풀이
function objectDelete(obj, key) {
  const copy_obj = Object.assign({}, obj);
  delete copy_obj[key];
  return copy_obj;
}
```

#### 문제 10

```js
function setQuantityByName(cart, name, quantity) {
  for (let i = 0; i < car.length; i++) {
    if (cart[i].name === name) {
      cart[i].quantity = quantity;
    }
  }
}

// 풀이
function setQuantityByName(cart, name, quantity) {
  const copy_cart = cart.slice();
  for (let i = 0; i < copy_cart.length; i++) {
    if (copy_cart[i].name === name) {
      copy_cart[i] = objectSet(copy_cart[i], "quantity", quantity);
    }
  }
  return copy_cart;
}

function objectSet(obj, key, val) {
  const copy_obj = Object.assign({}, obj);
  copy_obj[key] = val;
  return copy_obj;
}
```

# 의문점

1. 배열에 담긴 객체에 값을 변경하는 경우, 배열 복사는 굳이 필요한가?
   > 배열에 객체 데이터를 추가하거나, 삭제하는 경우가 아니라면 굳이 배열까지 복사를 해야하는가? 궁금한점

```js
function setQuantityByName(cart, name, quantity) {
  const copy_cart = cart.slice();
  for (let i = 0; i < copy_cart.length; i++) {
    if (copy_cart[i].name === name) {
      copy_cart[i] = objectSet(copy_cart[i], "quantity", quantity);
    }
  }
  return copy_cart;
}

function objectSet(obj, key, val) {
  const copy_obj = Object.assign({}, obj);
  copy_obj[key] = val;
  return copy_obj;
}
```

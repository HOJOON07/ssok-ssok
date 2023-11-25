function freeTieClip(cart) {
  const hasTie = isInCart(cart, "tie");
  const hasTieClip = isInCart(cart, "tie clip");
  if (hasTie && !hasTieClip) {
    const tieClip = make_item("tie clip", 0);
    return add_item(cart, tieClip);
  }
  return cart;
}

function isInCart(cart, name) {
  return cart.some((item) => item.name === name);
}

//  p.178 remove_item_by_name 함수를 어느 계층에 놓을지 생각하기

const remove_item_by_name = (cart, name) => {
  let idx = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = i;
  }
  if (idx !== null) return removeItems(cart, idx, i);
  return cart;
};

const ANSWER = {
  1: "가장 높은 곳에 새로운 계층",
  2: "가장 높은 계층",
  3: "사이에 새로운 계층",
  4: "가장 낮은 계층",
  5: "가장 낮은 곳에 새로운 계층",
};

const 답은 = ANSWER[4];

// p.192
// 1. indexOfItem이 더 낮은 계층에 함수이기 때문에 재사용 가능할것 같다.

// const setPriceByName = (cart, name, price) => {
//   const newCart = cart.map((item) => {
//     if (item.name === name) return setPrice(item, price);
//     return item;
//   });
//   return newCart;
// };

const setPriceByName = (cart, name, price) => {
  var newCart = cart.slice();
  // for (let i = 0; i < newCart.length; i++) {
  //   if (newCart[i].name === name) newCart[i] = setPrice(newCart[i], price);
  // }
  let i = indexOfItem(newCart, name);
  if (i !== null) newCart[i] = setPrice(newCart, price);
  return newCart;
};

const indexOfItem = (cart, name) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
};

// p.194

const setPriceByName2 = (cart, name, price) => {
  let newCart = [...cart];
  const idx = indexOfItem(cart, name);
  if (idx !== null) newCart[idx] = setPrice(newCart[idx], price);
  return newCart;
};

const arraySet = (array, idx, value) => {
  let newArr = [...array];
  newArr[idx] = value;
  return newArr;
};

const reFactor_setPriceByName = (cart, name, price) => {
  const i = indexOfItem(cart, name);
  if (i !== null) return arraySet(cart, i, setPrice(cart[i], price));
  return cart;
};

// 215
const getWatchDiscount = (cart) => {
  var total = calcTotal(cart);
  var hasWatch = isInCart("watch");
  return total > 100 && hasWatch;
};

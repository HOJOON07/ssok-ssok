/* CHAPTER 8 */
//p.190
const isInCart = (cart, name) => indexOfItem(cart, name) !== null;

const indexOfItem = (cart, name) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
};

// p.192
const setPriceByName = (cart, name, price) => {
  let cartCopy = cart.slice();
  let i = indexOfItem(cart, name);
  if (i !== null) cartCopy[i] = setPrice(cartCopy, price);
  return cartCopy;
};

const indexOfItem2 = (cart, name) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
};

// p.194
const setPriceByName2 = (cart, name, price) => {
  let i = indexOfItem(cart, name);
  if (i !== null) return arraySet(cart, i, setPrice(cart[i], price));
  return cart;
};

const arraySet = (array, idx, value) => {
  let copy = array.slice();
  copy[idx] = value;
  return copy;
};

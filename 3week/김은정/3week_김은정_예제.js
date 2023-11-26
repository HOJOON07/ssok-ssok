/** CHAPTER 8 */
// p.190
function isInCart(cart, name) {
  return indexOfItem(cart, name) !== null;
}

function indexOfItem(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

// p.192
function setPriceByName(cart, name, price) {
  const cartCopy = cart.slice();
  const idx = indexOfItem(cart, name);
  if (idx !== null) cartCopy[idx] = setPrice(cartCopy[idx], price);

  return cartCopy;
}

function indexOfItem(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

// p.194
function setPriceByName(cart, name, price) {
  const idx = indexOfItem(cart, name);
  if (idx !== null) {
    const settingPrice = setPrice(cart[idx], price);
    return arraySet(cart, idx, settingPrice);
  }
  return cart;
}

function indexOfItem(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) return i;
  }
  return null;
}

function arraySet(array, idx, value) {
  const copy = array.slice();
  copy[idx] = value;
  return copy;
}

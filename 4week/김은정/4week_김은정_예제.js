/** CHAPTER 10 */
// p.243
function multipy(x, y) {
  return x + y;
}

// p.244
function increment(cart, name, field, value) {
  const item = cart[name];
  const newValue = item[field] + 1;
  const newItem = objectSet(item, field, newValue);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

// p.246
function incrementFieldByName(cart, name, field) {
  if (field !== "size" && field !== "quantity") {
    throw "this item field cannot be increased:" + "'" + field + "'";
  }
}

// p.251
function times(a, b) {
  return a * b;
}
function minus(a, b) {
  return a - b;
}
function divide(a, b) {
  return a / b;
}

/** CHAPTER 11 */
// p.273
function push(array, elem) {
  return withArrayCopy(array, function (copy) {
    copy.push(elem);
  });
}
function drop_last(array) {
  return withArrayCopy(array, function (copy) {
    copy.pop();
  });
}
function drop_first(array) {
  return withArrayCopy(array, function (copy) {
    copy.shift();
  });
}

// p.275
function withObjectCopy(object, modify) {
  const copy = Object.assign({}, object);
  modify(copy);
  return copy;
}
function objectSet(object, key, value) {
  return withObjectCopy(object, function (copy) {
    copy[key] = value;
  });
}
function objectDelete(object, key) {
  return withObjectCopy(object, function (copy) {
    delete copy[key];
  });
}

// p.276
function tryCatch(f, errHandler) {
  try {
    return f();
  } catch (err) {
    return errHandler(err);
  }
}

// p.277
function when(condition, then) {
  if (condition) {
    return then();
  }
}

// p.278
function IF(condition, then, ELSE) {
  if (condition) {
    return then();
  } else {
    ELSE();
  }
}

// p.285
function wrapIgnoreErrs(f) {
  return function (a1, a2, a3) {
    try {
      return f(a1, a2, a3);
    } catch (err) {
      return null;
    }
  };
}

// p.286
function makeAdder(n) {
  return function (x) {
    return n + x;
  };
}

/** CHAPTER 12 */
function forEach(arr, f) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    f(item);
  }
}
function map(arr, f) {
  const newArr = [];
  forEach(arr, function (elem) {
    newArr.push(f(elem));
  });
  return newArr;
}
function filter(arr, f) {
  const newArr = [];
  forEach(arr, function (elem) {
    if (f(elem)) {
      newArr.push(elem);
    }
  });
  return newArr;
}
function reduce(arr, init, f) {
  const acc = init;
  forEach(arr, function (elem) {
    acc = f(acc, elem);
  });
  return acc;
}

// p.299
map(cutomers, function (customer) {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    address: customer.address,
  };
});

// p.337
const testGroup = filter(customers, function (customer) {
  return customer.id % 3 === 0;
});
const nonTestGroup = filter(customers, function (customer) {
  return customer.id % 3 !== 0;
});

// p.309
function sum(numbers) {
  // 배열에 있는 모든 수를 더하기
  return reduce(numbers, 0, function (total, num) {
    return total + num;
  });
}
function product(numbers) {
  // 배열에 있는 모든 수를 곱하기
  return reduce(numbers, 1, function (total, num) {
    return total * num;
  });
}

// p.310
function min(numbers) {
  return reduce(numbers, Number.MAX_VALUE, function (m, n) {
    if (m < n) return m;
    else return n;
  });
}
function max(numbers) {
  return reduce(numbers, Number.MIN_VALUE, function (m, n) {
    if (m < n) return n;
    else return m;
  });
}

// p.312
/**
 * 1. []
 * 2. []
 * 3. init
 * 4. 얕은 복사가 된 array
 * 5. 얕은 복사가 된 array
 * 6. []
 */

// p.314
function map(arr, f) {
  return reduce(arr, [], function (newArr, item) {
    newArr.push(f(item));
    return newArr;
  });
}
function filter(arr, f) {
  return reduce(arr, [], function (newArr, item) {
    if (f(item)) newArr.push(item);
    return newArr;
  });
}

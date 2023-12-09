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
  let acc = init;
  forEach(arr, function (elem) {
    acc = f(acc, elem);
  });
  return acc;
}

/** Chap. 13 */
// p.322
function max(numbers) {
  return reduce(numbers, Number.MIN_VALUE, function (m, n) {
    if (m > n) return m;
    else return n;
  });
}
function maxKey(array, init, f) {
  return reduce(array, init, function (biggestSoFar, element) {
    if (f(biggestSoFar) > f(element)) {
      return biggestSoFar;
    } else {
      return element;
    }
  });
}

// 1. maxKey로 max를 만들 수 있음. max 함수에 비해 maxKey 함수가 일반적이라 더 다양한 상황에 사용 가능하기 때문
// 2. 코드로 만들기
function max(array, init) {
  return maxKey(array, init, function (x) {
    return x;
  });
}
// 4. maxKey가 더 일반적인 함수이다.

// p.328
// 조건 : 구매 금액이 최소 100달러를 넘음 && 2번 이상 구매한 고객
function bigSpenders(customers) {
  const withBigPurchases = filter(customers, hasBigPurchase);
  const with20MorePurchases = filter(withBigPurchases, has2OrMorePurchases);
  return with20MorePurchases;
}

function hasBigPurchase(customer) {
  return filter(customer.purchases, isBigPurchase).length > 0;
}
function isBigPurchase(purchase) {
  return purchase.total > 100;
}
function has2OrMorePurchases(customer) {
  return customer.purchases.length >= 2;
}

// p.348
const evaluationss = [
  { name: "Jane", position: "catcher", score: 25 },
  { name: "Johm", position: "pitcher", score: 10 },
  { name: "Harry", position: "pitcher", score: 3 },
  { name: "Ellen", position: "firstBase", score: 23 },
  { name: "Potter", position: "firstBase", score: 20 },
  { name: "test1", position: "secondBase", score: 30 },
  { name: "test2", position: "thirdBase", score: 10 },
  { name: "test3", position: "thirdBase", score: 3 },
];

const roster = evaluationss.reduce((acc, ev) => {
  if (ev.position in acc) return acc;
  else return { ...acc, [ev.position]: ev.name };
}, {});

// console.log(roster);

// p.349
const employeeNames = ["John", "Harry", "Jane"];
const recommendations = employeeNames.map((name) => {
  return {
    name,
    position: recommendPosition(name),
  };
});

// p.350
const evaluations = recommendations.map((player) => {
  return {
    name: player.name,
    position: player.position,
    score: scorePlayer(player.name, player.position),
  };
});

/** CHAP 14 */
function update(object, key, modify) {
  const value = object[key];
  const newValue = modify(value);
  const newObject = objectSet(object, key, newValue);
  return newObject;
}
// p.364
const user = {
  firstName: "Joe",
  lastName: "Nash",
  email: "JOE@EXAMPLE.COM",
};
update(user, email, function (user) {
  return user.email.toLowerCase();
});

// p.365
const item = {
  name: "shoes",
  price: 7,
  quantity: 2,
};
function tenXQuantity(item) {
  return update(item, item.quantity, function (item) {
    return item.quantity * 10;
  });
}
// 리팩토링
function numXKey(item, key, num) {
  return update(item, key, function (item) {
    return key * num;
  });
}
numXKey(item, "quantity", 10);

// p.376
// function update2(object, key1, key2, modify) {
//   return update(object, key1, function (value1) {
//     return update(value1, key2, modify);
//   });
// }
// function update3(object, key1, key2, key3, modify) {
//   return update(object, key1, function (object2) {
//     return update2(object2, key2, key3, modify);
//   });
// }
function update4(object, key1, key2, key3, key4, modify) {
  return update(object, key1, function (object2) {
    return update3(object2, key2, key3, key4, modify);
  });
}
function update5(object, key1, key2, key3, key4, key5, modify) {
  return update(object, key1, function (object2) {
    return update4(object2, key2, key3, key4, key5, modify);
  });
}

// p.385
function incrementSizeByName(cart, name) {
  return nestedUpdate(cart, [name, "options", "size"], function (size) {
    return size + 1;
  });
}

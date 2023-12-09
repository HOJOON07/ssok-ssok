function biggestPurchaseBestCustomers(customers) {
  const bestCustomers = filter(customers, function (customers) {
    return customers.purchases.length >= 3;
  });

  var biggestPurchases = map(bestCustomers, function (customers) {
    return; //
  });
}

// p.328 연습문제
const hasBigPurchase = (customer) => {
  return filter(customer.purchases, isBigPurchase).length > 0;
};

const has2OrMorePurchases = (customer) => {
  return customer.purchases.length >= 2;
};

const isBigPurchase = (purchases) => {
  return purchases.total > 100;
};
// customer = [{customer1},{customer2},{customer3}]
const bigSpenders = (customers) => {
  // 1
  // 배열안에 filter가 고차함수고 반복문이면 customers 들어왔을 때 {customer n }
  const withBighPurchases = filter(customers, hasBigPurchase);
  // has는 고객 구매리스트랑, 100넘는 total

  //2
  //조건을 만족한 [{customer n },{customer n+1}]
  const with2OMorePurchases = filter(withBighPurchases, has2OrMorePurchases);
  // 2 고객의 구매 횟수가 2번 이상

  //return 둘다 만족 하면 리턴
  return with2OMorePurchases;
  // [{customer},{customer}]
};

// P.329 연습 문제
function average(numbers) {
  const numbersLength = numbers.length;
  const totalNumbers = numbers.reduce((acc, cur) => acc + cur, 0);

  // const totalNumbers = sumTotal(numbers);

  return totalNumbers / numbersLength;
}

function sumTotal(numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

// p.339

const Mock = [
  { type: "shoes", id: 1 },
  { type: "shoes", id: 2 },
  { type: "shoes", id: 3 },
  { type: "shoes", id: 4 },
  { type: "socks", id: 5 },
  { type: "socks", id: 6 },
  { type: "socks", id: 7 },
  { type: "socks", id: 8 },
  { type: "test", id: 7 },
  { type: "test", id: 8 },
  { type: "test", id: 9 },
  { type: "test", id: 10 },
];

function shoesAndSocksInventory(products) {
  const shoesInventory = products.filter(
    (products) => products.type === "shoes"
  );
  const socksInventory = products.filter((product) => product.type === "socks");

  // return [...shoesInventory, ...socksInventory];
  return shoesInventory.length + socksInventory.length;
}

function getInventory(products, ...types) {
  const result = products.filter((prod) => types.includes(prod.type));
  return result.length;
}

console.log(getInventory(Mock, "shoes", "test"));

// p. 348 소프트볼 선수 포지션별로 선발하기

const roster = {
  pitcher: "john",
  cathcer: "jane",
  firstBase: "ellen",
};

const MOCK_EVAL = [
  { name: "Jane", position: "catcher", score: 25 },
  { name: "Johm", position: "pitcher", score: 10 },
  { name: "Harry", position: "pitcher", score: 3 },
  { name: "Ellen", position: "first base", score: 23 },
  // { name: "Potter", position: "first base", score: 20 },
];

const playersList = (evaluations) => {
  // 리듀스 돌면서 player에 포지션이랑 이름 넣어주고
  // result의 포지션과 player에 포지션이 일치하면 그냥 넘어가고
  // 일치하지 않다면 다시 넣어주고
  const result = evaluations.reduce((acc, player) => {
    if (player.position in acc) return acc;
    else return { ...acc, [player.position]: player.name };
  }, {});

  return result;
};
console.log(playersList(MOCK_EVAL));

//p.349

const employeeNames = ["john", "harry", "jane"];
const recommendation = employeeNames.map((name) => {
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

// p.364

update(user, email, function (email) {
  return email.toLowerCase();
});

// 365
function tenXQuantity(item) {
  return update(item, quantity, function (quantity) {
    return quantity * 10;
  });
}

// 376 update4,update5

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

function incrementSizeByName(cart, name) {
  return nestedUpdate(cart, [name, "options", "size"], function (size) {
    return size + 1;
  });
}

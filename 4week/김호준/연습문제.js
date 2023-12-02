// p.243

function multiplyByNumber(value, number) {
  return value * number;
}

// p.244
function incrementQuantityByName(cart, name) {}
function incrementSizeByName(cart, name) {}

// 리팩토링

const FIELD = {
  size: "size",
  quantity: "quantity",
};

function incrementFieldByName(cart, name, field) {
  if (!Object.keys(FIELD).some((name) => name === field)) throw "Warning";
  const item = cart[name];
  const value = item[field];
  const newValue = value + 1;
  const newItem = objectSet(item, field, newValue);
  const newCart = objectSet(cart, name, newItem);
  return newCart;
}

// p.273
function withArrayCopy(array, modify) {
  const copy = array.slice();
  modify(copy);
  return copy;
}

function push(array, elem) {
  return withArrayCopy(array, function (copy) {
    copy.push(elem);
  });
}

function drop_last(array, elem) {
  return withArrayCopy(array, function (copy) {
    copy.pop(elem);
  });
}

function drop_first(array, elem) {
  return withArrayCopy(array, function (copy) {
    copy.shift(elem);
  });
}

// p.276 객체에 카피온 라이트 구현
function objectSet(object, key, value) {
  const copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}

function withObjectCopy(object, modify) {
  const copy = Object.assign({}, object);
  modify(copy);
  return copy;
}

function refac_objectSet(object, key, value) {
  withObjectCopy(object, function (copy) {
    copy[key] = value;
  });
}
function refac_objectDelete(object, key) {
  return withObjectCopy(object, function (copy) {
    delete copy[key];
  });
}
// p.276 try catch 함수 만들기

const tryCatch = (func, log) => {
  try {
    return func();
  } catch (err) {
    return log(err);
  }
};

// p.277 함수 본문을 콜백으로 바꾸기

if (arra.length === 0) console.log("Array is empty");

if (hasItem(cart, "shoes")) return setPriceByName(cart, "shoes", 0);

const when = (test, then, elseCase) => {
  if (test) return then();
  else return elseCase();
};

// 285 연습문제 에러가 발생하면 null을 return
try {
  codeThatMightThrow();
} catch (err) {}

const errorNullWrap = (f) => {
  return (a, b, c) => {
    try {
      f(a, b, c);
    } catch (err) {
      return null;
    }
  };
};

// 286 어떤 숫자를 더하는 함수 makeAdder

var increment = makeAdder(1);

const makeAdder = (plusNum) => {
  return (num) => {
    plusNum + num;
  };
};

// p.299 엽서 보내기

map(customers, function () {
  return {
    firstName: customers.firstName,
    lastName: customers.lastName,
    address: customers.address,
  };
});

// p.304 테스트 그룹과 아닌 그룹을 나누는 코드를 작성해보세요.

const testGroup = filter(customers, function (customers) {
  return customers.id % 3 === 0;
});

const noneTestGroup = filter(customers, function (customers) {
  return customers.id % 3 !== 0;
});

// p.309 회계팁 reducs 더하기, 곱하기

function 더하기(numbers) {
  return reduce(numbers, 0, function (total, num) {
    return total + num;
  });
}

function 곱하기(numbers) {
  return reduce(numbers, 1, function (total, num) {
    return total * num;
  });
}

// p.310 가장 큰 거 작은거 구하기

function min(numbers) {
  return reduce(numbers, Number.MAX_VALUE, function (m, n) {
    if (m < n) return m;
    else n;
  });
}

function max(numbers) {
  return reduce(numbers, Number.MIN_VALUE, function (m, n) {
    if (m > n) return m;
    else n;
  });
}

//p. 312 주관식 문제

// 5번 문제 filter()함수에 항상 true를 리턴하는 함수를 넘기면 어떤 값이 리턴될까요
// 얕은 복사가 된 배열

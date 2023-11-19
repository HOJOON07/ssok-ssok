var mailing_list = [];

function add_contact(email) {
  mailing_list.push(email);
}

function submit_form_handler(event) {
  var form = event.target;
  var email = form.elements["email"].value;
  add_contact(email);
}

// 카피온라이트
const copy_add_contact = (mailing_list, email) => {
  const newList = [...mailing_list];

  return newList.push(email);
};

const copy_submit_form_handler = (event) => {
  const form = event.target;
  const email = form.elements["email"].value;
  mailing_list = copy_add_contact(email);
};

// var a = [1,2,3,4];
// var b = a.shift();
// console.log(a)
// console.log(b)

// pop 풀기 p.125

// 쓰기

const write_popFunc = (array) => {
  return array[array.length - 1];
};

// 읽기

const read_popFunc = (array) => {
  array.pop();
};

// 카피 온 라이트

const copyPop = (array) => {
  const newArray = [...array][array.length - 1];
  return newArray;
};

// 값 두개를 리턴하는 함수로 만들기

const 값두개함수 = (array) => {
  const newArray = [...array];
  newArray.pop();
  return {
    last: newArray[newArray.length - 1],
    popArray: newArray,
    originArray: array,
  };
};

const test = (array) => {
  var copy = array.slice();
  var first = copy.pop();
  return {
    first: first,
    array: copy,
  };
};

console.log("1!!!!", test([1, 2, 3, 4]));
console.log("예제 풀이", 값두개함수([1, 2, 3, 4]));

// p.128 ~ 129

//push

const push = (array, elem) => {
  const newArray = [...array];
  return newArray.push(elem);
};

// add_contact

const add_contact2 = (mailing_list, email) => push(mailing_list, email);

// arraySet()

// a[15] = 2;

const set = (array, idx, value) => {
  array[idx] = value;
};

const arraySet = (array, idx, value) => {
  const newArray = [...array];
  set(newArray, idx, value);
  return newArray;
};

function bookAnswer(array, idx, value) {
  var copy = array.slice();
  copy[idx] = value;
  return copy;
}

console.log(arraySet([1, 2], 1, 5));

// 136
// object set

const objectSet = (object, key, value) => {
  const newObject = { ...object };
  newObject[key] = value;
  return newObject;
};

// console.log(objectSet({ name: "hojoon" }, "name", "change"));

const setPrice = (item, newPrice) => {
  var itemCopy = Object.assign({}, item);
  itemCopy.price = newPrice;
  return itemCopy;
};

const A_setPrice = (item, newPrice) => {
  return objectSet(item, "price", newPrice);
};

// 138
const setQuantity = (item, new_quantity) => {
  return objectSet(item, "quantity", new_quantity);
};

// 139

const objectDelete = (object, key) => {
  //  const newObject = delete { ...object }[key];
  // 이러면 안되는 이유가 있는데 delete는 속성을 성공적으로 제거하면 true를 반환한다. 그래서 newObject가 true값이 담긴다.
  //
  const newObject = { ...object };
  // 이 delete 부분을 계산으로 뺄수는 없나?
  //delete newObject[key];
  deleteFunc(newObject, key);
  return newObject;
};
const deleteFunc = (object, key) => {
  delete object[key];
};

console.log(objectDelete({ a: 5 }, "a"));

// p. 143 동그라미 치기
const answer = "두 개 ";

// p. 144

const setQuantityByName = (cart, name, quantity) => {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      return cart[i].quantity === quantity;
    }
  }
};

const testArr = [
  { name: "shoes", quantity: 20 },
  { name: "hojoon", quantity: 30 },
  { name: "qwer", quantity: 40 },
];

const A_setQuantityByName = (cart, name, quantity) => {
  // const newCart = [...cart].map((item) => {
  //   if (item.name === name) item.quantity = quantity;
  //   return item;
  // });
  // return newCart;
  const newCart = [...cart].map((item) => {
    if (item.name === name) {
      return { ...item, quantity };
    }
    return { ...item };
  });
  console.log(newCart);
  return newCart;
};
console.log(testArr);
A_setQuantityByName(testArr, "hojoon", 50);
// console.log(A_setQuantityByName(testArr, "hojoon", 50));

// p.154 급여 계산

const payrollCalc = (employess) => {
  return payrollchekcs;
};

const payrollCalcSafe = (employess) => {
  const newEmployess = deepCopy(employess); // 복사
  const payrollchekcs = payrollCalc(newEmployess); // 추가되는 기능에 복사본 전달
  return deepCopy(payrollchekcs); // 나갈때 다시 복사
};

// p.155

userChanges.subscribe(function (user) {
  const newUser = deepCopy(user);

  processUser(newUser);
});

// p. 161

const 일번답 = "DC";
const 이번답 = "SC";
const 삼번답 = "SC";
const 사번답 = "DC";
const 오번답 = "DC";

// p. 163
const DC = "DC";
const CW = "CW";
const p_163_answer = {
  1: DC,
  2: CW,
  3: DC,
  CW,
  4: CW,
  5: CW,
  6: DC,
  7: DC,
  8: CW,
  9: DC,
  10: DC,
};

const P_164_1 = "방어적 복사를 쓰는게 맞는듯";
const p_164_2 = "안전지대가 아닐 수도 있다.그래서 방어적 복사 써야할듯";
const p_164_3 = "없으면 그냥 좀 쓰자 ";
const P_164_4 = "맘대로";
const p_164_5 = "팀을 어떻게 믿나요";

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

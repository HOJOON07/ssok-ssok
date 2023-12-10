# CH14, 중첩된 데이터에 함수형 도구 사용하기

### 연습문제 1

```js
update(user, "email", lowercase);
```

### 연습문제 2

```js
function tenXQuantity(item) {
  return update(item, "quantity", (quantity) => quantity * 10);
}
```

## 중첩된 데이터에 update() 사용, nestedUpdate() 도출하기

- 재귀를 사용하여 updateX 도출
- 재귀의 3요소
  - 종료 조건 / 재귀 호출 / 종료 조건에 다가가기

```js
function nestedUpdate(obj, keys, modify) {
  if (keys.length === 0) return modify(obj);

  const key1 = keys[0];
  const restOfKeys = drop_first(keys);
  return update(obj, key1, function (value) {
    return nestedUpdate(value, restOfKeys, modify);
  });
}

// shift 사용 버전
function nestedUpdate(obj, keys, modify) {
  if (keys.length === 0) return modify(obj);

  const key1 = keys.shift();
  return update(obj, key1, function (value) {
    return nestedUpdate(value, keys, modify);
  });
}
```

### 연습문제 3

```js
function incrementSizeByName(cart, name) {
  return nestedUpdate(cart, [name, "options", "size"], (size) => size + 1);
}

// 전체 코드
function update(obj, key, modify) {
  const newObj = Object.assign({}, obj);
  const value = newObj[key];
  newObj[key] = modify(value);
  return newObj;
}

function nestedUpdate(obj, keys, modify) {
  if (keys.length === 0) return modify(obj);

  const key1 = keys.shift();
  return update(obj, key1, function (value) {
    return nestedUpdate(value, keys, modify);
  });
}

function incrementSizeByName(cart, name) {
  return nestedUpdate(cart, [name, "options", "size"], (size) => size + 1);
}

const cartObj = {
  shirts: {
    options: {
      size: 100,
    },
  },
};

console.log(incrementSizeByName(cartObj, "shirts"));
```

## 깊이 중첩된 구조를 설계 할 때

- 깊은 구조를 전부다 알고, update 인자로 긴 배열을 주는 것은 어려울 수 있음
- 해당 상황은 오히려 추상화의 벽을 이용해서 자주 사용하는 것들을 명확힌 이름의 함수로 빼는 것이 편하다

```js
function updatePostById(category, id, modifyPost) {
  return nestedUpdate(categoty, ["post", "id"], modifyPost);
}
```

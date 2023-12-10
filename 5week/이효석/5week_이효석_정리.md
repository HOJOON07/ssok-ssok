# CH13, 함수형 도구 체이닝

- [p. 339] 연습문제에서 map 돌리고, reduce 쓰는데 이게 맞을까요? reduce 한번으로 처리하는게 더 좋을것 같은데 어찌 생각하시나요?

```js
function shoesAndSocksInventory(products) {
  const onlyShoesAndSocks = products.filter(
    (product) => product.type === "shoes" || product.type === "socks"
  );
  const inventory = onlyShoesAndSocks.reduce(
    (acc, cur, idx) => (acc += cur.numberInInventoty),
    0
  );
  return inventory;
}

// 책 풀이
function shoesAndSocksInventory(products) {
  const onlyShoesAndSocks = products.filter(
    (product) => product.type === "shoes" || product.type === "socks"
  );
  // map 한번 더 쓰는 부분에 대한 의견이 궁금합니다!
  const inventories = onlyShoesAndSocks.map((el) => el.numberInInventory);
  return inventories.reduce((acc, cur, idx) => (acc += cur), 0);
}
```

- 다양한 함수형 도구(pluck, concat, frequenciesBy, groupBy) 이거 쓰나요?

# CH14, 중첩된 데이터에 함수형 도구 사용하기

- 중첩이 많아지는 레벨에서 update 를 재귀로 처리하는건 신선했습니다!
- 깊은 중첩은 오히려 추상화의 벽을 이용하여 명확한 이름의 함수로 해결하는 것도 좋은 방법인 것 같습니다!
- 적절함의 중요성!

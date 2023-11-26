> `p.171` 직접 구현된 함수를 읽을 때, 함수 시그니처가 나타내고 있는 문제를 함수 본문에서 적절한 구체화 수준에서 해결해야 합니다.

→ 함수 시그니처는 어떤 문제를 나타내고, 구체화를 통해 어떻게 해결될까?

<br>

> `p.194` arraySet() 함수를 이용해 setPriceByName() 함수를 구현하고 다이어그램을 그려보세요.

→ 해설에 나온 다이어그램의 계층 분리 기준이 궁금함

(`setPriceName()` / `indexOfItem(), setPrice()` / `arraySet()` / `for loop, array index, .slice()`)

<br>

나의 경우, 기존에 나눈 6계층을 기준으로 계층을 분리해 다이어그램을 그림

<img width="722" alt="스크린샷 2023-11-25 오후 7 27 02" src="https://github.com/HOJOON07/ssok-ssok/assets/102431281/f7e6aa45-2d6b-476a-bae9-bdb51bd5871a">

기존에 계층을 분리할 때, indexOfItem() 함수는 카피-온-라이트 동작 계층에 속함.

계층 분리의 기준이 ‘카피-온-라이트’ 동작인가 ‘제품에 관한’ 기본 동작인가에 따라 나눈다면,

```jsx
function arraySet(array, idx, value) {
  const copy = array.slice(); // 1. 복사본 만들기
  copy[idx] = value; // 2. 복사본 변경하기
  return copy; // 3. 복사본 리턴하기
}
```

arraySet() 함수는 indexOfItem() 함수와 계층이 같다고 판단해, 다이어그램을 아래와 같이 작성함.

![스크린샷 2023-11-25 오후 7 41 34](https://github.com/HOJOON07/ssok-ssok/assets/102431281/2feb51cd-201f-48df-b1ba-40f8b88672d9)

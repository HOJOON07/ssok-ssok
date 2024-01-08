# 16장. 타임라인 사이에 자원 공유하기
클릭한 순서대로 DOM이 업데이트되도록 하는 방법 → `큐(queue)` 활용하기

### 큐(queue)

- 넣은 순서대로 항목을 꺼낼 수 있는 데이터 구조
- 사용자 클릭을 큐에 넣으면 넣은 순서대로 꺼낼 수 있음
    
    ![Untitled (6)](https://github.com/HOJOON07/ssok-ssok/assets/102431281/758ae18f-f560-467e-9411-a1273d836a02)
    
- 어떤 함수를 새로운 타임라인에서 실행하고 **한 번에 한 타임라인만 실행**할 수 있도록 만들어주는 고차함수
- 여러 타임라인에 있는 액션 순서를 조율하기 위해 많이 사용함
    
    ⇒ `동시성 기본형` : 자원을 안전하게 공유할 수 있는 재사용가능한 코드
    
    ⇒ 액션에 **순서 보장** 슈퍼 파워를 줌
    

```jsx
function Queue(worker) {
  var queue_items = [];
  var working = false;

  function runNext() {
    if(working)
      return;
    if(queue_items.length === 0)
      return;
    working = true;
    var item = queue_items.shift();
    worker(item.data, function(val) {
      working = false;
      setTimeout(item.callback, 0, val);
      runNext();
    });
  }

  return function(data, callback) {
    queue_items.push({
      data: data,
      callback: callback || function(){}
    });
    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function(total) {
    update_total_dom(total);
    done(total);
  });
}

var update_total_queue = Queue(calc_cart_worker);
```

---
# 17장. 타임라인 조율하기
### 타임라인 다이어그램을 그려 버그 확인하기

- 타임라인 다이어그램 그리기
    1. 액션을 확인하기
    2. 모든 액션을 그리기
    3. 단순화하기
- 자바스크립트에서 단순화하기 위한 두 단계
    1. 액션 통합하기
    2. 타임라인 통합하기

### 잘못된 타임라인이(버그 코드가) 왜 더 빠르게 동작하는가

<img width="514" alt="Untitled (4)" src="https://github.com/HOJOON07/ssok-ssok/assets/102431281/8fd61cce-d15f-4f12-b05f-eb113ae913f2">

const_ajax() 응답이 3초가 걸리고, shipping_ajax() 응답이 4초가 걸린다고 가정한다면

- 느리게 동작하는 이전 코드(순서대로) : 3 + 4 = 7초
- 실패하지만 빠르게 동작하는 새로운 코드(병렬) : 3과 4의 최대 값 ⇒ 4초

각각 7초, 4초가 소요됨

⇒ 실패하지 않고 병렬로 응답을 기다려 실행 속도를 개선하는 방법 찾기

⇒ 동시에 도착하는 ajax 응답을 **모두 기다렸다가** DOM 업데이트 하도록 개선하기

### 컷(cut)

<img width="170" alt="Untitled (5)" src="https://github.com/HOJOON07/ssok-ssok/assets/102431281/cbf8c74e-d5ac-44a8-9297-95f52844c008">

점선을 $컷$이라고 부름

- 타임라인의 순서를 보장해주는 역할
- 컷 앞에 있는 타임라인과 뒤에 있는 타임라인을 따로 분석할 수 있음
    
    ⇒ 앞 부분과 뒷 부분에 있는 **액션이 서로 섞이지 않음**
    
- 실행 가능한 순서를 줄여 애플리케이션의 복잡성을 줄임

```jsx
function Cut(num, callback) {
  var num_finished = 0;
  return function() {
    num_finished += 1;
    if(num_finished === num)
      callback();
  };
}

var done = Cut(3, function() {
  console.log("3 timelines are finished");
});
  
done();
done();
done();
```

---

### 복잡성

1. 비동기 웹 요청
2. 결과를 합쳐야하는 두 개의 API 응답
3. 예측 불가능한 사용자의 액션

`1번`과 `3번`은 **아키텍처** 때문에 생기는 복잡성

← 웹에서 동작하는 자바스크립트 애플리케이션은 비동기 웹 요청을 사용해야 함.  장바구니는 사용자가 조작할 수 있어야 하므로 인터렉션이 필요함

이러한 복잡성을 줄일 수 있는 방법이 있지 않을까?

⇒ **사용자 인터렉션을 적게 만들어** 3번 복잡성을 없애기

← 사용자 경험이 좋지 않음

⇒ 인터렉션을 줄이는 것보다 충분히 편리하도록 앱과 인터렉션을 할 수 있어야 함

`2번`의 경우, API 하나로 처리할 수 있다고 해도, 이것은 복잡성을 없앤 것이 아니라 **복잡성을 서버로 옮긴 것**임

---

## 딱 한 번만 호출하는 기본형

- `멱등원(idempotent)` : 최초로 한 번만 효과가 발생하는 액션

```jsx
function sendAddToCartText(number) {
  sendTextAjax(number, "Thanks for adding something to your cart. Reply if you have any questions!");
}

function JustOnce(action) {
  var alreadyCalled = false;
  return function(a, b, c) {
    if(alreadyCalled) return;
    alreadyCalled = true;
    return action(a, b, c);
  };
}

sendAddToCartTextOnce("555-555-5555-55");
sendAddToCartTextOnce("555-555-5555-55");
sendAddToCartTextOnce("555-555-5555-55");
sendAddToCartTextOnce("555-555-5555-55");
```

⇒ 딱 한 번만 호출하는 기본형 JustOnce() 를 본 후, useEffect가 생각나 useEffect 훅을 직접 만들어보고자함

⇒ `myUseEffect.jsx` 파일을 작성해 구현해본 결과, 파일 내에서는 작동하지만 리액트 자체에서는 오류 발생

- 리액트 자체 테스트(에러는 아직 해결 못함) : https://github.com/0uizi0/useEffect-study

  → 경은님이 [useState, useEffect를 구현](https://github.com/JKyEun/wanted-practice/commit/0a932c4eba955d44876f63b86aaa8bcc440b112c)해본 적이 있다고 하셔서 참고해서 다시 도전해볼 예정입니다!
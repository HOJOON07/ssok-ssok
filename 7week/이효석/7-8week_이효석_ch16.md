# CH16, 타임라인 사이에 자원 공유하기

## 좋은 타임 라인의 원칙

1. 타임라인은 적을 수록 좋다
2. 타임라인은 짧을 수록 좋다
3. 공유하는 자원이 적을 수록 좋다
4. 자원을 공유할 경우 서로 조율이 되어야 한다
5. 시간을 일급(first-class)로 다룬다

이번에는 4, 5번을 배운다

## 공유되는 자원이 사용되는 순서를 보장해야 한다

- 그러기 위해서 큐를 사용
- Queue 는 FIFO 이기 때문에 순서 관리가 가능하다!
- Queue 를 타임라인 조율에 사용할 경우 동시성 기본형(Concurrency primitive)라 부른다
  - 자원을 안정하게 공유 가능하면서 재사용이 가능한 코드
  - 예전에 듣던 OS랑 병렬 프로그래밍 생각이 ㅋㅋㅋㅋ
  - 동시성 관련 : https://spacebike.tistory.com/22#google_vignette
  - 식사하는 철학자 이슈 : https://namu.wiki/w/%EC%8B%9D%EC%82%AC%ED%95%98%EB%8A%94%20%EC%B2%A0%ED%95%99%EC%9E%90%20%EB%AC%B8%EC%A0%9C

## 큐를 사용한 동시성 기본형 코드

```js
// 기존 코드
function add_item_to_cart(item) {
  cart = add_item(cart, item);
  calc_cart_total(cart, update_total_dom);
}

function calc_cart_total(cart, cb) {
  let total = 0;
  cost_ajax(cart, function (cost) {
    total += cost;
    shipping_ajax(cart, function (shipping) {
      total += shipping;
      cb(total);
    });
  });
}

// 큐 적용 코드
// * 큐에 들어간 순서대로 setTimeout 에 의해 처리되어 동시에 자원 공유 X
function add_item_to_cart(item) {
  cart = add_item(cart, item);
  update_total_queue(cart);
}

function calc_cart_total(cart, cb) {
  let total = 0;
  cost_ajax(cart, function (cost) {
    total += cost;
    shipping_ajax(cart, function (shipping) {
      total += shipping;
      cb(total);
    });
  });
}

const queue_items = [];
let working = false;

function runNext() {
  if (working) return;

  if (queue_items.length === 0) return;

  working = true;
  const cart = queue_items.shift();
  calc_cart_total(cart, function (total) {
    update_total_dom(total);
    working = false;
    // 재귀
    runNext();
  });
}

function update_total_queue(cart) {
  queue_items.push(cart);
  setTimeout(runNext, 0);
}

// 큐를 Queue() 라는 함수에 넣은 코드
// * 전역 변수를 지역 변수화
// * 실행 함수를 지역 함수화
function Queue() {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;

    if (queue_items.length === 0) return;

    working = true;
    const cart = queue_items.shift();
    calc_cart_total(cart, function (total) {
      update_total_dom(total);
      working = false;
      // 재귀
      runNext();
    });
  }

  return function (cart) {
    queue_items.push(cart);
    setTimeout(runNext, 0);
  };
}

const update_total_queue = Queue();
```

\*\* 과연 이 방법이 좋은 방법일까? 그냥 이 상황을 피하는 형태로 코딩하는게 최선이 아닐까?
\*\* 좀 더 읽어 보고 판단 ㄱㄱ
\*\* [p. 490] 에서 Promise.all 이 언급 -> 따라서 피할 수 있으면 피해라
\*\* Promise 로 구현되면 동시성이 없어져 느려질 수 있으므로, Promise.all 로 동시성을 챙기면서 처리

## Queue 를 재사용할 수 있도록 만들기

```js
// * done 함수 빼기
// * Queue 에 인자 전달해서 재사용 가능하도록 수정
function Queue(worker) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;

    if (queue_items.length === 0) return;

    working = true;
    const cart = queue_items.shift();

    worker(cart, function () {
      working = false;
      runNext();
    });
  }

  return function (cart) {
    queue_items.push(cart);
    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function (total) {
    update_total_dom(total);
    done(total);
  });
}

const update_total_queue = Queue(calc_cart_worker);
```

## 작업이 끝났을 때 실행하는 콜백 받기

- 데이터와 콜백을 분리하여, 범용성 Up

```js
// * 데이터와 콜백 분리
function Queue(worker) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;

    if (queue_items.length === 0) return;

    working = true;
    // 범용적 이름 적용
    const item = queue_items.shift();

    // 데이터만 전달하여 계산에 사용
    worker(item.data, function (val) {
      working = false;
      // 콜백에 사용할 값을 인자로 전달
      setTimeout(item.callback, 0, val);
      runNext();
    });
  }

  // 데이터와 콜백을 나눠서 받기
  return function (data, cb) {
    // 큐에 데이터와 콜백이 있으면 콜백을 없으면, 빈 함수를 넣어서 작업 종료 후 처리할 것을 분리하여 전달
    queue_items.push({
      data,
      callback: cb || function () {},
    });
    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function (total) {
    update_total_dom(total);
    done(total);
  });
}

const update_total_queue = Queue(calc_cart_worker);
```

## 동시성 기본형(concurrency primitive) 만족

- Queue 를 사용하여 타임 라인을 하나로 묶어서 순서대로 처리 하도록 수정 가능
- 순서 보장을 하는 슈퍼 파워 도구 -> Linearize
- 이제 DOM 업데이트는 하나의 타임라인에서 일어나므로 자원 공유 문제에서 해방!
- 큐의 FIFO 특성으로 인해 타임 라인에서 왼쪽, 오른쪽이 나뉘어도 순서만 맞게 넣어주면 올바른 결과 도출 -> 문제 X

## Queue를 건너뛰도록 만들기

- Queue를 사용하면 순서는 보장 되지만, 모든 일이 동기적으로 처리 되기 때문에 느리다
- 드로핑 큐를 적용하여 새로운 작업이 들어오면 건너뛸 수 있도록 해서 속도 계선

```js
// * 큐의 길이를 1로 제한
// * 연속적으로 작업이 요청 되면 해당 작업을 한꺼번에 처리한 후, 결과를 보여주는 방식 X
// * 하나의 작업을 처리하고 결과 반영 -> 다시 큐에 작업 넣기를 반복
// * 요청을 하고 서버 응답을 빠르게 받아서 처리, 단 이전과 같이 자원 공유 & 실행 시점의 문제는 생기지 않는다

// 최대 큐 크기를 인자로 전달
function DroppingQueue(max, worker) {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;

    if (queue_items.length === 0) return;

    working = true;
    // 범용적 이름 적용
    const item = queue_items.shift();

    // 데이터만 전달하여 계산에 사용
    worker(item.data, function (val) {
      working = false;
      // 콜백에 사용할 값을 인자로 전달
      setTimeout(item.callback, 0, val);
      runNext();
    });
  }

  // 데이터와 콜백을 나눠서 받기
  return function (data, cb) {
    // 큐에 데이터와 콜백이 있으면 콜백을 없으면, 빈 함수를 넣어서 작업 종료 후 처리할 것을 분리하여 전달
    queue_items.push({
      data,
      callback: cb || function () {},
    });
    // max 보다 요청이 많이 들어오면 버린다
    // 그런데 이러면 요청이 씹히지 않나? 사용자가 의도한 액션이었다면? 이건 CS 들어올듯
    while (queue_items.length > max) queue_items.shift();
    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function (total) {
    update_total_dom(total);
    done(total);
  });
}

const update_total_queue = DroppingQueue(1, calc_cart_worker);
```

\*\* [p.466] 서버 응답을 받기 전에 사용자가 액션을 자주 하면, 액션이 씹히는 문제 발생! 만약 이 액션이 사용자가 의도한 액션이었다면? 문제가 생기지 않을까?
\*\* 일종의 디바운싱과 비슷한 이슈일듯? 이를 해결하는 방법은?

# CH17, 타임라인 조율하기

## 배송비만 추가 되는 버그 발생

- 닫는 괄호의 변경으로 인하여 ajax 요청이 거의 동시에 발생, 이로 인한 버그
- total 에 대한 접근이 거의 동시에 발생
- 이로 인해서 기대라지 않은 콜백이 먼저 실행되어 버그 발생
- 기존이라면 액션 완료 -> DOM 업데이트 -> 액션 -> DOM 업데이트 순서라서 각각 3, 4초가 걸리면 7초
- 변경 된, 코드는 3, 4초 작업이 동시에 발생하고 그 중에 시간이 더 긴 것이 완료 되면 종료 -> 4초
- 컷이라는 임의의 타임 라인을 적용해서 total 이 전부 계산 되고 난 다음에 total을 읽고 dom 업데이트!
- 동시성 기본형을 적용해서, 해당 문제를 해결!

```js
// 해당 함수를 통해서 모든 계산이 끝났을 때, 호출하는 cb 이 실행 가능하도록 수정 가능
// 따라서 최종 실행 cb 이 먼저 실행되서 생기는 문제 해결 가능!
// JS 는 싱글 스레드가 자연스럽게 작동하지만, 멀티 스레드라면 다른 기능 이용 필요
function Cut(num, cb) {
  let num_finished = 0;
  return function () {
    num_finished += 1;
    if (num_finished === num) cb();
  };
}

// 예제
const done = Cut(3, () => console.log("3 timelines are finished"));

done();
done();
done();

// done 3번 실행 이후, 콘솔 로그 실행
```

## 코드에 Cut 적용

- Cut 을 보관할 범위
- Cut 에 넣을 콜백
- 위의 2가지를 고려해서 적용해야 한다
- done 은 항상 코드의 끝에서 불러야 한다. 도중에 부르게 될 경우 콜백이 먼저 실행 되므로 의도치 않은 동작이 실행 가능

```js
// 기존 코드
function calc_cart_total (cart, cb) {
  let total = 0;

  const ajax(cart, function (cost) {
    total += cost;
  });

  shipping_ajax(cart, function (shipping) {
    total += shipping;
    cb(total);
  })
}

// Cut 적용
function calc_cart_total(cart, cb) {
  let total = 0;
  const done = Cut(2, function () {
    cb(total);
  });

  // 둘 중 더 늦게 호출 되는 done 이 들어와야 cb 이 실행되어 dom 이 업데이트
  cost_ajax(cart, function(cost) {
    total += cost;
    done();
  })

  shipping_ajax(cart, function(shipping) {
    total += shipping;
    done();
  })
}
```

## 딱 한번만 호출하는 동시성 기본형

- Cut() 대신 첫 번째로 실행되는 타임라인이 done() 호출 시 콜백이 실행되는 기본형
- JustOnce() 를 적용

```js
function JustOnce(action) {
  let alreadyCalled = false;
  return function (a, b, c) {
    if (alreadyCalled) return;
    alreadyCalled = true;
    return action(a, b, c);
  };
}
```

## 4가지 동시성 기본형

- 호출 순서에 따라 순서대로 처리하는 Queue()
- 특정 호출 횟수가 충족 되어야 마지막 콜백을 실행하는 Cut()
- 최초 실행시 한 번만 콜백을 실행하는 JustOnce()
- 호출 순서에 따라 실행하지만 결과를 바로 바로 반영하는 DroppingQueue()

## 타임 라인 사용하기 요약

- 타임 라인의 수를 줄이자
- 타임 라인의 길이를 줄이자
- 공유 자원은 없애자
- 동시성 기본형으로 자원을 공유하여 안전하게 처리 하자
- 동시성 기본형으로 타임라인을 조율하자

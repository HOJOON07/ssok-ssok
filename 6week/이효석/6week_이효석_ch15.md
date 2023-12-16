# CH15, 타임 라인 격리하기

## 타임 라인 다이어그램 기본 규칙

- 액션 순서대로 타임 라인에 넣기
  - 타임 라인에는 액션만 넣기, 계산은 실행 시점에 영향을 안받기 때문에 넣을 필요 X
- 동시 실행 || 순서 예상이 불가능하다면 타임 라인을 나누어 넣기
  - 해당 액션은 서로 다른 스레드나 프로세스에서 실행 되는 만큼 어떤 액션이 먼저 실행 되는지 알 수 없음!

## 순서가 섞이는 코드 vs 순서가 섞이지 않는 코드

- 순서가 섞일 수 있는 코드 : 액션이 각각 실행되는 코드(비동기 코드)
  - 스레드에 의해 동시 실행이 되므로, 어떤 액션이 먼저 끝날지 알 수 없다
- 순서가 섞일 수 없는 코드 : 액션이 순차적으로 실행되는 코드(동기화 처리 된 코드)
  - 하나의 액션이 끝나야, 다음 액션이 실행 되므로 순서가 섞이지 않는다
- 따라서 액션이 각각 다른 타임에 나열 되어있고, 해당 높이가 달라도 액션의 실행 시점과 종료 시점을 알 수 없으므로 차이가 없는 것과 동일하다

## 좋은 타임 라인의 원칙

1. 타임라인은 적을 수록 좋다
2. 타임라인은 짧을 수록 좋다
3. 공유하는 자원이 적을 수록 좋다
4. 자원을 공유할 경우 서로 조율이 되어야 한다
5. 시간을 일급(first-class)로 다룬다

## AJAX(Asynchronous Js And Xml)와 이벤트 큐

- AJAX 요청이 들어가면 이벤트 루프 이외에 네트워크 엔진이 추가되어 AJAX 요청을 작업 큐에 넣는 역할을 한다
- AJAX 요청이 완료 되면 네트워크 엔진이 AJAX 에 대한 콜백을 다시 작업 큐에 추가하여 요청을 완료하는 구조

## 타임 라인 단순화

1. 비동기 액션이 발생하면 점선으로 타임라인을 분리하기
2. 같은 타임라인에 있는 액션(순서가 섞이지 않는)은 하나로 통합하여 단순화 하기
3. JS 는 싱글 스레드이기 때문에 동시에 실행되는 가능성이 없다 -> 따라서 단순화가 쉽다
4. 3에 의해 타임 라인이 '끝나고' 새로운 타임 라인 시작 된다면 하나로 통합하기가 가능해짐

### 타임 라인을 쉽게 만드는 네 가지 원칙

1. 적은 타임 라인
2. 짧은 타임 라인
3. 적은 공유 자원
4. 자원 공유가 발생하면 조율하기

## 자원 공유하는 타임 라인 문제점 해결하기

1. 전역 변수를 지역 '변수'로 변경 -> 지역 변수에 대한 처리는 액션이 아니라 계산이므로 타임 라인에서 빠질 수 있다
2. 전역 변수를 '인자'로 변경 -> 전역 변수를 인자로 변경하여, 추후 액션은 콜백 이후에 다시 읽도록 변경 -> 타임 라인에서 항상 자원이 동시에 공유가 되지 않고 순서대로 실행 가능

\*\* [p. 433] 아무리 봐도 함수형 코딩의 최대 장점을 쉬운 개념으로 어필 할 수 있는 언어가 JS 인 것 같습니다 ㅋㅋㅋㅋㅋ
\*\* [p. 434] 7번은 JS 기준으로는 F 아닌가요? 싱글 스레드라서 동시에 실행은 JS 에서 불가능 합니다(p. 420 참조)

## 비동기 함수에서는 리턴을 콜백으로 사용

- 동기 함수에서는 액션을 리턴 값으로 사용
- 비동기 함수에서는 해당 비동기의 액션이 종료 된 이후, 콜백이 실행이 보장 되어야 하므로 콜백을 사용한다
  - 바로 리턴을 쓰면, 비동기 액션이 종료 되기 이전에 리턴을 먼저 실행하는 문제 발생
  - JS 에서는 Call Stack 과 Callback Queue(Task Queue / Job Queue) 를 나누어서 이를 해결
    - Task Queue(=Macro Task Queue) : setTimeout(), setInterval(), addEventListener() 등등
    - Job Queue(=Micro Task Queue) : Promise callback, async func
  - Call Stack 에는 JS에서 수행할 일들이 Stack 에 쌓이고 순차적으로 처리
  - Callback Queue 에는 비동기적 처리들이 발생하면 Call Stack 이 완전히 비워지기를 기다렸다가 해당 작업을 Call Stack 에 추가
  - 따라서 Callback 은 특정 액션 종료 이후 실행이 보장

```js
function async(input, cb) {
  // input 액션
  cb();
}

function caller() {
  async("입력", update_total_dom);
}
```

- 해당 형태는 대다수의 JS 콜백 내장 함수의 형태와 동일하다!
- 이런 함수들은 보통, 사용자의 입력에 의해 예상치 못한 상황 또는 시간이 필요한 함수에 사용 된다

```js
addEventListener("click", () => console.log("addE"));

setTimeout(() => {
  console.log("setTimeout");
}, 1000);
```

\*\* 참고하기 좋은 블로그

https://velog.io/@dahyeon405/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EB%A5%BC-%ED%86%B5%ED%95%9C-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC

### 연습문제

```js
let plates = "...";
let forks = "...";
let cups = "...";

// Callback 버전
function doDishes(plates, forks, cups, cb) {
  let total = 0;
  wash_ajax(plates, () => {
    total += plates.length;
    wash_ajax(forks, () => {
      total += forks.length;
      wash_ajax(cups, () => {
        total += cups.length;

        cb(total);
      });
    });
  });
}

doDishes(plates, forks, cups, update_dishes_dom);

// Async, Await 버전
async function doDishes(plates, forks, cups) {
  let total = 0;

  await wash_ajax(plates);
  total += plates.length;

  await wash_ajax(forks);
  total += plates.length;

  await wash_ajax(cups);
  total += plates.length;

  return update_dishes_dom(total);
}
```

\*\* [p. 438] 여기서 update_dishes_dom 함수를 인자로 받는게 좋을까요? 아니면 그냥 불러오는게 좋을까요?

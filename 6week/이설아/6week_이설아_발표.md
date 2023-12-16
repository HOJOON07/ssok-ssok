- JS는 싱글 스레드 → 1개의 call stack을 가지고 있음
- 그러나 이벤트 루프를 통한 비동기 처리로 동시성을 지원

# Evnet Loop

- JS 엔진 내부에서 비동기 요청을 처리하진 않음 → 콜 스택에 들어오는 요청을 순차적으로 처리하는 역할
- 비동기 요청은 런타임 환경(브라우저, Node.js)에서 제공하는 Web API가 처리하게 됨

## 동작 과정

1. 콜 스택에 현재 실행 중인 컨텍스트가 있는지, 테스크 큐에 대기 중인 함수가 있는지 반복하며 확인
2. 만약 콜 스택이 비어있고, 테스크 큐에 대기중인 함수가 있다면 순차적으로 콜스택으로 이동 후 실행
3. 태스크 큐와 마이크로 태스크 큐에 대기 중인 함수가 있다면, 마이크로 테스크 큐를 우선적으로 처리 후 테스크 큐 처리

## Web API

- 비동기 작업을 처리하기 위해 브라우저가 제공하는 API
- 처리 가능한 비동기 작업들: DOM, AJAX, Timeout
- 브라우저는 Web API의 비동기 작업을 JS 엔진과 별개의 스레드에 위임
- 해당 스레드가 비동기 작업을 완료하면 함께 전달받은 콜백함수를 콜백 큐에 넣음

## 콜백 큐(Callback Queue)

- Web API에서 비동기 작업이 처리된 후의 콜백 함수가 보관되는 영역
- 이벤트 루프 과정을 통해 콜백 함수들을 호출 스택으로 전달하기도 합니다.
- 우선순위 : **Microtask Queue > Animation Frames > Task Queue (브라우저마다 다를 수 있음)**

### **1. Task Queue (Macrotask Queue, Event Queue)**

- Timer 관련 비동기 콜백 함수들이 저장
  - setTimeout()
  - setInterval()
  - setImmediate()
- 이벤트 루프의 우선순위는 가장 낮음

### 2. **Microtask Queue (Job Queue)**

- **Promise 등의 비동기 콜백 함수**들이 저장
  - Promise
  - async / await
  - process.nextTick
  - Object.observe
  - MutationObserver
- 이벤트 루프의 우선순위는 가장 높음

## + Debounce

- UI에서 발생하는 이벤트를 제어하는 방법으로 과도하게 이벤트 처리가 호출되지 않도록 하여 부하방지를 위해 쓰이는 방법
- 함수를 여러 번 호출하고 마지막 호출에서 일정 시간이 지난 후 해당 함수의 기능이 동작하는 것

```jsx
// 디바운스 함수 정의
const debounce = (func, delay) => {
  let timerId;

  return (...args) => {
    // 이전 타이머가 있으면 취소
    clearTimeout(timerId);

    // 새로운 타이머 설정
    timerId = setTimeout(() => {
      // 지정된 시간이 지난 후에 원본 함수 호출
      func.apply(this, args);
    }, delay);
  };
};

const handleClick = () => {
  console.log('Button clicked!');
};

// 디바운스된 클릭 이벤트 핸들러 생성
const debouncedClick = debounce(handleClick, 500); // 500ms 딜레이
```

[정리 노션 링크](https://www.notion.so/6-79b0ec85fe7d4248855394a6df415593?pvs=21)

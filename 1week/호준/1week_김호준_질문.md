p70 생각해보기에서 리팩토링에 대해 설명하고 있다.

리펙터링이란?
소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법
주의: 리팩터링은 특정한 방식에 따라 코드를 정리하는것이며, 단순히 코드를 정리하는 작업은 리펙터링이 아니고 `재구성(restructuring)`이라고 명칭

리팩터링을 하는 타이밍

1. 처음에는 그냥 한다

2. 비슷한 일을 두 번째로 하게 되면, 일단 계속 진행한다.

3. 비슷한 일을 세 번째 하게 되면 리팩토링 한다.

- 리팩토링이 필요 없는 코드는?
  - 리팩토링보다 처음부터 새로 작성하는게 쉬운 경우

# 카피 온 라이트 : Copy on Write

## 좋은 블로그 글이 있어서 공유합니다!

https://velog.io/@teo/functional-programming#%EC%B9%B4%ED%94%BC-%EC%98%A8-%EB%9D%BC%EC%9D%B4%ED%8A%B8-copy-on-write

JS에서 깊은 복사를 구현하는 방법

- lodash 라이브러리
- 재귀함수
- JSON.parse(성능에 좋지 않음)

## 깊은 복사를 지원하는 API 생김

```
const myDeepCopy = structuredClone(myOriginal);
```

## 기능 및 제한 사항

Structured cloning은 JSON.stringify()의 많은 (전부는 아니지만) 단점을 해결합니다. 구조적 복제는 순환되는 데이터 구조를 처리할 수 있고, 내장 데이터 타입을 지원할 수 있으며 일반적으로 더 강력하고 더 빠릅니다.

그러나 여전히 몇 가지 제한 사항이 있습니다.

- 프로토타입 : structuredClone()를 클래스 인스턴스와 함께 사용 하는 경우, strucuted cloning이 객체의 프로토타입 체인을 폐기하므로 반환 값은 일반 객체가 됩니다.
- 함수 : 객체에 함수가 포함되어 있으면 폐기됩니다.
- 복제 불가 : 일부 값, 특히 Error와 DOM 노드는 구조화된 복제가 불가능합니다. 그것은 structuredClone() 예외 에러(throw)의 원인이 됩니다.
  이러한 제한 사항이 당신이 사용하려는 상황에 해당한다면 Lodash와 같은 라이브러리는 여전히 다른 깊은 복사 알고리즘을 custom하여 적용할 수 있도록 제공하고 있습니다.

## 성능

요약 : 복사본을 생성하기 위한 기본 접근 방식으로 정해놓아도 손색없습니다.

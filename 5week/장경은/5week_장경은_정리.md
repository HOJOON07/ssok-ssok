## 13장 (함수형 도구 체이닝)

-   map, filter, reduce를 더 잘 사용하는 방법
-   각 단계에 이름을 붙여 체인을 명확하게 만들기
    -   함수 안에서 사용하는 각 단계의 고차함수에 이름 붙이기
-   콜백에 이름을 붙여 체인을 명확하게 만들기
    -   콜백으로 전달하는 함수를 따로 정의하여 이름 붙이기
-   스트림 결합
    -   map을 두 번 사용 -> map 하나로 처리
    -   map과 reduce를 한 번씩 사용 -> map을 reduce로 대체하여 reduce 하나로 사용
    -   체인을 최적화하는 것
-   반복문을 함수형 도구로 리팩토링하기
-   체이닝 디버깅을 위한 팁
    -   의미를 기억하기 쉽게 이름 붙이기
    -   타입을 따라가 보기 -> reduce()의 결괏값은 콜백이 리턴하는 값과 같다.

## 14장 (중첩된 데이터에 함수형 도구 사용하기)

-   중첩된 데이터를 재귀함수를 통해서 카피온라이트 하기
-   중첩된 데이터를 다룰 때는 재귀가 더 쉽고 명확하다

## 질문 및 느낀점

-   화살표 함수, 자바스크립트 내장 map, 자바의 람다/인터페이스 등 스터디에서 얘기했던 것들이 실제로 등장했습니다
-   재귀함수까지 사용하면서 카피온 라이트를 하는데, 이렇게 복잡하게 만들면서까지 카피온라이트를 할 가치가 있는걸까? 라는 의문이 들었습니다. (물론 lodash 같은 것을 사용하면 해결되긴 합니다) -> 그렇지만 그것이 함수형 프로그래밍의 길..
-   면접에서 깊은 복사를 라이브러리 없이 구현하려면 어떻게 하겠냐 해서 for문으로 해보겠다 대답한 적이 있습니다. 아마도 질문의 의도는 재귀함수로 하겠다는 대답을 원했던 것 같은데.. for문으로 구현한다면 어떤 모습일까요?

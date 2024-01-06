# CH18, 반응형 아키텍처와 어니언 아키텍쳐

## 반응형 아키텍쳐

- 코드에 나타난 순차적 액션의 순서를 뒤집는 것
- 효과와 원인을 분리하여 코드에서 복잡하게 꼬인 부분을 풀 수 있다

## 어니언 아키텍쳐

- 현실 세계와 상호작용하기 위한 서비스 구조를 만드는 아키텍쳐
- 언어 / 도메인 / 인터랙션 등으로 구성 된다

## 반응형 아키텍쳐의 절충점

- 원인과 효과가 결합한 것을 분리 -> 코드 읽기는 어려워 지지만, 코드가 하려고 하는 것은 명확하게 표현 가능
- 여러 단계 파이프 라인으로 처리 -> 액션과 계산을 조합하여, 여러 단계를 파이프 라인으로 처리
- 타임 라인이 유연해진다

## ValueCell

- 스프레드 시트의 개념, 시트의 값이 변경 되면 모든 함수가 다시 계산 되는 점에서 착안
- 감시자의 개념을 추가하여 해당 값이 변경 되면, 등록 된 모든 감시자를 실행하여 업데이트 누락을 방지

```js
function ValueCell(initVal) {
  let curVal = initVal;
  const watchers = [];
  return {
    val: function () {
      return curVal;
    },
    update: function (foo) {
      let oldVal = curVal;
      let newVal = foo(oldVal);
      if (oldVal !== newVal) {
        curVal = newVal;
        forEach(watchers, function (watcher) {
          watcher(newVal);
        });
      }
    },
    addWatcher: function (foo) {
      watchers.push(foo);
    },
  };
}
```

- 위의 ValueCell 을 실제 적용한 코드

```js
const shopping_cart = ValueCell({});

function add_item_to_cart(name, price) {
  let item = make_cart_item(name, price);
  shpping_cart.update(function (cart) {
    return add_item(cart, item);
  });
  let total = calc_total(shopping_cart.val());
  set_cart_total_dom(total);

  update_tax_dom(total);
}

// 쇼핑 카트가 벼경되면 shpping 아이콘이 왓쳐에 등록, 해당 값이 변경 될 때마다 실행
shpping_cart.addWatcher(update_shipping_icons);
```

## FormulaCell 로 파생된 값도 반응형으로 계산

```js
function FomulaCell(upstreamCell, foo) {
  const myCell = ValueCell(foo(upstreamCell.val()));
  upstreamCell.addWatcher(function (newUpstreamValue) {
    myCell.update(function (currentValue) {
      return foo(newUpstreamValue);
    });
  });
  return {
    val: myCell.val,
    addWatcher: myCell.addWatcher,
  };
}
```

```js
const shopping_cart = ValueCell({});
const cart_total = FormulaCell(shopping_cart, calc_total);

function add_item_to_cart(name, price) {
  let item = make_cart_item(name, price);
  shpping_cart.update(function (cart) {
    return add_item(cart, item);
  });
}

shpping_cart.addWatcher(update_shipping_icons);

// 기존 add_item_to_cart 에서 실행하던 액션을 watcher 에 추가하여 파생 값을 자동 계산하도록 수정
cart_total.addWatcher(set_cart_total_dom);
cart_total.addWatcher(update_tax_dom);
```

\*\* [p. 518] ValueCell 을 리액트의 Redux / Recoil 에 빗대어 설명
\*\* 생각해 보면 상태 관리 라이브러리의 경우 해당 상태 값이 변경 되면, 해당 값을 사용하는 모든 컴포넌트를 업데이트!
\*\* ValueCell 의 개념과 같다

## 결합과 분리 / 원인과 효과의 중심 관리

- 기존의 코드는 장바구니와 관련 되어, 장바구니를 바꾸는 방법이 5가지 & 장바구니가 바뀔 때 해야할 액션이 4가지
- 이때 클릭 핸들러를 도입하여 장바구니가 바꾸는 액션이 하나로 컨트롤
- 전역 장바구니에 대한 액션은 장바구니 변경 핸들러 하나로 처리
- 5 x 4 의 가능성을 5 + 4 로 변경 가능!

## 어니언 아키텍쳐의 구조

- 인터랙션 계층 : 바깥세상에 영향을 주거나 받는 액션, 현실 세계와 상호 작용
- 도메인 계층 : 비즈니스 규칙을 정의하는 계산
- 언어 계층 : 언어 유틸리티와 라이브러리
- 가장 바깥 쪽인 인터랙션 계층이 제일 변경 및 재사용이 쉽다

## 전통적인 계층형 아키텍쳐

- 웹 인터페이스 계층 : 웹 요청을 도메인으로 바꾸고, 도메인을 웹 응답으로 바꿈
- 도메인 계층 : DB 쿼리, 명령으로 요청에 대한 응답을 만드는 곳
- 데이터베이스 계층 : 정보를 저장하는 계층

## 함수형 아키텍쳐

- 함수형 아키텍쳐의 경우 도메인은 계산의 영역이므로 시간에 따라 데이터가 변경되고 저장되는 데이터 베이스에 의존하지 않음
- 도메인 영역(ex. cart_total()) 은 계산으로 처리한다!
- AJAX 요청은 도메인이 될 수 없다!
- 아래와 같이 3가지로 구분
- 인터렉션 (웹 / 데이터 베이스)
- 도메인
- 언어 (라이브러리, JS)

\*\* 도메인은 이런 개념에 가깝다고 봐야할듯, 10$ 이상이면 배송이 무료다!
\*\* 그런 부분에 있어서 배송이 무료인 도메인을 결정하는 것은 모든 액션이 종료 된 장바구니 총합의 값을 계산하면 끝! 이니까!

## 고려해야할 부분

- 이상적으로 어니언 아키텍쳐는 좋다
- 하지만 코드의 가독성, 개발 속도, 시스템 성능을 충분히 고려하여 개발을 해야한다!

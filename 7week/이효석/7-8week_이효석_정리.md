# CH16, 타임라인 사이에 자원 공유하기

- [p.466] Queue 또는 DroppingQueue 를 사용하는 방법이 좋을까요? 이런 상황을 피하는 형태가 오히려 더 좋을 것 같은데, 어떻게 생각 하시나요?
- [p.490] 에서 Promise.all 을 사용하는 법 등이 언급이 되어 있으므로, 피할 수 있으면 피하는게 좋을 것 같다는 느낌이 강하게 오네요.
- 위의 문제는 프론트에서 너무 많은 것을 처리하려다 생기는 문제로 보이는데, DB에 데이터를 바로바로 업데이트 하고 필요할 때 부르면 문제가 해결되지 않을까요? 물론, 장바구니 같은 특수 이슈의 경우와 효율을 따지면 이야기는 달라질 것으로 보입니다만
- [p.466] DroppingQueue 적용 시, 서버 응답을 받기 전에 사용자가 액션을 자주 하면 액션이 씹히는 문제가 발생하지 않을까요? 만약 이 액션이 사용자가 의도한 액션이었다면 이는 버그일까요?
- 일종의 디바운싱과 비슷한 이슈일 것으로 보이는데? 이를 해결하는 방법은 어떤 것이 좋을까요?

# CH17, 타임라인 조율하기

# CH18, 반응형 아키텍처와 어니언 아키텍쳐

- [p.518] ValueCell 을 리액트의 Redux / Recoil 에 빗대어 설명하는 것으로 보아, 생각해 보면 상태 관리 라이브러리의 경우 해당 상태 값이 변경 되면, 해당 값을 사용하는 모든 컴포넌트를 업데이트 하므로 ValueCell 의 개념과 같다고 생각이 듭니다!
- 예측 못하는 버그를 막기 위해, 해당 값이 사용되는 모든 콜백을 등록하고 값이 변경 되면 해당 콜백을 전부 재실행 시키는 watcher 의 개념은 좋았습니다.

# CH19, 함수형 프로그래밍 여행에 앞서

- [p.541] 직장 상사의 심기를 건드리지 않고 새로운 기술을 적용 or 학습하는 기술 ㅋㅋㅋㅋ
- [p.545] 가장 위험한 지점은 아직 숙달되지 않았지만, 과도하게 새로운 기술을 적용하려고 할 때 ㅋㅋㅋㅋ
- [p.556] 챕터 제목 + 다음 장에서 배울 내용이 있어서 띠용 했었는데, 유쾌하게 끝내서 좋네요!

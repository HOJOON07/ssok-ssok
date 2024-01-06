## Parallel Routes & Intercepting Routes

[Next.js 공식문서](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
[Nextgram 예제](https://nextgram.vercel.app/)

-   Next 13 App Router에서 지원하는 기능

### 클라이언트 상태관리 최소화

-   클라이언트 상태관리 라이브러리를 과도하게 사용하면 데이터를 디버깅하기 어려워진다는 단점이 있음
-   이에 따라 클라이언트 상태관리를 최소화하자는 의견 증가

### Intercepting Routes의 장점

-   URL을 통해 모달 내용 공유 (https://nextgram.vercel.app/photos/1)
-   페이지 새로고침 후 모달을 닫지 않음
-   뒤로가기로 모달 닫음
-   앞으로 가기로 모달 열음
-   클라이언트 상태관리 최소화

### 사용하지 않은 이유

-   폴더 구조의 복잡성 증가
    <img width="206" alt="스크린샷 2024-01-05 오후 11 00 13" src="https://github.com/HOJOON07/ssok-ssok/assets/108623656/afcb36f5-ca11-488f-86d1-d7f4df516496">
-   모달에서 새로고침 시 어떤 화면이 나와야 하는가?
-   페이지 이동으로 인한 사용자 경험 저하
-   화면 깜빡임도 존재
-   스크롤 최상단으로 변화 (Link 태그의 기본 기능, [이슈](https://github.com/vercel/next.js/discussions/47781#discussioncomment-7361088) 있음)
-   코드에 큰 변화 필요 (비용 발생)

### 적절하게 사용할 수 있는 사용처

-   instagram 게시물
-   로그인과 같은 기능이 모달에서 구현된 경우
-   URL로 공유해야 할 모달창

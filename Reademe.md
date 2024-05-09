# React Shop

- 기존에 있는 React Shop 어플리케이션을 똑같이 구현하는 것을 목표로 한 프로젝트입니다.

## 디렉토리 구조

```
.
├─.vercel
├─.vscode
├─api
├─public
└─src
  ├─assets
  │  ├─css
  │  └─img
  │      ├─carousel
  │      ├─favicon
  │      └─svg
  ├─components
  │  ├─carts
  │  ├─CategoryContainer
  │  ├─common
  │  ├─layout
  │  │  ├─NavItems
  │  │  └─Theme
  │  └─products
  ├─constants
  ├─CustomHook
  ├─helpers
  ├─router
  ├─store
  └─views
```

## dark mode

버튼으로 테마가 토글되는 기능을 구현하는데 local storage 상태를 지우고 새로고침을 하면 토글버튼 아이콘도 보이지 않는 현상을 해결하기 위해 많은 방법을 시도해봤다.

recoil상태에 effect도 넣어보고 조건부 렌더링 코드에 조건 추가도 많이 해봤는데 모두 해결이 안돼서 고민하던 중, 예시 페이지에서 아이콘이 어떻게 작동하는 지를 더 구체적으로 살펴보니 input checkbox 타입이라 checked 여부에 따라 아이콘이 변경되도록 스타일링되어있다는 것을 알게 되었다. 그래서 checked 속성을 이용해 코드를 수정하니 해결됐다.

## Cart

Cart 기능을 구현하면서 기록한 내용을 남깁니다.

- addCart : cart에 아이템의 데이터를 추가하는 Recoil 함수 입니다.
  removeFromCart를 참고해 cart에 기존에 저장된 제품이 있을 경우와, 아닌 경우를 분기처리해 tempCart를 정해주고,
  기존 cart에 지금 추가하려는 아이템의 id가 있다면 count를 증가시켜주고, 아니라면 새로 아이템을 추가해주는 방식으로 코드를 작성했다.

- Cart 기능을 구현하면서 처음에는 remove가 되면 cart에는 남아있는데 렌더링이 안되는 문제때문에 해결하기 위해서 방법을 찾아보다가 CartList를 렌더링하는 CartView 컴포넌트 코드를 잘못 작성했다는 것을 알게되었다. 전반적인 문제는 cart의 데이터 구조가 일관되지 않아서 여기저기서 문제가 발생했던 것 같다. 그리고 따로 cart가 비어있는지 판단하는 isCartEmpty를 만들어 렌더링할 때 cart에 아이템이 있을 경우에만 해당 요소를 렌더링하도록 했다.

- count가 반영이 안되는 문제도 있었는데, 한 번은 cart의 count를 가져오는 과정에서 뭔가 문제가 있었고, 그 값을 그대로 innerText로 렌더링하려고 했더니 아이템 개별 컴포넌트인 CartItem에서 처리하려고 해서 그런가 cart에 아이템이 없을 때 렌더링을 하지 않는 코드를 따로 추가해주어야 했다. 그래서 아래 코드를 추가했다.

```tsx
if (!cart || cart[cartID] === undefined) {
  return null;
}
```

- price를 계산하는 기능을 구현할 때도 문제가 많았다. 처음에는 템플릿에 미리 작성되어있었던 cartState와 비슷하게 코드를 짜서 로컬스토리지에 연동이 되도록 구현하려고 했는데 count를 클릭할 때마다 바로 현재 기준으로 업데이트가 되는게 아니라 한 단계씩 밀려서 이전 값으로 업데이트가 되길래 구글링도 해보고 하다가 방법을 찾지 못해서 chatGPT에게 도움을 청했다. recoil의 effect를 이용하지 않고 해당 로직을 커스텀훅으로 분리하는 방법을 추천하기에 그 방법으로 구현했다.


## Search
- Search Bar 컴포넌트를 이용해 구현했는데

    > Warning: Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.
  
  이런 오류가 발생했다. 어느 부분이 문제인지 아직 파악을 못했다ㅠㅠ

  -> productsList를 사용하는 모든 컴포넌트의 코드를 Loadable을 이용해 data가 불러와졌을 때 list를 사용하는 것으로 수정했더니 해결됐다.

## Route
- Route를 이용하는 부분에서 모든 페이지를 하나하나 route로 만들 필요가 없이 useParams를 이용해 개별페이지를 구성할 수 있다는 것을 알게되었다!

## Vercel

### 배포 단계

- 배포 후에
  Error:
  SyntaxError: Unexpected token '<', "`<!DOCTYPE `"... is not valid JSON
  에러 발생

- 코드에 여러 문제점이 있는 것을 확인
- 우선 환경변수 설정을 vercel에서 따로 해주어야하는 것을 알게 되었다. .env파일을 vercel에 등록해주었다.
- Route 관련 코드부터 잘못되어있어(위의 Route 부분에서 작성한 내용과 같은 내용) 전반적으로 코드를 수정했고, recoil을 이용하는 부분에서 데이터가 로드되기 전에 상태를 다루는 현상이 발생하는 것으로 추정되어 ```useRecoilValueLoadable()```을 이용해 데이터가 완전히 로드됐을 때 코드를 수행하는 식으로 구성했다.
- 나중에는 해당부분에서 다른 상태처리 로직이 필요할 일이 생길 수 있다고 판단해 아래와 같이 커스텀 훅을 만들어 분리했다.
```tsx
const useProductsLoadable = () => {
  const productsData = useRecoilValueLoadable(productsList);
  const productsLists = productsData.state === "hasValue" ? productsData.contents : [];
  return productsLists;
};

export default useProductsLoadable;
```

- 이렇게 작업한 후 해당 에러가 사라진 것을 확인할 수 있었다.

### 배포 주소

- vercel.json은 서버에서 CSR(Client Side Rendering) 시에 라우팅 주소를 알 수 없기 때문에 rewrite로 주소를 루트로 보내어 Client의 Routing 시스템을 사용하도록 유도합니다. (아래 설정 이용)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
- https://react-shop-geunana.vercel.app/

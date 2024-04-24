# React Shop

- 여러분이 직접 개인 프로젝트를 구성하듯 만드셔도 괜찮습니다.
- 클론코딩을 한다면, 코드에 대한 회고들을 남기고 구현한 기능들의 내용들을 이해하시면서 경험하는 내용들을 작성 해보세요.

## 디렉토리 구조

- 여러분의 디렉토리 구조를 도식화 해보세요. 아래는 예시입니다.

```
.
├── .github               # Github setting folder
├── .vscode               # VSCode setting folder
├── public                # Public folder
│   └── assets
│       └── images        # Images
├── src
│   ├── components        # all components
│   ├── pages             # Next JS pages
│   ├── styles            # PostCSS style folder with Tailwind
│   └── utils             # Utility folder
├── .eslintignore         # Ignore ESLint
├── .eslintrc             # ESLint settings
├── .gitignore            # Ignore Git commit
├── .nvmrc                # Specification of NPM
├── .prettierignore       # Ignore prettier
├── .prettierrc           # Formatting code setting
├── LICENSE               # License file
├── lint-staged.config.js # Lint information
├── next-env.d.ts         # NextJS environment definition file
├── next.config.js        # NextJS configuration
├── package-lock.json     # Same packages with others
├── package.json          # Package information
├── postcss.config.js     # PostCSS setting
├── SECURITY.md           # Security
├── README.md             # README file
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## dark mode

버튼으로 테마가 토글되는 기능을 구현하는데 local storage 상태를 지우고 새로고침을 하면 토글버튼 아이콘도 보이지 않는 현상을 해결하기 위해 많은 방법을 시도해봤다. recoil상태에 effect도 넣어보고 조건부 렌더링 코드에 조건 추가도 많이 해봤는데 모두 해결이 안돼서 고민하던 중, 예시 페이지에서 아이콘이 어떻게 작동하는 지를 더 구체적으로 살펴보니 input checkbox 타입이라 checked 여부에 따라 아이콘이 변경되도록 스타일링되어있다는 것을 알게 되었다. 그래서 checked 속성을 이용해 코드를 수정하니 해결됐다

Q.
질문1: daisyui와 tailwind 라이브러리를 이용해 css를 해보려고 했는데 어떤 요소들은 클래스에 dark: 를 붙여서 다크모드에서 자연스럽게 해당 스타일이 적용이 됐는데 어떤 요소는 적용이 되지 않아서 따로 state를 조건으로 클래스이름을 붙여주었습니다
그러다보니 코드가 너무 깔끔하지가 않고 반복되는 부분도 생기고 그러더라고요ㅠㅠ 원인을 찾지를 못했는데 혹시 왜 그런 걸까요..?

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
  ..

## Search

- Search Bar 컴포넌트를 이용해 구현했는데
  Warning: Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.
  이런 오류가 발생했다. 어느 부분이 문제인지 아직 파악을 못했다ㅠㅠ

  -> 멘토님께서 말씀해주신대로 productsList를 사용하는 모든 컴포넌트의 코드를 Loadable을 이용해 data가 불러와졌을 때 list를 사용하는 것으로 수정했더니 해결됐다.

  - Route를 이용하는 부분에서 모든 페이지를 하나하나 route로 만들 필요가 없이 useParams를 이용해 개별페이지를 구성할 수 있다는 것을 알게되었다!

## Vercel

### 배포 단계

- 배포 후에
  Error:
  SyntaxError: Unexpected token '<', "`<!DOCTYPE `"... is not valid JSON
  에러 발생

### 배포 주소

- vercel.json은 서버에서 CSR(Client Side Rendering) 시에 라우팅 주소를 알 수 없기 때문에 rewrite로 주소를 루트로 보내어 Client의 Routing 시스템을 사용하도록 유도합니다.
- https://react-shop-oinochoe.vercel.app/

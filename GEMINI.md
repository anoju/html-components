# HTML Web Components 프로젝트

React나 Vue처럼 **Shadow DOM(캡슐화)과 속성(Props) 반응성**을 갖춘 **Web Components** 방식으로 구현한 프로젝트입니다.

이 방식은 별도의 빌드 도구 없이 `index.html`과 자바스크립트 파일만으로 작동하며, 컴포넌트의 스타일이 외부 CSS에 영향을 받지 않는 장점이 있습니다.

## ⚠️ 코딩 규칙 (필독)

1.  **언어**: 모든 대화와 주석은 반드시 **한글**로 작성합니다.
2.  **컴포넌트 구조**:
    - 태그명은 `ui-*` 형식을 사용합니다 (예: `ui-input`).
    - **Self-Unwrapping**: 렌더링 시 커스텀 태그(`ui-*`)는 사라지고, 내부의 표준 HTML(`input`, `button` 등)로 대체되어야 합니다.
3.  **스타일**:
    - **Light DOM**을 사용하며, SCSS로 작성 후 컴파일합니다.
    - Shadow DOM은 사용하지 않습니다.
    - **CSS 수정 금지**: `.css` 파일(특히 `src/css/` 내 파일)은 사용자가 직접 컴파일/작성하므로 **절대 수정하지 않습니다**. 스타일 변경이 필요하면 SCSS를 수정하세요.

## 📁 프로젝트 구조

```
src/
  ├── components/       # UI 컴포넌트
  │   └── ui/
  │       ├── input/
  │       ├── checkbox/
  │       ├── radio/
  │       └── button/
  ├── scss/             # SCSS 스타일 (소스)
  │   ├── abstracts/    # 변수, 믹스인
  │   ├── base/         # 리셋
  │   ├── components/   # 컴포넌트 SCSS (_input.scss 등)
  │   └── main.scss     # 메인 진입점
  ├── css/              # 컴파일된 CSS (결과물 - 수정 금지)
  │   └── main.min.css
  └── main.js           # 메인 진입점
index.html              # 사용 예제
```

## ✨ 주요 특징

1.  **React/Vue 유사 문법**: HTML 태그에 속성(Attribute)을 넘겨주면 내부에서 렌더링 됩니다.
    - `<ui-input label="이름" placeholder="홍길동"></ui-input>`
    - `<ui-checkbox label="동의합니다" checked></ui-checkbox>`
2.  **Self-Unwrapping**: 렌더링된 직후 컴포넌트 태그(`ui-*`)는 사라지고, 순수 HTML 구조(`wrapper > input`)만 남습니다.
    - 결과적으로 깨끗한 DOM 트리를 유지하며 표준 Form API와 호환됩니다.
3.  **SCSS & Atomic Design**: 컴포넌트별 SCSS 파일(`ui-*-wrapper`)을 분리하여 관리합니다.
4.  **한글화 완료**: 모든 주석, 예제, 로그 메시지를 한글로 작성했습니다.

## � 컴포넌트 작성 가이드 (개발자용)

새로운 UI 컴포넌트를 만들 때 다음 규칙을 따르세요:

1.  **Self-Unwrapping 패턴**:
    - `connectedCallback`에서 `this.render()` 호출 후 `this.replaceWith(wrapper)`를 실행하여 커스텀 태그(`ui-*`)를 제거합니다.
2.  **속성(Attribute) 처리**:
    - **스타일/클래스** (`class`, `style`): 최상위 **Wrapper** 요소에 적용하여 레이아웃을 제어합니다.
    - **기능 속성** (`value`, `disabled`, `type` 등): 내부의 **핵심 요소**(`input`, `button` 등)에 전파합니다.
    - **이벤트** (`onclick`, `onchange` 등): 내부 핵심 요소에 전파하거나, Wrapper가 `label`이라면 자연스럽게 동작하도록 둡니다.
3.  **구조(Markup)**:
    - 폼 요소(`input`, `select`)는 반드시 `<label>` 또는 `<div>` 래퍼로 감싸서 `display: flex/grid`로 레이아웃을 잡습니다.
    - 버튼(`button`)은 래퍼 없이 `<button>` 태그 자체로 교체해도 무방합니다.

## �🚀 실행 방법 (중요)

이 프로젝트는 VS Code의 **Live Server** 확장 프로그램을 사용하여 실행합니다.
`index.html` 파일을 열고 Live Server로 실행("Go Live" 버튼 클릭)하여 확인하세요.

```

```

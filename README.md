# HTML 웹 컴포넌트 프로젝트

이 프로젝트는 순수 HTML, CSS, JavaScript(Web Components)만으로 React나 Vue처럼 컴포넌트 기반 개발을 하는 방법을 보여줍니다.

## ✨ 주요 특징

- **의존성 0%**: 외부 라이브러리 없이 표준 웹 API만 사용합니다.
- **Shadow DOM**: Vue/React 컴포넌트처럼 스타일과 DOM이 캡슐화되어 서로 영향을 주지 않습니다.
- **반응형 속성(Props)**: HTML 속성 변경 시 컴포넌트 상태가 자동으로 업데이트됩니다.
- **모던 스타일링**: CSS 변수(Variables)와 HSL 색상 모델을 사용한 깔끔한 디자인을 제공합니다.

## 📁 프로젝트 구조

```
src/
  ├── components/
  │   └── ui/           # UI 컴포넌트 (Atomic)
  │       ├── input/
  │       │   ├── Input.js
  │       │   └── input.scss
  │       ├── checkbox/
  │       │   ├── Checkbox.js
  │       │   └── checkbox.scss
  │       └── radio/
  │           ├── Radio.js
  │           └── radio.scss
  ├── styles/           # 전역 스타일 (SCSS)
  │   ├── abstracts/    # 변수, 믹스인
  │   ├── base/         # 리셋, 타이포그래피
  │   └── main.scss     # 메인 스타일 진입점
  └── main.js           # 메인 진입점
index.html              # 사용 예제
```

## 🚀 실행 방법

이 프로젝트는 ES Modules(`<script type="module">`)를 사용하므로, 브라우저 보안 정책(CORS) 때문에 로컬 서버가 필요합니다. `index.html`을 더블 클릭해서 열면 작동하지 않습니다.

### Node.js (npx) 사용 시

터미널에서 프로젝트 폴더로 이동 후 아래 명령어를 실행하세요.

```bash
npx serve .
```

### Python 사용 시

```bash
python -m http.server
```

실행 후 브라우저에서 `http://localhost:3000` (또는 표시된 포트)로 접속하세요.

## 💻 컴포넌트 사용법

### 입력 필드 (Input)

```html
<app-input label="사용자명" placeholder="이름 입력" required></app-input>
```

### 체크박스 (Checkbox)

```html
<app-checkbox label="동의합니다" name="terms" checked></app-checkbox>
```

### 라디오 버튼 (Radio)

```html
<app-radio label="옵션 A" name="choice" value="a"></app-radio>
<app-radio label="옵션 B" name="choice" value="b"></app-radio>
```

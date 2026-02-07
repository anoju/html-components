# HTML Web Components 프로젝트

React나 Vue처럼 **Shadow DOM(캡슐화)과 속성(Props) 반응성**을 갖춘 **Web Components** 방식으로 구현한 프로젝트입니다.

이 방식은 별도의 빌드 도구 없이 `index.html`과 자바스크립트 파일만으로 작동하며, 컴포넌트의 스타일이 외부 CSS에 영향을 받지 않는 장점이 있습니다.

## 📁 프로젝트 구조

```
src/
  ├── components/       # UI 컴포넌트
  │   └── ui/
  │       ├── input/
  │       ├── checkbox/
  │       └── radio/
  ├── scss/             # SCSS 스타일 (소스)
  │   ├── abstracts/    # 변수, 믹스인
  │   ├── base/         # 리셋
  │   ├── components/   # 컴포넌트 SCSS (_input.scss 등)
  │   └── main.scss     # 메인 진입점
  ├── css/              # 컴파일된 CSS (결과물)
  │   └── main.min.css
  └── main.js           # 메인 진입점
index.html              # 사용 예제
```

## ✨ 주요 특징

1.  **React/Vue 유사 문법**: HTML 태그에 속성(Attribute)을 넘겨주면 내부에서 반응합니다.
    - `<app-input label="이름" placeholder="홍길동"></app-input>`
    - `<app-checkbox label="동의합니다" checked></app-checkbox>`
2.  **Light DOM**: Shadow DOM 대신 Light DOM을 사용하여 전역 스타일(SCSS)이 자연스럽게 적용되도록 변경했습니다.
    - 스타일 커스터마이징이 훨씬 쉬워졌습니다.
3.  **SCSS & Atomic Design**: 컴포넌트별 SCSS 파일을 분리하여 관리합니다.
4.  **한글화 완료**: 모든 주석, 예제, 로그 메시지를 한글로 작성했습니다.

## 🚀 실행 방법 (중요)

`type="module"`을 사용하였으므로 브라우저 보안 정책상 html 파일을 로컬에서 직접 열면(file:// 프로토콜) 작동하지 않습니다. **로컬 서버**를 실행해야 합니다.

터미널에서 아래 명령어를 입력하세요:

```bash
npx serve .
```

실행 후 제공되는 주소(예: `http://localhost:3000`)로 접속하시면 예제 페이지를 확인하실 수 있습니다.

## 🛠 태스크 내역

1.  **초기 요청**: 일반 HTML 프로젝트지만 React/Vue 처럼 컴포넌트(Input, Checkbox, Radio)를 사용하고 싶음.
2.  **구현**: Web Components (Custom Elements v1) 기술을 사용하여 구현.
3.  **수정 요청 (현재)**: 모든 문구와 주석을 한글로 변경하고 `GEMINI.md` 로 정리.

이 프로젝트는 프레임워크 없이도 모던한 컴포넌트 시스템을 구축할 수 있음을 보여줍니다.

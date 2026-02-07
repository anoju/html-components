export class Button extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'variant', 'size', 'disabled'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    // 덮어쓰기 전에 초기 내용을 보존합니다.
    this.render();
  }
  
  // 즉시 태그를 교체(unwrap)하므로 attributeChangedCallback은 필요 없습니다.
  // 어차피 커스텀 엘리먼트가 사라지므로 속성 변경을 감지할 수 없게 됩니다.
  // 일회성 렌더링입니다.

  render() {
    const type = this.getAttribute('type') || 'button';
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.hasAttribute('disabled');
    
    // 자식 노드를(텍스트, 아이콘 등) 쉽게 보존하기 위해 JS로 버튼 엘리먼트를 생성합니다.
    const button = document.createElement('button');
    button.type = type;
    button.className = `ui-button variant-${variant} size-${size}`;
    if (disabled) button.disabled = true;

    // <ui-button>의 모든 자식 노드를 생성된 <button>으로 이동시킵니다.
    // 텍스트, 아이콘, 그리고 자식에게 걸린 이벤트 리스너까지 보존됩니다.
    while (this.firstChild) {
      button.appendChild(this.firstChild);
    }
    
    // 호스트에 걸린 클래스나 스타일이 있다면 복사합니다.
    if (this.className) {
      button.className += ` ${this.className}`;
    }
    if (this.style.cssText) {
      button.style.cssText += this.style.cssText;
    }
    
    // ID가 있다면 복사합니다.
    if (this.id) {
      button.id = this.id;
      this.removeAttribute('id'); // DOM 내 ID 중복 방지
    }
    
    // Self-unwrap: <ui-button>을 새로 만든 <button>으로 교체합니다.
    this.replaceWith(button);
  }
}

customElements.define('ui-button', Button);

export class Input extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 렌더링 수행
    this.render();
    
    // 렌더링 후, 컴포넌트 자신(this)을 생성된 첫 번째 자식(Wrapper)으로 교체
    // 이로써 <ui-input> 태그는 DOM에서 사라지고 내막의 HTML만 남습니다.
    const wrapper = this.firstElementChild;
    if (wrapper) {
      this.replaceWith(wrapper);
    }
  }

  render() {
    // 속성 가져오기
    const label = this.getAttribute('label') || '';
    const placeholder = this.getAttribute('placeholder') || '';
    const type = this.getAttribute('type') || 'text';
    const value = this.getAttribute('value') || '';
    const name = this.getAttribute('name') || '';
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const error = this.getAttribute('error');
    
    // 고유 ID 생성 (name 기반, 또는 임의)
    const id = name ? `input-${name}` : `input-${Math.random().toString(36).substr(2, 9)}`;

    this.innerHTML = `
      <div class="ui-input-wrapper ${error ? 'error' : ''}">
        ${label ? `<label for="${id}">${label}${required ? ' *' : ''}</label>` : ''}
        <input 
          id="${id}"
          class="ui-input"
          type="${type}" 
          placeholder="${placeholder}" 
          value="${value}" 
          name="${name}"
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
        />
        ${error ? `<div class="error-message">${error}</div>` : ''}
      </div>
    `;

    // 요소 레퍼런스
    const wrapper = this.firstElementChild;
    const input = wrapper.querySelector('input');
    
    // 스타일/클래스는 래퍼에
    if (this.className) {
       wrapper.className += ` ${this.className}`;
    }
    if (this.style.cssText) {
       wrapper.style.cssText += this.style.cssText;
    }

    // 나머지 속성(oninput, onchange, dataset 등)은 input 엘리먼트에 직접 전파
    const handledAttrs = ['label', 'name', 'value', 'type', 'placeholder', 'disabled', 'required', 'error', 'class', 'style', 'id'];
    Array.from(this.attributes).forEach(attr => {
      if (!handledAttrs.includes(attr.name)) {
        input.setAttribute(attr.name, attr.value);
      }
    });

    // ID 처리 (이미 위에서 생성했지만, 사용자가 명시한 ID가 있다면 덮어쓰거나 활용)
    if (this.id) {
       input.id = this.id;
       this.removeAttribute('id');
       // label for 업데이트
       const labelEl = wrapper.querySelector('label');
       if (labelEl) labelEl.setAttribute('for', input.id);
    }
  }
}

customElements.define('ui-input', Input);

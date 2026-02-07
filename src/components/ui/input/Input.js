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
    
    // 이벤트 리스너는 이제 native input이 밖으로 드러나므로 
    // 필요하다면 wrapper나 input에 직접 달거나, 
    // main.js에서 위임(delegation) 처리할 수 있습니다.
    // 여기서는 단순히 마크업 변환 역할만 수행합니다.
  }
}

customElements.define('ui-input', Input);

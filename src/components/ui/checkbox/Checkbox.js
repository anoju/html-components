export class Checkbox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    // Unwrap
    const wrapper = this.firstElementChild;
    if (wrapper) {
      this.replaceWith(wrapper);
    }
  }

  // Setters/Getters won't work after unwrapping, but we keep initial logic in render()
  
  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || 'on';

    this.innerHTML = `
      <label class="ui-checkbox-wrapper ${disabled ? 'disabled' : ''}">
        <input 
          class="ui-checkbox" 
          type="checkbox" 
          name="${name}" 
          value="${value}" 
          ${checked ? 'checked' : ''} 
          ${disabled ? 'disabled' : ''}
        >
        <span class="ui-checkbox-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        ${label ? `<span class="label-text">${label}</span>` : ''}
      </label>
    `;
    // 요소 레퍼런스
    const wrapper = this.firstElementChild;
    const input = wrapper.querySelector('input');

    // 모든 속성을 호스트에서 내부 input으로 복사 (id, onchange, dataset 등)
    const handledAttrs = ['label', 'name', 'value', 'checked', 'disabled', 'class', 'style', 'type', 'aria-checked', 'role', 'tabindex'];
    Array.from(this.attributes).forEach(attr => {
      // label 등 이미 처리된 속성은 건너뜀
      if (!handledAttrs.includes(attr.name)) {
        input.setAttribute(attr.name, attr.value);
      }
    });

    if (this.id) {
       input.id = this.id;
       this.removeAttribute('id');
    }
    
    // 스타일/클래스는 래퍼에
    if (this.className) {
       wrapper.className += ` ${this.className}`;
    }
    if (this.style.cssText) {
       wrapper.style.cssText += this.style.cssText;
    }

    // No need to attach logic. It's a native input now.
  }
}

customElements.define('ui-checkbox', Checkbox);

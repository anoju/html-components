export class Radio extends HTMLElement {
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

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || 'on';

    this.innerHTML = `
      <label class="ui-radio-wrapper ${disabled ? 'disabled' : ''}">
        <input 
          class="ui-radio" 
          type="radio" 
          name="${name}" 
          value="${value}" 
          ${checked ? 'checked' : ''} 
          ${disabled ? 'disabled' : ''}
        >
        <span class="ui-radio-circle"></span>
        ${label ? `<span class="label-text">${label}</span>` : ''}
      </label>
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

    // 나머지 속성을 input에 전파
    const handledAttrs = ['label', 'name', 'value', 'checked', 'disabled', 'class', 'style', 'type', 'aria-checked', 'role', 'tabindex', 'id'];
    Array.from(this.attributes).forEach(attr => {
      if (!handledAttrs.includes(attr.name)) {
        input.setAttribute(attr.name, attr.value);
      }
    });

    if (this.id) {
       input.id = this.id;
       this.removeAttribute('id');
    }
  }
}

customElements.define('ui-radio', Radio);

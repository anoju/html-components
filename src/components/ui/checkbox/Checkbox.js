export class Checkbox extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'name', 'value', 'disabled', 'required'];
  }

  constructor() {
    super();
    // Shadow DOM 제거
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  toggle() {
    if (this.hasAttribute('disabled')) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', { 
      detail: { checked: this.checked, value: this.getAttribute('value') },
      bubbles: true, 
      composed: true 
    }));
  }

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || 'on';

    this.innerHTML = `
      <div class="checkbox-root">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      ${label ? `<span class="label-text">${label}</span>` : ''}
      <input type="checkbox" name="${name}" value="${value}" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} tabindex="-1">
    `;

    // 접근성 설정
    this.setAttribute('role', 'checkbox');
    this.setAttribute('aria-checked', checked);
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', disabled ? '-1' : '0');

    // 이벤트 리스너 설정
    this.onclick = (e) => {
        if (e.target.tagName !== 'INPUT') {
             this.toggle();
        }
    };
    
    this.onkeydown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggle();
      }
    };
  }
}

customElements.define('app-checkbox', Checkbox);

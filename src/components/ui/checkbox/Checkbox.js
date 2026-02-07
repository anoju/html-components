export class Checkbox extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'name', 'value', 'disabled', 'required'];
  }

  constructor() {
    super();
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

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || 'on';

    // Host "disappears"
    this.style.display = 'contents';

    // "input을 그대로 쓰길 원합니다" -> Use native input visibly (or styled via appearance)
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

    const input = this.querySelector('input');
    if (input) {
      input.addEventListener('change', (e) => {
        this.checked = e.target.checked;
        this.dispatchEvent(new CustomEvent('change', { 
            detail: { checked: e.target.checked, value },
            bubbles: true, 
            composed: true 
        }));
      });
    }
  }
}

customElements.define('ui-checkbox', Checkbox);

export class Input extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'placeholder', 'type', 'value', 'name', 'disabled', 'required', 'error'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  setupEventListeners() {
    // Light DOM input 찾기
    const input = this.querySelector('input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.dispatchEvent(new CustomEvent('input', { detail: e.target.value, bubbles: true, composed: true }));
      });
      input.addEventListener('change', (e) => {
        this.dispatchEvent(new CustomEvent('change', { detail: e.target.value, bubbles: true, composed: true }));
      });
    }
  }

  render() {
    const label = this.getAttribute('label') || '';
    const placeholder = this.getAttribute('placeholder') || '';
    const type = this.getAttribute('type') || 'text';
    const value = this.getAttribute('value') || '';
    const name = this.getAttribute('name') || '';
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const error = this.getAttribute('error');

    // Host element style to "disappear" from layout
    this.style.display = 'contents';

    this.innerHTML = `
      <div class="ui-input-wrapper ${error ? 'error' : ''}">
        ${label ? `<label for="input-${name}">${label}${required ? ' *' : ''}</label>` : ''}
        <input 
          id="input-${name}"
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
    
    this.setupEventListeners(); 
  }
}

customElements.define('ui-input', Input);

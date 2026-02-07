export class Input extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'placeholder', 'type', 'value', 'name', 'disabled', 'required', 'error'];
  }

  constructor() {
    super();
    // Shadow DOM 제거: Light DOM 사용
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

    // Light DOM에 렌더링 (CSS Link 제거)
    this.innerHTML = `
      <div class="${error ? 'error' : ''}">
        ${label ? `<label for="input">${label}${required ? ' *' : ''}</label>` : ''}
        <input 
          id="input"
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
    
    // 리스너 재등록
    this.setupEventListeners(); 
  }
}

customElements.define('app-input', Input);

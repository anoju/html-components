export class Radio extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'name', 'value', 'disabled'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'checked' && newValue !== null) {
        this.uncheckOthers();
      }
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

  uncheckOthers() {
    const name = this.getAttribute('name');
    if (!name) return;
    
    // 문서 내 동일한 name을 가진 다른 라디오 버튼 찾기
    const others = Array.from(document.querySelectorAll(`ui-radio[name="${name}"]`));
    others.forEach(other => {
      if (other !== this && other.checked) {
        other.checked = false; 
      }
    });
  }

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || 'on';

    this.style.display = 'contents';

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

    const input = this.querySelector('input');
    if (input) {
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
            this.checked = true;
            this.dispatchEvent(new CustomEvent('change', { 
                detail: { checked: true, value },
                bubbles: true, 
                composed: true 
            }));
        }
      });
    }
  }
}

customElements.define('ui-radio', Radio);

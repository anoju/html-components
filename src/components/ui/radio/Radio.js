export class Radio extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'name', 'value', 'disabled'];
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
    const others = Array.from(document.querySelectorAll(`app-radio[name="${name}"]`));
    others.forEach(other => {
      if (other !== this && other.checked) {
        other.checked = false; 
      }
    });
  }

  select() {
    if (this.hasAttribute('disabled')) return;
    if (this.checked) return; // 이미 체크됨
    
    this.checked = true;
    this.dispatchEvent(new CustomEvent('change', { 
        detail: { checked: true, value: this.getAttribute('value') },
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
      <div class="radio-root">
        <div class="radio-indicator"></div>
      </div>
      ${label ? `<span class="label-text">${label}</span>` : ''}
      <input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} tabindex="-1" style="display:none">
    `;

    this.setAttribute('role', 'radio');
    this.setAttribute('aria-checked', checked);
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', disabled ? '-1' : '0');

    this.onclick = (e) => {
        this.select();
    };
    
    this.onkeydown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.select();
      }
    };
  }
}

customElements.define('app-radio', Radio);

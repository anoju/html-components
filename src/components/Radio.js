export class Radio extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'name', 'value', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans, system-ui, sans-serif);
          cursor: pointer;
          user-select: none;
        }

        :host([disabled]) {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .radio-root {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          border: 1px solid hsl(214 32% 80%);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          transition: all 0.2s;
          position: relative;
        }

        :host([checked]) .radio-root {
          border-color: hsl(250 84% 54%);
        }
        
        .radio-indicator {
          width: 0.625rem;
          height: 0.625rem;
          border-radius: 50%;
          background-color: hsl(250 84% 54%);
          transform: scale(0);
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([checked]) .radio-indicator {
          transform: scale(1);
        }

        .label-text {
          font-size: 0.875rem;
          color: hsl(222 47% 11%);
        }
        
        :host(:focus) {
          outline: none;
        }
        
        :host(:focus-visible) .radio-root {
           box-shadow: 0 0 0 2px hsl(250 84% 54% / 0.4);
        }
      </style>

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

export class Checkbox extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'name', 'value', 'disabled', 'required'];
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

        .checkbox-root {
          width: 1.25rem;
          height: 1.25rem;
          border: 1px solid hsl(214 32% 80%);
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          transition: all 0.2s;
          position: relative;
        }

        :host([checked]) .checkbox-root {
          background-color: hsl(250 84% 54%);
          border-color: hsl(250 84% 54%);
        }
        
        /* 체크 아이콘 */
        .check-icon {
          width: 0.875rem;
          height: 0.875rem;
          color: white;
          display: none;
        }

        :host([checked]) .check-icon {
          display: block;
        }

        .label-text {
          font-size: 0.875rem;
          color: hsl(222 47% 11%);
        }

        /* 키보드 접근성을 위한 포커스 스타일 */
        :host(:focus) {
          outline: none;
        }
        
        :host(:focus-visible) .checkbox-root {
           box-shadow: 0 0 0 2px hsl(250 84% 54% / 0.4);
        }

        /* 폼 전송을 위한 숨겨진 기본 input */
        input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 0;
          height: 0;
        }
      </style>

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
        // 숨겨진 input을 클릭했을 때 이중 트리거 방지
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

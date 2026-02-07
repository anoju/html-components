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
    // No need to attach logic. Native radio behavior works.
  }
}

customElements.define('ui-radio', Radio);

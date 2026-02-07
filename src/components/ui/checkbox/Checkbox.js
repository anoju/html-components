export class Checkbox extends HTMLElement {
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

  // Setters/Getters won't work after unwrapping, but we keep initial logic in render()
  
  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || 'on';

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
    // No need to attach listener. It's a native input now.
  }
}

customElements.define('ui-checkbox', Checkbox);

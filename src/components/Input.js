export class Input extends HTMLElement {
  static get observedAttributes() {
    return [
      "label",
      "placeholder",
      "type",
      "value",
      "name",
      "disabled",
      "required",
      "error",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
    const input = this.shadowRoot.querySelector("input");
    if (input) {
      input.addEventListener("input", (e) => {
        this.dispatchEvent(
          new CustomEvent("input", {
            detail: e.target.value,
            bubbles: true,
            composed: true,
          }),
        );
      });
      input.addEventListener("change", (e) => {
        this.dispatchEvent(
          new CustomEvent("change", {
            detail: e.target.value,
            bubbles: true,
            composed: true,
          }),
        );
      });
    }
  }

  render() {
    const label = this.getAttribute("label") || "";
    const placeholder = this.getAttribute("placeholder") || "";
    const type = this.getAttribute("type") || "text";
    const value = this.getAttribute("value") || "";
    const name = this.getAttribute("name") || "";
    const disabled = this.hasAttribute("disabled");
    const required = this.hasAttribute("required");
    const error = this.getAttribute("error");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: var(--font-sans, system-ui, sans-serif);
          width: 100%;
        }
        
        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(222 47% 11%); /* 로컬 폴백 */
        }

        /* 필요시 light DOM에서 CSS 변수에 접근하거나 ::part 사용 */
        /* 하지만 심플한 폴백이 무난함 */

        input {
          height: 2.5rem;
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid hsl(214 32% 80%);
          background-color: transparent;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: hsl(222 47% 11%);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }

        input:hover:not(:disabled) {
          border-color: hsl(214 32% 60%);
        }

        input:focus {
          border-color: hsl(250 84% 54%);
          box-shadow: 0 0 0 2px hsl(250 84% 54% / 0.2);
        }

        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background-color: hsl(220 14% 96%);
        }

        .error-message {
          color: hsl(0 84% 60%);
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
        
        .error input {
           border-color: hsl(0 84% 60%);
        }
        
        .error input:focus {
           box-shadow: 0 0 0 2px hsl(0 84% 60% / 0.2);
        }
      </style>

      <div class="${error ? "error" : ""}">
        ${label ? `<label for="input">${label}${required ? " *" : ""}</label>` : ""}
        <input 
          id="input"
          type="${type}" 
          placeholder="${placeholder}" 
          value="${value}" 
          name="${name}"
          ${disabled ? "disabled" : ""}
          ${required ? "required" : ""}
        />
        ${error ? `<div class="error-message">${error}</div>` : ""}
      </div>
    `;

    // Re-attach listeners after render
    this.setupEventListeners();
  }
}

customElements.define("app-input", Input);

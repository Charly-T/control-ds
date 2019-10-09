import { createElement } from './naive.js';
import { Style } from './styleTag.js';

class CtrlTabContent extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.style(this.shadow);
    this.render(this.shadow);
  }
  connectedCallback() { 
    this.handleEvents();
  }
  
  handleEvents() {
    const load = new CustomEvent('tabContentLoad', {
      detail: {
        name: this.name,
        el: this
      },
      bubbles: true
    });
    this.dispatchEvent(load);
  }

  static get observedAttributes() {
    return ['tab'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'tab' && newValue !== null) {
      this.name = newValue;
    }
  }
  
  render(shadow) {
    const button = createElement('div', '.tab-content', [
      createElement('slot')
    ]);
    shadow.appendChild(button);
  }
  
  style(shadow) {
    const styleTag = new Style({
      '.tab-content': {}
    }).toStyleElement();
    shadow.appendChild(styleTag);
  }
}

try {
  customElements.define('ctrl-tab-content', CtrlTabContent)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
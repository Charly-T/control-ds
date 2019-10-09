import { createElement } from './naive.js';
import { Style } from './styleTag.js';

class CtrlTabs extends HTMLElement {

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
    this.shadow.addEventListener('tabSelected', (e) => {
      e.stopPropagation();
      const tabContentChange = new CustomEvent('tabContentChange', {
        detail: e.detail
      });
      this.content.dispatchEvent(tabContentChange);
    });
    this.shadow.addEventListener('tabsContentLoad', (e) => {
      this.content = e.detail.el;
    })
  }

  static get observedAttributes() {
    // return ['error', 'warn', 'active', 'forbidden'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // if(this.shadow && newValue !== null) {
    //   const button = this.shadow.querySelector('button');
    //   button.classList.add(name);
    // }
  }
  
  render(shadow) {
    const button = createElement('div', '.tabs', [
      createElement('slot')
    ]);
    shadow.appendChild(button);
  }
  
  style(shadow) {
    const styleTag = new Style({
      '.tabs': {}
    }).toStyleElement();
    shadow.appendChild(styleTag);
  }
}

try {
  customElements.define('ctrl-tabs', CtrlTabs)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
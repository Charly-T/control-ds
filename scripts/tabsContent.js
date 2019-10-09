import { createElement } from './naive.js';
import { Style } from './styleTag.js';

class CtrlTabsContent extends HTMLElement {

  constructor() {
    super();

    this.tabs = {};
    
    this.shadow = this.attachShadow({mode: 'open'});
    this.style(this.shadow);
    this.render(this.shadow);
  }
  connectedCallback() { 
    this.handleEvents();
  }
  
  handleEvents() {
    const load = new CustomEvent('tabsContentLoad', {
      detail: {
        el: this
      },
      bubbles: true
    });
    this.dispatchEvent(load);
    this.addEventListener('tabContentLoad', (e) => {
      this.tabs[e.detail.name] = e.detail.el;
      this.tabs[e.detail.name].classList.add('hidden');
    });
    this.addEventListener('tabContentChange', (e) => {
      Object.keys(this.tabs).forEach(i => {
        this.tabs[i].classList.add('hidden');
      });
      this.tabs[e.detail].classList.remove('hidden');
    });
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
    const button = createElement('div', '.tabs-content', [
      createElement('slot')
    ]);
    shadow.appendChild(button);
  }
  
  style(shadow) {
    const styleTag = new Style({
      '.tabs-content': {}
    }).toStyleElement();
    shadow.appendChild(styleTag);
  }
}

try {
  customElements.define('ctrl-tabs-content', CtrlTabsContent)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
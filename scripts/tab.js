import { createElement } from './naive.js';
import { Style } from './styleTag.js';

class CtrlTab extends HTMLElement {

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
    const tab = this.shadow.querySelector('.tab');
    tab.onclick = () => {
      this.tabClick();
    };
  }

  static get observedAttributes() {
    return ['tab', 'selected'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'tab') {
      this.value = newValue;
    } else if (name === 'selected') {
      this.tabClick();
    }
  }

  tabClick() {
    const event = new CustomEvent('tabSelected', {
      detail: this.value,
      bubbles: true
    });
    this.dispatchEvent(event);
  }
  
  render(shadow) {
    const tab = createElement('div', '.tab', [
      createElement('slot')
    ]);
    shadow.appendChild(tab);
  }
  
  style(shadow) {
    const styleTag = new Style({
      '.tab': {
        width: '70px',
        height: '50px',
        display: 'flex',
        color: 'var(--white-color)',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRight: '1px solid var(--black-color)',
        boxSizing: 'border-box',
        padding: '5px',
        cursor: 'pointer'
      }
    }).toStyleElement();
    shadow.appendChild(styleTag);
  }
}

try {
  customElements.define('ctrl-tab', CtrlTab)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
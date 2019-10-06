import { createElement } from './naive.js';
import { Style } from './styleTag.js';

class CtrlButton extends HTMLElement {

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
    
  }

  static get observedAttributes() {
    return ['error', 'warn', 'active', 'forbidden'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(this.shadow && newValue !== null) {
      const button = this.shadow.querySelector('button');
      button.classList.add(name);
    }
  }
  
  render(shadow) {
    const button = createElement('button', '', [ 
      createElement('slot')
    ]);
    shadow.appendChild(button);
  }
  
  style(shadow) {
    const styleTag = new Style({
      button: {
        fontFamily: 'var(--font-family)',
        textTransform: 'uppercase',
        background: 'transparent',
        color: 'var(--white-color)',
        border: '1px solid var(--white-color)',
        padding: '7px 13px 3px 13px',
        borderRadius: '5px',
        outline: 'none',
        cursor: 'pointer',
        '&.active': {
          color: 'var(--active-color)',
          borderColor: 'var(--active-color)'
        },
        '&.error': {
          color: 'var(--error-color)',
          borderColor: 'var(--error-color)'
        },
        '&.warn': {
          color: 'var(--warn-color)',
          borderColor: 'var(--warn-color)'
        },
        '&.forbidden': {
          cursor: 'not-allowed',
          '&:active': {
            color: 'var(--error-color)',
            borderColor: 'var(--error-color)'
          },
        },
        '&:active': {
          color: 'var(--pasive-color)',
          borderColor: 'var(--pasive-color)'
        }
      }
    }).toStyleElement();
    shadow.appendChild(styleTag);
  }
}

try {
  customElements.define('ctrl-button', CtrlButton)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
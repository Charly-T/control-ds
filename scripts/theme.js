import { Style } from './styleTag.js';

class CtrlTheme extends HTMLElement {

  constructor() {
    super();
    this.style(this.shadow);
  }

  spacers(base = 5, max = 50) {
    const spacers = {};
    for (var i = 0; i <= max; i += base) {
      spacers[`.p-${i}`] = { padding: `${i}px` };
      spacers[`.m-${i}`] = { margin: `${i}px` };
      spacers[`.px-${i}`] = { paddingLeft: `${i}px`, paddingRight: `${i}px` };
      spacers[`.mx-${i}`] = { marginLeft: `${i}px`, marginRight: `${i}px` };
      spacers[`.py-${i}`] = { paddingTop: `${i}px`, paddingBottom: `${i}px` };
      spacers[`.my-${i}`] = { marginTop: `${i}px`, marginBottom: `${i}px` };
      spacers[`.pt-${i}`] = { paddingTop: `${i}px` };
      spacers[`.mt-${i}`] = { marginTop: `${i}px` };
      spacers[`.pr-${i}`] = { paddingRight: `${i}px` };
      spacers[`.mr-${i}`] = { marginRight: `${i}px` };
      spacers[`.pb-${i}`] = { paddingBottom: `${i}px` };
      spacers[`.mb-${i}`] = { marginBottom: `${i}px` };
      spacers[`.pl-${i}`] = { paddingLeft: `${i}px` };
      spacers[`.ml-${i}`] = { marginLeft: `${i}px` };
    }
    return spacers;
  }

  grid() {
    const grid = {};
    return grid;
  }

  style(shadow) {
    const styleTag = new Style({
      ...this.spacers(),
      ...this.grid()
    }).toStyleElement();
    this.appendChild(styleTag);
  }
}

try {
  customElements.define('ctrl-theme', CtrlTheme)
} catch (err) {
  const h3 = document.createElement('h3')
  h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
  document.body.appendChild(h3)
}
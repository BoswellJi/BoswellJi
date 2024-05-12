customElements.define('open-shadow',
  class extends HTMLElement {
    constructor() {
      super();

      const pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');

      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(pElem);
    }

    connectedCallback(e) {
      console.log(e);
    }

    attributeChangedCallback(e) {
      console.log(e);
    }

    disconnectedCallback() {
      console.log(e);
    }

    adoptedCallback() {
      console.log(e);
    }
  }
);

const aDom = document.querySelector('#a');
const shadow = aDom.attachShadow({mode:'open'});
const para = document.createElement('p');
para.textContent = 'p p p';
shadow.appendChild(para);

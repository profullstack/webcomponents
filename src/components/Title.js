import Base from './Base.js';

class Title extends Base {
	constructor() {
		super();
	}

	static get name() {
		return `${this.ns}-title`;
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
    <style>
      h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.8rem;
        font-weight: 400;
      }      
    </style>
    <h1><slot></slot></h1>
`;
	}
}

customElements.define(Title.name, Title);

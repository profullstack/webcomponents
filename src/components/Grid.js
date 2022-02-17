import Base from './Base.js';

class Grid extends Base {
  constructor() {
    super();
  }

  static get name() {
    return `${this.ns}-grid`;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 2.8rem;
	}

	.grid.split {
		grid-template-columns: 1fr 1fr;
	}
</style>
<div class="grid"><slot></slot></div>

`;
  }
}

customElements.define(Grid.name, Grid);

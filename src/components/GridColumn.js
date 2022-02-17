import Base from './Base.js';

class GridColumn extends Base {
	constructor() {
		super();
	}

	static get name() {
		return `${this.ns}-grid-column`;
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `

    <style>
	.grid-column {
        border: 1px solid black;
    }
</style>
<div class="grid-column">
	<slot></slot>
</div>

`;
	}
}

customElements.define(GridColumn.name, GridColumn);

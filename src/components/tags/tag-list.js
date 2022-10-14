class TagList extends HTMLElement {
	constructor() {
		super();

		this.tags = [];
		this.render = this.render.bind(this);
		this.renderTags = this.renderTags.bind(this);
	}

	static get observedAttributes() {
		return ['tags'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('attributesChanged', name, oldValue, newValue);
		if (name === 'tags') {
			this.tags = (newValue && newValue.split(',')) || [];
		}
		this.render();
	}

	render() {
		this.innerHTML = `
    <style>
		* {
			box-sizing: border-box;
		}

        .tags {
            margin-bottom: 1.2rem;
        }

        ol {
            list-style-type: none;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 0;
        }

        ol li {
            border: 1px solid gray;
            border-radius: .4rem;
            padding: .4rem .8rem;
            position: relative;
            margin: .4rem .4rem .4rem 0;
        }

        ol li:nth-child(2n) {
            background-color: #fff;
        }

	@media (min-width: 420px) {
	}
    </style>

    <div class="tag-list">
        ${this.renderTags()}
    </div>
`;
	}
	renderTags() {
		console.log(this.tags);
		return this.tags.length
			? `
        <ol>
        ${this.tags.map((tag) => {
					return `<li><a href="/tags/${tag.replace(/\s+/g, '-')}">${tag}</a></li>`;
				})}
        </ol>
        `
			: '';
	}

	connectedCallback() {
		this.render();
	}

	disconnectedCallback() {}
}

customElements.define('tag-list', TagList);

export default TagList;

class TagEditor extends HTMLElement {
	constructor() {
		super();

		this.error = null;
		this.tags = [];
		this.render = this.render.bind(this);
		this.renderTags = this.renderTags.bind(this);
		this.addTag = this.addTag.bind(this);
		this.deleteTag = this.deleteTag.bind(this);
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

        .tag-editor {
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
            padding: .4rem 2rem .4rem .8rem;
            position: relative;
            margin: .4rem .4rem .4rem 0;
        }

        .delete-tag {
            position: absolute;
            top: .4rem;
            right: .8rem;
            text-decoration: none;
        }

	@media (min-width: 420px) {
	}
    </style>

    <div class="tag-editor">
        <div class="field">
            <label for="tags">Skills:</label>
            <input type="text" name="tag" id="tags" placeholder="javascript, node.js" />
        </div>
        ${this.renderTags()}
        <input type="hidden" name="tags" value="${this.tags.join(',')}" />
    </div>
`;

		const tagInput = this.querySelector('input[name=tag]');
		const deleteTags = [...this.querySelectorAll('.delete-tag')];

		tagInput.addEventListener('keypress', this.addTag);
		tagInput.addEventListener('blur', this.addTag);

		deleteTags.forEach((deleteTag) => deleteTag.addEventListener('click', this.deleteTag));
	}

	deleteTag(e) {
		e.preventDefault();
		console.log(e.currentTarget);
		const tag = e.currentTarget.parentElement.querySelector('span').innerText;

		console.log('tag:', tag);

		this.tags = this.tags.filter((t) => tag !== t);
		this.render();
	}

	renderTags() {
		console.log(this.tags);
		return `
        <ol>
        ${this.tags.map((tag) => {
					return `<li><span>${tag}</span> <a href="#" class="delete-tag">x</a></li>`;
				})}
        </ol>
        `;
	}

	addTag(e) {
		const tag = e.target.value;
		console.log(e.target.value);

		if ((e.key !== 'Enter' && e.key !== ',') || this.tags.indexOf(tag) > -1 || !tag) {
			return;
		}

		e.preventDefault();

		this.tags.push(tag.toLowerCase().trim());
		e.target.value = '';
		this.render();
		this.querySelector('input[name=tag]').focus();
	}

	connectedCallback() {
		// this.attachShadow({ mode: 'open' });
		this.render();
	}

	disconnectedCallback() {
		const deleteTags = [...this.querySelectorAll('.delete-tag')];
		const tagInput = this.querySelector('input[name=tags]');

		tagInput.removeEventListener('keypress');
		tagInput.removeEventListener('blur');
		deleteTags.forEach((deleteTag) => deleteTag.removeEventListener('click'));
	}
}

customElements.define('tag-editor', TagEditor);

export default TagEditor;

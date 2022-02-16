import WCEBase from './wce-base.js';

class WCENavBar extends WCEBase {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      .navbar {
				margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      
      .navbar a {
        margin: 0 .4rem;
				text-decoration: none;
      }    

			.navbar a.active {
				font-weight: 700;
				text-decoration: underline;
			}
    </style>
    <nav class="navbar">
        <a href="/recent.html" class="${this.isCurrentPage('/recent') ? 'active' : ''}">recent</a>
        <a href="/popular.html" class="${this.isCurrentPage('/popular') ? 'active' : ''}">popular</a>
        <a href="/tags.html" class="${this.isCurrentPage('/tags') ? 'active' : ''}">tags</a>
        <a href="/" class="${this.isCurrentPage('/$') ? 'active' : ''}">home</a>
    </nav>
`;
  }
}

customElements.define("wce-navbar", WCENavBar);

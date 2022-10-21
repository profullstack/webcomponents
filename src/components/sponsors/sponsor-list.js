class SponsorList extends HTMLElement {
  constructor() {
    super();

    this.ads = [];
    this.adIdx = 0;
    this.adsUrl = '/scripts/sponsors.json';
    this.render = this.render.bind(this);
    this.getAds = this.getAds.bind(this);
    this.renderAds = this.renderAds.bind(this);
    this.startSlideShow = this.startSlideShow.bind(this);
  }

  static get observedAttributes() {
    return ['ads'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributesChanged', name, oldValue, newValue);

    if (name === 'ads') {
      this.adsUrl = newValue;
    }

    this.render();
  }

  async getAds() {
    try {
      const res = await fetch(this.adsUrl);
      const data = await res.json();

      this.ads = data;
      console.log(this.ads);
    } catch (err) {
      console.error(err);
    }
  }

  async render() {
    await this.getAds();

    this.innerHTML = `
    <style>
			* {
				box-sizing: border-box;
			}

			.sponsors {
					margin: 1.2rem 0;
          border: 1px solid gray;
			}

      .sponsors .sponsor {
        display: none;
      }

      .fade {
        animation-name: fade;
        animation-duration: 1.5s;
      }

      @keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
      }

			@media (min-width: 420px) {
			}
    </style>

    <div class="sponsors">
    	${this.renderAds()}
		</div>
`;

    this.startSlideShow();
  }

  startSlideShow() {
    const ads = [...document.querySelectorAll('.sponsor')];

    for (let i = 0; i < ads.length; i++) {
      ads[i].style.display = 'none';
    }

    this.adIdx++;

    if (this.adIdx > ads.length) {
      this.adIdx = 1;
    }

    ads[this.adIdx - 1].style.display = 'block';
    setTimeout(this.startSlideShow, 10000);
  }

  renderAds() {
    return `
      ${this.ads
        .map((ad) => {
          return `<div class="sponsor fade">${ad}</div>`;
        })
        .join('')}
      `;
  }

  async connectedCallback() {
    // this.attachShadow({ mode: 'open' });
    await this.render();
  }

  disconnectedCallback() {}

  navigateAd(e) {
    e.preventDefault();
    const el = e.target;
    const dir = el.href.split('#')[1];

    console.log(dir);
  }
}

customElements.define('sponsor-list', SponsorList);

export default SponsorList;

class WCEBase extends HTMLElement {
  constructor() {
    super();
  }

	isCurrentPage(page) {
		const path = new URL(window.location).pathname;
		const re = new RegExp(`${page}`, 'ig');
		return re.test(path);
	}
}

export default WCEBase;

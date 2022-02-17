class Base extends HTMLElement {
  constructor() {
    super();
    this.ns = 'wce';
  }

  static get ns() {
    return 'wce';
  }

  isCurrentPage(page) {
    const path = new URL(window.location).pathname;
    const re = new RegExp(`${page}`, 'ig');
    return re.test(path);
  }
}

export default Base;

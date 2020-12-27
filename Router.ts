class Router {
  pages: any;
  template: any;
  templateInstance: any;

  constructor(pagesSetup: any) {
    this.pages = pagesSetup.pages;
    this.template = pagesSetup.template;
  }

  public goTo(pageName: string, store) {
    if (!this.templateInstance) {
      this.templateInstance = new this.template(store);
    }
    this.templateInstance.setCurrentPage(this.pages[pageName]);
    this.render();
  }

  public render() {
    this.templateInstance._beforeRender();
    this.templateInstance._render();
    this.templateInstance._apiCalls();
    this.templateInstance._afterRender();
  }
}

export { Router };

import { Component } from "../components/Component";

class Template extends Component {
  Page: Component;
  name = "app";

  setCurrentPage(Page: Component) {
    this.Page = Page;
    this.components = {};
    this.components[`${this.Page.name}`] = this.Page;
  }

  props = ["currentPage"];

  render() {
    return `
          ${this.useComponent(`${this.Page.name}`)}
      `;
  }
}

export { Template };

abstract class Component {
  redirectTo: any;
  setState: any;
  store: any;
  lastUpdateId: number;
  getStateUpdateId: any;
  _components: any;
  name: any;
  _varPropsHaveUpdated: boolean;
  getState: any;

  constructor(store: any) {
    this.store = store;
    this.getState = store.getState();
    this.redirectTo = store.getRedirect();
    this.setState = store.setState();
    this.getStateUpdateId = store.getStateUpdateId();

    this._components = {};
    if (!this.name) this.name = Math.random();
  }

  _props = [];
  props = [];
  components = {};
  beforeRender() {}
  render() {
    return "";
  }
  apiCalls() {}
  afterRender() {}

  useComponent(componentName: string) {
    return this._components[componentName]._render();
  }

  _setComponents() {
    if (this.components) {
      const temp_components = {};

      Object.keys(this.components).forEach(componentName => {
        if (componentName in this._components) {
          temp_components[componentName] = this._components[componentName];
        } else {
          temp_components[componentName] = this._createComponent(componentName);
        }
      });
      this._components = temp_components;
    }
  }

  _getComponentsList() {
    return Object.values(this._components);
  }

  _createComponent(componentName: string) {
    return new this.components[componentName](this.store);
  }

  _parseProps() {
    this._props = [];
    this.props.forEach(prop => {
      this._props[prop] = this.getState(prop);
    });
  }

  getProp(name) {
    return this._props[name];
  }

  _setPropsHaveUpdated() {
    this._varPropsHaveUpdated = this._checkIfPropsHaveUpdated();
  }

  _checkIfPropsHaveUpdated() {
    for (const prop of this.props) {
      if (this.getProp(prop) !== this.getState(prop)) {
        return true;
      }
    }
    return false;
  }

  _propsHaveUpdated() {
    return this._varPropsHaveUpdated;
  }

  _wasShowing() {
    if (this.lastUpdateId === this.getStateUpdateId() - 1) {
      return true;
    } else {
      return false;
    }
  }

  setLastUpdateId() {
    this.lastUpdateId = this.getStateUpdateId();
  }

  _beforeRender() {
    this._setPropsHaveUpdated();

    if (!this._wasShowing() || this._propsHaveUpdated()) {
      this.beforeRender();
      this._setComponents();
      this._parseProps();
    }

    this._beforeRenderComponents();
  }

  _beforeRenderComponents() {
    this._getComponentsList().forEach((component: Component) => {
      component._beforeRender();
    });
  }

  _render() {
    this._renderComponents();
    if (!this._wasShowing() || this._propsHaveUpdated()) {
      return this._updateHTML();
    }
  }

  _updateHTML() {
    const component = document.getElementById(`_${this.name}`);
    const componentHTML = this.render();
    if (component) {
      component.innerHTML = componentHTML;
    }
    return `<div id="_${this.name}">
                ${componentHTML}
              </div>`;
  }

  _renderComponents() {
    this._getComponentsList().forEach((component: Component) => {
      if (component._propsHaveUpdated()) {
        component._render();
      }
    });
  }

  _apiCalls() {
    if (!this._wasShowing()) {
      this.apiCalls();
    }
    this._apiCallsComponents();
  }

  _apiCallsComponents() {
    this._getComponentsList().forEach((component: Component) => {
      component._apiCalls();
    });
  }

  _afterRender() {
    if (!this._wasShowing() || this._propsHaveUpdated()) {
      this.afterRender();
    }
    this._afterRenderComponents();
    this.setLastUpdateId();
  }

  _afterRenderComponents() {
    this._getComponentsList().forEach((component: Component) => {
      component._afterRender();
    });
  }
}

export { Component };

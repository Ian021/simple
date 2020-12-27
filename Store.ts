class Store {
  private stateUpdateId: number;
  state = {
    currentPage: ""
  };

  constructor(private router: any) {
    this.stateUpdateId = 1;
  }

  getState() {
    return prop => this.state[prop];
  }

  getStateUpdateId() {
    return () => this.stateUpdateId;
  }

  getRedirect() {
    return (pageName: any) => {
      this.setState()({ currentPage: pageName });
    };
  }

  public setState() {
    return (newState: any) => {
      this.state = { ...this.state, ...newState };
      this.stateUpdateId++;
      this.router.goTo(this.state.currentPage, this);
    };
  }
}

export { Store };

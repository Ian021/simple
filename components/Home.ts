import { Component } from "../components/Component";

class Home extends Component {
  name = "home";

  render() {
    return `
            <div class="home">
                <h1>Hello World!</h1>
            </div>
            `;
  }
}

export { Home };

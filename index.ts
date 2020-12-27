import { Router } from "./Router";
import { Template } from "./components/Template";
import { Home } from "./components/Home";
import { Store } from "./Store";

navigator.serviceWorker.register("./sw.js");

const pagesSetup = {
  pages: {
    home: Home
  },
  template: Template
};

const router = new Router(pagesSetup);

const state = {
  currentPage: "home"
};

const store = new Store(router);
store.setState()(state);

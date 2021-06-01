import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import Container from "./container";
import store from "./store";
import "./index.css";

// TODO: add error boundaries

// initialize container for various services
const container = new Container();

// create store and pass 'container' to it in order to have access to it
// from redux-thunk callback
const store_with_container = store(container);

// container context
export const ContainerContext = createContext<Container>(container);

// Attach container to global c variable. useful while developing
declare global {
  // tslint:disable-next-line
  interface Window {
    c: Container;
  }
}
window.c = container;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store_with_container}>
      <ContainerContext.Provider value={container}>
        <App />
      </ContainerContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

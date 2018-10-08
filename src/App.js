import React, { Component } from "react";
import "./App.css";
import Counter from "./components/Counter";
import GlobalCounter from "./components/GlobalCounter";

import { createStore } from "redux";
import { Provider } from "react-redux";

import { counterReducer } from "./ducks";

let store = createStore(counterReducer);

class App extends Component {
  render() {
    console.log("app state", store.getState());

    return (
      <Provider store={store}>
        <div className="App">
          <Counter count={0} id="1" defaultValue={10} />
          <Counter count={0} id="2" defaultValue={5} />
          <Counter count={0} id="3" defaultValue={4} />
          <Counter count={0} id="4" />
          <GlobalCounter />
        </div>
      </Provider>
    );
  }
}

export default App;

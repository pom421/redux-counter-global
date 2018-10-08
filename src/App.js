import React, { Component } from "react";
import "./App.css";
import Counter from "./components/Counter";
import GlobalCounter from "./components/GlobalCounter";

import { createStore } from "redux";
import { Provider } from "react-redux";

const buildNewState = ({ counters }, { id }, cb) => {
  const newCounters = counters.map(elt => {
    if (elt.id === id) {
      return {
        id: elt.id,
        count: cb(elt.count)
      };
    } else {
      return elt;
    }
  });

  const newCount = newCounters.reduce((prev, curr) => {
    return curr.count + prev;
  }, 0);

  return { newCounters, newCount };
};

const counterReducer = (state = { count: 0, counters: [] }, action) => {
  const { id } = action;
  let res;

  switch (action.type) {
    case "INC":
      res = buildNewState(state, action, elt => elt + 1);

      return {
        count: res.newCount,
        counters: res.newCounters
      };

    case "DEC":
      res = buildNewState(state, action, elt => elt - 1);

      return {
        count: res.newCount,
        counters: res.newCounters
      };

    case "INIT":
      let newCounters = state.counters.concat({ id, count: 0 });

      return {
        count: state.count,
        counters: newCounters
      };
    default:
      return state;
  }
};

let store = createStore(counterReducer);

class App extends Component {
  render() {
    console.log("app state", store.getState());

    return (
      <Provider store={store}>
        <div className="App">
          <Counter count={0} id="1" />
          <Counter count={0} id="2" />
          <Counter count={0} id="3" />
          <Counter count={0} id="4" />
          <GlobalCounter />
        </div>
      </Provider>
    );
  }
}

export default App;

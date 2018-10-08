import React from "react";
import { connect } from "react-redux";

import { increment, decrement, initCounter, reset } from "../ducks";

class Counter extends React.Component {
  componentDidMount() {
    this.props.initCounter(
      this.props.id,
      this.props.defaultValue ? this.props.defaultValue : 0
    );
  }

  render() {
    const { id, count, defaultValue, decrement, increment, reset } = this.props;

    return (
      <div>
        <h2>
          Compteur{" "}
          <span style={{ fontSize: 14 }}>
            <button onClick={() => reset(id, defaultValue ? defaultValue : 0)}>
              reset
            </button>
          </span>
        </h2>
        <button onClick={() => decrement(id)}>-</button>
        <span style={{ margin: "0 10px" }}>{count}</span>
        <button onClick={() => increment(id)}>+</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let subState = state.counters.filter(elt => elt.id === ownProps.id);

  //return subState.length === 1 ? subState[0] : {};
  return subState[0];
};

// auto wrap with dispatch
const mapDispatchToProp = {
  increment,
  decrement,
  initCounter,
  reset
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(Counter);

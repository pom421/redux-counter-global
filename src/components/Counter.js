import React from "react";
import { connect } from "react-redux";

const increment = id => ({
  type: "INC",
  id
});
const decrement = id => ({
  type: "DEC",
  id
});

const initCounter = id => ({
  type: "INIT",
  id
});

class Counter extends React.Component {
  componentDidMount() {
    console.log("dans componentDidMount", this.props.id);
    this.props.initCounter(this.props.id);
  }

  render() {
    const { id, count, decrement, increment } = this.props;

    return (
      <div>
        <h2>Compteur</h2>
        <button onClick={() => decrement(id)}>-</button>
        <span style={{ margin: "0 10px" }}>{count}</span>
        <button onClick={() => increment(id)}>+</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("dans mapStateToProps de counter");
  console.log("state", state);
  let subState = state.counters.filter(elt => elt.id === ownProps.id);

  return subState.length === 1 ? subState[0] : {};
};

// auto wrap with dispatch
const mapDispatchToProp = {
  increment,
  decrement,
  initCounter
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(Counter);

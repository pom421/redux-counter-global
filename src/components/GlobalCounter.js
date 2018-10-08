import React from "react";
import { connect } from "react-redux";

const GlobalCounter = props => {
  const { count } = props

  return (
    <div style={{ margin: "20px 0" }}>
      <h1>Somme des compteurs</h1> { count }
    </div>
  )
}

const mapStateToProps = (state) => ({
  count: state.count
})

export default connect(mapStateToProps)(GlobalCounter);

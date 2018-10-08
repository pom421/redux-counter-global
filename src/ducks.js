export const increment = id => ({
  type: "INC",
  id
});
export const decrement = id => ({
  type: "DEC",
  id
});

export const initCounter = (id, defaultValue) => ({
  type: "INIT",
  id,
  defaultValue
});
export const reset = (id, defaultValue) => ({
  type: "RESET",
  id,
  defaultValue
});

// crée un nouvel état en assurant l'immutabilité
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

export const counterReducer = (state = { count: 0, counters: [] }, action) => {
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

    case "RESET":
      res = buildNewState(state, action, () => action.defaultValue);

      return {
        count: res.newCount,
        counters: res.newCounters
      };

    case "INIT":
      let newCounters = state.counters.concat({
        id,
        count: action.defaultValue
      });
      res = buildNewState(
        { counters: newCounters },
        action,
        () => action.defaultValue
      );

      return {
        count: res.newCount,
        counters: res.newCounters
      };
    default:
      return state;
  }
};

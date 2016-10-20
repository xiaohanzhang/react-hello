const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.payload.id]: action.payload,
        }
      };
  }
  return state;
}

export default rootReducer;

export function reducer(state: TODO, action: TODO) {
  switch (action.type) {
    case 'update_mainType': {
      return {
        ...state,
        targetId: 'null',
        workTypeId: 'null',
      };
    }

    case 'update_target': {
      return {
        ...state,
        workTypeId: 'null',
      };
    }

    default:
      return state;
  }
}

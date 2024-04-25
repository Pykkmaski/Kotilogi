import { StateType } from './Gallery.hooks';

export type ActionType<T extends Kotidok.ItemType> =
  | {
      type: 'select_item';
      value: T;
    }
  | {
      type: 'reset_selected';
    }
  | {
      type: 'add_data';
      value: T;
    }
  | {
      type: 'delete_items';
      value: any[];
    };

export function reducer<T extends Kotidok.ItemType>(
  state: StateType<T>,
  action: ActionType<T>
): StateType<T> {
  switch (action.type) {
    case 'select_item': {
      const newSelectedItems = [...state.selectedItems];
      const indexOfItem = newSelectedItems.findIndex(item => item.id === action.value.id);

      if (indexOfItem == -1) {
        //The item does not exist in the currently selected items. Add it to the list.
        newSelectedItems.push(action.value);
      } else {
        //The item is already selected. Deselect it.
        newSelectedItems.splice(indexOfItem, 1);
      }

      return {
        ...state,
        selectedItems: newSelectedItems,
      };
    }

    case 'reset_selected': {
      return {
        ...state,
        selectedItems: [],
      };
    }

    default:
      return state;
  }
}

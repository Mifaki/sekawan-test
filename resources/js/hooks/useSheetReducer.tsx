import {
  BaseEntity,
  SheetState,
  SheetType,
} from '@/shared/models/generalinterfaces';
import { useReducer } from 'react';

type SheetAction<T extends BaseEntity> =
  | { type: 'OPEN_SHEET'; payload: { type: SheetType; data?: T } }
  | { type: 'CLOSE_SHEET' };

function createInitialState<T extends BaseEntity>(): SheetState<T> {
  return {
    isOpen: false,
    type: 'view',
    data: null,
  };
}

function sheetReducer<T extends BaseEntity>(
  state: SheetState<T>,
  action: SheetAction<T>
): SheetState<T> {
  switch (action.type) {
    case 'OPEN_SHEET':
      return {
        ...state,
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    case 'CLOSE_SHEET':
      return {
        ...state,
        isOpen: false,
        data: null,
      };
    default:
      return state;
  }
}

export function useSheetReducer<T extends BaseEntity>() {
  const [state, dispatch] = useReducer(
    sheetReducer<T>,
    createInitialState<T>()
  );

  const openSheet = (type: SheetType, data?: T) => {
    dispatch({ type: 'OPEN_SHEET', payload: { type, data } });
  };

  const closeSheet = () => {
    dispatch({ type: 'CLOSE_SHEET' });
  };

  return {
    isOpen: state.isOpen,
    sheetType: state.type,
    sheetData: state.data,
    openSheet,
    closeSheet,
  };
}

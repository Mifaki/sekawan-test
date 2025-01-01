import {
  BaseEntity,
  SheetState,
  SheetType,
} from '@/shared/models/generalinterfaces';
import { useReducer } from 'react';

interface MultiSheetState<T extends BaseEntity> {
  sheets: {
    [sheetId: string]: SheetState<T>;
  };
}

type SheetAction<T extends BaseEntity> =
  | {
      type: 'OPEN_SHEET';
      payload: {
        sheetId: string;
        type: SheetType;
        data?: T;
      };
    }
  | {
      type: 'CLOSE_SHEET';
      payload: {
        sheetId: string;
      };
    };

function createInitialState<T extends BaseEntity>(): MultiSheetState<T> {
  return {
    sheets: {},
  };
}

function sheetReducer<T extends BaseEntity>(
  state: MultiSheetState<T>,
  action: SheetAction<T>
): MultiSheetState<T> {
  switch (action.type) {
    case 'OPEN_SHEET':
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [action.payload.sheetId]: {
            isOpen: true,
            type: action.payload.type,
            data: action.payload.data || null,
          },
        },
      };
    case 'CLOSE_SHEET':
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [action.payload.sheetId]: {
            ...state.sheets[action.payload.sheetId],
            isOpen: false,
            data: null,
          },
        },
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

  const openSheet = (sheetId: string, type: SheetType, data?: T) => {
    dispatch({
      type: 'OPEN_SHEET',
      payload: { sheetId, type, data },
    });
  };

  const closeSheet = (sheetId: string) => {
    dispatch({
      type: 'CLOSE_SHEET',
      payload: { sheetId },
    });
  };

  const getSheetState = (sheetId: string): SheetState<T> => {
    return (
      state.sheets[sheetId] || {
        isOpen: false,
        type: 'view',
        data: null,
      }
    );
  };

  return {
    getSheetState,
    openSheet,
    closeSheet,
  };
}

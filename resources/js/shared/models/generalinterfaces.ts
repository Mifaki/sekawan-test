export type SheetType = 'edit' | 'view' | 'create';

export interface BaseEntity {
  id: string | number;
  [key: string]: any;
}

export interface SheetState<T extends BaseEntity = BaseEntity> {
  isOpen: boolean;
  type: SheetType;
  data: T | null;
}

export interface IGeneralApiResponse {
  message: string;
  status: number;
}

export type SheetType = 'edit' | 'view' | 'create' | 'authorize';

export interface BaseEntity {
  id: string | number;
  [key: string]: any;
}

export interface SheetState<T extends BaseEntity = BaseEntity> {
  isOpen: boolean;
  type: SheetType;
  data: T | null;
}

export type SheetConfig<TData = BaseEntity> = {
  data: TData;
  props?: any;
};

export interface IGeneralApiResponse {
  message: string;
  status: number;
}

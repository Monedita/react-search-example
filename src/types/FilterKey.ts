export interface FilterKey<T> {
  key: keyof T;
  weight: number;
}
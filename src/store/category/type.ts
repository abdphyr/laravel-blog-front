

export interface ICategory {
  id: number;
  name: string;
  post_count: number;
}

export interface ICategoryState {
  categories: {
    value: ICategory[];
    error: string | null;
    load: boolean;
  };
}
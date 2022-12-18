

export interface ICategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  post_count: number;
}

export interface ICategoryState {
  categories: {
    value: ICategory[];
    error: string | null;
    load: boolean;
  };
}
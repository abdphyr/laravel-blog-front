

export interface ITag {
  id: number;
  tag_name: string;
}

export interface ITagState {
  tags: {
    value: ITag[];
    error: string | null;
    load: boolean;
  };
}
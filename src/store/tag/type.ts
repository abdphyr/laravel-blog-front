

export interface ITag {
  id: number;
  tag_name: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    post_id: number;
    tag_id: number;
}
}

export interface ITagState {
  tags: {
    value: ITag[];
    error: string | null;
    load: boolean;
  };
}
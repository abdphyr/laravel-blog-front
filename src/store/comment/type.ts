import { IUser } from "../auth";

export interface IComment {
  id: number;
  body: string;
  created_at: string;
  user: IUser
}


export interface ICommentDTO {
  user_id: number;
  post_id: number;
  body: string;
}

export interface ICommentState {
  comments: {
    value: IComment[];
    count: number;
    error: string | null;
    load: boolean;
  };
}
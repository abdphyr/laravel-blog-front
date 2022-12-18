import { ICategory } from "../category";
import { IUser } from "../auth";
import { ITag } from "../tag";
export interface IPost {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  short_content: string;
  content: string;
  public_photo: string;
  created_at: string;
  updated_at: string;
  category: ICategory
}

export interface IPostDetail extends IPost {
  tags: ITag[],
  user: IUser
}

export interface IPostDTO {
  title: string;
  short_content: string;
  content: string;
  photo: string;
}


export interface PaginatedPost {
  current_page: number;
  data: IPost[];  
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null
  to: number;
  total: number;
}

export interface IPostState {
  posts: {
    value: PaginatedPost;
    error: string | null;
    load: boolean;
  };
  latest_posts: {
    value: IPost[];
    error: string | null;
    load: boolean
  };
  post: {
    value: IPostDetail | null;
    error: string | null;
    load: boolean;
  }
}
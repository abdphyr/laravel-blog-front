import { ICategory } from "../category";
import { IUser } from "../auth";
import { ITag } from "../tag";

export interface IPost {
  id: number;
  title: string;
  short_content: string;
  public_photo: string;
  created_at: string;
  content: string;
  category_name: string;
  tags: ITag[];
}

interface IPostDetail extends Omit<IPost, 'category_name'> {
  user_id: number;
  category_id: number;
  content: string;
  updated_at: string;
  category: ICategory;
  tags: ITag[];
  user: IUser;
}

export interface IPostDTO {
  title: string;
  short_content: string;
  content: string;
  photo: string;
}


export interface PaginatedPost {
  data: IPost[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null
  }
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string | null;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }
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
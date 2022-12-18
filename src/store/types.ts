import type { IPostState } from "./post";
import type { ICommentState } from "./comment";
import type { ICategoryState } from "./category";
import type { ITagState } from "./tag";
import type { IAuthState } from "./auth";
import type { IAuthPagesState } from "./authpages";
import type { INotificationState } from "./notification";


export interface IState
  extends
  IPostState,
  ICommentState,
  ICategoryState,
  ITagState,
  IAuthState,
  IAuthPagesState,
  INotificationState { }
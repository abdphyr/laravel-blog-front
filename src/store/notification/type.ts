import { ICategory } from "../category";
import { IUser } from "../auth";
import { ITag } from "../tag";

export interface INotification {
  id: string,
  type: string,
  notifiable_type: string,
  notifiable_id: number,
  data: {
    id: number,
    title: string
    created_at: string
  },
  read_at: null | string,
  created_at: string,
  updated_at: string
}


export interface INotificationState {
  notifications: {
    count: number;
    notifications: INotification[];
  } 
}
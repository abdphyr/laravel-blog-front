import { ICommentState } from "./type"

export const commentState: ICommentState = {
  comments: {
    value: [],
    count: 0,
    error: null,
    load: true
  }
}
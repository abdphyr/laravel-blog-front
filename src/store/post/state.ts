import { IPostState } from "./type"

export const postState: IPostState = {
  posts: {
    value: {
      data: [],
      links: {
        first: null,
        last: null,
        prev: null,
        next: null,
      },
      meta: {
        current_page: 0,
        from: 0,
        last_page: 0,
        links: [],
        path: '',
        per_page: 0,
        to: 0,
        total: 0
      }
    },
    error: null,
    load: true
  },
  latest_posts: {
    value: [],
    error: null,
    load: true
  },
  post: {
    value: null,
    error: null,
    load: true
  }
}
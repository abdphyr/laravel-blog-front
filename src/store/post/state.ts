import { IPostState } from "./type"

export const postState: IPostState = {
  posts: {
    value: {
      current_page: 0,
      data: [],
      first_page_url: '',
      from: 0,
      last_page: 0,
      last_page_url: '',
      links: [],
      next_page_url: '',
      path: '',
      per_page: 0,
      prev_page_url: '',
      to: 0,
      total: 0
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
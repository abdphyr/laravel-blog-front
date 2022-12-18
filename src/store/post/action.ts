import { ActionTree } from "vuex";
import { IState } from "../types";
import { PaginatedPost, IPost } from "./type";
import { postActionsCons, postMutationCons } from "./cons";
import { ax } from "../utils";


export const postActions: ActionTree<IState, IState> = {
  [postActionsCons.GET_POSTS]({ commit }, page: number) {
    ax.get<PaginatedPost>(`/posts?page=${page}`)
      .then(res => {
        commit(postMutationCons.SET_POSTS, {
          value: res.data,
          error: null,
          load: false
        });
      })
      .catch(err => {
        commit(postMutationCons.SET_POSTS, {
          value: [],
          error: err.message,
          load: false
        });
      })
  },
  [postActionsCons.GET_POST]({ commit }, id: number) {
    ax.get<IPost>(`/posts/${id}`)
      .then(res => {
        commit(postMutationCons.SET_POST, {
          value: res.data,
          error: null,
          load: false
        });
      })
      .catch(err => {
        commit(postMutationCons.SET_POST, {
          value: null,
          error: err.message,
          load: false
        });
      })
  },
  [postActionsCons.GET_LATEST_POSTS]({ commit }, id: number) {
    ax.get<IPost[]>(`/posts/latest/${id}`)
      .then(res => {
        commit(postMutationCons.SET_LATEST_POSTS, {
          value: res.data,
          error: null,
          load: false
        });
      })
      .catch(err => {
        commit(postMutationCons.SET_LATEST_POSTS, {
          value: [],
          error: err.message,
          load: false
        });
      })
  },
}
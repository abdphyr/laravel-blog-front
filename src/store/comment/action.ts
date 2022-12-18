import { ActionTree } from "vuex";
import { IState } from "../types";
import { commentActionsCons } from "./cons";
import { commentMutationCons } from "./cons";
import { ax } from "../utils";
import { IComment } from "./type";

export const commentActions: ActionTree<IState, IState> = {
  [commentActionsCons.GET_COMMENTS]({ commit }, postId: number) {
    ax.get<{comments: IComment[], count: number}>(`/comments?post_id=${postId}`)
      .then(res => {
        commit(commentMutationCons.SET_COMMENTS, {
          value: res.data.comments,
          count: res.data.count,
          error: null,
          load: false
        });
      })
      .catch(err => {
        commit(commentMutationCons.SET_COMMENTS, {
          value: [],
          count: 0,
          error: err.message,
          load: false
        });
      })
  }
}
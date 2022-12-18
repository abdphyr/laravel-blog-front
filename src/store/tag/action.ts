import { ActionTree } from "vuex";
import { IState } from "../types";
import { tagActionsCons } from "./cons";
import { tagMutationCons } from "./cons";
import { ax } from "../utils";
import { ITag } from "./type";

export const tagActions: ActionTree<IState, IState> = {
  [tagActionsCons.GET_TAGS]({ commit }) {
    ax.get<ITag[]>(`/tags`)
      .then(res => {
        commit(tagMutationCons.SET_TAGS, {
          value: res.data,
          error: null,
          load: false
        });
      })
      .catch(err => {
        commit(tagMutationCons.SET_TAGS, {
          value: [],
          error: err.message,
          load: false
        });
      })
  }
}
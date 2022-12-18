import { ActionTree } from "vuex";
import { IState } from "../types";
import { categoryActionsCons } from "./cons";
import { categoryMutationCons } from "./cons";
import { ax } from "../utils";
import { ICategory } from "./type";

export const categoryActions: ActionTree<IState, IState> = {
  [categoryActionsCons.GET_CATEGORIES]({ commit }) {
    ax.get<ICategory[]>(`/categories`)
      .then(res => {
        commit(categoryMutationCons.SET_CATEGORIES, {
          value: res.data,
          error: null,
          load: false
        });
      })
      .catch(err => {
        commit(categoryMutationCons.SET_CATEGORIES, {
          value: [],
          error: err.message,
          load: false
        });
      })
  }
}
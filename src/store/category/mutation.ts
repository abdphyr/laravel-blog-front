import { MutationTree } from "vuex";
import { IState } from "../types";
import { ICategoryState } from "./type";
import { categoryMutationCons } from "./cons";

export const categoryMutations: MutationTree<IState> = {
  [categoryMutationCons.SET_CATEGORIES](state, fetchedCategories: ICategoryState['categories']) {
    state.categories = fetchedCategories;
  }
}
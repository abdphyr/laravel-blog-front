import { MutationTree } from "vuex";
import { IState } from "../types";
import { ITagState } from "./type";
import { tagMutationCons } from "./cons";

export const tagMutations: MutationTree<IState> = {
  [tagMutationCons.SET_TAGS](state, fetchedTags: ITagState['tags']) {
    state.tags = fetchedTags;
  }
}
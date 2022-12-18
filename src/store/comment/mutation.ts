import { MutationTree } from "vuex";
import { IState } from "../types";
import { ICommentState } from "./type";
import { commentMutationCons } from "./cons";

export const commentMutations: MutationTree<IState> = {
  [commentMutationCons.SET_COMMENTS](state, fetchedComments: ICommentState['comments']) {
    state.comments = fetchedComments;
  }
}
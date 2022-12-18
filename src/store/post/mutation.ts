import { MutationTree } from "vuex";
import { IState } from "../types";
import { IPostState } from "./type";
import { postMutationCons } from "./cons";

export const postMutations: MutationTree<IState> = {
  [postMutationCons.SET_POSTS](state, fetchedPostsVal: IPostState['posts']) {
    state.posts = fetchedPostsVal;
  },
  [postMutationCons.SET_POST](state, fetchedPostVal: IPostState['post']) {
    state.post = fetchedPostVal;
  },
  [postMutationCons.SET_LATEST_POSTS](state, fetchedLatestVal: IPostState['latest_posts']){
    state.latest_posts = fetchedLatestVal;
  }
}
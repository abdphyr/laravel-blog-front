import { MutationTree } from "vuex";
import { IState } from "../types";
import { INotificationState } from "./type";
import { notifMutationCons } from "./cons";

export const notifMutations: MutationTree<IState> = {
  [notifMutationCons.SET_NOTIFS](state, data: INotificationState['notifications']) {
    state.notifications = data;
  }
}
import { ActionTree } from "vuex";
import { IState } from "../types";
import { INotificationState } from "./type";
import { notifActionsCons, notifMutationCons } from "./cons";
import { ax } from "../utils";


export const notifActions: ActionTree<IState, IState> = {
  [notifActionsCons.GET_NOTIFS]({ commit }) {
    ax.get<INotificationState['notifications']>(`/notifications`)
      .then(res => {
        commit(notifMutationCons.SET_NOTIFS, res.data);
      })
      .catch(err => {
        // commit(notifMutationCons.SET_NOTIFS, );
      })
  }
}
import { MutationTree } from "vuex"
import { IState } from "./types"

export const authpagesState = {
  authpages: false
}

export interface IAuthPagesState {
  authpages: boolean
}

export const authpagesMutCons = {
  OPEN_AUTH_PAGES: 'openAuthPages'
}

export const authpagesMut: MutationTree<IState> = {
  [authpagesMutCons.OPEN_AUTH_PAGES](state, authpage: boolean) {
    state.authpages = authpage;
  }
}
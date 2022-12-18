import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import type { IState } from './types';
import { postState, postMutations, postActions } from './post';
import { commentState, commentMutations, commentActions } from "./comment";
import { categoryState, categoryActions, categoryMutations } from './category';
import { tagState, tagMutations, tagActions } from './tag';
import { authState, authMutation, authActions } from './auth';
import { authpagesState, authpagesMut } from './authpages';
import { notifActions, notifMutations, notifState } from './notification';

export const store = createStore<IState>({
  state: {
    ...authpagesState,
    ...postState,
    ...commentState,
    ...categoryState,
    ...tagState,
    ...authState,
    ...notifState
  },
  mutations: {
    ...authpagesMut,
    ...postMutations,
    ...commentMutations,
    ...categoryMutations,
    ...tagMutations,
    ...authMutation,
    ...notifMutations
  },
  actions: {
    ...postActions,
    ...commentActions,
    ...categoryActions,
    ...tagActions,
    ...authActions,
    ...notifActions
  }
})

export const key: InjectionKey<Store<IState>> = Symbol()

export function useStore() {
  return baseUseStore<IState>(key)
}
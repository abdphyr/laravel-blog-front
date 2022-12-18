import { StoreOptions} from "vuex";
import { MutationTree } from "vuex";

interface ConfStore<T> {
  state: T,
  mutations: MutationTree<T>
}

export const confStore = <T>(conf: ConfStore<T>): StoreOptions<T> => {
  const { state, mutations } = conf;
  return {
    state,
    mutations
  }
}



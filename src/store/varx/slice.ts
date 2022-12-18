import { MutationTree, ActionTree } from "vuex";
import { ref, Ref } from "vue";
import { ax } from "../utils/axios";

interface Slice {
  name: string;
  baseEndpoint: string;
  methods: ("get" | "post" | "put" | "delete")[];
}

type Hook<T> = (id?: number) => {
  isLoading: Ref<boolean>;
  error: Ref<undefined | null | string>;
  data: Ref<T[] | undefined> | Ref<T | undefined>;
}

export const createSlice = <T, S extends {[key: string]: T | T[]}>(param: Slice) => {
  const { name, baseEndpoint, methods } = param;
  const mutations: MutationTree<S> = {}
  const actions: ActionTree<S, S> = {}
  const hooks: Hook<T>[] = []
  methods.forEach(method => {
    if (method === 'get') {
      const getMany = () => {
        const data = ref<T[]>();
        const isLoading = ref<boolean>(true);
        const error = ref<string | null>();
        ax.get<T[]>(baseEndpoint)
          .then(res => {
            data.value = res.data;
            isLoading.value = false;
            mutations[name + 'Mutation'] = function (state) {
              state 
            }
            actions[name + 'Action'] = function ({ commit }) {

            }
          })
          .catch(err => {
            error.value = err.message
          })
        return {
          isLoading,
          error,
          data
        }
      }
      const getOne = (id?: number) => {
        const data = ref<T>();
        const isLoading = ref<boolean>(true);
        const error = ref<string | null>();
        ax.get<T>(baseEndpoint + `/${id}`)
          .then(res => {
            data.value = res.data;
            isLoading.value = false;
          })
          .catch(err => {
            error.value = err.message
          })
        return {
          isLoading,
          error,
          data
        }
      }
      hooks.push(getMany);
      hooks.push(getOne);
    }
  })
  return {
    mutations,
    hooks,
  }
}
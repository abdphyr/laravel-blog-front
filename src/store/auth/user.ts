import { MutationTree, ActionTree } from "vuex";
import { IState } from "../types";
import { IAuth, IAuthState, IRegisterDTO, ILoginDTO } from "./type";
import { ax } from "../utils";

export const authMutationCons = {
  SET_AUTH: "setAuth",
  SET_AUTH_ERROR: 'setError',
  LOGOUT_USER: "logoutUser",
  CONFIRM_PASSWORD: "confirmPassword"
}

export const authActionsCons = {
  REGISTER: "register",
  LOGIN: "login",
  LOGOUT: "logout"
}

export const authMutation: MutationTree<IState> = {
  [authMutationCons.SET_AUTH](state, auth: IAuth) {
    state.auth.value = auth;
  },
  [authMutationCons.SET_AUTH_ERROR](state, error: string) {
    state.auth.error = error;
  },
  [authMutationCons.LOGOUT_USER](state) {
    state.auth.error = null;
    state.auth.value = undefined;
  },
  [authMutationCons.CONFIRM_PASSWORD](state, route_path: string) {
    state.auth.conf_pass_succ_path = route_path
  }
}
export const authActions: ActionTree<IState, IState> = {
  [authActionsCons.REGISTER]({ commit }, { auth, navigate }: IRegisterDTO) {
    ax.post<IAuth>('/register', auth)
      .then(res => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        commit(authMutationCons.SET_AUTH, res.data);
        navigate();
      })
      .catch(err => {
        commit(authMutationCons.SET_AUTH_ERROR, err.message)
      })
  },
  [authActionsCons.LOGIN]({ commit }, { auth, navigate }: ILoginDTO) {
    ax.post<IAuth>('/login', auth)
      .then(res => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        commit(authMutationCons.SET_AUTH, res.data);
        navigate();
      })
      .catch(err => {
        commit(authMutationCons.SET_AUTH_ERROR, err.message)
      })
  },
  [authActionsCons.LOGOUT]({ commit }, navigate: ILoginDTO['navigate']) {
    localStorage.removeItem("auth");
    commit(authMutationCons.LOGOUT_USER);
    navigate();
  }
}

export const authState: IAuthState = {
  auth: {
    value: undefined,
    error: null,
    conf_pass_succ_path: ''
  }
}


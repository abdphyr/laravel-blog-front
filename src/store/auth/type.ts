import { NavigationFailure } from "vue-router";

export interface IUser {
  id: number
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  avatar: string | null;
  info: string | null;
  roles: {
    id: number;
    role_name: "admin" | "editor" | "blogger"
  }[]
}

export interface IAuth {
  user: IUser,
  token: string;
  status: boolean;
  message: string;
}

export interface IAuthState {
  auth: {
    value?: IAuth,
    error: string | null,
    conf_pass_succ_path: string
  }
}

export interface IRegisterDTO {
  auth: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  navigate: (e?: MouseEvent | undefined) => Promise<void | NavigationFailure>
}

export interface ILoginDTO {
  auth: {
    email: string;
    password: string;
  }
  navigate: (e?: MouseEvent | undefined) => Promise<void | NavigationFailure>
}
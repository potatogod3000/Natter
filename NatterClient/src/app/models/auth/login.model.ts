export interface LoginModel {
    email: string,
    password: string
}

export interface LoginStatusModel {
    isAuthenticated: boolean,
    isSuccess: boolean,
    isFailure: boolean,
    username: string,
    errors: string[]
}

export const initialLoginStatus: LoginStatusModel = {
    isAuthenticated: false,
    isSuccess: false,
    isFailure: false,
    username: "",
    errors: [],
}
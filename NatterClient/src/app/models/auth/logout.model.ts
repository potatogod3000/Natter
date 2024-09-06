export interface LogoutStatusModel {
    isLoggedOut: boolean,
    message: string
}

export const initialLogoutModel: LogoutStatusModel = {
    isLoggedOut: false,
    message: ""
}
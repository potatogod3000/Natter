export interface UpdatePasswordModel {
    email: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface UpdatePasswordResponseModel {
    isSuccess: boolean,
    isFailure: false,
    errors: Array<string>
}

export const initialUpdatePassword: UpdatePasswordModel = {
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
}

export const initialUpdatePasswordResponse: UpdatePasswordResponseModel = {
    isSuccess: false,
    isFailure: false,
    errors: []
}
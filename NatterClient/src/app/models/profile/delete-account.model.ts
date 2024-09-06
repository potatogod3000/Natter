export interface DeleteAccountModel {
    email: string,
    password: string
}

export interface DeleteAccountResponseModel {
    isSuccess: boolean,
    isFailure: boolean,
    errors: Array<string>
}

export const initialDeleteAccount: DeleteAccountModel = {
    email: "",
    password: ""
}

export const initialDeleteAccountResponse: DeleteAccountResponseModel = {
    isSuccess: false,
    isFailure: false,
    errors: [],
}
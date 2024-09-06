export interface ProfileModel {
    id?: Number,
    email: string,
    username: string,
    password: string,
    country: string,
    phoneNumberAreaCode: string,
    phoneNumber: string,
}

export interface ProfileResponseModel {
    profileModel: ProfileModel,
    isAuthenticated: boolean,
    isFailure: boolean,
    isSuccess: boolean,
    errors: Array<string>
}

export const initialProfile: ProfileModel = {
    email: "",
    username: "",
    password: "",
    country: "",
    phoneNumberAreaCode: "",
    phoneNumber: ""
}

export const initialProfileResponse: ProfileResponseModel = {
    profileModel: initialProfile,
    isAuthenticated: false,
    isFailure: false,
    isSuccess: false,
    errors: []
}
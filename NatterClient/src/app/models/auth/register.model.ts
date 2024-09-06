export interface RegisterModel {
    id?: Number,
    email: string,
    username: string,
    password: string,
    country: string,
    phoneNumberAreaCode: string,
    phoneNumber: string,
}

export const initialRegisterModel: RegisterModel = {
    id: 0,
    email: "",
    username: "",
    password: "",
    country: "",
    phoneNumberAreaCode: "",
    phoneNumber: "",
}
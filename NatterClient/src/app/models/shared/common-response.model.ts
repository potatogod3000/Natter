export interface CommonResponseModel {
    isAuthenticated: boolean,
    isSuccess: boolean,
    isFailure: boolean,
    error: Array<string>
}

export const initialCommonResponse: CommonResponseModel = {
    isAuthenticated: false,
    isSuccess: false,
    isFailure: false,
    error: []
}
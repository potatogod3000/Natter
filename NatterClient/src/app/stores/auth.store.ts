import { Injectable, signal } from "@angular/core";
import { initialLoginStatus, LoginStatusModel } from "../models/auth/login.model";

@Injectable({
    providedIn: "root"
})

export class AuthStore {
    private _currentAuthStatus;

    constructor() {
        this._currentAuthStatus = signal<LoginStatusModel>(initialLoginStatus);
    }

    get getAuth() {
        return this._currentAuthStatus();
    }

    set setAuth(loginStatus: LoginStatusModel) {
        this._currentAuthStatus.set(loginStatus);
    }
}
import { Injectable, signal } from "@angular/core";
import { initialLoginStatus, LoginStatusModel } from "../models/auth/login.model";

@Injectable({
    providedIn: "root"
})

export class AuthStore {
    currentAuthStatus = signal<LoginStatusModel>(initialLoginStatus);

    constructor() {}
}
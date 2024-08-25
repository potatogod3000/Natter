import { Injectable, signal } from "@angular/core";
import { LoginStatusModel, LoginModel } from "../../models/auth/login.model";
import { HttpClient } from "@angular/common/http";
import { authUrl } from "../../helpers/scripts/apiUrls";
import { Observable } from "rxjs";
import { RegisterModel, RegisterStatusModel } from "../../models/auth/register.model";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    constructor(private _http: HttpClient) {}

    performLogin(loginModel: LoginModel): Observable<LoginStatusModel> {
        return this._http.post<LoginStatusModel>(`${authUrl}/login`, loginModel);
    }

    performRegistration(regModel: RegisterModel): Observable<RegisterStatusModel> {
        return this._http.post<RegisterStatusModel>(`${authUrl}/register`, regModel);
    }

    performAuthCheck(): Observable<LoginStatusModel> {
        return this._http.get<LoginStatusModel>(`${authUrl}/refresh`, {
            withCredentials: true
        });
    }
}
import { Injectable } from "@angular/core";
import { LoginStatusModel, LoginModel } from "../../models/auth/login.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { authUrl } from "../../helpers/scripts/apiUrls";
import { Observable } from "rxjs";
import { RegisterModel } from "../../models/auth/register.model";
import { LogoutStatusModel } from "../../models/auth/logout.model";
import { CommonResponseModel } from "../../models/shared/common-response.model";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    constructor(private _http: HttpClient) {}
    
    private jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    performLogin(loginModel: LoginModel): Observable<LoginStatusModel> {
        return this._http.post<LoginStatusModel>(`${authUrl}/login`, loginModel, {
            withCredentials: true,
            headers: this.jsonHeader
        });
    }

    performRegistration(regModel: RegisterModel): Observable<CommonResponseModel> {
        return this._http.post<CommonResponseModel>(`${authUrl}/register`, regModel, {
            headers: this.jsonHeader
        });
    }

    performAuthCheck(): Observable<LoginStatusModel> {
        return this._http.get<LoginStatusModel>(`${authUrl}/refresh`, {
            withCredentials: true
        });
    }

    performLogout(): Observable<LogoutStatusModel>  {
        return this._http.get<LogoutStatusModel>(`${authUrl}/logout`, {
            withCredentials: true
        });
    }
}
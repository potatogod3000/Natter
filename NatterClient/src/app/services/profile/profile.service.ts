import { Injectable } from '@angular/core';
import { profileUrl } from '../../helpers/scripts/apiUrls';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdatePasswordModel, UpdatePasswordResponseModel } from '../../models/profile/update-password.model';
import { DeleteAccountModel } from '../../models/profile/delete-account.model';
import { MessageModel } from '../../models/shared/message.model';
import { ProfileModel, ProfileResponseModel } from '../../models/profile/profile.model';
import { CommonResponseModel } from '../../models/shared/common-response.model';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private _http: HttpClient) {}

    private jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

    fetchMessages(username?: string): Observable<Array<MessageModel>> {
        let param = "";
        if (username) param = `?username=${username}`;

        return this._http.get<Array<MessageModel>>(`${profileUrl}/get-messages${param}`, { withCredentials: true });
    }

    fetchUserDetails(username?: string): Observable<ProfileResponseModel> {
        let param = "";
        if (username) param = `?username=${username}`;

        return this._http.get<ProfileResponseModel>(`${profileUrl}/get-profile${param}`, { withCredentials: true });
    }

    updateUser(userModel: ProfileModel): Observable<CommonResponseModel> {
        return this._http.post<CommonResponseModel>(`${profileUrl}/update-user`, userModel, { 
            headers: this.jsonHeader,
            withCredentials: true
        });
    }

    updatePassword(passwordModel: UpdatePasswordModel): Observable<UpdatePasswordResponseModel> {
        return this._http.post<UpdatePasswordResponseModel>(`${profileUrl}/update-password`, passwordModel, { 
            headers: this.jsonHeader,
            withCredentials: true
        });
    }

    deleteAccount(deleteModel: DeleteAccountModel) {
        return this._http.post<UpdatePasswordResponseModel>(`${profileUrl}/delete-user`, deleteModel, { 
            headers: this.jsonHeader,
            withCredentials: true
        });
    }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteAccountModel, initialDeleteAccount } from '../../../models/profile/delete-account.model';

@Component({
    selector: 'profile-delete-user',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent {
    deleteModel: DeleteAccountModel = initialDeleteAccount;

    constructor(private _profileService: ProfileService) {}

    deleteAccount() {
        try {
            this._profileService.deleteAccount(this.deleteModel)
            .subscribe({
                next: (response) => {
                    console.log(response);
                },
                error: (error: HttpErrorResponse) => {
                    console.log("Error", error)
                }
            });
        }

        catch (err) {
            console.log("Exception", err);
        }
    }
}

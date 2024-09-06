import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProfileStore } from '../../stores/profile.store';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
    constructor(public profileStore: ProfileStore,
        private _profileService: ProfileService
    ) {}

    ngOnInit(): void {
        if (this.profileStore.profileIsEmpty()) this.getProfileDetails();
    }

    private getProfileDetails() {
        try {
            this._profileService.fetchUserDetails()
            .subscribe({
                next: (response) => {
                    if (response.isAuthenticated && response.isSuccess) {
                        this.profileStore.profileDetails.set(response.profileModel);
                    }
                },
                error: (error: HttpErrorResponse) => {
                    console.log("Error", error);
                }
            });
        }

        catch (err) {
            console.log("Exception", err);
        }
    }
}

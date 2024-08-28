import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryResponse } from '../../../models/shared/country-response.model';
import { CountriesService } from '../../../services/shared/countries.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { AuthStore } from '../../../stores/auth.store';
import { initialUpdatePassword, UpdatePasswordModel } from '../../../models/profile/update-password.model';
import { initialProfile, ProfileModel } from '../../../models/profile/profile.model';

@Component({
    selector: 'profile-update-user',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './update-user.component.html'
})

export class UpdateUserComponent implements OnInit {
    // Update Profile - Variables
    userModel = signal<ProfileModel>(initialProfile);
    countries: Array<CountryResponse> = [];
    phoneNumberAreaCodes: Array<string> = [];

    // Update Password - Variables
    passwordModel: UpdatePasswordModel = initialUpdatePassword;

    constructor(private _profileService: ProfileService,
        private _countriesService: CountriesService,
        public authStore: AuthStore)
    {}

    ngOnInit(): void {
        this.getCountries();
        this.getUserDetails();
    }

    // UPDATE PROFILE
    private getUserDetails() {
        try {
            this._profileService.fetchUserDetails()
            .subscribe({
                next: (response) => {
                    if (response.isAuthenticated && response.isSuccess) {
                        this.getAreaCodes(response.profileModel.country);
                        this.userModel.set(response.profileModel);
                    }
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error);
                }
            });
        }
        catch (err) {
            console.log(err);
        }      
    }

    private getCountries() {
        try {
            this._countriesService.getCountries()
            .subscribe({
                next: (response) => {
                    this.countries = this._countriesService.sortByCountryName(response);
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

    getAreaCodes(selectedCountry?: string) {
        this.userModel().phoneNumberAreaCode = "";

        if (selectedCountry) {
            this.phoneNumberAreaCodes = this._countriesService.getAreaCodesForCountry(this.countries, selectedCountry);
        }
        else {
            this.phoneNumberAreaCodes = this._countriesService.getAreaCodesForCountry(this.countries, this.userModel().country);
        }
    }

    submitChanges() {
        try {
            this._profileService.updateUser(this.userModel())
            .subscribe({
                next: (response) => {
                    if (response.isAuthenticated && response.isSuccess) {
                        this.authStore.setAuth.username = this.userModel().username;
                        console.log("Success", response);
                    }
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

    // UPDATE PASSWORD
    checkPasswords(): boolean {
        let disableButton: boolean = true;

        if (this.passwordModel.currentPassword !== ""
            && (this.passwordModel.newPassword !== "" && this.passwordModel.confirmPassword !== "")
            && this.passwordModel.newPassword === this.passwordModel.confirmPassword) {

            disableButton = false;
        }

        return disableButton;
    }

    submitNewPassword() {    
        try {
            this._profileService.updatePassword(this.passwordModel)
            .subscribe({
                next: (response) => {
                    if (response.isFailure) {
                        console.log(response.errors);
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

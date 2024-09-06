import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../../models/auth/register.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryResponse } from '../../../models/shared/country-response.model';
import { CountriesService } from '../../../services/shared/countries.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
    title = 'Natter';
    pageTitle = 'Register';
    countries: Array<CountryResponse> = [] ;

    
    // Page Variables
    registerModel: RegisterModel = {
        email: "",
        username: "",
        password: "",
        country: "",
        phoneNumberAreaCode: "",
        phoneNumber: "",
    };
    
    phoneNumberAreaCodes: Array<string> = [];
    registrationSuccessful = new Boolean(false);
    
    constructor(private _authService: AuthService, private _countriesService: CountriesService, private _router: Router) {}

    ngOnInit() {
        this.getCountries();
    }

    private getCountries() {
        try {
            this._countriesService.getCountries()
            .subscribe({
                next: (response) => {
                    this.countries = this._countriesService.sortByCountryName(response);
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

    async submitAction() {
        try {
            this._authService.performRegistration(this.registerModel)
            .subscribe({
                next: (response) => {
                    console.log(response);
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error.error);
                }
            });
        }
        
        catch (err) {
            this.registrationSuccessful = false;
        }
    }

    switchToLogin() {
        this._router.navigateByUrl("/login");
    }

    getAreaCodes() {
        this.phoneNumberAreaCodes = this._countriesService.getAreaCodesForCountry(this.countries, this.registerModel.country);
    }
}

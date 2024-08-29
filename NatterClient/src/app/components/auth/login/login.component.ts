import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginModel, LoginStatusModel } from '../../../models/auth/login.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStore } from '../../../stores/auth.store';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    title = 'Natter';
    pageTitle = 'Login';

    // Page Variables
    loginModel: LoginModel = {
        email: "",
        password: ""
    }

    received: any = new Object();

    constructor(private _authService: AuthService, private _authStore: AuthStore, private _router: Router) {}

    async loginAction() {
        try {
            this._authService.performLogin(this.loginModel)
            .subscribe({
                next: (response) => {
                    if (response.isSuccess && response.isAuthenticated) {                    
                        this._authStore.currentAuthStatus.set(response);
                        this._router.navigateByUrl("/");
                    }
                },
                error: (error: HttpErrorResponse) => {
                    this._authStore.currentAuthStatus.set(error.error);
                }
            });
        }
        catch (exception) {
            console.log(exception);
        }
    }

    public switchToRegister() {
        this._router.navigateByUrl("/register");
    }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AuthService } from './services/auth/auth.service';
import { AuthStore } from './stores/auth.store';
import { HttpErrorResponse } from '@angular/common/http';
import { initialLoginStatus } from './models/auth/login.model';
import { AppStore } from './stores/app.store';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'Natter';

    constructor (private _authService: AuthService, 
        private _authStore: AuthStore, 
        private _router: Router,
        public appStore: AppStore)
    {}

    // Perform Auth Check on Application Init
    ngOnInit(): void {
        this.performAuthCheck();
    }
    
    private performAuthCheck() {
        try {
            this._authService.performAuthCheck()
            .subscribe({
                next: (response) => {
                    this._authStore.currentAuthStatus.set(response);
                                
                    if (!response.isAuthenticated) {
                        this._router.navigateByUrl("/login");
                    }
                },
                error: (error: HttpErrorResponse) => {                
                    this._authStore.currentAuthStatus.set(initialLoginStatus);
                }
            });
        }

        catch (err) {
            console.log("Exception", err);
        }
    }
}
import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageModel } from '../../../models/shared/message.model';

@Component({
    selector: 'profile-user-activity',
    standalone: true,
    imports: [],
    templateUrl: './user-activity.component.html'
})

export class UserActivityComponent implements OnInit {

    messages = signal<Array<MessageModel>>([]);

    constructor (private _profileService: ProfileService) {}

    ngOnInit(): void {
        this.getMessages();
    }

    private getMessages() {
        try {
            this._profileService.fetchMessages()
            .subscribe({
                next: (response) => {
                    this.messages.set(response);
                },
                error: (error: HttpErrorResponse) => {
                    console.log("Error", error);
                }
            });
        }
        catch (err) {
            console.log("Exception", err)
        }
    }
}

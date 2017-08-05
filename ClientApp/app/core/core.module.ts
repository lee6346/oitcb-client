import { NgModule } from '@angular/core';

//for one-time use components
import { CommonModule } from '@angular/common';

import {
    ChatBotActivityService, ChatBotConnectionService, LiveRequestService, AuthenticationService,
    WebsocketService, StateStorageService, IdleMessageService,
} from './';


@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [
        ChatBotActivityService,
        ChatBotConnectionService,
        StateStorageService,
        LiveRequestService,
        AuthenticationService,
        WebsocketService,
        IdleMessageService,
    ]
})
export class CoreModule { }
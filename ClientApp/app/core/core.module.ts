import { NgModule } from '@angular/core';

//for one-time use components
import { CommonModule } from '@angular/common';

import {
    ChatBotActivityService, ChatBotConnectionService, LiveRequestService,
    WebsocketService, StateStorageService, IdleMessageService, MessageService, ChannelConnectionService,
    SocketMessageService, WindowMessageService
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
        WebsocketService,
        MessageService,
        IdleMessageService,
        ChannelConnectionService,
        SocketMessageService,
        WindowMessageService,
    ]
})
export class CoreModule { }
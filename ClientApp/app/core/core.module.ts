import { NgModule } from '@angular/core';
//import CommonModule and other Modules IF this module will also contain the root modules component

import { ChatBotActivityService} from './chatbot-activity.service';
import { ChatBotConnectionService } from './chatbot-connection.service';
import { ChatBotTokenService } from './chatbot-token.service';

import { StateStorageService } from './state-storage.service';
import { LiveRequestQueueService } from './live-request-queue.service';
import { LoginAuthenticationService } from './login-authentication.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        ChatBotActivityService,
        ChatBotConnectionService,
        ChatBotTokenService,
        StateStorageService,
        LiveRequestQueueService,
        LoginAuthenticationService,
    ]
})
export class CoreModule { }
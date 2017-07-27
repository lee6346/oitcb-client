import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { sharedConfig } from './app.module.shared';
//register services
import { ChatService } from './services/chat.service';
import { ChatConnectionService } from './services/chat-connection.service';
import { ChatAuthenticationService } from './services/chat-authentication.service';
import { StateStorageService } from './services/state-storage.service';
import { UserService } from './services/user.service';
import { WebsocketService } from './services/websocket.service';
import { LiveRequestService } from './services/live-request.service';
import { AgentChatWindowComponent } from './components/agent/agent-chat-window.component';
import { DraggableWindowDirective } from './components/agent/draggable-window.directive';


@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: [
        sharedConfig.declarations,
        DraggableWindowDirective,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        ChatService,
        ChatConnectionService,
        ChatAuthenticationService,
        StateStorageService,
        UserService,
        WebsocketService,
        LiveRequestService,
        
    ],
    entryComponents: [AgentChatWindowComponent]
})
export class AppModule {
}

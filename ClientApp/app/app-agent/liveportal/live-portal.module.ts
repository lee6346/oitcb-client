import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//replace with shared later..
import { SharedModule } from '../../shared';

import { LivePortalComponent } from './live-portal.component';
import { InsertWindowDirective } from './directives/insert-window.directive';
import { AgentChatWindowComponent } from './agentchatwindow/agent-chat-window.component';
import { PendingListComponent } from './pendinglist/pending-list.component';
import { MinimizeWindowContainerComponent } from './minimizewindow/minimized-window-container.component';
import { ChatHistoryWindowComponent } from './chathistorywindow/chat-history-window.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        LivePortalComponent,
        PendingListComponent,
        AgentChatWindowComponent,
        InsertWindowDirective,
        MinimizeWindowContainerComponent,
        ChatHistoryWindowComponent,
    ],
    entryComponents: [
        AgentChatWindowComponent
    ],
    exports: [
        LivePortalComponent,
        PendingListComponent,
        AgentChatWindowComponent,
        InsertWindowDirective,
        MinimizeWindowContainerComponent,
        ChatHistoryWindowComponent,
    ],

})
export class LivePortalModule { }
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//replace with shared later..
import { SharedModule } from '../../shared';

import { LivePortalComponent } from './live-portal.component';
import { InsertWindowDirective } from './directives/insert-window.directive';
import { AgentChatWindowComponent } from './agentchatwindow/agent-chat-window.component';
import { PendingListComponent } from './pendinglist/pending-list.component';

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
    ],
    entryComponents: [
        AgentChatWindowComponent
    ],
    exports: [
        LivePortalComponent,
        PendingListComponent,
        AgentChatWindowComponent,
        InsertWindowDirective,
    ],

})
export class LivePortalModule { }
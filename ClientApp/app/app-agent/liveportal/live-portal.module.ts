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
import { AgentGroupChatComponent } from './agentgroupchat/agent-group-chat.component';
import { WatchListComponent } from './watchlist/watch-list.component';
import { InputBarComponent } from './inputbar/input-bar.component';
import { ChatDisplayWindowComponent } from './chatdisplaywindow/chat-display-window.component';


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
        AgentGroupChatComponent,
        WatchListComponent,
        InputBarComponent,
        ChatDisplayWindowComponent,
    ],
    entryComponents: [
        /*AgentChatWindowComponent*/
        ChatDisplayWindowComponent
    ],
    exports: [
        LivePortalComponent,
        PendingListComponent,
        AgentChatWindowComponent,
        InsertWindowDirective,
        MinimizeWindowContainerComponent,
        ChatHistoryWindowComponent,
        AgentGroupChatComponent,
        WatchListComponent,
        InputBarComponent,
        ChatDisplayWindowComponent,
    ],

})
export class LivePortalModule { }
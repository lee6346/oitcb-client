import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//replace with shared later..
import { SharedModule} from '../../shared';

import { ChatBotComponent } from './chatbot.component';
import { ChatWindowComponent } from './chatwindow/chatwindow.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ChatBotComponent,
        ChatWindowComponent,
    ],
    exports: [
        ChatBotComponent,
        ChatWindowComponent,
    ],

})
export class ChatBotModule { }
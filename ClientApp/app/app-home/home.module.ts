import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { ChatBotModule } from './chatbot/chatbot.module';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ChatBotModule,
        HomeRoutingModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        HomeComponent,
    ]
})
export class HomeModule { }
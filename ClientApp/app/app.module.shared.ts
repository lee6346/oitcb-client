//angular modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

//app level modules
import { HomeModule } from './app-home/home.module';
import { AgentModule } from './app-agent/agent.module';

//feature level modules
import { ChatBotModule } from './app-home/chatbot/chatbot.module';
import { LivePortalModule } from './app-agent/liveportal/live-portal.module';


//base component
import { AppComponent } from './app.component';


/*
//import the classes to use in declarations
import { AgentComponent } from './components/agent/agent.component';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestModal } from './components/test-modal/test-modal';
import { ChatWindowComponent } from './chatwindow/chat-window.component';
import { PendingRequestComponent } from './components/agent/pendrequest.component';
import { AgentChatWindowComponent } from './components/agent/agent-chat-window.component';
import { InsertWindowDirective } from './components/agent/insert-window.directive';
*/
export const sharedConfig: NgModule = {

    bootstrap: [AppComponent],

    declarations: [
        AppComponent,
        /*
        
        AgentComponent,
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ContactComponent,
        TestModal,
        ChatWindowComponent,
        PendingRequestComponent,
        AgentChatWindowComponent,
        InsertWindowDirective,
        */
    ],

    imports: [
        HttpModule,
        JsonpModule,
        //FormsModule,
        HomeModule,
        ChatBotModule,
        AgentModule,
        LivePortalModule,
        AppRoutingModule,
        /*
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'agent', component: AgentComponent },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'home' }
        ]) */
    ]
};

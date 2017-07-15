//angular modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Web/HTTP modules
import { HttpModule, JsonpModule } from '@angular/http';



//import the classes to use in declarations
import { AgentComponent } from './components/agent/agent.component';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CommentsComponent } from './components/comments/comments.component';
import { TestModal } from './components/test-modal/test-modal';

export const sharedConfig: NgModule = {

    bootstrap: [AppComponent],

    declarations: [
        AgentComponent,
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ContactComponent,
        CommentsComponent,
        TestModal,
        
    ],

    imports: [
        HttpModule,
        JsonpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'agent', component: AgentComponent },
            { path: 'comments', component: CommentsComponent },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};

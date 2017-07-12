import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//ngx bootstrap modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

//Web/HTTP modules
import { HttpModule, JsonpModule } from '@angular/http';

//directives
import { AngularDraggableModule } from 'angular2-draggable';

//import the classes to use in declarations
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatModalComponent } from './components/chat-modal/chat-modal.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CommentsComponent } from './components/comments/comments.component';

import { TestComponent } from './components/test/test.component';
import { TestModal } from './components/test-modal/test-modal';

//the shared config is shared by both server and client app module classes and goes here
// in the client and server module, their references map to the references listed here as needed
// ex: (in module.client.ts, declarations: sharedConfig.declarations )
export const sharedConfig: NgModule = {
    //the component to launch as the startup component
    bootstrap: [AppComponent],
    //other components, directives, and pipes that can be referenced inside this module
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ContactComponent,
        ChatModalComponent,
        AuthenticationComponent,
        CommentsComponent,
        TestComponent,
        TestModal,
        
    ],
    //imports array stores all modules (custom or built in) that will be used for the application
    //Here the built-in RouterModule is imported, and contains an array of paths associated with this app
    // path: relative path of directory, component: Component Class name
    // redirectTo: defaults '' and ** to home, 
    imports: [
        ModalModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        BsDropdownModule,
        AngularDraggableModule,
        ModalModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'agent', component: AuthenticationComponent },
            { path: 'comments', component: CommentsComponent },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//ngx bootstrap modules
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

//Web/HTTP modules
import { HttpModule, JsonpModule } from '@angular/http';


//import the classes to use in declarations
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatModalComponent } from './components/chat-modal/chat-modal.component';
import { TestComponent } from './components/test/test.component';

//the shared config is shared by both server and client app module classes and goes here
// in the client and server module, their references map to the references listed here as needed
// ex: (in module.client.ts, declarations: sharedConfig.declarations )
export const sharedConfig: NgModule = {
    //
    bootstrap: [AppComponent],
    //makes directives (along with components and pipes) from the current module available to other directives in the current module
    //all the declarations reference component classes
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ContactComponent,
        ChatModalComponent,
        TestComponent,
    ],
    //imports array stores all modules (custom or built in) that will be used for the application
    //Here the built-in RouterModule is imported, and contains an array of paths associated with this app
    // path: relative path of directory, component: Component Class name
    // redirectTo: defaults '' and ** to home, 
    imports: [
        ModalModule,
        HttpModule,
        JsonpModule,
        BsDropdownModule,
        ModalModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//modal module
import { ModalModule } from 'ngx-bootstrap/modal';

//import the classes to use in declarations
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';


import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';


//userform modal 
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
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
        CounterComponent,
        FetchDataComponent,
        //userform modal
        LoginComponent,
        ContactComponent,
    ],
    //imports array stores all modules (custom or built in) that will be used for the application
    //Here the built-in RouterModule is imported, and contains an array of paths associated with this app
    // path: relative path of directory, component: Component Class name
    // redirectTo: defaults '' and ** to home, 
    imports: [
        ModalModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};

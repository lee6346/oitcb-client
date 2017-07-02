import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import the sharedConfig to refenrece it for this modules bootstrap and declarations
import { sharedConfig } from './app.module.shared';

//modules for the bootstrap-angular modals


//Ng module decorator identifies the appmodule as an angular module class and tells angular how to compile and launch application
@NgModule({
    //the bootstrap and declarations reference the sharedConfig module in the app.module.shared file
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    //imports the sharedConfig.imports along with additional imports specific to the client side
    // BrowserModule, FormsModule, and HTTP module
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    //the providers array constains a set of key-value provide injections
    // "register a provider using 'ORIGIN_URL' and the key/token to find the provider ..."
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin }
    ]
})
export class AppModule {
}

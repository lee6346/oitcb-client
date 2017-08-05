import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { sharedConfig } from './app.module.shared';
//register services
import { CoreModule } from './core';

//import { SharedModule } from './shared';



//import { AgentChatWindowComponent } from './components/agent/agent-chat-window.component';


@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: [
        sharedConfig.declarations,
        //components that are part of feature modules are not declared here, but are declared inside the feature module itself
    ],
    imports: [
        //module import order matters for routing... (ie: if you have two modules with /home components, the first module in the import will be selected)
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        //SharedModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
    ],
    //entryComponents: [AgentChatWindowComponent]
})
export class AppModule {
}

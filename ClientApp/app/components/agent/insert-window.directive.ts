import { Directive, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ReflectiveInjector, Type } from '@angular/core';
import { AgentChatWindowComponent } from './agent-chat-window.component';
import * as Rx from 'rxjs/Rx';
import { ChatService } from '../../services/chat.service';
import { ChatAuthenticationService } from '../../services/chat-authentication.service';
import { ChatConnectionService } from '../../services/chat-connection.service';

@Directive({ selector: '[insertWindow]' })
export class InsertWindowDirective {

    constructor(
        private viewContainer: ViewContainerRef,
        private factoryResolver: ComponentFactoryResolver
    ) { }

    //method passes in a new instance of the chat component and returns a reference to that component
    public createChatWindow(conv_id: string, secret: string, chatWindow: Type<AgentChatWindowComponent> ): ComponentRef<AgentChatWindowComponent> {
        //removes already open chat windows (only use if we want one window open at time)
        //this.viewContainer.clear(); 
        let data = {inputs: 'test'};
        //get service providers needed for the component
        //let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        //let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        //create an injector for the 
        let inputProviders = [{ provide: 'conv_id', useValue: conv_id }, { provide: 'secret', useValue: secret }];
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs);
        //the factory creates the component
        let windowFactory = this.factoryResolver.resolveComponentFactory(chatWindow);
        //converts the new made component into a reference component

        
        let chatWindowComponentRef = this.viewContainer.createComponent(windowFactory, null ,injector);

        //set up a listener that will destroy the reference to the componet once ngOnDestroy? (prevent mem leaks)
        chatWindowComponentRef.instance.close.subscribe(() => {
            chatWindowComponentRef.destroy();
        });
        return chatWindowComponentRef;
    }

    
}
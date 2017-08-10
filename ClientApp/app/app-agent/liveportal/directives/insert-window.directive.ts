import { Directive, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ReflectiveInjector, Type } from '@angular/core';
//import { AgentChatWindowComponent } from '../agentchatwindow/agent-chat-window.component';
import { ChatDisplayWindowComponent } from '../chatdisplaywindow/chat-display-window.component';


@Directive({ selector: '[insertWindow]' })
export class InsertWindowDirective {

    constructor(
        private viewContainer: ViewContainerRef,
        private factoryResolver: ComponentFactoryResolver
    ) { }


    public createChatWindow(conv_id: string, window_type: string, uid: string, chatWindow: Type<ChatDisplayWindowComponent>): ComponentRef<ChatDisplayWindowComponent> {

        //removes already open chat windows (only use if we want one window open at time)
        //this.viewContainer.clear(); 

        let inputProviders = [
            { provide: 'conv_id', useValue: conv_id },
            { provide: 'window_type', useValue: window_type },
            { provide: 'uid', useValue: uid},
        ];
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs);
        let windowFactory = this.factoryResolver.resolveComponentFactory(chatWindow);
        let chatWindowComponentRef = this.viewContainer.createComponent(windowFactory, null, injector);

        chatWindowComponentRef.instance.close.subscribe(() => {
            chatWindowComponentRef.destroy();
        });
        return chatWindowComponentRef;
    }


}